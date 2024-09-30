<script setup lang="ts">
const isOpen = defineModel<boolean>()
const { showSuccess } = useAppSnackbarState()
const { signOut } = useAuth()
const signOutAndFeedBack = async () => {
  await signOut({ callbackUrl: '/' })
  showSuccess({
    text: `User successfully logged out`,
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
        <v-btn color="anchor" @click="isOpen = false">Cancel </v-btn>
        <v-spacer />
        <v-btn color="secondary" @click="signOutAndFeedBack()">Logout</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
