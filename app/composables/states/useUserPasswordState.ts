import type { ApiResourceItem } from '~~/types'

type UseUserPasswordState = ReturnType<typeof useUserPasswordState>
export const userPasswordStateInjectionKey =
  Symbol() as InjectionKey<UseUserPasswordState>
export const useUserPasswordState = () => {
  const { plainPassword } = useUserPlainPasswordState()
  const _isPasswordDialogOpen = ref(false)
  const isPasswordDialogOpen = computed({
    get() {
      return _isPasswordDialogOpen.value || Boolean(plainPassword.value)
    },
    set(flag: boolean) {
      _isPasswordDialogOpen.value = flag
      if (!flag) {
        plainPassword.value = ''
      }
    },
  })
  const isValidUser = (
    item: Record<string, any>,
  ): item is ApiResourceItem & { email: string } =>
    'id' in item && 'email' in item
  return { plainPassword, isPasswordDialogOpen, isValidUser }
}

export default useUserPasswordState
