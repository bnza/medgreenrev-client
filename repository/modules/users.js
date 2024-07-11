import FetchApiResourceFactory from '~/repository/fetchApiResourceFactory'

class UsersModule extends FetchApiResourceFactory {
  constructor(fetcher) {
    super(fetcher)
  }

  get resourceKey() {
    return 'users'
  }

  async changeUserPassword(body) {
    return this.$fetch('users/me/change-password', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    })
  }
}

export default UsersModule
