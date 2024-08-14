<script setup>
const props = defineProps({
  path: {
    type: String,
    required: true,
  },
  tooltipText: {
    type: String,
    default: 'Show resource list',
  },
})

const to = computed(() => {
  if (history.state.back) {
    return history.state.back
  }
  return props.path
})
</script>

<template>
  <v-tooltip location="bottom" :text="tooltipText">
    <template #activator="{ props }">
      <NuxtLink :to>
        <v-icon class="mx-3" v-bind="props" icon="fas fa-arrow-left" />
      </NuxtLink>
    </template>
  </v-tooltip>
</template>
