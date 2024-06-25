import { DATA_FORM_MODE } from '~/lib/constants/enums.js'

export default function (submitFn, state, v$, redirectBasePath) {
  const router = useRouter()
  const { show } = useAppSnackbarState()

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
    })
  }

  async function submitPatch(oldItem) {
    const valid = await v$.value.$validate()
    if (valid) {
      await submitFn(state, oldItem).catch(showError)
      await router.replace(`${redirectBasePath}/${state.id}`)
      showSuccess(DATA_FORM_MODE.Update)
    }
  }

  async function submitPost() {
    const valid = await v$.value.$validate()
    if (valid) {
      const newItem = await submitFn(state).catch(showError)
      await router.replace(`${redirectBasePath}/${newItem?.id}`)
      showSuccess(DATA_FORM_MODE.Create)
    }
  }

  async function submitDelete() {
    const valid = await v$.value.$validate()
    const submitFn = submitFn('delete')
    if (valid) {
      await submitFn(state).catch(showError)
      await router.replace(redirectBasePath)
      showSuccess(DATA_FORM_MODE.Delete)
    }
  }

  return { submitPatch, submitPost, submitDelete }
}
