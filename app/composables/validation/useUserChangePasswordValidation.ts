import {
  required,
  minLength,
  containsDigit,
  containsLowerCase,
  containsUpperCase,
  containsNotAlphanumeric,
  validateState,
  sameAs,
} from '~/utils/validations'
export default function <
  RT extends {
    oldPassword: string
    newPassword: string
    repeatPassword: string
  },
>() {
  return {
    oldPassword: [
      required,
      /*validateState<RT>('oldPassword', required)*/
    ],
    newPassword: [
      // validateState<RT>('newPassword', required),
      // validateState<RT>('newPassword', minLength(8)),
      // validateState<RT>('newPassword', containsDigit),
      // validateState<RT>('newPassword', containsLowerCase),
      // validateState<RT>('newPassword', containsUpperCase),
      // validateState<RT>('newPassword', containsNotAlphanumeric),
      required,
      minLength(8),
      containsDigit,
      containsLowerCase,
      containsUpperCase,
      containsNotAlphanumeric,
    ],
    repeatPassword: [
      validateState<RT>('repeatPassword', required),
      sameAs<RT>('newPassword', 'repeatPassword', 'Passwords does not match'),
    ],
  }
}
