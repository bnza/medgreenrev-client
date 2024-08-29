export function useApiValidator() {
  return useNuxtApp().$api.autocomplete
}

export default useApiValidator
