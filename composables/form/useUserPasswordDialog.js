export default function () {
  const { set, plainPassword, reset } = useUserPlainPasswordState()
  const { show } = useAppSnackbarState()
  const resetPasswordUserItem = ref({})
  const pending = ref(false)
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
      pending.value = false
    }

    set(newPlainPassword)
  }

  const isResetPasswordDialogOpen = ref(false)

  const openResetPasswordDialog = (item) => {
    resetPasswordUserItem.value = item
    isResetPasswordDialogOpen.value = true
  }

  watch(isResetPasswordDialogOpen, (value) => {
    if (!value) {
      resetPasswordUserItem.value = {}
      reset()
    }
  })

  onMounted(() => {
    if (plainPassword.value) {
      isResetPasswordDialogOpen.value = true
    }
  })

  onUnmounted(() => {
    reset()
  })

  return {
    pending,
    isResetPasswordDialogOpen,
    openResetPasswordDialog,
    setState: set,
    plainPassword,
    resetState: reset,
    resetPasswordUserItem,
    resetPassword,
  }
}
