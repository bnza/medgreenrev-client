import useVuelidate from '@vuelidate/core'
import { required, maxLength, helpers } from '@vuelidate/validators'
import { FORM_REQUIRED_FIELD } from './messages'
import { useAsyncUniqueValidator } from '~/composables/validation/useAsyncUniqueValidator'
import { useEmitValidationInvalid } from '~/composables/validation/useEmitValidationInvalid'

export default function (item, emit) {
  const shallowItem = JSON.parse(JSON.stringify(item?.value))
  const state = reactive(shallowItem)

  const rules = {
    code: {
      required: helpers.withMessage(FORM_REQUIRED_FIELD, required),
      maxLength: maxLength(3),
      unique: useAsyncUniqueValidator('unique', 'code', 'site/code', item),
    },
    name: {
      required: helpers.withMessage(FORM_REQUIRED_FIELD, required),
      unique: useAsyncUniqueValidator('unique', 'name', 'site/name', item),
    },
  }

  const v$ = useVuelidate(rules, state)

  useEmitValidationInvalid(v$, emit)

  return { state, v$ }
}
