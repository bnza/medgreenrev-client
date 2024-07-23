import { ResourceFiltersMap } from '~/lib/filters/ResourceFiltersMap.js'
import { AppFilterMap } from '~/lib/filters/AppFilterMap.js'

export const useAppFiltersState = () => {
  const state = useState(STATE_APP_FILTER, () => new AppFilterMap())
  const initResourceFilters = (routeName) => {
    state.value.set(routeName, new ResourceFiltersMap(routeName))
  }
  const getResourceFilters = (routeName) => {
    if (!state.value.has(routeName)) {
      initResourceFilters(routeName)
    }
    return state.value.get(routeName)
  }

  return { getResourceFilters }
}
