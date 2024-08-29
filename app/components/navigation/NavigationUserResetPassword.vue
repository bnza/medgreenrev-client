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
const { userIdentifier } = useAppAuth()
const { size } = toRefs(props)
const disabled = computed(() => {
  return userIdentifier.value === props.item.email
})
const emit = defineEmits(['click'])
</script>

<template>
  <v-btn
    density="compact"
    :disabled="disabled"
    :icon="true"
    nuxt
    variant="text"
    @click="emit('click')"
    data-testid="reset-pw-button"
  >
    <v-icon color="primary" icon="fas fa-rotate" :size="size" />
    <v-tooltip activator="parent" location="bottom">Reset password</v-tooltip>
  </v-btn>
</template>
