<script setup>
import { mergeProps } from 'vue'

const isLogoutDialogOpen = ref(false)
const { userIdentifier, roleColor } = useAppAuth()
</script>

<template>
  <v-menu>
    <template v-slot:activator="{ props: menu }">
      <v-tooltip location="left">
        <template v-slot:activator="{ props: tooltip }">
          <v-btn
            :color="roleColor"
            v-bind="mergeProps(menu, tooltip)"
            icon="fas fa-user"
            data-testid="auth-user-button"
          />
        </template>
        <span>{{ userIdentifier }}</span>
      </v-tooltip>
    </template>
    <v-list>
      <v-list-item
        data-testid="user-settings-me-link"
        prepend-icon="fas fa-user-gear"
        :title="userIdentifier"
        nuxt
        to="/settings/me"
      />
      <v-divider />
      <v-list-item
        prepend-icon="fas fa-right-from-bracket"
        @click="isLogoutDialogOpen = true"
        title="Logout"
      />
    </v-list>
  </v-menu>
  <auth-logout-confirmation-dialog v-model:is-open="isLogoutDialogOpen" />
</template>
