import type { ApiResourceItem } from '~~/types'

export const dataItemPageInjectionKey = Symbol() as InjectionKey<
  ReturnType<typeof useDataItemPageProvide>
>
export const useDataItemPageProvide = <RT extends ApiResourceItem>() => {
  const isValid = ref(false)
  const submittingItem: Ref<RT | undefined> = ref(undefined)
  const submitPending = ref(false)
  const triggerSubmit = ref(false)
  return { isValid, submittingItem, submitPending, triggerSubmit }
}
