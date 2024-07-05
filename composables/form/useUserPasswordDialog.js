export default function () {
  const { set, plainPassword, clear } = useUserPlainPasswordState()
  const { show } = useAppSnackbarState()
  const userItem = ref({})
  const pending = ref(false)

  const isResetPasswordDialogVisible = ref(false)

  const resetPassword = async (patchItem) => {
    const newPlainPassword = generatePassword()
    pending.value = true
    try {
      await patchItem(
        {
          ...userItem.value,
          plainPassword: newPlainPassword,
        },
        userItem.value,
      )
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

  const openResetPasswordDialog = (item) => {
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
