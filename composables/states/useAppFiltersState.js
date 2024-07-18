import { ResourceFiltersMap } from '~/lib/filters/ResourceFiltersMap.js'
import { AppFilterMap } from '~/lib/filter/AppFilterMap.js'

export const useAppFiltersState = () => {
  const state = useState(STATE_APP_FILTER, () => new AppFilterMap())
  const getFilters = (path) => {
    if (!state.value.has(path)) {
      state.value.set(path, new ResourceFiltersMap())
    }
    return state.value.get(path)
  }

  return { getFilters }
}
