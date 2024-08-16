<script setup lang="ts">
import type { ResourceAclItem, ResourcePageKey } from '~/lib/resources'

const props = withDefaults(
  defineProps<{
    appPath: string
    pageKey: ResourcePageKey
    item: ResourceAclItem
    size?: string
    back?: boolean
  }>(),
  {
    size: 'xsmall',
    back: false,
  },
)

const disabled = computed(() => {
  return !props.item._acl.canRead
})
const color = computed(() => {
  return disabled.value ? '' : props.back ? 'anchor' : 'primary'
})
const icon = computed(() => `fas fa-arrow-${props.back ? 'left' : 'right'}`)
</script>

<template>
  <v-btn
    :color="color"
    density="compact"
    :disabled="disabled"
    :icon="true"
    nuxt
    :to="`${appPath}/${item.id}`"
    variant="text"
  >
    <v-icon :color="color" :icon="icon" :size="size" />
    <v-tooltip activator="parent" location="bottom">View item</v-tooltip>
  </v-btn>
</template>

<style scoped></style>
