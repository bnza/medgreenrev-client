<script setup>
defineProps({
  item: {
    type: Object,
    validator(value) {
      return 'id' in value
    },
  },
})
</script>

<template>
  <v-form v-if="item" @submit.prevent class="pa-6">
    <v-text-field
      :readonly="true"
      variant="underlined"
      :model-value="item.code"
      label="code"
    />
    <v-text-field
      :readonly="true"
      variant="underlined"
      :model-value="item.name"
      label="name"
    />
    <v-textarea
      :readonly="true"
      variant="underlined"
      label="description"
      v-model="item.description"
    />
  </v-form>
</template>
