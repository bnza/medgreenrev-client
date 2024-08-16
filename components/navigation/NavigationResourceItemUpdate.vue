<script setup lang="ts">
import type { ResourceAclItem } from '~/lib/resources'

const props = withDefaults(
  defineProps<{
    appPath: string
    item: ResourceAclItem
    size?: string
  }>(),
  {
    size: 'xsmall',
  },
)

const disabled = computed(() => {
  return !props.item._acl.canUpdate
})
const color = computed(() => {
  return disabled.value ? '' : 'success'
})
</script>

<template>
  <v-btn
    :color="color"
    density="compact"
    :disabled="disabled"
    :icon="true"
    nuxt
    :to="`${appPath}/${item.id}/update`"
    variant="text"
    data-testid="update-item-button"
  >
    <v-icon icon="fas fa-check" :size="size" />
    <v-tooltip activator="parent" location="bottom">Edit item</v-tooltip>
  </v-btn>
</template>

<style scoped></style>
