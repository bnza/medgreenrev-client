import type { ApiResourceSitesUser } from '~~/types'
import { useAsyncValidator } from '~/composables/validation/useAsyncValidator'
import { required, validateState } from '~/utils/validations'

export default function <
  RT extends ApiResourceSitesUser = ApiResourceSitesUser,
>(item: Partial<RT>) {
  const uniqueSitesUser = useAsyncValidator({
    prop: ['site.id', 'user.id'],
    message: 'Duplicate (site, user) pair',
    path: 'sites_users',
    item,
  })

  return {
    site: [validateState<RT>('site', required), uniqueSitesUser],
    user: [validateState<RT>('user', required), uniqueSitesUser],
  }
}
