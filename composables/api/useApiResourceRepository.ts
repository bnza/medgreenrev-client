import { useFetchOptions } from '~/composables/api/useFetchOptions'
import ResourceRepository from '~/repository/ResourceRepository'

export function useApiResourceRepository<RT extends ApiResources>(
  resourceKey: ResourceKey,
) {
  const fetchOptions = useFetchOptions()
  const apiFetcher = $fetch.create(fetchOptions)
  return new ResourceRepository<RT>(resourceKey, apiFetcher)
}

export default useApiResourceRepository
