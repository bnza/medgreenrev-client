import qs from 'qs'
import FetchFactory from '~/repository/FetchFactory'

class ApiAutocomplete<T = any> extends FetchFactory<T> {
  async search(
    path: string,
    params: MaybeRef<Record<string, any>>,
  ): Promise<Array<Record<string, string | number>>> {
    params = unref(params)
    const query = Object.keys(params).length === 0 ? '' : qs.stringify(params)
    return this.$fetch(`/autocomplete/${unref(path)}?${query}`)
  }
}

export default ApiAutocomplete
