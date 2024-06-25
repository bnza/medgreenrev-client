import FetchApiResourceFactory from '~/repository/fetchApiResourceFactory'
class SitesModule extends FetchApiResourceFactory {
  constructor(fetcher) {
    super(fetcher)
  }
  get resourceKey() {
    return 'sites'
  }
}

export default SitesModule
