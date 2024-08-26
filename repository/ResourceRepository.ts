import AbstractRepository from '~/repository/AbstractRepository'
import type { $Fetch, TypedInternalResponse } from 'nitropack'
import type { FetchOptions } from 'ofetch'
import type { AsyncDataOptions } from '#app'

class ResourceRepository<
  ResourceType extends ApiResources,
> extends AbstractRepository<ResourceType> {
  protected resourceConfig: ResourceConfig

  constructor(resourceKey: ResourceKey, $fetch: $Fetch) {
    super($fetch)
    this.resourceConfig = getResourceConfig(resourceKey)
  }

  async fetchCollection(
    fetchOptions: FetchOptions,
    asyncDataOptions: AsyncDataOptions<
      TypedInternalResponse<string, ResourceType, 'get'>,
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

  async fetchItem(
    id: MaybeRef<string | number>,
    fetchOptions: FetchOptions,
    asyncDataOptions: AsyncDataOptions<
      TypedInternalResponse<string, ResourceType, 'get'>,
      ApiLdResourceItem<ResourceType>
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
  ): Promise<ApiLdResourceItem<ResourceType>> {
    return this.$fetch(this.resourceConfig.apiPath, {
      method: 'POST',
      headers: {
        Accept: 'application/ld+json',
        'Content-Type': 'application/ld+json',
      },
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
