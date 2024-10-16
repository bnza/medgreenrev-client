import useVuelidate from '@vuelidate/core'
import {
  required,
  integer,
  helpers,
  minValue,
  maxValue,
} from '@vuelidate/validators'
import { FORM_REQUIRED_FIELD } from './messages'
import { useEmitValidationInvalid } from '~/composables/validation/useEmitValidationInvalid'
import { useAsyncUniqueValidator } from '~/composables/validation/useAsyncUniqueValidator'
import { clone } from '~/lib/resources'

const useValidation = <RT extends ApiResourceStratigraphicUnit>(
  item: MaybeRef<Partial<RT>>,
  emit: Function,
) => {
  const shallowItem = clone<RT>(item)
  const state = reactive(shallowItem)
  const currentYear = new Date().getFullYear()

  const rules = {
    number: {
      required: helpers.withMessage(FORM_REQUIRED_FIELD, required),
      integer,
      minValue: minValue(1),
      unique: useAsyncUniqueValidator({
        path: 'stratigraphic-units',
        message: 'Duplicate (site, year, number) tuple',
        prop: ['site.id', 'year', 'number'],
        item,
        watch: () => [state.site?.id, state.number],
      }),
    },
    year: {
      required: helpers.withMessage(FORM_REQUIRED_FIELD, required),
      integer,
      minValue: minValue(1900),
      maxValue: maxValue(currentYear),
      unique: useAsyncUniqueValidator({
        path: 'stratigraphic-units',
        message: 'Duplicate (site, year, number) tuple',
        prop: ['site.id', 'year', 'number'],
        item,
        watch: () => [state.site?.id, state.number],
      }),
    },
    site: {
      required: helpers.withMessage(FORM_REQUIRED_FIELD, required),
      unique: useAsyncUniqueValidator({
        path: 'stratigraphic-units',
        message: 'Duplicate (site, year, number) tuple',
        prop: ['site.id', 'year', 'number'],
        item,
        watch: () => [state.number, state.year],
      }),
    },
  }

  const v$ = useVuelidate(rules, state)

  useEmitValidationInvalid(v$, emit)

  return { state, v$ }
}

export default useValidation
