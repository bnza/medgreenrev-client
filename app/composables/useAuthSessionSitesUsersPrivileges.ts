import { ApiSiteRole } from '~/utils'
import { hasSitePrivilege } from '~/utils/acl'

export default function () {
  const { data } = useAuth()

  const privileges = computed(() => data.value?.privileges)
  const hasSessionSitePrivileges = computed(
    () => (site: number) => !privileges.value && site in privileges.value,
  )

  const getSessionSitePrivileges: Ref<(site: number) => number | false> =
    computed(
      () => (site: number) =>
        hasSessionSitePrivileges.value(site) ? privileges[site] : false,
    )

  const hasSessionPrivilege = computed(
    () => (site: number, privilegeKey: ApiSiteRole) =>
      hasSitePrivilege(getSessionSitePrivileges.value(site), privilegeKey),
  )

  return {
    hasSessionPrivilege,
    hasSessionSitePrivileges,
    getSessionSitePrivileges,
  }
}
