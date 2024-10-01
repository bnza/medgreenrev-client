import data from './data'
import vocabularies from './vocabularies'
import type { ResourceKey, StaticResourceConfig } from '~~/types'

const resources = Object.freeze(Object.assign({}, data, vocabularies))

export const getResourceStaticConfig = (
  key: ResourceKey,
): StaticResourceConfig => Object.assign({}, data[key])
export default resources
