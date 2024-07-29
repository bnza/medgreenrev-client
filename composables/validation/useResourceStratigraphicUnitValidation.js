import useVuelidate from '@vuelidate/core'
import { required, maxLength, helpers } from '@vuelidate/validators'
import { FORM_REQUIRED_FIELD } from './messages'
import { useEmitValidationInvalid } from '~/composables/validation/useEmitValidationInvalid'

export default function (item, emit) {
  const shallowItem = JSON.parse(JSON.stringify(item?.value))
  const state = reactive(shallowItem)

  const rules = {
    number: {
      required: helpers.withMessage(FORM_REQUIRED_FIELD, required),
    },
    year: {
      required: helpers.withMessage(FORM_REQUIRED_FIELD, required),
    },
    site: {
      required: helpers.withMessage(FORM_REQUIRED_FIELD, required),
    },
  }

  const v$ = useVuelidate(rules, state)

  useEmitValidationInvalid(v$, emit)

  return { state, v$ }
}
