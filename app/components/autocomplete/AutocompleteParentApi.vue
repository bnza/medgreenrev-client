<script setup lang="ts">
const props = defineProps<{
  resourceKey: ResourceKey
  id: ApiId
  label: string
}>()
const emit = defineEmits<{
  (e: 'fetched', item: ApiResourceItem<ApiId>): void
}>()
const { showError } = useAppSnackbarState()
const repository = useNuxtApp().$api.getRepository(props.resourceKey)
let error = undefined
let item = undefined
try {
  item = await repository.$fetchItem(props.id).then()
  emit('fetched', item)
} catch (e) {
  showError(e)
  error = e
}
</script>

<template>
  <v-text-field
    readonly
    :class="error ? 'error' : 'text-input-secondary'"
    variant="underlined"
    :model-value="error ? 'error' : item.code"
    :label
  />
</template>

<style scoped></style>
