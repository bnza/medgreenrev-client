/**
 * * @param {Object} options - The employee who is responsible for the project.
 *  * @param {string} options.mode - Form mode: 'create', 'update', 'delete', 'read'
 */
function useDataForm({ type }) {
  const readonly = computed(() => ['read', 'delete'].includes(type))
  return { readonly }
}

export default useDataForm
