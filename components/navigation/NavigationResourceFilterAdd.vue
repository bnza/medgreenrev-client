<script setup>
const props = defineProps({
  size: {
    type: String,
    default: 'xsmall',
  },
})
const { size } = toRefs(props)
const emit = defineEmits(['click'])
</script>

<template>
  <v-btn
    class="mr-4"
    density="compact"
    :icon="true"
    variant="text"
    @click="emit('click')"
    data-testid="add-filter-btn"
  >
    <v-icon icon="fas fa-plus" :size="size" />
    <v-tooltip activator="parent" location="bottom">Add filter</v-tooltip>
  </v-btn>
</template>
