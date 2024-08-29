import useVuelidate from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import { FORM_REQUIRED_FIELD } from './messages'
import { useAsyncUniqueValidator } from '~/composables/validation/useAsyncUniqueValidator'
import { useEmitValidationInvalid } from '~/composables/validation/useEmitValidationInvalid'
import { clone } from '~/lib/resources'

const useValidation = <RT extends ApiResourceUser>(
  item: MaybeRef<Partial<RT>>,
  emit: Function,
) => {
  const shallowItem = clone<RT>(item)
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
