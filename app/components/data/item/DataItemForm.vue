<script setup lang="ts">
import type { ApiAction } from '~~/types'

const props = defineProps<{
  mode: ApiAction
}>()
const { isAuthenticated } = useAppAuth()
const readonly = computed(
  () => ['read', 'delete'].includes(props.mode) && isAuthenticated.value,
)
const form = useTemplateRef('form')

const { isValid, submitPending, triggerSubmit, submittingItem } = inject(
  dataItemPageInjectionKey,
)

watchEffect(() => {
  if (form.value) {
    isValid.value = Boolean(form.value.isValid)
  }
})
</script>

<template>
  <v-form :readonly="readonly" @submit.prevent ref="form">
    <v-container>
      <lazy-delete-item-alert v-if="mode === 'delete'" />
      <slot :readonly />
    </v-container>
  </v-form>
</template>

<style scoped></style>
