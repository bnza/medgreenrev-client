import type { UseResourceReturnType } from '~/composables/useResource'
import type { ResourceConfig } from '~~/types'

export default class Cache {
  #map: Map<string, Map<string, any>>

  constructor() {
    this.#map = new Map()
    this.#map.set('useResource', new Map<string, UseResourceReturnType>())
    this.#map.set('resourceConfig', new Map<string, ResourceConfig>())
  }

  get useResource(): Map<string, UseResourceReturnType> {
    return this.#map.get('useResource')
  }
  get resourceConfig(): Map<string, ResourceConfig> {
    return this.#map.get('resourceConfig')
  }
}
