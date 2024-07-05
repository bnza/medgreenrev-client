export default function () {
  const { set, plainPassword, reset } = useUserPlainPasswordState()
  const { show } = useAppSnackbarState()
  const resetPasswordUserItem = ref({})
  const pending = ref(false)

  const isResetPasswordDialogVisible = ref(false)

  const resetPassword = async (patchItem, oldItem) => {
    const newPlainPassword = generatePassword()
    pending.value = true
    try {
      await patchItem({ ...oldItem, plainPassword: newPlainPassword }, oldItem)
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
    resetPasswordUserItem.value = Object.assign({}, item || {})
    isResetPasswordDialogVisible.value = true
  }

  return {
    pending,
    isResetPasswordDialogVisible,
    openResetPasswordDialog,
    setState: set,
    plainPassword,
    resetState: reset,
    resetPasswordUserItem,
    resetPassword,
  }
}
