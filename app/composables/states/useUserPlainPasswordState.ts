export default function () {
  const state: Ref<string> = useState(States.UserPlainPassword, () => '')

  return { plainPassword: state }
}
