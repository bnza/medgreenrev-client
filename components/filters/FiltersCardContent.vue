<script setup>
// import { useResourceFiltersState } from '~/composables/states/useResourceFiltersState.js'
//
// const props = defineProps({
//   mapKey: {
//     type: String,
//     required: true,
//   },
// })
// const { filters, isEmpty } = useResourceFiltersState(props.mapKey)
</script>

<template>
  <v-card-text class="h-75">
    <!--    <v-empty-state-->
    <!--      v-if="isEmpty"-->
    <!--      height="v-100"-->
    <!--      title="No filter selected"-->
    <!--      text="No filter selected yet. Please add new filters clicking the plus button in the top right corner"-->
    <!--    />-->
    <slot />
  </v-card-text>
  <v-card-actions> actions</v-card-actions>
</template>
