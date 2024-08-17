import { getResourceValidation } from '~/lib/resources'

export default async function <T extends ApiResourceItem<ApiId>>(
  resourceKey: ResourceKey,
  props: {
    triggerSubmit: boolean
    item: Partial<T>
  },
  emit: Function,
) {
  const { triggerSubmit, item } = toRefs(props)

  const useResourceValidation = await getResourceValidation<T>(resourceKey)
  const { state, v$ } = useResourceValidation(item, emit)
  watch(triggerSubmit, async (trigger: boolean) => {
    if (trigger) {
      emit('update:triggerSubmit', false)
      const valid = await v$.value.$validate()
      if (valid) {
        emit('submitForm', state)
      }
    }
  })

  return {
    item,
    state,
    v$,
  }
}
