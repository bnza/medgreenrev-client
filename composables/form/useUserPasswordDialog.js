export default function () {
  const { set, plainPassword, reset } = useUserPlainPasswordState()
  const resetPasswordUserItem = ref({})
  const resetPassword = async (patchItem, oldItem) => {
    const newPlainPassword = generatePassword()
    await patchItem({ ...oldItem, plainPassword: newPlainPassword }, oldItem)
    set(newPlainPassword)
  }

  onUnmounted(() => {
    reset()
  })

  return {
    setState: set,
    plainPassword,
    resetState: reset,
    resetPasswordUserItem,
    resetPassword,
  }
}
