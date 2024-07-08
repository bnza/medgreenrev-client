<script setup>
defineProps({
  isOpen: Boolean,
})
defineEmits(['update:isOpen'])
const { show } = useAppSnackbarState()
const { signOut } = useAuth()
const signOutAndFeedBack = async () => {
  await signOut({ callbackUrl: '/' })
  show({
    color: 'success',
    text: `User successfully logged out`,
    timeout: 4000,
  })
}
</script>

<template>
  <v-dialog
    :model-value="isOpen"
    width="400px"
    :persistent="true"
    data-testid="logout-dialog"
  >
    <v-card>
      <v-card-title class="text-secondary">Logout</v-card-title>
      <v-card-text> Are you sure you want to logout?</v-card-text>
      <v-card-actions>
        <v-btn color="anchor" @click="$emit('update:isOpen', false)"
          >Cancel
        </v-btn>
        <v-spacer />
        <v-btn color="secondary" @click="signOutAndFeedBack()">Logout</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
