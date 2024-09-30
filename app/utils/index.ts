import type { ResourceKey, ResourcePageKey } from '~~/types'
import { default as resources } from '~/utils/constants/resources'

export * from './constants'

export const getResourceKey = (resourcePageKey: ResourcePageKey): ResourceKey =>
  resourcePageKey.replace(/\/.+/, '') as ResourceKey

export const isPlainObject = (val: unknown): val is Record<any, any> =>
  !!val && typeof val === 'object' && val.constructor === Object

export const isResourceKey = (key: string): key is ResourceKey =>
  key in resources

export const routeParamIdToString = (id: string | Array<string>) =>
  Array.isArray(id) ? id[0] : id

export const routeParamId = (id: string | Array<string>) => {
  const _id = routeParamIdToString(id)
  return Number.isNaN(_id) ? _id : parseInt(_id)
}
export const clone = <T extends Record<string, any>>(item: MaybeRef<T>): T =>
  JSON.parse(JSON.stringify(unref(item)))
