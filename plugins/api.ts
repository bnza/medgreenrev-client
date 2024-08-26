import { stringify } from 'qs'
import type { FetchOptions } from 'ofetch'
import ResourceRepository from '~/repository/ResourceRepository'
import ValidatorRepository from '~/repository/ValidatorRepository'
import AutocompleteRepository from '~/repository/AutocompleteRepository'
import UserRepository from '~/repository/UserRepository'

export default defineNuxtPlugin(() => {
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

  const apiFetcher = $fetch.create(fetchOptions)

  const modules = {
    sites: new ResourceRepository<ApiResourceSite>('sites', apiFetcher),
    sitesUsers: new ResourceRepository<ApiResourceSitesUsers>(
      'sitesUsers',
      apiFetcher,
    ),
    stratigraphicUnits: new ResourceRepository<ApiResourceStratigraphicUnit>(
      'stratigraphicUnits',
      apiFetcher,
    ),
    users: new UserRepository<ApiResourceUser>('users', apiFetcher),
  }

  const modulesKeys = Object.freeze(Object.keys(modules))

  const getRepository = (key: ResourceKey) => {
    if (!modulesKeys.includes(key)) {
      throw new Error(`Invalid repository key "${key}"`)
    }
    return modules[key]
  }

  const validator = new ValidatorRepository(apiFetcher)
  const autocomplete = new AutocompleteRepository(apiFetcher)

  return {
    provide: {
      api: {
        autocomplete,
        getRepository,
        validator,
      },
    },
  }
})
