export const required = (value: string | undefined) =>
  Boolean(value) || 'This field is required'

export const maxLength = (maxLength: number) => (value: string) =>
  value.length <= Math.round(maxLength) ||
  `Must be less than ${Math.round(maxLength)} characters`
