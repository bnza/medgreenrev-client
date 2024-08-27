import { useFetchOptions } from '~/composables/api/useFetchOptions'
import ValidatorRepository from '~/repository/ValidatorRepository'

export function useApiValidator() {
  const fetchOptions = useFetchOptions()
  const apiFetcher = $fetch.create(fetchOptions)
  return new ValidatorRepository(apiFetcher)
}

export default useApiValidator
