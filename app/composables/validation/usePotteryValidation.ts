import type { ApiResourcePottery } from '~~/types'
import { useAsyncValidator } from '~/composables/validation/useAsyncValidator'
import { required, validateState, isInteger } from '~/utils/validations'

export default function <RT extends ApiResourcePottery>(item: Partial<RT>) {
  const uniquePottery = useAsyncValidator({
    prop: ['stratigraphicUnit.id', 'number'],
    path: 'pottery',
    message: 'Duplicate SU - number pair',
    item,
  })
  return {
    stratigraphicUnit: [
      validateState<RT>('stratigraphicUnit', required),
      uniquePottery,
    ],
    number: [
      validateState<RT>('number', required),
      validateState<RT>('number', isInteger),
      validateState<RT>('number', greaterThanOrEqual(1)),
      uniquePottery,
    ],
    fragmentsNumber: [required, isInteger, greaterThanOrEqual(1)],
    typology: [required],
    functionalGroup: [required],
  }
}
