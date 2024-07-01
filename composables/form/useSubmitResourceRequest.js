export default function (mode, submitFn) {
  const router = useRouter()
  const { show } = useAppSnackbarState()
  const isSubmitPending = ref(false)

  const showError = (e) => {
    show({
      color: 'error',
      text: e.message,
      timeout: -1,
    })
  }

  const showSuccess = () => {
    show({
      color: 'success',
      text: `Successfully ${mode}d resource`,
      timeout: 3000,
    })
  }

  const submit = async (state, oldItem) => {
    isSubmitPending.value = true
    try {
      const { redirectPath } = await submitFn(state, oldItem)
      await router.replace(redirectPath)
      showSuccess()
    } catch (e) {
      showError(e)
      isSubmitPending.value = false
    }
  }

  return { submit, isSubmitPending }
}
