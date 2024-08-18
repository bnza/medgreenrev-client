import qs from 'qs'
import FetchFactory from '~/repository/FetchFactory'

class ApiAutocomplete<T = any> extends FetchFactory<T> {
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

export default ApiAutocomplete
