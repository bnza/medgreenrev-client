<script setup>
const route = useRoute()
const { set } = useLoginRedirectUrlState()

watch(
  () => route.fullPath,
  () => {
    set(route)
  },
  { immediate: true },
)
</script>

<template>
  <v-tooltip text="login">
    <template #activator="{ props }">
      <NuxtLink to="/login">
        <v-icon class="mr-6" v-bind="props" icon="fas fa-right-to-bracket" />
      </NuxtLink>
    </template>
  </v-tooltip>
</template>
