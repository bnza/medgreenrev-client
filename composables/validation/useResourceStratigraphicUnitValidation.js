import useVuelidate from '@vuelidate/core'
import {
  required,
  maxLength,
  integer,
  helpers,
  minValue,
  maxValue,
} from '@vuelidate/validators'
import { FORM_REQUIRED_FIELD } from './messages'
import { useEmitValidationInvalid } from '~/composables/validation/useEmitValidationInvalid'
import { useAsyncUniqueValidator } from '~/composables/validation/useAsyncUniqueValidator'

export default function (item, emit) {
  const shallowItem = JSON.parse(JSON.stringify(item?.value))
  const state = reactive(shallowItem)
  const currentYear = new Date().getFullYear()

  // const validateCode = (item) =>
  //   computed(() => {
  //     if (
  //       typeof item.site?.id !== 'undefined' &&
  //       typeof item.year !== 'undefined' &&
  //       typeof item.number !== 'undefined'
  //     ) {
  //       return useAsyncUniqueValidator(
  //         'unique',
  //         'code',
  //         'stratigraphic-units',
  //         [item.site.id, item.year, item.number],
  //       )
  //     }
  //     return 1
  //   })
  const rules = {
    // code: {
    //   unique: validateCode(state),
    // },
    number: {
      required: helpers.withMessage(FORM_REQUIRED_FIELD, required),
      integer,
      unique: useAsyncUniqueValidator({
        path: 'stratigraphic-units',
        message: 'Duplicate (site, year, number) tuple',
        prop: ['site.id', 'year', 'number'],
        item,
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
      }),
    },
    site: {
      required: helpers.withMessage(FORM_REQUIRED_FIELD, required),
      unique: useAsyncUniqueValidator({
        path: 'stratigraphic-units',
        message: 'Duplicate (site, year, number) tuple',
        prop: ['site.id', 'year', 'number'],
        item,
      }),
    },
  }

  const v$ = useVuelidate(rules, state)

  useEmitValidationInvalid(v$, emit)

  return { state, v$ }
}
