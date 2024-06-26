export default function (mode, getResourceActionFn, redirectBasePath) {
  const router = useRouter()
  const { show } = useAppSnackbarState()
  const isSubmitPending = ref(false)

  let submit = ref((item = null) => {
    console.error('Submit function is not set yet!')
  })

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

  const resourceActionFn = getResourceActionFn(mode)

  const setSubmitFn = ({ state, v$ }) => {
    async function submitPatch(oldItem) {
      const valid = await v$.value.$validate()
      if (valid) {
        isSubmitPending.value = true
        try {
          await resourceActionFn(state, oldItem).finally(unsetPendingState)
          await router.replace(`${redirectBasePath}/${state.id}`)
          showSuccess(mode)
        } catch (e) {
          showError(e)
        }
      }
    }

    async function submitPost() {
      const valid = await v$.value.$validate()
      if (valid) {
        try {
          const newItem =
            await resourceActionFn(state).finally(unsetPendingState)
          await router.replace(`${redirectBasePath}/${newItem?.id}`)
          showSuccess(mode)
        } catch (e) {
          showError(e)
        }
      }
    }

    async function submitDelete() {
      const valid = await v$.value.$validate()
      if (valid) {
        try {
          await resourceActionFn(state).finally(unsetPendingState)
          await router.replace(redirectBasePath)
          showSuccess(mode)
        } catch (e) {
          showError(e)
        }
      }
    }

    const submitFns = {
      [API_ACTIONS.Create]: submitPost,
      [API_ACTIONS.Update]: submitPatch,
      [API_ACTIONS.Delete]: submitDelete,
    }

    const _getSubmitFn = () => {
      if ((!mode) in submitFns) {
        throw new Error(`Unsupported action "${mode}"`)
      }
      return submitFns[mode]
    }

    submit.value = _getSubmitFn()
  }

  return { submit, isSubmitPending, setSubmitFn }
}
