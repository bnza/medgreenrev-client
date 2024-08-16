export const hasPrivilege = (
  sitePrivileges: number,
  privilegeKey: SitesGrantableRoles,
) => Boolean(sitePrivileges & rolesBitmasksMap[privilegeKey])
export const grantPrivilege = (
  sitePrivileges: number,
  privilegeKey: SitesGrantableRoles,
) => sitePrivileges | rolesBitmasksMap[privilegeKey]
export const revokePrivilege = (
  sitePrivileges: number,
  privilegeKey: SitesGrantableRoles,
) => sitePrivileges & ~rolesBitmasksMap[privilegeKey]
export const assignPrivilege = (
  flag: boolean,
  sitePrivileges: number,
  privilegeKey: SitesGrantableRoles,
) => {
  const fn = flag ? grantPrivilege : revokePrivilege
  return fn(sitePrivileges, privilegeKey)
}
export const togglePrivilege = (
  flag: boolean,
  sitePrivileges: number,
  privilegeKey: SitesGrantableRoles,
) => {
  const fn = hasPrivilege(sitePrivileges, privilegeKey)
    ? revokePrivilege
    : grantPrivilege
  return fn(sitePrivileges, privilegeKey)
}
