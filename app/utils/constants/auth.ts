export enum ApiRole {
  Admin = 'ROLE_ADMIN',
  Editor = 'ROLE_EDITOR',
  User = 'ROLE_USER',
}
export enum ApiSiteRole {
  Editor = 'ROLE_SITE_EDITOR',
  User = 'ROLE_SITE_USER',
}
export enum ApiSpecialistRole {
  Microstratigraphist = 'ROLE_MICROSTRATIGRAPHIST',
}
export const ROLE_HIERARCHY_VALUES: Readonly<Record<ApiRole, number>> =
  Object.freeze({
    [ApiRole.Admin]: 1000,
    [ApiRole.Editor]: 100,
    [ApiRole.User]: 10,
  })
export const ROLE_COLORS = Object.freeze({
  [ApiRole.Admin]: COLORS.error,
  [ApiRole.Editor]: COLORS.warning,
  [ApiRole.User]: COLORS.success,
})
export const SITE_ROLES_BITMASK_MAP: Readonly<Record<ApiSiteRole, number>> =
  Object.freeze({
    [ApiSiteRole.User]: 0b0,
    [ApiSiteRole.Editor]: 0b1,
  })
export const SITES_ROLE_COLORS: Readonly<Record<ApiSiteRole, string>> =
  Object.freeze({
    [ApiSiteRole.User]: COLORS.success,
    [ApiSiteRole.Editor]: COLORS.warning,
  })
