import { stringify } from 'qs'
import SitesModule from '~/repository/modules/sites'
import StratigraphicUnitsModule from '~/repository/modules/stratigraphic-units'
import UsersModule from '~/repository/modules/users'
import ApiValidator from '~/repository/validator'
import ApiAutocomplete from '~/repository/autocomplete'
import SitesUsersModule from '~/repository/modules/sitesUsers'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const { token } = useAuth()
  const { show } = useAppSnackbarState()
  const { signOut } = useAuth()
  const router = useRouter()
  const route = useRoute()

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
    sitesUsers: new SitesUsersModule(apiFetcher),
    stratigraphicUnits: new StratigraphicUnitsModule(apiFetcher),
    users: new UsersModule(apiFetcher),
  }

  const modulesKeys = Object.freeze(Object.keys(modules))

  const getRepository = (key: ResourceKey) => {
    if (!modulesKeys.includes(key)) {
      throw new Error(`Invalid repository key "${key}"`)
    }
    return modules[key]
  }

  const validator = new ApiValidator(apiFetcher)
  const autocomplete = new ApiAutocomplete(apiFetcher)

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
