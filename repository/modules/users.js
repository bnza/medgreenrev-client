import FetchApiResourceFactory from '~/repository/fetchApiResourceFactory'
class UsersModule extends FetchApiResourceFactory {
  constructor(fetcher) {
    super(fetcher)
  }
  get resourceKey() {
    return 'users'
  }
}

export default UsersModule
