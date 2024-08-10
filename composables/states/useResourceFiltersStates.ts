import {
  type ResourceFiltersState,
  useAppFiltersState,
} from '~/composables/states/useAppFiltersState'
import { getAvailableOperators, getAvailableProps } from '~/lib/filters'
import type { Filter } from '~/lib/constants/filters'
import type { MaybeRef } from 'vue'
import { diff } from 'deep-object-diff'

export const useResourceFiltersState = ({
  routeName = '',
  resourceConfig = {},
}: {
  routeName: string
  resourceConfig: Record<string, any>
}) => {
  if (!routeName) {
    console.error('route name is required')
    return {}
  }

  const isAddFilterDialogOpen = ref(false)

  const { getResourceFilters } = useAppFiltersState()

  const resourceFiltersState = getResourceFilters(routeName)

  const workData: ResourceFiltersState = reactive(
    structuredClone(toRaw(resourceFiltersState.value)),
  )

  const isFiltered = computed(() =>
    Boolean(resourceFiltersState.value.filters.length),
  )

  const isEmpty = computed(() => workData.filters.length === 0)

  const availableProps = computed(() => getAvailableProps(workData))

  const isChanged = computed(() => {
    const diffObj = diff(filters.value, resourceFiltersState.value.filters)
    return !Boolean(Object.keys(diffObj).length === 0)
  })

  const getAvailableOperatorsByProp = (prop: MaybeRef<string>) =>
    computed(() => getAvailableOperators(workData, unref(prop)))

  const filters = computed(() => workData.filters)

  const setFilter = (filter: Filter) => {
    filter = structuredClone(toRaw(filter))
    const index = workData.filters.findIndex(
      (currFilter) => currFilter.id === filter.id,
    )
    if (index > -1) {
      workData.filters[index] = filter
      return
    }
    workData.filters.push(filter)
  }

  const removeFilter = (filter: Filter) => {
    workData.filters = reactive(
      workData.filters.filter((currFilter) => filter.id !== currFilter.id),
    )
  }

  const clearFilters = () => {
    workData.filters = []
  }

  const persistFilters = () => {
    resourceFiltersState.value.filters = structuredClone(
      toRaw(workData.filters.map(toRaw)),
    )
  }

  const resourceFilterParams = computed(() => {
    const obj = {}
    for (const filter of resourceFiltersState.value.filters) {
      API_FILTERS[filter.filter].addToObject(obj, filter)
    }
    return obj
  })

  const setFilterAndCloseDialog = (filter: Filter) => {
    setFilter(filter)
    isAddFilterDialogOpen.value = false
  }

  const router = useRouter()
  const setFiltersAndClose = () => {
    persistFilters()
    if (history.state.back) {
      return router.replace(history.state.back)
    }
    return router.replace(resourceConfig.appPath)
  }
  return {
    filters,
    isAddFilterDialogOpen,
    getAvailableOperatorsByProp,
    removeFilter,
    setFilter,
    setFilterAndCloseDialog,
    persistFilters,
    setFiltersAndClose,
    isEmpty,
    isChanged,
    isFiltered,
    clearFilters,
    availableProps,
    resourceFilterParams,
  }
}
