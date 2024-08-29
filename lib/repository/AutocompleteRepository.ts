import AbstractRepository from '~/lib/repository/AbstractRepository'
import qs from 'qs'

class AutocompleteRepository extends AbstractRepository {
  async search<ResponseType = unknown>(
    path: string,
    params: MaybeRef<Record<string, any>>,
    authorizedOnly: boolean = false,
  ) {
    params = unref(params)
    const query = Object.keys(params).length === 0 ? '' : qs.stringify(params)
    const url = authorizedOnly
      ? `/autocomplete/${unref(path)}/authorized?${query}`
      : `/autocomplete/${unref(path)}?${query}`
    return this.$fetch<Array<ResponseType>>(url)
  }
}

export default AutocompleteRepository
