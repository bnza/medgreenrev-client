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

const router = useRouter()
const back = () => {
  if (history.state && history.state.back) {
    return router.back()
  }
  return router.push('/')
}
</script>

<template>
  <v-tooltip location="bottom" :text="tooltipText">
    <template #activator="{ props }">
      <NuxtLink @click="back()">
        <v-icon class="mx-3" v-bind="props" icon="fas fa-arrow-left" />
      </NuxtLink>
    </template>
  </v-tooltip>
</template>
