import type { Filter } from '~/lib/constants/filters'

export type ResourceFiltersState = {
  routeName: string
  filters: Array<Filter>
}
type AppFilterState = Record<string, ResourceFiltersState> | {}
export const useAppFiltersState = () => {
  const state: Ref<AppFilterState> = useState(
    STATE_APP_FILTER,
    () => new Object(),
  )
  const initResourceFilters = (routeName: string) => {
    state.value[routeName] = {
      routeName,
      filters: [],
    }
  }
  const getResourceFiltersByRouteName = (
    routeName: string,
  ): ResourceFiltersState => {
    if (!(routeName in state.value)) {
      initResourceFilters(routeName)
    }
    return state.value[routeName]
  }

  const getResourceFilters = (routeName: string) =>
    computed(() => {
      console.log(routeName)
      return getResourceFiltersByRouteName(routeName)
    })

  return { getResourceFilters }
}
