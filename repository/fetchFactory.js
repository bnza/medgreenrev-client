/*
 The FetchFactory acts as a wrapper around an HTTP client.
 It encapsulates the functionality for making API requests asynchronously
 through the call function, utilizing the provided HTTP client.
*/
class FetchFactory {
  #$fetch

  constructor(fetcher) {
    this.#$fetch = fetcher
  }

  get $fetch() {
    return this.#$fetch
  }
}

export default FetchFactory
