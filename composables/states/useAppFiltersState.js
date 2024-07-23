export const useAppFiltersState = () => {
  const state = useState(STATE_APP_FILTER, () => new Object())
  const initResourceFilters = (routeName) => {
    state.value[routeName] = {
      routeName,
      filters: [],
    }
    // state.value.set(routeName, new ResourceFiltersMap(routeName))
  }
  const getResourceFiltersByRouteName = (routeName) => {
    if (!(routeName in state.value)) {
      initResourceFilters(routeName)
    }
    return state.value[routeName]
  }

  const getResourceFilters = (routeName) =>
    computed(() => getResourceFiltersByRouteName(routeName))

  return { getResourceFilters }
}
