import FetchFactory from '~/repository/fetchFactory.js'

class FetchApiResourceFactory extends FetchFactory {
  constructor(fetcher) {
    super(fetcher)
  }
  /**
   * @abstract
   */
  get resourceKey() {
    throw new Error('must be implemented by subclass!')
  }

  get resource() {
    return getResourceConfig(this.resourceKey)
  }

  getItemUrl(id) {
    return `${this.resource.apiPath}/${unref(id)}`
  }

  async fetchCollection(fetchOptions, asyncDataOptions) {
    const url = this.resource.apiPath
    return useAsyncData(
      url,
      () =>
        this.$fetch(url, {
          method: 'GET',
          ...fetchOptions,
        }),
      asyncDataOptions,
    )
  }
}

export default FetchApiResourceFactory
