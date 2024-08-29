export function useApiValidator() {
  return useNuxtApp().$api.validator
}

export default useApiValidator
