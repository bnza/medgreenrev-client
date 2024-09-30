import data from './data'
import vocabularies from './vocabularies'
import type { ResourceKey } from '~~/types'

const normalizePostItem = (item: Record<string, any>): Record<string, any> =>
  clone(item)

const normalizePatchItem = (
  newItem: Record<string, any>,
  oldItem: Record<string, any>,
  diffItem: Record<string, any>,
): Record<string, any> => diffItem

const resources = Object.freeze(Object.assign({}, data, vocabularies))

export const resourceDataKeys = Object.freeze(Object.keys(data))
export const resourceKeys = Object.freeze(Object.keys(resources))
export const getResourceConfig = (key: ResourceKey) =>
  Object.assign(
    {
      normalizePostItem,
      normalizePatchItem,
    },
    data[key],
  )
export default resources
