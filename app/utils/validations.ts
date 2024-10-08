export const required = (value: string | undefined) =>
  Boolean(value) || 'This field is required'

export const email = (value: string) =>
  /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) || `Invalid email`
export const maxLength = (maxLength: number) => (value: string) =>
  value.length <= Math.round(maxLength) ||
  `Must be less than ${Math.round(maxLength)} characters`

export const minLength = (minLength: number) => (value: string) =>
  value.length >= Math.round(minLength) ||
  `Must be more than ${Math.round(minLength)} characters`
export const isInteger = (value: unknown) =>
  Number.isInteger(Number(value)) || `Must be an integer number`
export const greaterThan = (constraint: number) => (value: number) =>
  value > constraint || `Must be greater than ${Math.round(constraint)}`

export const greaterThanOrEqual = (constraint: number) => (value: number) =>
  value >= constraint ||
  `Must be greater than or equal to ${Math.round(constraint)}`

export const lessThan = (constraint: number) => (value: number) =>
  value < constraint || `Must be less than ${Math.round(constraint)}`

export const lessThanOrEqual = (constraint: number) => (value: number) =>
  value <= constraint ||
  `Must be less than or equal to ${Math.round(constraint)}`

export const containsDigit = (value: string) =>
  /\d/.test(value) || 'Must contain at least a digit'
export const containsUpperCase = (value: string) =>
  /[A-Z]/.test(value) || 'Must contain at least an uppercase character'
export const containsLowerCase = (value: string) =>
  /[a-z]/.test(value) || 'Must contain at least a lowercase character'
export const containsNotAlphanumeric = (value: string) =>
  /[!@#$%^&*()]/.test(value) ||
  'Must contain at least one of the following characters ! @ # $ % ^ & * ( )'

export const sameAs =
  <T extends Record<string, unknown>>(
    prop1: keyof T,
    prop2: keyof T,
    message?: string,
  ) =>
  (state: T) =>
    state[prop1] === state[prop2] ||
    message ||
    `Properties ${String(prop1)} and ${String(prop2)} does not match`
export const validateState =
  <T extends Record<string, unknown>>(
    prop: keyof T,
    fn: (...args: any[]) => true | string,
  ) =>
  (state: T) =>
    fn(state[prop])

export const each =
  (fn: (...args: any[]) => true | string) => (value: any[]) =>
    value.length > 0
      ? value.reduce((acc, curr) => {
          if ('string' === typeof acc) {
            return acc
          }
          return fn(curr)
        }, true)
      : 'This field is required'
