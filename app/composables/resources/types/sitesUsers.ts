import { getResourceIri } from '~/lib/resources'

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
      key: 'site.code',
      value: 'site.code',
      title: 'site',
      width: '200',
    },
    {
      key: 'user.email',
      value: 'user.email',
      title: 'user',
    },
    {
      key: 'privileges',
      value: 'privileges',
      title: 'privileges',
    },
  ]

  const formatJsonLdItem = (item: Record<string, any>) => {
    if (item?.site?.id) {
      item.site = getResourceIri(baseURL, 'sites', item.site.id)
    }
    if (item?.user?.id) {
      item.user = getResourceIri(baseURL, 'users', item.user.id)
    }
    if (item?.privileges) {
      item.privileges = Number(item.privileges)
    }
    return item
  }

  return {
    defaultHeaders,
    formatJsonLdItem,
  }
}
