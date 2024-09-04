export default function (mode: ApiAction, submitFn: Function) {
  const router = useRouter()
  const { show } = useAppSnackbarState()
  const isSubmitPending = ref(false)

  const showError = (e: Error) => {
    let text: string = e.message
    let response:
      | {
          status: number
          _data?: {
            '@type'?: string
            violations: Array<{ message: string }>
          }
        }
      | undefined = e.response

    if (
      response.status === 422 &&
      '@type' in response._data &&
      response._data['@type'] === 'ConstraintViolationList'
    ) {
      text = response._data.violations.reduce(
        (
          acc: string,
          curr: {
            message: string
          },
          i: number,
        ) => (acc += (i > 0 ? ',' : '') + curr.message),
        '',
      )
    }
    show({
      color: 'error',
      text,
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
    redirect = true,
    redirectToCollection = false,
    reThrow = false,
  }: {
    state: Record<string, any>
    oldItem?: Record<string, any>
    redirect?: boolean
    redirectToCollection?: boolean
    reThrow?: boolean
  }) => {
    isSubmitPending.value = true
    try {
      const { response, redirectPath } = await submitFn({
        newItem: state,
        oldItem,
        redirectToCollection,
      })
      if (redirect) {
        await router.replace(redirectPath)
      }
      mode === 'update' && response === 'NO__CHANGE'
        ? showNoChanges()
        : showSuccess()
    } catch (e) {
      isSubmitPending.value = false
      showError(e)
      if (reThrow) {
        throw e
      }
    } finally {
      triggerSubmit.value = false
    }
  }

  return { submit, triggerSubmit, isSubmitPending }
}
