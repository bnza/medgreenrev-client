import ResourceRepository from '~/lib/repository/ResourceRepository'

class UserRepository extends ResourceRepository<ApiResourceUser> {
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
