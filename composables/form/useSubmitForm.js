import { getResourceValidation } from '~/lib/resources/index.ts'

export default async function (resourceKey, props, emit) {
  if (!('triggerSubmit' in props)) {
    console.error('triggerSubmit prop is mandatory')
    return
  }

  if (!('item' in props)) {
    console.error('item prop is mandatory')
    return
  }

  const { triggerSubmit, item } = toRefs(props)

  const useResourceValidation = await getResourceValidation(resourceKey)
  const { state, v$ } = useResourceValidation(item, emit)
  watch(triggerSubmit, async (trigger) => {
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
