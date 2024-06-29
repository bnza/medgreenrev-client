export default function (mode, submitFn, redirectBasePath) {
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

  const showSuccess = (action) => {
    show({
      color: 'success',
      text: `Successfully ${action}d resource`,
      timeout: 3000,
    })
  }

  const unsetPendingState = () => {
    isSubmitPending.value = false
  }

  const setSubmitFn = () => {
    async function submitPatch(state, oldItem) {
      try {
        await submitFn(state, oldItem).finally(unsetPendingState)
        await router.replace(`${redirectBasePath}/${state.id}`)
        showSuccess(mode)
      } catch (e) {
        showError(e)
      }
    }

    async function submitPost(state) {
      try {
        const newItem = await submitFn(state).finally(unsetPendingState)
        await router.replace(`${redirectBasePath}/${newItem?.id}`)
        showSuccess(mode)
      } catch (e) {
        showError(e)
      }
    }

    async function submitDelete(state) {
      try {
        await submitFn(state).finally(unsetPendingState)
        await router.replace(redirectBasePath)
        showSuccess(mode)
      } catch (e) {
        showError(e)
      }
    }

    const submitFns = {
      [API_ACTIONS.Create]: submitPost,
      [API_ACTIONS.Update]: submitPatch,
      [API_ACTIONS.Delete]: submitDelete,
    }

    if ((!mode) in submitFns) {
      throw new Error(`Unsupported action "${mode}"`)
    }
    return submitFns[mode]
  }

  const submit = ref(setSubmitFn())

  return { submit, isSubmitPending }
}
