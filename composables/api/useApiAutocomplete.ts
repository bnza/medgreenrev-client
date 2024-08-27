import { useFetchOptions } from '~/composables/api/useFetchOptions'
import AutocompleteRepository from '~/repository/AutocompleteRepository'

export function useApiValidator() {
  const fetchOptions = useFetchOptions()
  const apiFetcher = $fetch.create(fetchOptions)
  return new AutocompleteRepository(apiFetcher)
}

export default useApiValidator
