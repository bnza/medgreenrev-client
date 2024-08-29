export function useApiResourceRepository<RT extends ApiResources>(
  resourceKey: ResourceKey,
) {
  return useNuxtApp().$api.getRepository<RT>(resourceKey)
}

export default useApiResourceRepository
