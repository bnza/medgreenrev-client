import type { ResourceKey, ResourcePageKey } from '~~/types'

export * from './constants'

export const getResourceKey = (resourcePageKey: ResourcePageKey): ResourceKey =>
  resourcePageKey.replace(/\/.+/, '') as ResourceKey

export const isPlainObject = (val: unknown): val is Record<any, any> =>
  !!val && typeof val === 'object' && val.constructor === Object
