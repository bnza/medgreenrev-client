<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <v-card data-testid="app-data-card" :rounded="false" class="w-100 h-100">
    <v-toolbar data-testid="app-data-card-toolbar" density="compact">
      <template #prepend>
        <slot name="toolbar-prepend" />
      </template>
      <template #title
        >{{ title }}
        <span v-if="code" class="font-weight-bold text-secondary pl-6"
          >{{ code }}
        </span>
      </template>
      <template #append>
        <slot name="toolbar-append" />
      </template>
    </v-toolbar>
    <slot data-testid="app-data-card-table" />
  </v-card>
</template>
