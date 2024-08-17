import FetchApiResourceFactory from '~/repository/FetchApiResourceFactory'
import type { $Fetch } from 'nitropack'

class SitesUsersModule extends FetchApiResourceFactory<ApiResourceSitesUsers> {
  constructor(fetcher: $Fetch) {
    super(fetcher)
  }

  get resourceKey(): ResourceKey {
    return 'sitesUsers'
  }
}

export default SitesUsersModule
