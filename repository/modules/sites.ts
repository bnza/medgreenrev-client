import FetchApiResourceFactory from '~/repository/FetchApiResourceFactory'
import type { $Fetch } from 'nitropack'

class SitesModule extends FetchApiResourceFactory<ApiResourceSite> {
  constructor(fetcher: $Fetch) {
    super(fetcher)
  }

  get resourceKey(): ResourceKey {
    return 'sites'
  }
}

export default SitesModule
