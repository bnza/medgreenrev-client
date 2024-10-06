import ResourceRepository from './ResourceRepository'
import type { ApiResourceUser } from '~~/types'
import type { $Fetch } from 'nitropack'

class UserRepository extends ResourceRepository<ApiResourceUser> {
  constructor(baseUrl: string, $fetch: $Fetch) {
    super(baseUrl, $fetch)
  }
  async changeUserPassword(body: any) {
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

export default UserRepository
