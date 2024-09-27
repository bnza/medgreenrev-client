export default function () {
  const visible = useState(States.AppNavigationDrawerVisible, () => false)
  const toggle = () => (visible.value = !visible.value)
  return { visible, toggle }
}
