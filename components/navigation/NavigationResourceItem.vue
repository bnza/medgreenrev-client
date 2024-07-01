<script setup>
defineProps({
  resource: {
    type: Object,
  },
  item: {
    type: Object,
    validator(value) {
      return 'id' in value
    },
  },
})
</script>

<template>
  <div class="item-nav">
    <slot name="prepend" />
    <navigation-resource-item-read :resource="resource" :item="item" />
    <navigation-resource-item-update :resource="resource" :item="item" />
    <navigation-resource-item-delete :resource="resource" :item="item" />
    <slot name="append" />
  </div>
</template>
