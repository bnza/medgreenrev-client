import type { FetchOptions } from 'ofetch'
import { stringify } from 'qs'

export function useApiFetchOptions() {
  const config = useRuntimeConfig()

  const { token } = useAuth()
  const { showError } = useAppSnackbarState()
  const { signOut } = useAuth()
  const { mode } = useDataUiModeState()

  const fetchOptions: FetchOptions = {
    baseURL: config.public.apiBaseURL,
    onRequest({ options }) {
      if (token.value) {
        options.headers.set('Authorization', token.value)
      }
      fetchOptionsParamsToUrl(options)
    },
    onRequestError({ error }) {
      showError({
        text: error.message,
      })
      console.log(error)
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        showError({
          // response._data.message,
          text: 'Session expired please login',
        })
        await signOut({ redirect: false })
        mode.value = 'login'
      }
      if ([400, 500].includes(response.status)) {
        const text =
          response._data && 'hydra:description' in response._data
            ? response._data['hydra:description']
            : response.statusText
        showError({
          text,
        })
      }
    },
  }

  const fetchOptionsParamsToUrl = (options: Record<string, any>) => {
    if (options?.query) {
      const params =
        'fn' in options.query ? options.query.fn() : unref(options.query)
      const convertedOptions = new URLSearchParams(stringify(params))
      options.query = Object.fromEntries(convertedOptions)
    }
  }

  return fetchOptions
}
