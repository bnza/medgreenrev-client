import type { FetchOptions } from 'ofetch'
import type { $Fetch } from 'nitropack'
import AutocompleteRepository from '~/lib/repository/AutocompleteRepository'
import ResourceRepository from '~/lib/repository/ResourceRepository'
import ValidatorRepository from '~/lib/repository/ValidatorRepository'
import UserRepository from '~/lib/repository/UserRepository'

export default class Api {
  readonly #fetcher: $Fetch
  #autocomplete: AutocompleteRepository
  #resources: Map<ResourceKey, any>
  #validator: ValidatorRepository
  #userRepository: UserRepository

  constructor(private readonly fetchOptions: FetchOptions) {
    this.#fetcher = $fetch.create(fetchOptions)
    this.#resources = new Map<ResourceKey, any>()
  }

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

  get userRepository() {
    if (!this.#userRepository) {
      this.#userRepository = new UserRepository('users', this.#fetcher)
    }
    return this.#userRepository
  }

  getRepository<RT extends ApiResources>(
    resourceKey: ResourceKey,
  ): ResourceRepository<RT> {
    if (!this.#resources.has(resourceKey)) {
      this.#resources.set(
        resourceKey,
        new ResourceRepository<RT>(resourceKey, this.#fetcher),
      )
    }
    return this.#resources.get(resourceKey)
  }
}
