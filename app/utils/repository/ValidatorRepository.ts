import AbstractRepository from './AbstractRepository'
import type { $Fetch } from 'nitropack'

class ValidatorRepository extends AbstractRepository {
  constructor($fetch: $Fetch) {
    super($fetch)
  }
  validate = async (
    type = 'unique',
    path: string,
    value: string | string[],
  ) => {
    value = Array.isArray(value) ? value.join('/') : value
    return this.$fetch(`/api/validator/${type}/${path}/${value}`).then((r) =>
      Boolean(r),
    )
  }
}

export default ValidatorRepository
