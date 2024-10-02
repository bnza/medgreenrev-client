import type { FetchOptions } from 'ofetch'
import type { $Fetch } from 'nitropack'
import type {
  ApiResourceItem,
  DataResourceKey,
  ResourceConfig,
  ResourceKey,
  ResourceConfigMap,
} from '~~/types'
import AutocompleteRepository from './AutocompleteRepository'
import ResourceRepository from './ResourceRepository'
import ValidatorRepository from './ValidatorRepository'
// import UserRepository from '~/lib/repository/UserRepository'

export default class Api {
  readonly #fetcher: $Fetch
  readonly paths: Readonly<Record<ResourceKey, string>>
  #autocomplete: AutocompleteRepository
  #resources: Map<DataResourceKey, any>
  #validator: ValidatorRepository
  // #userRepository: UserRepository

  constructor(
    index: Record<ResourceKey, string>,
    private readonly fetchOptions: FetchOptions,
  ) {
    this.paths = Object.freeze(index)
    this.#fetcher = $fetch.create(fetchOptions)
    this.#resources = new Map<DataResourceKey, any>()
  }

  // getResourceConfig(key: ResourceKey) {
  //   return this.#configs[key]
  // }

  get autocomplete() {
    if (!this.#autocomplete) {
      this.#autocomplete = new AutocompleteRepository(this.#fetcher)
    }
    return this.#autocomplete
  }

  get validator() {
    if (!this.#validator) {
      this.#validator = new ValidatorRepository(this.#fetcher)
    }
    return this.#validator
  }

  // get userRepository() {
  //   if (!this.#userRepository) {
  //     this.#userRepository = new UserRepository('users', this.#fetcher)
  //   }
  //   return this.#userRepository
  // }

  getRepository<RT extends ApiResourceItem>(
    resourceKey: DataResourceKey,
  ): ResourceRepository<RT> {
    if (!this.#resources.has(resourceKey)) {
      this.#resources.set(
        resourceKey,
        new ResourceRepository<RT>(this.paths[resourceKey], this.#fetcher),
      )
    }
    return this.#resources.get(resourceKey)
  }
}
