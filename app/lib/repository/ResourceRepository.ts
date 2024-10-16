import AbstractRepository from '~/lib/repository/AbstractRepository'
import type { $Fetch } from 'nitropack'
import type { FetchOptions } from 'ofetch'
import type { AsyncDataOptions } from '#app'

class ResourceRepository<
  ResourceType extends ApiResources,
> extends AbstractRepository {
  protected resourceConfig: ResourceConfig

  constructor(resourceKey: ResourceKey, $fetch: $Fetch) {
    super($fetch)
    this.resourceConfig = getResourceConfig(resourceKey)
  }

  async fetchCollection(
    fetchOptions: FetchOptions,
    asyncDataOptions: AsyncDataOptions<
      ApiLdResourceCollection<ApiAclItem<ResourceType>>
    >,
  ) {
    const url = this.resourceConfig.apiPath
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

  getItemUrl(id: MaybeRef<string | number>) {
    return `${this.resourceConfig.apiPath}/${unref(id)}`
  }

  async $fetchItem(id: MaybeRef<string | number>) {
    const url = this.getItemUrl(id)
    return this.$fetch<ResourceType>(url, { method: 'GET' })
  }

  async fetchItem(
    id: MaybeRef<string | number>,
    fetchOptions: FetchOptions,
    asyncDataOptions: AsyncDataOptions<
      ResourceAclItem & ApiLdResourceItem<ResourceType>
    >,
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

  async exportCollection(fetchOptions: FetchOptions) {
    return this.$fetch<string>(`${this.resourceConfig.apiPath}/export`, {
      // @ts-ignore
      method: 'GET',
      headers: {
        Accept: 'text/csv',
        'Content-Type': 'text/csv',
      },
      ...fetchOptions,
    })
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

  async postItem(
    newItem: Record<string, any>,
    contentType = 'application/ld+json',
  ): Promise<ApiLdResourceItem<ResourceType>> {
    // For multipart/form-data requests Content-Type header value MUST be undefined
    // in order to avoid boundary problems
    // @see https://stackoverflow.com/questions/39280438/fetch-missing-boundary-in-multipart-form-data-post
    const headers = {
      Accept: 'application/ld+json',
    }
    if (contentType !== 'multipart/form-data') {
      headers['Content-Type'] = contentType
    }
    return this.$fetch(this.resourceConfig.apiPath, {
      method: 'POST',
      headers,
      body: newItem,
    })
  }

  async deleteItem(oldItem: Partial<ResourceType>) {
    return this.$fetch(this.getItemUrl(oldItem.id), {
      method: 'DELETE',
      headers: {
        Accept: 'application/ld+json',
        'Content-Type': 'application/ld+json',
      },
    })
  }
}

export default ResourceRepository
