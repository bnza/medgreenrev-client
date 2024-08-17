import type { $Fetch } from 'nitropack'
import type {
  ApiId,
  ApiLdResourceCollection,
  ApiLdResourceItem,
  ApiResourceItem,
  ResourceKey,
} from '~/lib/resources'
import FetchFactory from './FetchFactory'
import type { FetchOptions } from 'ofetch'
import type { AsyncDataOptions } from '#app'

abstract class FetchApiResourceFactory<
  T extends ApiResourceItem<ApiId>,
> extends FetchFactory<T> {
  constructor(fetcher: $Fetch) {
    super(fetcher)
  }

  /**
   * @abstract
   */
  abstract get resourceKey(): ResourceKey

  get resource() {
    return getResourceConfig(this.resourceKey)
  }

  getItemUrl(id: MaybeRef<string | number>) {
    return `${this.resource.apiPath}/${unref(id)}`
  }

  async fetchCollection(
    fetchOptions: FetchOptions,
    asyncDataOptions: AsyncDataOptions<ApiLdResourceCollection<T>>,
  ) {
    const url = this.resource.apiPath
    return useAsyncData(
      url,
      () =>
        this.$fetch(url, {
          // @ts-ignore
          method: 'GET',
          ...fetchOptions,
        }),
      asyncDataOptions,
    )
  }

  async fetchItem(
    id: MaybeRef<string | number>,
    fetchOptions: FetchOptions,
    asyncDataOptions: AsyncDataOptions<ApiLdResourceItem<T>>,
  ) {
    const url = this.getItemUrl(id)
    return useAsyncData(
      url,
      () =>
        this.$fetch(url, {
          // @ts-ignore
          method: 'GET',
          ...fetchOptions,
        }),
      asyncDataOptions,
    )
  }

  async patchItem(
    id: string | number,
    diffItem: Record<string, any>,
  ): Promise<never> {
    return this.$fetch(this.getItemUrl(id), {
      method: 'PATCH',
      headers: {
        Accept: 'application/ld+json',
        'Content-Type': 'application/merge-patch+json',
      },
      body: diffItem,
    })
  }

  async postItem(newItem: Record<string, any>): Promise<ApiLdResourceItem<T>> {
    return this.$fetch(this.resource.apiPath, {
      method: 'POST',
      headers: {
        Accept: 'application/ld+json',
        'Content-Type': 'application/ld+json',
      },
      body: newItem,
    })
  }

  async deleteItem(oldItem: Partial<T>) {
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
