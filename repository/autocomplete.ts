import qs from 'qs'
import FetchFactory from '~/repository/fetchFactory'
import type { MaybeRef } from 'vue'

class ApiAutocomplete extends FetchFactory {
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
