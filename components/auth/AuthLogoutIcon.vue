<script setup>
const isOpen = ref(false)
</script>

<template>
  <v-tooltip text="logout">
    <template #activator="{ props }">
      <v-icon
        class="mr-6"
        v-bind="props"
        @click="isOpen = true"
        icon="fas fa-right-from-bracket"
      />
    </template>
  </v-tooltip>
  <auth-logout-confirmation-dialog v-model:is-open="isOpen" />
</template>
