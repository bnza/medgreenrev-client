import { diff } from 'deep-object-diff'
import type { ResourceConfig } from '~~/types'
export default function (resourceConfig: ResourceConfig) {
  return (newItem: Record<string, any>, oldItem: Record<string, any>) => {
    const diffItem = diff(oldItem, newItem)
    return resourceConfig.normalizePostItem(
      resourceConfig.normalizePatchItem(newItem, oldItem, diffItem),
    )
  }
}
