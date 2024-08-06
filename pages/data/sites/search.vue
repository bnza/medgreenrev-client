<script setup>
import { useResourceFiltersState } from '~/composables'

definePageMeta({
  auth: false,
})
const { resourceConfig } = useResourceSite('data-sites')

const resourceFilterState = useResourceFiltersState({
  routeName: 'data-sites',
  resourceConfig,
})
provide('resourceFiltersState', resourceFilterState)

const { isAddFilterDialogOpen, setFilterAndCloseDialog, setFiltersAndClose } =
  resourceFilterState
</script>

<template>
  <lazy-filters-add-filter-dialog />
  <lazy-app-data-card title="Search (Sites)">
    <template #toolbar-prepend>
      <navigation-resource-collection-list :path="resourceConfig.appPath" />
    </template>
    <template #toolbar-append>
      <lazy-navigation-resource-filter-add size="large" />
    </template>
    <filters-list />
    <template #actions>
      <v-btn
        :icon="true"
        variant="text"
        nuxt
        data-testid="close-button"
        color="anchor"
        :to="resourceConfig.appPath"
      >
        <v-icon icon="fas fa-xmark" size="large" />
        <v-tooltip activator="parent" location="bottom">Close</v-tooltip>
      </v-btn>
      <v-spacer />
      <v-btn
        data-testid="submit-button"
        class="mx-4"
        color="anchor"
        variant="text"
        :icon="true"
        @click="setFiltersAndClose(resourceConfig)"
      >
        <v-icon icon="fas fa-arrow-up-from-bracket" />
        <v-tooltip activator="parent" location="bottom">Submit</v-tooltip>
      </v-btn>
    </template>
  </lazy-app-data-card>
</template>

<style scoped></style>
