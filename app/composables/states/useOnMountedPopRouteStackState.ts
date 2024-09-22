import { useRouteStackState } from '~/composables/states/useRouteStackState'

export const useOnMountedPopRouteStackState = () => {
  const { push } = useRouteStackState()
  onMounted(() => {
    push()
  })
}
