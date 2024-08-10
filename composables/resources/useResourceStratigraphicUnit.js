import useResource from './useResource'
import { getResourceIri } from '~/lib/index.js'
import useResourceRouteName from '~/composables/resources/useResourceRouteName.ts'

export default function (routeName = '', parent) {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBaseURL
  const defaultHeaders = [
    {
      key: 'id',
      value: 'id',
      title: 'ID',
      align: 'center',
      width: '200',
      maxWidth: '200',
    },
    {
      key: 'code',
      value: 'code',
      title: 'code',
      width: '200',
      sortable: false,
    },
    {
      key: 'number',
      value: 'number',
      title: 'number',
    },
    {
      key: 'year',
      value: 'year',
      title: 'year',
    },
    {
      key: 'interpretation',
      value: 'interpretation',
      title: 'interpretation',
      sortable: false,
    },
    {
      key: 'description',
      value: 'description',
      title: 'description',
      sortable: false,
    },
    {
      key: 'public',
      value: 'public',
      title: 'public',
      sortable: false,
    },
  ]

  const { routeName: resourcePageKey } = useResourceRouteName(routeName, parent)

  const protectedFields = ['public']

  const formatJsonLdItem = (item) => {
    if (item?.site?.id) {
      item.site = getResourceIri(baseURL, 'sites', item.site.id)
    }
    if (item?.year) {
      item.year = Number(item.year)
    }
    if (item?.number) {
      item.number = Number(item.number)
    }
    return item
  }

  return useResource({
    resourceKey: 'stratigraphicUnits',
    resourcePageKey,
    defaultHeaders,
    protectedFields,
    formatJsonLdItem,
  })
}
