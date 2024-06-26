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
})

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
    :to="`${resource.appPath}/${item.id}/delete`"
    variant="text"
  >
    <v-icon icon="fas fa-xmark" />
    <v-tooltip activator="parent" location="bottom">Delete item</v-tooltip>
  </v-btn>
</template>
