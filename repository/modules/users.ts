import FetchApiResourceFactory from '~/repository/FetchApiResourceFactory'
import type { $Fetch } from 'nitropack'

class UsersModule extends FetchApiResourceFactory<ApiResourceUser> {
  constructor(fetcher: $Fetch) {
    super(fetcher)
  }

  get resourceKey(): ResourceKey {
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
