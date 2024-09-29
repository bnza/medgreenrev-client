<script setup lang="ts">
import { resourceFilterStateInjectionKey } from '~/composables/states/useResourceFilterState'

const props = defineProps<{
  backPath: string
}>()
const { isEmpty, isChanged, setFiltersAndClose, clearFilters } = inject(
  resourceFilterStateInjectionKey,
)
const disabled = ref(true)
const submit = () => {
  setFiltersAndClose()
  disabled.value = false
}
</script>

<template>
  <v-spacer />
  <v-btn
    :icon="true"
    variant="text"
    nuxt
    data-testid="close-button"
    color="anchor"
    :to="backPath"
  >
    <v-icon icon="fas fa-xmark" size="large" />
    <v-tooltip activator="parent" location="bottom">Close</v-tooltip>
  </v-btn>
  <v-btn
    :icon="true"
    variant="text"
    :disabled="isEmpty"
    data-testid="clear-button"
    color="anchor"
    @click="clearFilters()"
  >
    <v-icon icon="fa fa-file" size="large" />
    <v-tooltip activator="parent" location="bottom">Clear</v-tooltip>
  </v-btn>
  <v-spacer />
  <v-btn
    data-testid="submit-button"
    class="mx-4"
    color="primary"
    :disabled="!isChanged && disabled"
    :icon="true"
    @click="setFiltersAndClose()"
  >
    <v-icon icon="fas fa-arrow-up-from-bracket" />
    <v-tooltip activator="parent" location="bottom">Submit</v-tooltip>
  </v-btn>
  <v-spacer />
</template>
