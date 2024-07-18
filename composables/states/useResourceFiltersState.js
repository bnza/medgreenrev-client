import { useAppFiltersState } from '~/composables/states/useAppFiltersState.js'

export const useResourceFiltersState = (path) => {
  const { getFilters } = useAppFiltersState()
  const filters = getFilters(path)
  const isEmpty = computed(() => filters.size === 0)
  return { filters, isEmpty }
}
