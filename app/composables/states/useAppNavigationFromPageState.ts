import {
  type ResourcePageState,
  useAppResourcePageState,
} from '~/composables/states/useAppResourcePageState'

export const useAppNavigationFromPageState = (
  resourcePageKey?: ResourcePageKey,
) => {
  const previous: Ref<MaybeResourcePageKey> = useState(
    STATE_APP_NAVIGATION_PREVIOUS_PAGE_KEY,
    () => '',
  )
  if (resourcePageKey) {
    useAppResourcePageState(resourcePageKey).resourcePageState.from = [
      useRoute().fullPath,
      previous.value,
    ]
    previous.value = resourcePageKey
  }

  const {
    resourcePageState,
  }: {
    resourcePageState: Pick<ResourcePageState, 'from'>
  } = previous.value
    ? useAppResourcePageState(previous.value)
    : { resourcePageState: { from: ['/', ''] } }

  const from = computed(() => resourcePageState.from[0])

  const { push: routerPush, replace: routerReplace } = useRouter()

  const push = async (replace = false) => {
    const fn = replace ? routerReplace : routerPush
    return fn(from.value).then(() => {
      previous.value = resourcePageState ? resourcePageState.from[1] : ''
    })
  }

  return { from, push }
}
