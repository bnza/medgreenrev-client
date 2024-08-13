import FetchApiResourceFactory from '~/repository/fetchApiResourceFactory'

class SitesUsersModule extends FetchApiResourceFactory {
  constructor(fetcher) {
    super(fetcher)
  }

  get resourceKey() {
    return 'sitesUsers'
  }
}

export default SitesUsersModule
