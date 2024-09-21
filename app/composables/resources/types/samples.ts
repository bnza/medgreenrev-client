import { getResourceIri } from '~/lib'

export default function (): UseResourceTypeOptions {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBaseURL
  const defaultHeaders: ReadonlyHeaders = [
    {
      key: 'id',
      value: 'id',
      title: 'ID',
      align: 'center',
      width: '200',
      maxWidth: '200',
    },
    {
      key: 'stratigraphicUnit.site.code',
      value: 'stratigraphicUnit.site.code',
      title: 'site',
      width: '200',
    },
    {
      sortable: false,
      key: 'stratigraphicUnit',
      value: 'stratigraphicUnit.code',
      title: 'SU',
      width: '200',
    },
    {
      key: 'stratigraphicUnit.year',
      value: 'stratigraphicUnit.year',
      title: 'year',
    },
    {
      key: 'number',
      value: 'number',
      title: 'number',
    },
    {
      key: 'description',
      value: 'description',
      title: 'description',
      sortable: false,
    },
  ]

  const formatJsonLdItem = (item: Record<string, any>) => {
    if (item?.stratigraphicUnit?.id) {
      item.stratigraphicUnit = getResourceIri(
        baseURL,
        'stratigraphicUnits',
        item.stratigraphicUnit.id,
      )
    }
    if (item?.number) {
      item.number = Number(item.number)
    }
    return item
  }

  return {
    formatJsonLdItem,
    defaultHeaders,
  }
}
