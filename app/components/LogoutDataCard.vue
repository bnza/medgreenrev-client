<script setup lang="ts">
const isOpen = defineModel<boolean>()
const { showSuccess } = useAppSnackbarState()
const { signOut } = useAuth()

const { prev } = useDataUiModeState()
const signOutAndFeedBack = async () => {
  await signOut({ callbackUrl: '/' })
  showSuccess({
    text: `User successfully logged out`,
  })
  prev()
}
</script>

<template>
  <v-card data-testid="log-data-card" width="400px">
    <v-card-title class="text-secondary">Logout</v-card-title>
    <v-card-text> Are you sure you want to logout?</v-card-text>
    <v-card-actions>
      <v-btn color="anchor" @click="prev">Cancel </v-btn>
      <v-spacer />
      <v-btn color="secondary" @click="signOutAndFeedBack()">Logout</v-btn>
    </v-card-actions>
  </v-card>
</template>
