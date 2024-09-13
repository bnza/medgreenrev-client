import { getResourceIri } from '~/lib'
import type { ReadonlyHeaders } from '~/lib/constants/vuetify'

export default function (): UseResourceTypeOptions {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBaseURL
  const defaultHeaders: ReadonlyHeaders = []

  const formatJsonLdItem = (item: FormData) => {
    if (item.has('item')) {
      const id = Number.parseInt(<string>item.get('item'))
      //item.set('item', '/api/stratigraphic_units/' + id)
      item.set('item', getResourceIri(baseURL, 'stratigraphicUnits', id))
    }
    return item
  }
  return {
    defaultHeaders,
    formatJsonLdItem,
  }
}
