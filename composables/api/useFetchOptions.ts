import type { FetchOptions } from 'ofetch'
import { stringify } from 'qs'

export function useFetchOptions() {
  const config = useRuntimeConfig()

  const { token } = useAuth()
  const { show } = useAppSnackbarState()
  const { signOut } = useAuth()
  const router = useRouter()
  const route = useRoute()

  const fetchOptions: FetchOptions = {
    baseURL: config.public.apiBaseURL,
    onRequest({ options }) {
      if (token.value) {
        options.headers = Object.assign(options.headers ?? {}, {
          Authorization: token.value,
        })
      }
      fetchOptionsParamsToUrl(options)
    },
    onRequestError({ error }) {
      show({
        text: error.message,
        color: 'error',
        timeout: -1,
      })
      console.log(error)
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        show({
          // response._data.message,
          text: 'Session expired please login',
          color: 'error',
          timeout: -1,
        })
        await signOut({ callbackUrl: route.fullPath })
        console.log('Logged out')
        await router.push('/login')
      }
    },
  }

  const fetchOptionsParamsToUrl = (options: Record<string, any>) => {
    if (options?.params) {
      const convertedOptions = new URLSearchParams(
        stringify(unref(options.params)),
      )
      options.params = Object.fromEntries(convertedOptions)
    }
  }

  return fetchOptions
}
