import type {
  OptionalResourceNormalizers,
  ResourceKey,
  ResourceNormalizers,
} from '~~/types'
import useApiResourcesIndexState from '~/composables/states/useApiResourcesIndexState'

const normalizePostItem = (item: Record<string, any>): Record<string, any> =>
  clone(item)

const normalizePatchItem = (
  newItem: Record<string, any>,
  oldItem: Record<string, any>,
  diffItem: Record<string, any>,
): Record<string, any> => diffItem
export default function () {
  const { getResourceIri } = useApiResourcesIndexState()
  const normalizers: Partial<Record<ResourceKey, OptionalResourceNormalizers>> =
    {
      stratigraphicUnit: {
        normalizePostItem: (item) => {
          item = clone(item)
          if (item?.site?.id) {
            item.site = getResourceIri('site', item.site.id)
          }
          if (item?.year) {
            item.year = Number(item.year)
          }
          if (item?.number) {
            item.number = Number(item.number)
          }
          return item
        },
      },
    }

  return function (key: ResourceKey): ResourceNormalizers {
    let _return = {
      normalizePostItem,
      normalizePatchItem,
    }
    if (key in normalizers) {
      _return = Object.assign(_return, normalizers[key])
    }
    return _return
  }
}
