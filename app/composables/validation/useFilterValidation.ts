import useVuelidate from '@vuelidate/core'
import { required, minLength, helpers } from '@vuelidate/validators'
import { FORM_REQUIRED_FIELD } from '~/composables/validation/messages.js'
import { API_FILTERS } from '~/utils/constants/filters'
import type { Filter } from '~~/types'
import { useEmitValidationInvalid } from '~/composables/validation/useEmitValidationInvalid'

const notEmpty = (operands: Array<string> | undefined) => {
  if (!operands) {
    return true
  }
  return operands.reduce((acc, value) => acc && Boolean(value), true)
}
export default function (
  filter: Filter,
  emit: (event: 'update:invalid', ...args: any[]) => void,
) {
  const rules = computed(() => {
    const localRules: Record<string, any> = {
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
          notEmpty: helpers.withMessage('Field required', notEmpty),
        }
      }
    }
    return localRules
  })

  const v$ = useVuelidate(rules, filter)

  useEmitValidationInvalid(v$, emit)
  return { v$ }
}
