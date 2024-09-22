import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { FORM_REQUIRED_FIELD } from './messages'
import { useAsyncUniqueValidator } from '~/composables/validation/useAsyncUniqueValidator'
import { useEmitValidationInvalid } from '~/composables/validation/useEmitValidationInvalid'
import { clone } from '~/lib/resources'

const useValidation = <RT extends ApiResourceSample>(
  item: MaybeRef<Partial<RT>>,
  emit: Function,
) => {
  const shallowItem = clone<RT>(item)
  const state = reactive(shallowItem)

  const rules = {
    number: {
      required: helpers.withMessage(FORM_REQUIRED_FIELD, required),
      unique: useAsyncUniqueValidator({
        path: 'sample',
        message: 'Duplicate number for this stratigraphic unit',
        prop: ['stratigraphicUnit.id', 'number'],
        item,
        watch: () => [state.stratigraphicUnit?.id, state.number],
      }),
    },
    stratigraphicUnit: {
      required: helpers.withMessage(FORM_REQUIRED_FIELD, required),
      unique: useAsyncUniqueValidator({
        path: 'sample',
        message: 'Duplicate number for this stratigraphic unit',
        prop: ['stratigraphicUnit.id', 'number'],
        item,
        watch: () => [state.stratigraphicUnit?.id, state.number],
      }),
    },
  }

  const v$ = useVuelidate(rules, state, { $autoDirty: true })

  useEmitValidationInvalid(v$, emit)

  return { state, v$ }
}

export default useValidation
