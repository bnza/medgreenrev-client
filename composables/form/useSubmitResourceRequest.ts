export default function (mode: ApiAction, submitFn: Function) {
  const router = useRouter()
  const { show } = useAppSnackbarState()
  const isSubmitPending = ref(false)

  const showError = (e: Error) => {
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
  const submit = async ({
    state,
    oldItem,
    redirectToCollection = false,
  }: {
    state: Record<string, any>
    oldItem?: Record<string, any>
    redirectToCollection?: boolean
  }) => {
    isSubmitPending.value = true
    try {
      const { response, redirectPath } = await submitFn({
        newItem: state,
        oldItem,
        redirectToCollection,
      })
      await router.replace(redirectPath)
      mode === 'update' && response === 'NO__CHANGE'
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
