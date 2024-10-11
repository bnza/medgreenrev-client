<script setup lang="ts">
import { SITES_ROLE_COLORS } from '~/utils'

const props = defineProps<{
  privileges: number
}>()

const key = getSitePrivilegeKey(props.privileges)
const color = SITES_ROLE_COLORS[key]
</script>

<template>
  <v-btn :color icon variant="plain" data-testid="auth-user-button">
    <v-icon icon="fas fa-user" />
    <v-tooltip activator="parent" location="bottom">{{ key }}</v-tooltip>
  </v-btn>
</template>

<style scoped></style>
