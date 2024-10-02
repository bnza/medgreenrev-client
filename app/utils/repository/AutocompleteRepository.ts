import type { $Fetch } from 'nitropack'
import AbstractRepository from './AbstractRepository'
import qs from 'qs'

class AutocompleteRepository extends AbstractRepository {
  constructor($fetch: $Fetch) {
    super($fetch)
  }
  async search<ResponseType = unknown>(
    path: string,
    params: Record<string, any>,
    authorizedOnly: boolean = false,
  ) {
    const query = Object.keys(params).length === 0 ? '' : qs.stringify(params)
    const url = authorizedOnly
      ? `/api/autocomplete/${unref(path)}/authorized?${query}`
      : `/api/autocomplete/${unref(path)}?${query}`
    return this.$fetch<Array<ResponseType>>(url)
  }
}

export default AutocompleteRepository
