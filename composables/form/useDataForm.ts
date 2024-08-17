function useDataForm({ type }: { type: ApiAction }) {
  const readonly = computed(() => ['read', 'delete'].includes(type))
  return { readonly }
}

export default useDataForm
