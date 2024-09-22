<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    appPath: string
    item: (ResourceAclItem & ApiResourceItem<ApiId>) | ApiResourceItem<any>
    size?: string
    back?: boolean
  }>(),
  {
    size: 'xsmall',
    back: false,
  },
)

const disabled = computed(() => {
  return '_acl' in props.item ? !props.item._acl.canRead : true
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
    data-testid="read-item-button"
  >
    <v-icon :color="color" :icon="icon" :size="size" />
    <v-tooltip activator="parent" location="bottom">View item</v-tooltip>
  </v-btn>
</template>

<style scoped></style>
