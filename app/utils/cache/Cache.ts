import type { UseResourceReturnType } from '~/composables/useResource'

export default class Cache {
  #map: Map<string, Map<string, any>>

  constructor() {
    this.#map = new Map()
    this.#map.set('useResource', new Map<string, UseResourceReturnType>())
  }

  get useResource(): Map<string, UseResourceReturnType> {
    return this.#map.get('useResource')
  }
}
