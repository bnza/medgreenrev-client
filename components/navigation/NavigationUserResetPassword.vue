<script setup>
const props = defineProps({
  item: {
    type: Object,
    validator(value) {
      return 'id' in value
    },
  },
  size: {
    type: String,
    default: 'xsmall',
  },
})

const { size } = toRefs(props)
const disabled = computed(() => {
  return false
})
const emit = defineEmits(['resetPassword'])
</script>

<template>
  <v-btn
    density="compact"
    :disabled="disabled"
    :icon="true"
    nuxt
    variant="text"
    @click="emit('resetPassword')"
  >
    <v-icon color="primary" icon="fas fa-rotate" :size="size" />
    <v-tooltip activator="parent" location="bottom">Reset password</v-tooltip>
  </v-btn>
</template>
