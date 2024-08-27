declare global {
  // export type Roles = 'ROLE_USER' | 'ROLE_EDITOR' | 'ROLE_ADMIN'
  export type SitesRoles = 'ROLE_SITE_USER' | 'ROLE_SITE_EDITOR'
  export type SitesGrantableRoles = Exclude<SitesRoles, 'ROLE_SITE_USER'>
  export type AppUiMode = 'default' | 'map'

  export type ApiAction = 'create' | 'update' | 'read' | 'delete'
  export type SessionData = {
    id: string
    email: string
    roles: Array<ApiRole>
    privileges: Record<number, number>
  }
}
export {}
