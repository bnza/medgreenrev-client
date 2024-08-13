import { stringify } from 'qs'
import SitesModule from '~/repository/modules/sites.js'
import StratigraphicUnitsModule from '~/repository/modules/stratigraphic-units.js'
import UsersModule from '~/repository/modules/users.js'
import ApiValidator from '~/repository/validator.js'
import ApiAutocomplete from '~/repository/autocomplete.ts'
import SitesUsersModule from '~/repository/modules/sitesUsers.js'

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
    sitesUsers: new SitesUsersModule(apiFetcher),
    stratigraphicUnits: new StratigraphicUnitsModule(apiFetcher),
    users: new UsersModule(apiFetcher),
  }

  const modulesKeys = Object.freeze(Object.keys(modules))

  const getRepository = (key) => {
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
