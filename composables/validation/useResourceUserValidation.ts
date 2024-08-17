import useVuelidate from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import { FORM_REQUIRED_FIELD } from './messages'
import { useAsyncUniqueValidator } from '~/composables/validation/useAsyncUniqueValidator'
import { useEmitValidationInvalid } from '~/composables/validation/useEmitValidationInvalid'
import type { ResourceValidation, ApiResourceUser } from '~/lib/resources'

const useValidation: ResourceValidation<ApiResourceUser> = (
  item: Partial<RT>,
  emit,
) => {
  const shallowItem = JSON.parse(JSON.stringify(item?.value))
  const state = reactive(shallowItem)

  const rules = {
    email: {
      required: helpers.withMessage(FORM_REQUIRED_FIELD, required),
      email: email,
      unique: useAsyncUniqueValidator({
        prop: 'email',
        path: 'users/email',
        item,
      }),
    },
  }

  const v$ = useVuelidate(rules, state)

  useEmitValidationInvalid(v$, emit)

  return { state, v$ }
}

export default useValidation
