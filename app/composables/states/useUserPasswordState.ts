import type { ApiId, ApiResourceItem, SubmitStatus } from '~~/types'
import { useNuxtApp } from '#app'

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

  const submitStatus: Ref<SubmitStatus> = ref('idle')
  const isValidUser = (
    item: Record<string, any>,
  ): item is ApiResourceItem & { email: string } =>
    'id' in item && 'email' in item

  const { showError, showSuccess } = useAppSnackbarState()
  const repository = useNuxtApp().$api.userRepository
  const resetPassword = async (id: ApiId) => {
    const newPlainPassword = generatePassword()
    submitStatus.value = 'pending'
    try {
      await repository.patchItem(id, { plainPassword: newPlainPassword })
      plainPassword.value = newPlainPassword
      submitStatus.value = 'success'
      showSuccess('Successfully reset password')
    } catch (e) {
      submitStatus.value = 'error'
      showError(e.message)
    }
  }
  return {
    plainPassword,
    isPasswordDialogOpen,
    isValidUser,
    resetPassword,
    submitStatus,
  }
}

export default useUserPasswordState
