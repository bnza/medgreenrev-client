import { getResourceIri } from '~/lib'
import type { ReadonlyHeaders } from '~/lib/constants/vuetify'
import { getVocabularyIri } from '~/lib/resources'

export default function (): UseResourceTypeOptions {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBaseURL
  const defaultHeaders: ReadonlyHeaders = []

  const formatJsonLdItem = (item: Record<string, any>) => {
    if (item?.sxSU?.id) {
      item.sxSU = getResourceIri(baseURL, 'stratigraphicUnits', item.sxSU.id)
    }
    if (item?.dxSU?.id) {
      item.dxSU = getResourceIri(baseURL, 'stratigraphicUnits', item.dxSU.id)
    }
    if (item?.relationship && item?.relationship?.length === 1) {
      item.relationship = getVocabularyIri(
        baseURL,
        'vocabulary/stratigraphicUnits/relationship',
        item.relationship,
      )
    }
    return item
  }
  return {
    defaultHeaders,
    formatJsonLdItem,
  }
}
