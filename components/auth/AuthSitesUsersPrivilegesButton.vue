<script setup lang="ts">
const props = defineProps<{ privileges: number }>()
const { getPrivilegeKey, getPrivilegeColor } = useSitesUsersPrivileges()
const key = getPrivilegeKey(props.privileges)
const color = SITES_ROLE_COLORS[key]
</script>

<template>
  <v-tooltip location="left">
    <template v-slot:activator="{ props: tooltip }">
      <v-btn
        :color="color"
        v-bind="tooltip"
        :icon="true"
        variant="plain"
        size="small"
        data-testid="auth-user-button"
      >
        <v-icon icon="fas fa-user" />
      </v-btn>
    </template>
    <span>{{ key }}</span>
  </v-tooltip>
</template>

<style scoped></style>
