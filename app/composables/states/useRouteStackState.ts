type RouteStackItem = [string, string, boolean] //[path, fullPath, fromItem]
enum RouteStackIndex {
  Path,
  FullPath,
  FromItem,
}

export const useRouteStackState = () => {
  const state: Ref<Array<RouteStackItem>> = useState(
    STATE_ROUTE_STACK,
    () => [],
  )
  const route = useRoute()

  const fromItem = computed({
    get() {
      return _last(RouteStackIndex.FromItem)
    },
    set(flag) {
      const len = state.value.length
      if (len > 0) {
        // @ts-ignore
        state.value[len - 1][RouteStackIndex.FromItem] = flag
      }
      console.log('FROMITEM: ', state.value)
    },
  })

  function push() {
    if (_last(RouteStackIndex.Path) !== route.path) {
      state.value.push([route.path, route.fullPath, false])
      console.log('PUSHED:', route.fullPath)
    }
    console.log(':PUSHED')
  }

  function pop() {
    let _l = state.value.pop()
    console.log('POPPED:', _l[RouteStackIndex.FullPath])
    console.log('RETURN:', last.value)
    return last.value
  }

  const _last = (index: RouteStackIndex) =>
    (state.value.length
      ? state.value[state.value.length - 1]
      : ['/', '/', false])[index]

  const last: ComputedRef<string> = computed(
    () => _last(RouteStackIndex.FullPath) as string,
  )

  // const isLastItemPage = computed(() =>
  //   /\/([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}|\d+)$/.test(
  //     _last(RouteStackIndex.Path),
  //   ),
  // )

  return { fromItem, last, push, pop }
}
