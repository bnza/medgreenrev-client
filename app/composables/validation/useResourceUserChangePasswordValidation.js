import useVuelidate from '@vuelidate/core'
import { required, sameAs, helpers, minLength } from '@vuelidate/validators'
import { FORM_REQUIRED_FIELD } from './messages.js'
import { useEmitValidationInvalid } from '~/composables/validation/useEmitValidationInvalid.js'

const containsDigit = (value) => Boolean(value.match(/\d/))
const containsUpperCase = (value) => Boolean(value.match(/[A-Z]/))
const containsLowerCase = (value) => Boolean(value.match(/[a-z]/))
const containsNotAlphanumeric = (value) => Boolean(value.match(/[!@#$%^&*()]/))

export default function (item, emit) {
  const shallowItem = JSON.parse(JSON.stringify(unref(item)))
  const state = reactive(shallowItem)

  const rules = {
    oldPassword: {
      required: helpers.withMessage(FORM_REQUIRED_FIELD, required),
    },
    newPassword: {
      required: helpers.withMessage(FORM_REQUIRED_FIELD, required),
      minLength: minLength(8),
      containsDigit: helpers.withMessage(
        'New password must contains at least a digit.',
        containsDigit,
      ),
      containsLowerCase: helpers.withMessage(
        'New password must contains at least an lowercase character.',
        containsLowerCase,
      ),
      containsUpperCase: helpers.withMessage(
        'New password must contains at least a uppercase character.',
        containsUpperCase,
      ),
      containsNotAlphanumeric: helpers.withMessage(
        'New password must contains at least one of the following characters ! @ # $ % ^ & * ( ).',
        containsNotAlphanumeric,
      ),
    },
    repeatPassword: {
      required: helpers.withMessage(FORM_REQUIRED_FIELD, required),
      sameAs: helpers.withMessage(
        'Passwords do not match',
        sameAs(computed(() => state.newPassword)),
      ),
    },
  }

  const v$ = useVuelidate(rules, state)

  useEmitValidationInvalid(v$, emit)

  return { state, v$ }
}
