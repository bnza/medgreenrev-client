import type { $Fetch } from 'nitropack'

abstract class AbstractRepository<ResponseType> {
  protected $fetch: $Fetch<ResponseType>

  constructor($fetch: $Fetch<ResponseType>) {
    this.$fetch = $fetch
  }
}

export default AbstractRepository
