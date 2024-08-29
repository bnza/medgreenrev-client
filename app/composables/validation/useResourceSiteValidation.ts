import useVuelidate from '@vuelidate/core'
import { required, maxLength, helpers } from '@vuelidate/validators'
import { FORM_REQUIRED_FIELD } from './messages'
import { useAsyncUniqueValidator } from '~/composables/validation/useAsyncUniqueValidator'
import { useEmitValidationInvalid } from '~/composables/validation/useEmitValidationInvalid'
import { clone } from '~/lib/resources'

const useValidation = <RT extends ApiResourceSite>(
  item: MaybeRef<Partial<RT>>,
  emit: Function,
) => {
  const shallowItem = clone<RT>(item)
  const state = reactive(shallowItem)

  const rules = {
    code: {
      required: helpers.withMessage(FORM_REQUIRED_FIELD, required),
      maxLength: maxLength(3),
      unique: useAsyncUniqueValidator({
        prop: 'code',
        path: 'sites/code',
        message: 'Duplicate code',
        item,
      }),
    },
    name: {
      required: helpers.withMessage(FORM_REQUIRED_FIELD, required),
      unique: useAsyncUniqueValidator({
        prop: 'name',
        path: 'sites/name',
        item,
        message: 'Duplicate name',
      }),
    },
  }

  const v$ = useVuelidate(rules, state)

  useEmitValidationInvalid(v$, emit)

  return { state, v$ }
}

export default useValidation
