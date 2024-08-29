import type { SessionData } from '#auth'

export function useSitesUsersPrivileges() {
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
