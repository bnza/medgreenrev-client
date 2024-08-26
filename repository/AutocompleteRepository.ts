import AbstractRepository from '~/repository/AbstractRepository'
import qs from 'qs'

class AutocompleteRepository<
  RT extends ApiResourceItem<ApiId>,
> extends AbstractRepository<RT> {
  async search(
    path: string,
    params: MaybeRef<Record<string, any>>,
    authorizedOnly: boolean = false,
  ): Promise<Array<Record<string, string | number>>> {
    params = unref(params)
    const query = Object.keys(params).length === 0 ? '' : qs.stringify(params)
    const url = authorizedOnly
      ? `/autocomplete/${unref(path)}/authorized?${query}`
      : `/autocomplete/${unref(path)}?${query}`
    return this.$fetch(url)
  }
}

export default AutocompleteRepository
