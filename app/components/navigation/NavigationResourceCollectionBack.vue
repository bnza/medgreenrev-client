<script setup lang="ts">
withDefaults(
  defineProps<{
    replace?: boolean
    tooltipText?: string
  }>(),
  {
    replace: false,
    tooltipText: 'Back',
  },
)
const to = computed(() => history.state?.back || '/')
</script>

<template>
  <v-tooltip location="bottom" :text="tooltipText">
    <template #activator="{ props }">
      <NuxtLink :to :replace data-testid="navigation-link-back">
        <v-icon class="mx-3" v-bind="props" icon="fas fa-arrow-left" />
      </NuxtLink>
    </template>
  </v-tooltip>
</template>
