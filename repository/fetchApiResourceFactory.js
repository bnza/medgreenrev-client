import FetchFactory from '~/repository/fetchFactory.js'
import {updatedDiff} from 'deep-object-diff'

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

  async fetchItem(id, fetchOptions, asyncDataOptions) {
    const url = this.getItemUrl(id)
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

  async patchItem(id, diffItem) {
    return this.$fetch(this.getItemUrl(id), {
      method: 'PATCH',
      headers: {
        Accept: 'application/ld+json',
        'Content-Type': 'application/merge-patch+json',
      },
      body: diffItem,
    })
  }

  async postItem(newItem) {
    return this.$fetch(this.resource.apiPath, {
      method: 'POST',
      headers: {
        Accept: 'application/ld+json',
        'Content-Type': 'application/ld+json',
      },
      body: newItem,
    })
  }

  async deleteItem(oldItem) {
    return this.$fetch(this.getItemUrl(oldItem.id), {
      method: 'DELETE',
      headers: {
        Accept: 'application/ld+json',
        'Content-Type': 'application/ld+json',
      },
    })
  }
}

export default FetchApiResourceFactory
