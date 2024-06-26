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
  return !props.item._acl.canRead
})
const color = computed(() => {
  return disabled.value ? '' : 'primary'
})
</script>

<template>
  <v-btn
    :color="color"
    density="compact"
    :disabled="disabled"
    :icon="true"
    nuxt
    :to="`${resource.appPath}/${item.id}`"
    variant="text"
  >
    <v-icon :color="color" icon="fas fa-arrow-right" size="xsmall" />
    <v-tooltip activator="parent" location="bottom">View item</v-tooltip>
  </v-btn>
</template>

<style scoped></style>
