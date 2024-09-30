import type { $Fetch } from 'nitropack'
import type { ApiResourceItem, DataResourceKey, ResourceConfig } from '~~/types'
import AbstractRepository from '~/utils/repository/AbstractRepository'
class ResourceRepository<
  ResourceType extends ApiResourceItem,
> extends AbstractRepository {
  readonly resourceConfig: ResourceConfig

  constructor(resourceConfig: ResourceConfig, $fetch: $Fetch) {
    super($fetch)
    this.resourceConfig = resourceConfig
  }

  getItemUrl(id: string | number) {
    return `${this.resourceConfig.apiPath}/${id}`
  }

  fetchItem(id: string | number) {
    const url = this.getItemUrl(id)
    return this.$fetch<JsonLdResourceItem<ResourceType>>(url, { method: 'GET' })
  }

  // async exportCollection(fetchOptions: FetchOptions) {
  //   return this.$fetch<string>(`${this.resourceConfig.apiPath}/export`, {
  //     // @ts-ignore
  //     method: 'GET',
  //     headers: {
  //       Accept: 'text/csv',
  //       'Content-Type': 'text/csv',
  //     },
  //     ...fetchOptions,
  //   })
  // }

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
    item: Record<string, any>,
    contentType = 'application/ld+json',
  ) {
    const headers = {
      Accept: 'application/ld+json',
    }
    // For multipart/form-data requests Content-Type header value MUST be undefined
    // in order to avoid boundary problems
    // @see https://stackoverflow.com/questions/39280438/fetch-missing-boundary-in-multipart-form-data-post
    if (contentType !== 'multipart/form-data') {
      headers['Content-Type'] = contentType
    }
    return this.$fetch<JsonLdResourceItem<ResourceType>>(
      this.resourceConfig.apiPath,
      {
        method: 'POST',
        headers,
        body: item,
      },
    )
  }

  async deleteItem(item: ApiResourceItem) {
    return this.$fetch<void>(this.getItemUrl(item.id), {
      method: 'DELETE',
      headers: {
        Accept: 'application/ld+json',
        'Content-Type': 'application/ld+json',
      },
    })
  }
}

export default ResourceRepository
