<script setup>
const props = defineProps({
  item: {
    type: Object,
    validator(value) {
      return (
        Object.keys(value).length === 0 || ('id' in value && 'email' in value)
      )
    },
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
  isPending: {
    type: Boolean,
    default: false,
  },
})
const { plainPassword } = useUserPlainPasswordState()

const { isOpen } = toRefs(props)

const emit = defineEmits(['close', 'resetPassword'])
</script>

<template>
  <v-dialog :model-value="isOpen" width="400px" :persistent="true">
    <v-card v-if="'email' in item">
      <v-card-title
        >User:
        <span class="text-secondary">{{ props.item.email }}</span></v-card-title
      >
      <show-user-password-card-content
        v-if="plainPassword"
        @close="emit('close')"
      />
      <show-reset-user-password-card-content
        v-else
        @close="emit('close')"
        @reset-password="emit('resetPassword')"
      />
    </v-card>
  </v-dialog>
</template>
