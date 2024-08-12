<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string
    code?: string
    color?: string
    loading?: boolean
  }>(),
  { code: '', loading: false },
)
const cardTestId = computed(() => (props.title ? 'app-data-card' : 'data-card'))
const toolbarTestId = computed(() => cardTestId.value + '-toolbar')
</script>

<template>
  <v-card :data-testid="cardTestId" :rounded="false" class="w-100 h-100">
    <v-toolbar
      :data-testid="toolbarTestId"
      density="compact"
      :color="color"
      :loading="loading"
    >
      <template #prepend>
        <slot name="toolbar-prepend" />
      </template>
      <template #title
        >{{ title }}
        <slot name="title-append" />
        <span v-if="code" class="font-weight-bold text-secondary pl-6"
          >{{ code }}
        </span>
      </template>
      <template #append>
        <slot name="toolbar-append" />
      </template>
    </v-toolbar>
    <slot>
      <div class="d-flex align-center justify-center" style="min-height: 400px">
        <v-progress-circular indeterminate :size="128" :width="12" />
      </div>
    </slot>
    <template #actions>
      <slot name="actions" />
    </template>
  </v-card>
</template>
