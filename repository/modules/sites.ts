import FetchApiResourceFactory from '~/repository/FetchApiResourceFactory'
import type { $Fetch } from 'nitropack'
import type { ApiResourceSite, ResourceKey } from '~/lib/resources'

class SitesModule extends FetchApiResourceFactory<ApiResourceSite> {
  constructor(fetcher: $Fetch) {
    super(fetcher)
  }

  get resourceKey(): ResourceKey {
    return 'sites'
  }
}

export default SitesModule
