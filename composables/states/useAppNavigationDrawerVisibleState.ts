export const useAppNavigationDrawerVisibleState = () => {
  const visible: Ref<boolean> = useState(
    STATE_APP_NAVIGATION_DRAWER_VISIBLE,
    () => false,
  )
  const toggle = () => (visible.value = !visible.value)
  return { visible, toggle }
}
