import useVuelidate from '@vuelidate/core'
import {
  required,
  maxLength,
  minLength,
  email,
  helpers
} from '@vuelidate/validators'
import {FORM_REQUIRED_FIELD} from './messages'
import {
  useAsyncUniqueValidator
} from '~/composables/validation/useAsyncUniqueValidator'
import {
  useEmitValidationInvalid
} from '~/composables/validation/useEmitValidationInvalid'

export function useResourceUserValidation(item, emit) {
  const shallowItem = JSON.parse(JSON.stringify(item?.value))
  const state = reactive(shallowItem)

  const rules = {
    email: {
      required: helpers.withMessage(FORM_REQUIRED_FIELD, required),
      email: email,
      unique: useAsyncUniqueValidator('unique', 'email', 'user/email', item),
    },
  }

  const v$ = useVuelidate(rules, state)

  useEmitValidationInvalid(v$, emit)

  onMounted(() => {
    emit('validationReady', {state, v$})
  })

  return {state, v$}
}
