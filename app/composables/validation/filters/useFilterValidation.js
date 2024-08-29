import useVuelidate from '@vuelidate/core'
import { required, minLength, helpers } from '@vuelidate/validators'
import { FORM_REQUIRED_FIELD } from '~/composables/validation/messages.js'
import { useEmitValidationInvalid } from '~/composables/validation/useEmitValidationInvalid.js'

export default function (filter, emit) {
  const rules = computed(() => {
    const localRules = {
      property: {
        required: helpers.withMessage(FORM_REQUIRED_FIELD, required),
      },
      filter: {
        required: helpers.withMessage(FORM_REQUIRED_FIELD, required),
      },
    }
    if (filter.filter) {
      const operandsNumber = API_FILTERS[filter.filter].operandsNumber
      if (operandsNumber > 0) {
        localRules.operands = {
          required: helpers.withMessage(FORM_REQUIRED_FIELD, required),
          minLength: minLength(operandsNumber),
        }
      }
    }
    return localRules
  })

  const v$ = useVuelidate(rules, filter)

  useEmitValidationInvalid(v$, emit)
  return { v$ }
}
