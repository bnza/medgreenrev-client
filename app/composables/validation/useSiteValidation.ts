import type { ApiResourceSite } from '~~/types'
import { useAsyncValidator } from '~/composables/validation/useAsyncValidator'
import { required, maxLength } from '~/utils/validations'

export default function (item: Partial<ApiResourceSite>) {
  const uniqueCode = useAsyncValidator({
    prop: 'code',
    path: 'sites/code',
    message: 'Duplicate code',
    item,
  })

  const uniqueName = useAsyncValidator({
    prop: 'name',
    path: 'sites/name',
    message: 'Duplicate name',
    item,
  })

  const rules = {
    code: [required, maxLength(3), uniqueCode],
    name: [required, uniqueName],
  }
  return { rules }
}
