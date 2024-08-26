import ResourceRepository from '~/repository/ResourceRepository'

class UserRepository<
  ResourceType extends ApiResourceUser,
> extends ResourceRepository<ResourceType> {
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
