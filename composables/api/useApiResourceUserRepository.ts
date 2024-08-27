import { useFetchOptions } from '~/composables/api/useFetchOptions'
import UserRepository from '~/repository/UserRepository'

export function useApiResourceUserRepository() {
  const fetchOptions = useFetchOptions()
  const apiFetcher = $fetch.create(fetchOptions)
  return new UserRepository<ApiResourceUser>('users', apiFetcher)
}

export default useApiResourceUserRepository
