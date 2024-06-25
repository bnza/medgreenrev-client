import { stringify } from 'qs'
import SitesModule from '~/repository/modules/sites.js'
import UsersModule from '~/repository/modules/users.js'
import { resourceKeys } from '~/lib/resources/index.js'
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const { token } = useAuth()
  const { show } = useAppSnackbarState()

  const fetchOptions = {
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
  }

  const fetchOptionsParamsToUrl = (options) => {
    if (options?.params) {
      const convertedOptions = new URLSearchParams(
        stringify(unref(options.params)),
      )
      options.params = Object.fromEntries(convertedOptions)
    }
  }

  const apiFetcher = $fetch.create(fetchOptions)

  const modules = {
    sites: new SitesModule(apiFetcher),
    users: new UsersModule(apiFetcher),
  }

  const modulesKeys = Object.freeze(Object.keys(modules))

  const getRepository = (key) => {
    if (!modulesKeys.includes(key)) {
      throw new Error(`Invalid repository key "${key}"`)
    }
    return modules[key]
  }

  return {
    provide: {
      api: {
        getRepository,
      },
    },
  }
})
