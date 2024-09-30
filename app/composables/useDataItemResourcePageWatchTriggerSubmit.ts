import type { ApiResourceItem } from '~~/types'

export default function <RT extends ApiResourceItem>(
  triggerSubmit: Ref<boolean>,
  state: Record<string, any>,
  submittingItem: Ref<Record<string, any>>,
) {
  watch(triggerSubmit, (flag) => {
    let value = undefined
    if (flag) {
      triggerSubmit.value = false
      value = state
    }
    submittingItem.value = value
  })
}
