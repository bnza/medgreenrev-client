<script setup>
const props = defineProps({
  property: {
    type: String,
    required: true,
  },
})

const { property } = toRefs(props)
const { getAvailableOperatorsByProp } = inject('resourceFiltersState')
const availableOperators = getAvailableOperatorsByProp(property.value)
const operator = defineModel('operator')
</script>

<template>
  <Suspense>
    <v-select
      v-bind="$attrs"
      v-model="operator"
      :items="availableOperators"
      item-value="id"
      item-title="label"
      label="operator"
    />
    <template #fallback>
      <v-skeleton-loader type="text" />
    </template>
  </Suspense>
</template>

<style scoped></style>
