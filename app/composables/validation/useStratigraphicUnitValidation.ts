import type { ApiResourceSite, ApiResourceStratigraphicUnit } from '~~/types'
import { useAsyncValidator } from '~/composables/validation/useAsyncValidator'
import {
  required,
  maxLength,
  validateState,
  lessThanOrEqual,
  isInteger,
} from '~/utils/validations'

const currentYear = new Date().getFullYear()
export default function <RT extends ApiResourceStratigraphicUnit>(
  item: Partial<RT>,
) {
  const rules = {
    year: [
      validateState<RT>('year', required),
      validateState<RT>('year', isInteger),
      validateState<RT>('year', greaterThanOrEqual(2000)),
      validateState<RT>('year', lessThanOrEqual(currentYear)),
    ],
    number: [
      validateState<RT>('number', required),
      validateState<RT>('number', isInteger),
      validateState<RT>('year', greaterThanOrEqual(0)),
    ],
  }
  return { rules }
}
