import type { ApiAction, ResourceConfig } from '~~/types'

/**
 * State must be set ONLY from item READ -> to item DELETE (ex. using NavigationResourceItemDelete
 * In fact after item deletion cannot navigate to item READ which is the default behaviour
 *
 */
export default function (
  currentPageMode: ApiAction,
  resourceConfig: ResourceConfig,
) {
  const state = useState(States.NavigationFrom, () => '')

  const set = () =>
    (state.value = history.state?.back || resourceConfig.appPath)
  const from = computed(
    () => state.value || history.state?.back || resourceConfig.appPath,
  )
  onBeforeRouteLeave(() => {
    if (currentPageMode === 'delete') {
      state.value = ''
    }
  })
  return { set, from }
}
