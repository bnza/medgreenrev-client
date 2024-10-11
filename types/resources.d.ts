import type { BaseAcl } from '~~/types/index'
import { ApiSpecialistRole } from '~/utils'

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
export interface ApiResourcePottery extends ApiResourceItem {
  stratigraphicUnit: Pick<ApiResourceStratigraphicUnit, 'id' | 'code' | 'site'>
  number: number
  code: string
  fragmentsNumber: number
  typology: string
  part?: string
  functionalGroup: string
  interpretation?: string
  description?: string
  chronologyLower?: number
  chronologyUpper?: number
  public?: boolean
}

export interface ApiResourceUser extends ApiResourceItem {
  id: string
  email: string
  roles: Array<ApiRole | ApiSpecialistRole>
  privileges: Record<number, number>
}

export interface ApiResourceSitesUser extends ApiResourceItem {
  site: Pick<ApiResourceSite, 'id' | 'code' | 'name'>
  user: Pick<ApiResourceUser, 'id' | 'email'>
}

export interface ApiResourceMediaObject extends ApiResourceItem {
  contentUrl: string
  originalFilename: string
  mimeType: string
  size: number
}

export interface ApiResourceItemMediaObject extends ApiResourceItem {
  item: ApiResourceItem
  mediaObject: ApiResourceMediaObject
}

export interface ApiVocabularyItem extends ApiResourceItem {
  value: string
  description?: string
}
