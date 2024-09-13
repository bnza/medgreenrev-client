import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { FORM_REQUIRED_FIELD } from './messages'
import { useEmitValidationInvalid } from '~/composables/validation/useEmitValidationInvalid'
import { clone } from '~/lib/resources'

const useValidation = <RT extends ApiResourceStratigraphicUnitMediaObject>(
  item: MaybeRef<Partial<RT>>,
  emit: Function,
) => {
  const shallowItem = clone<RT>(item)
  const state = reactive(shallowItem)

  const rules = {
    file: {
      required: helpers.withMessage(FORM_REQUIRED_FIELD, required),
    },
    item: {
      required: helpers.withMessage(FORM_REQUIRED_FIELD, required),
    },
  }

  const v$ = useVuelidate(rules, state, {
    $autoDirty: true,
  })

  useEmitValidationInvalid(v$, emit)

  return { state, v$ }
}

export default useValidation
