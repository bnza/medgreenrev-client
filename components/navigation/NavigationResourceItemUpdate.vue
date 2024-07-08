<script setup>
const props = defineProps({
  resource: {
    type: Object,
    validator(value) {
      return 'appPath' in value
    },
  },
  item: {
    type: Object,
    validator(value) {
      return 'id' in value && '_acl' in value
    },
  },
  size: {
    type: String,
    default: 'xsmall',
  },
})

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
    :to="`${resource.appPath}/${item.id}/update`"
    variant="text"
    data-testid="update-item-button"
  >
    <v-icon icon="fas fa-check" :size="size" />
    <v-tooltip activator="parent" location="bottom">Edit item</v-tooltip>
  </v-btn>
</template>

<style scoped></style>
