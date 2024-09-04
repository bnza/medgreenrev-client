import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { FORM_REQUIRED_FIELD } from './messages'
import { useEmitValidationInvalid } from '~/composables/validation/useEmitValidationInvalid'
import { useAsyncUniqueValidator } from '~/composables/validation/useAsyncUniqueValidator'
import { clone } from '~/lib/resources'

function neq(value, siblings) {
  return value ? value.id !== siblings.sxSU.id : true
}

const useValidation = <RT extends ApiResourceStratigraphicUnitRelationship>(
  item: MaybeRef<Partial<RT>>,
  emit: Function,
) => {
  const shallowItem = clone<RT>(item)
  const state = reactive(shallowItem)

  const rules = {
    dxSU: {
      required: helpers.withMessage(FORM_REQUIRED_FIELD, required),
      unique: useAsyncUniqueValidator({
        path: 'stratigraphic_units_relationships',
        message: 'Duplicate stratigraphic units pair',
        prop: ['sxSU.id', 'dxSU.id'],
        item,
        watch: () => [state.sxSU?.id],
      }),
      neq: helpers.withMessage('Self referencing relationship', neq),
    },
  }

  const v$ = useVuelidate(rules, state, {
    $autoDirty: true,
  })

  useEmitValidationInvalid(v$, emit)

  return { state, v$ }
}

export default useValidation
