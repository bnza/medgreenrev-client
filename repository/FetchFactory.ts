/*
 The FetchFactory acts as a wrapper around an HTTP client.
 It encapsulates the functionality for making API requests asynchronously
 through the call function, utilizing the provided HTTP client.
*/
import type { $Fetch } from 'nitropack'

class FetchFactory<T = any> {
  #$fetch: $Fetch

  constructor(fetcher: $Fetch<T>) {
    this.#$fetch = fetcher
  }

  get $fetch() {
    return this.#$fetch
  }
}

export default FetchFactory
