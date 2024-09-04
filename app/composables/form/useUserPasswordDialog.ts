export default function () {
  const { set, plainPassword, clear } = useUserPlainPasswordState()
  const { show } = useAppSnackbarState()
  const userItem: Ref<Partial<ApiResourceUser>> = ref()
  const pending = ref(false)

  const isResetPasswordDialogVisible = ref(false)

  const resetPassword = async (patchItem: Function) => {
    const newPlainPassword = generatePassword()
    pending.value = true
    const oldItem = { id: userItem.value?.id }
    const newItem = { ...oldItem, plainPassword: newPlainPassword }
    try {
      await patchItem({ newItem, oldItem })
    } catch (e) {
      show({
        color: 'error',
        text: e.message,
        timeout: -1,
      })
    } finally {
      isResetPasswordDialogVisible.value = false
      pending.value = false
    }
    set(newPlainPassword)
  }

  const openResetPasswordDialog = (item: Partial<ApiResourceUser>) => {
    userItem.value = Object.assign({}, item || {})
    isResetPasswordDialogVisible.value = true
  }

  return {
    isResetPasswordPending: pending,
    isResetPasswordDialogVisible,
    openResetPasswordDialog,
    setPlainPassword: set,
    plainPassword,
    clearPlainPassword: clear,
    resetPasswordUserItem: userItem,
    resetPassword,
  }
}
