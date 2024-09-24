import type { $Fetch } from 'nitropack'

abstract class AbstractRepository {
  protected $fetch: $Fetch

  constructor($fetch: $Fetch) {
    this.$fetch = $fetch
  }

  get fetch() {
    return this.$fetch
  }
}

export default AbstractRepository
