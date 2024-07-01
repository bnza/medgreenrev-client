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
})
const { plainPassword } = useUserPlainPasswordState()

const isOpen = computed(
  () => !!plainPassword.value || Object.keys(props.item).length > 0,
)

const emit = defineEmits(['close', 'resetPassword'])

watch(plainPassword, (newValue, oldValue) => {
  if (!!oldValue) {
    emit('close')
  }
})
</script>

<template>
  <v-dialog :model-value="isOpen" width="400px" :persistent="true">
    <v-card>
      <v-card-title
        >User:
        <span class="text-secondary">{{ props.item.email }}</span></v-card-title
      >
      <show-user-password-card-content v-if="plainPassword" />
      <show-reset-user-password-card-content
        v-else
        @close="emit('close')"
        @reset-password="emit('resetPassword')"
      />
    </v-card>
  </v-dialog>
</template>
