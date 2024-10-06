import type { ApiResourceItem } from '~~/types'

type SubmitStatus = 'idle' | 'pending' | 'success' | 'error'

export const dataItemPageInjectionKey = Symbol() as InjectionKey<
  ReturnType<typeof useDataItemPageProvide>
>
export const useDataItemPageProvide = <RT extends ApiResourceItem>() => {
  const isValid = ref(false)
  const submittingItem: Ref<RT | undefined> = ref(undefined)
  const submitStatus: Ref<SubmitStatus> = ref('idle')
  const triggerSubmit = ref(false)
  return { isValid, submittingItem, submitStatus, triggerSubmit }
}
