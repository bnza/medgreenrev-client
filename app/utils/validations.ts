export const required = (value: string | undefined) =>
  Boolean(value) || 'This field is required'

export const email = (value: string) =>
  /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) || `Invalid email`
export const maxLength = (maxLength: number) => (value: string) =>
  value.length <= Math.round(maxLength) ||
  `Must be less than ${Math.round(maxLength)} characters`

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

export const validateState =
  <T extends Record<string, unknown>>(
    prop: keyof T,
    fn: (...args: any[]) => true | string,
  ) =>
  (state: T) =>
    fn(state[prop])
