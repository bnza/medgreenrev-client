export const isPlainObject = (val: unknown): val is Record<any, any> =>
  !!val && typeof val === 'object' && val.constructor === Object
