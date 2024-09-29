import type { Validation } from '@vuelidate/core'

export function useEmitValidationInvalid<T>(
  v$: Ref<Validation> | Ref<Validation<Record<string, any>, T>>,
  emit: (event: 'update:invalid', ...args: any[]) => void,
) {
  watch(
    () => v$.value.$invalid,
    (invalid) => {
      emit('update:invalid', invalid)
    },
    {
      immediate: true,
    },
  )
}
