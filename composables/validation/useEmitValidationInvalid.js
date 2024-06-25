export function useEmitValidationInvalid(v$, emit) {
  watch(
    () => v$.value.$invalid,
    (invalid) => emit('update:invalid', invalid),
    {
      immediate: true,
    },
  )
}
