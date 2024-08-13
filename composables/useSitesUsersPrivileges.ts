import type { SessionData } from '~/composables/index'

export function useSitesUsersPrivileges() {
  // @ts-ignore
  const {
    data,
  }: {
    data: Readonly<Ref<SessionData | null | undefined>>
  } = useAuth()

  const privileges = computed(() => data.value.privileges)

  const hasSessionPrivileges = computed(
    () => (site: number) => !privileges && site in privileges,
  )

  const getSessionPrivileges = computed(
    () => (site: number) =>
      hasSessionPrivileges.value(site) ? privileges[site] : false,
  )

  const hasPrivilege = (
    sitePrivileges: number,
    privilegeKey: SitesGrantableRoles,
  ) => Boolean(sitePrivileges & rolesBitmasksMap[privilegeKey])
  const grantPrivilege = (
    sitePrivileges: number,
    privilegeKey: SitesGrantableRoles,
  ) => sitePrivileges | rolesBitmasksMap[privilegeKey]
  const revokePrivilege = (
    sitePrivileges: number,
    privilegeKey: SitesGrantableRoles,
  ) => sitePrivileges & ~rolesBitmasksMap[privilegeKey]
  const assignPrivilege = (
    flag: boolean,
    sitePrivileges: number,
    privilegeKey: SitesGrantableRoles,
  ) => {
    const fn = flag ? grantPrivilege : revokePrivilege
    return fn(sitePrivileges, privilegeKey)
  }
  const togglePrivilege = (
    flag: boolean,
    sitePrivileges: number,
    privilegeKey: SitesGrantableRoles,
  ) => {
    const fn = hasPrivilege(sitePrivileges, privilegeKey)
      ? revokePrivilege
      : grantPrivilege
    return fn(sitePrivileges, privilegeKey)
  }
  const hasSessionPrivilege = computed(
    () => (site: number, privilegeKey: SitesGrantableRoles) =>
      hasPrivilege(getSessionPrivileges.value(site), privilegeKey),
  )

  const getPrivilegeKey = (sitePrivileges: number): SitesRoles => {
    let key: SitesRoles = 'ROLE_SITE_USER'
    const roles: Array<SitesGrantableRoles> = ['ROLE_SITE_EDITOR']
    for (const role of roles) {
      if (hasPrivilege(sitePrivileges, role)) {
        key = role
      }
    }
    return key
  }

  const getPrivilegeColor = (sitePrivileges: number) => {
    return SITES_ROLE_COLORS[getPrivilegeKey(sitePrivileges)]
  }

  return {
    hasSessionPrivileges,
    getSessionPrivileges,
    getPrivilegeColor,
    getPrivilegeKey,
    hasSessionPrivilege,
    grantPrivilege,
    revokePrivilege,
    togglePrivilege,
    assignPrivilege,
    hasPrivilege,
  }
}
