import type { ApiResourceStratigraphicUnit } from '~~/types'
import { useAsyncValidator } from '~/composables/validation/useAsyncValidator'
import {
  required,
  validateState,
  lessThanOrEqual,
  isInteger,
} from '~/utils/validations'

const currentYear = new Date().getFullYear()
export default function <RT extends ApiResourceStratigraphicUnit>(
  item: Partial<RT>,
) {
  const uniqueSu = useAsyncValidator({
    prop: ['site.id', 'year', 'number'],
    path: 'stratigraphic_units',
    message: 'Duplicate (site, year, number) tuple',
    item,
  })
  const rules = {
    site: [validateState<RT>('site', required), uniqueSu],
    year: [
      validateState<RT>('year', required),
      validateState<RT>('year', isInteger),
      validateState<RT>('year', greaterThanOrEqual(2000)),
      validateState<RT>('year', lessThanOrEqual(currentYear)),
      uniqueSu,
    ],
    number: [
      validateState<RT>('number', required),
      validateState<RT>('number', isInteger),
      validateState<RT>('year', greaterThanOrEqual(0)),
      uniqueSu,
    ],
  }
  return { rules }
}
