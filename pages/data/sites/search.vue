<script setup>
import { useResourceFiltersState } from '~/composables'

definePageMeta({
  auth: false,
})
const { resourceConfig } = useResourceSite('data-sites')
const isAddFilterDialogOpen = ref(false)

const resourceFilterState = useResourceFiltersState('data-sites')
provide('resourceFiltersState', resourceFilterState)

// const { setFilter, setFilters, state } = useResourceFiltersState('data-sites')
const setFilterAndCloseDialog = (rawFilter) => {
  resourceFilterState.setFilter(rawFilter)
  isAddFilterDialogOpen.value = false
}
const router = useRouter()
const setFiltersAndClose = () => {
  resourceFilterState.setFilters()
  router.replace(resourceConfig.appPath)
}
</script>

<template>
  <lazy-filters-add-filter-dialog
    v-model="isAddFilterDialogOpen"
    @add-filter="setFilterAndCloseDialog($event)"
  />
  <lazy-app-data-card title="Search (Sites)">
    <template #toolbar-prepend>
      <navigation-resource-collection-list :path="resourceConfig.appPath" />
    </template>
    <template #toolbar-append>
      <lazy-navigation-resource-filter-add
        size="large"
        @click="isAddFilterDialogOpen = true"
      />
    </template>
    <filters-list :map="resourceFilterState.state._filters" />
    <template #actions>
      <v-tooltip location="bottom" text="Close">
        <template #activator="{ props }">
          <v-btn
            nuxt
            data-testid="close-button"
            color="anchor"
            :to="resourceConfig.appPath"
            icon="fas fa-xmark"
            v-bind="props"
          />
        </template>
      </v-tooltip>
      <v-spacer />
      <v-btn
        class="mx-4"
        color="anchor"
        rounded="false"
        variant="text"
        :icon="true"
        @click="setFiltersAndClose()"
      >
        <v-icon icon="fas fa-arrow-up-from-bracket" />
        <v-tooltip activator="parent" location="bottom">Add filter</v-tooltip>
      </v-btn>
    </template>
  </lazy-app-data-card>
</template>

<style scoped></style>
