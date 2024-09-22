<script setup lang="ts">
import { useRouteStackState } from '~/composables/states/useRouteStackState'

withDefaults(
  defineProps<{
    tooltipText?: string
  }>(),
  {
    tooltipText: 'Back',
  },
)

const { pop } = useRouteStackState()
const router = useRouter()
const back = () => {
  router.replace(pop())
}
</script>

<template>
  <v-tooltip location="bottom" :text="tooltipText">
    <template #activator="{ props }">
      <v-btn :icon="true" @click="back()" data-testid="button-navigation-back">
        <v-icon class="mx-3" v-bind="props" icon="fas fa-arrow-left" />
      </v-btn>
    </template>
  </v-tooltip>
</template>
