export type ApiId = string | number

export interface ApiResourceItem {
  id: ApiId
}
export type ApiResourceCollectionParent = [string, ApiId]

export interface ApiResourceSite extends ApiResourceItem {
  code: string
  name: string
  description: string
}
