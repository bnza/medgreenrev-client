function useDataFormCode(resourceConfig, state, emit) {
  const proxyCode = computed({
    get() {
      return resourceConfig.getCodeFn(unref(state))
    },
    set(newValue) {
      emit('update:code', newValue)
    },
  })
  return { proxyCode }
}

export default useDataFormCode
