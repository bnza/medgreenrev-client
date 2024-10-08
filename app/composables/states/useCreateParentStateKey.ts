import type { ApiId, ApiResourceItem, DataResourceKey } from '~~/types'

export default function <RT extends ApiResourceItem>() {
  return useState<[DataResourceKey, ApiId] | undefined>(
    States.CreateParentKey,
    () => undefined,
  )
}
