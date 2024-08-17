import {
  type ApiResourceItem,
  getResourceValidation,
  type ResourceKey,
} from '~/lib/resources'
import type { Reactive } from 'vue'
import type { Validation } from '@vuelidate/core'

export default async function <T extends ApiResourceItem<ApiId>>(
  resourceKey: ResourceKey,
  props: {
    triggerSubmit: boolean
    item: Partial<T>
  },
  emit,
): Promise<{
  item: Ref<Partial<T>>
  state: Reactive<Partial<T>>
  v$: Validation
}> {
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
