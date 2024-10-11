import type { ApiResourceCollectionParent, ApiResourceItem } from '~~/types'

export default function <RT extends ApiResourceItem>() {
  return useState<ApiResourceCollectionParent | undefined>(
    States.CreateParentKey,
    () => undefined,
  )
}
