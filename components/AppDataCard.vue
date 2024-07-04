<script setup>
import { DATA_API_ACTIONS_BAR_COLOR } from '~/lib/constants/enums.js'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    default: '',
  },
  mode: {
    type: String,
    default: API_ACTIONS.Read,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const color = computed(() => DATA_API_ACTIONS_BAR_COLOR[props.mode])
</script>

<template>
  <v-card data-testid="app-data-card" :rounded="false" class="w-100 h-100">
    <v-toolbar
      data-testid="app-data-card-toolbar"
      density="compact"
      :color="color"
      :loading="loading"
    >
      <template #prepend>
        <slot name="toolbar-prepend" />
      </template>
      <template #title
        >{{ title }}
        <span
          v-if="mode !== API_ACTIONS.Read"
          style="font-size: small; text-transform: uppercase"
        >
          ({{ mode }})</span
        >
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
  </v-card>
</template>
