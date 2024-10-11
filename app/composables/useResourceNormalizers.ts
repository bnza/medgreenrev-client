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
      pottery: {
        normalizePostItem: (item) => {
          item = clone(item)

          if (item?.number) {
            item.number = Number(item.number)
          }
          if (item?.fragmentsNumber) {
            item.fragmentsNumber = Number(item.fragmentsNumber)
          }
          if (item?.stratigraphicUnit?.id) {
            item.stratigraphicUnit = getResourceIri(
              'stratigraphicUnit',
              item.stratigraphicUnit.id,
            )
          }
          return item
        },
      },
      sitesUser: {
        normalizePostItem: (item) => {
          item = clone(item)
          if (item.site?.id) {
            item.site = getResourceIri('site', item.site.id)
          }
          if (item.user?.id) {
            item.user = getResourceIri('user', item.user.id)
          }
          if (item.privileges) {
            item.privileges = Number(item.privileges)
          }
          return item
        },
      },
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
      stratigraphicUnitsMediaObject: {
        normalizePostItem: (item) => {
          item = clone(item)
          if ('item' in item && 'id' in item.item) {
            item.item = getResourceIri(
              'stratigraphicUnit',
              Number(item.item.id),
            )
          }
          return item
        },
      },
      user: {
        normalizePatchItem: (newItem, oldItem, diffItem) => {
          if (diffItem.roles) {
            diffItem.roles = newItem.roles
          }
          return diffItem
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
