import { ApiSiteRole, SITE_ROLES_BITMASK_MAP } from '~/utils/constants'

export const hasSitePrivilege = (
  sitePrivileges: number | false,
  privilegeKey: ApiSiteRole,
) =>
  sitePrivileges !== false &&
  Boolean(sitePrivileges & SITE_ROLES_BITMASK_MAP[privilegeKey])
export const grantSitePrivilege = (
  sitePrivileges: number,
  privilegeKey: ApiSiteRole,
) => sitePrivileges | SITE_ROLES_BITMASK_MAP[privilegeKey]
export const revokeSitePrivilege = (
  sitePrivileges: number,
  privilegeKey: ApiSiteRole,
) => sitePrivileges & ~SITE_ROLES_BITMASK_MAP[privilegeKey]
export const assignSitePrivilege = (
  flag: boolean,
  sitePrivileges: number,
  privilegeKey: ApiSiteRole,
) => {
  const fn = flag ? grantSitePrivilege : revokeSitePrivilege
  return fn(sitePrivileges, privilegeKey)
}
export const toggleSitePrivilege = (
  sitePrivileges: number,
  privilegeKey: ApiSiteRole,
) => {
  const fn = hasSitePrivilege(sitePrivileges, privilegeKey)
    ? revokeSitePrivilege
    : grantSitePrivilege
  return fn(sitePrivileges, privilegeKey)
}

export const getSitePrivilegeKey = (sitePrivilege: number) => {
  let key = ApiSiteRole.User
  for (const role of [ApiSiteRole.Editor]) {
    if (hasSitePrivilege(sitePrivilege, role)) {
      key = role
    }
  }
  return key
}

export const getSitePrivilegeColor = (sitePrivileges: number) => {
  return SITES_ROLE_COLORS[getSitePrivilegeKey(sitePrivileges)]
}
