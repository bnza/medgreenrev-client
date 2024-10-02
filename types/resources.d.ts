import type { BaseAcl } from '~~/types/index'

export type ApiId = string | number

export interface ApiResourceItem extends Record<string, any> {
  id: ApiId
}
export type ApiResourceCollectionParent = [string, ApiId]

export interface ApiAclResource {
  _acl: BaseAcl
}
export interface ApiResourceSite extends ApiResourceItem {
  code: string
  name: string
  description: string
  public?: boolean
}
export interface ApiResourceStratigraphicUnit extends ApiResourceItem {
  site: Pick<ApiResourceSite, 'id' | 'code'>
  year: number
  number: number
  code: string
  interpretation?: string
  description?: string
  public?: boolean
}
