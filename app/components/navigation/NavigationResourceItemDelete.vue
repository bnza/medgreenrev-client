<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    appPath: string
    item: ResourceAclItem & ApiResourceItem<ApiId>
    size?: string
  }>(),
  {
    size: 'xsmall',
  },
)

const disabled = computed(() => {
  return !props.item._acl.canDelete
})
const color = computed(() => {
  return disabled.value ? '' : 'error'
})
</script>

<template>
  <v-btn
    :color="color"
    density="compact"
    :disabled="disabled"
    :icon="true"
    nuxt
    :to="`${appPath}/${item.id}/delete`"
    variant="text"
    data-testid="delete-item-button"
  >
    <v-icon icon="fas fa-minus" :size="size" />
    <v-tooltip activator="parent" location="bottom">Delete item</v-tooltip>
  </v-btn>
</template>
