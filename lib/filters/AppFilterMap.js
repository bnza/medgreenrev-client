export class AppFilterMap {
  _map

  constructor() {
    this._map = new Map()
  }

  get size() {
    return this._map.size
  }

  get(key) {
    return this._map.get(key)
  }

  set(key, value) {
    this._map.set(key, value)
    return this
  }

  has(key) {
    return this._map.has(key)
  }
}
