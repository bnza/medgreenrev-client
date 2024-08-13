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

  const showNoChanges = () => {
    show({
      color: 'info',
      text: 'No changes occurred',
      timeout: 3000,
    })
  }

  const triggerSubmit = ref(false)
  const submit = async (state, oldItem, redirectToCollection = false) => {
    isSubmitPending.value = true
    try {
      const { response, redirectPath } = await submitFn(
        state,
        oldItem,
        redirectToCollection,
      )
      await router.replace(redirectPath)
      mode === API_ACTIONS.Update && response === 'NO__CHANGE'
        ? showNoChanges()
        : showSuccess()
    } catch (e) {
      isSubmitPending.value = false
      showError(e)
    } finally {
      triggerSubmit.value = false
    }
  }

  return { submit, triggerSubmit, isSubmitPending }
}
