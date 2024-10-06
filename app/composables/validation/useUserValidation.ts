import type { ApiResourceUser } from '~~/types'
import { useAsyncValidator } from '~/composables/validation/useAsyncValidator'
import { required, email } from '~/utils/validations'
export default function (item: Partial<ApiResourceUser>) {
  const uniqueEmail = useAsyncValidator({
    prop: 'email',
    path: 'users/email',
    message: 'Duplicate email',
    item,
  })

  const rules = {
    email: [required, email, uniqueEmail],
  }
  return { rules }
}
