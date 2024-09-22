import { useRouteStackState } from '~/composables/states/useRouteStackState'

export default function (mode: ApiAction, submitFn: Function) {
  const router = useRouter()
  const { show, showError } = useAppSnackbarState()
  const { pop, fromItem, last } = useRouteStackState()
  const isSubmitPending = ref(false)

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
    redirectTo = '@back',
    reThrow = false,
  }: {
    state: Record<string, any>
    oldItem?: Record<string, any>
    redirectTo?: '@collection' | '@back' | '@item' | string
    reThrow?: boolean
  }) => {
    isSubmitPending.value = true
    try {
      const { response, redirectPath } = await submitFn({
        newItem: state,
        oldItem,
        redirectToCollection: '@collection' === redirectTo,
      })

      let path = ''
      if (mode === 'delete') {
        path = fromItem.value ? pop() : last.value
      }

      if (redirectTo || path) {
        let to = redirectTo
        if ('@back' === redirectTo) {
          to = history.state?.back || redirectPath
        }
        if (['@collection', '@item'].includes(redirectTo)) {
          to = redirectPath
        }
        if (path) {
          to = path
        }
        await router.replace(to)
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
