<script setup lang="ts" generic="RT extends ApiResourceUser">
import type { ApiResourceUser, ResourceKey } from '~/lib/resources'

const tableProps = defineProps<{
  items: Array<RT>
  totalItems: number
  pending: boolean
}>()
const { items, pending, totalItems } = toRefs(tableProps)
const paginationOptions =
  defineModel<PaginationOptionsState>('paginationOptions')

const resourceKey: ResourceKey = 'users'
const { headers, resourcePageKey } = await useResource(resourceKey, {
  resourceOperationType: 'collection',
})

const emit = defineEmits(['openResetPasswordDialog'])
</script>

<template>
  <v-data-table-server
    :items-per-page-options="ITEMS_PER_PAGE_OPTIONS"
    :items-per-page="paginationOptions.itemsPerPage"
    :headers="headers"
    :items-length="totalItems"
    :items="items"
    :page="paginationOptions.page"
    :loading="pending"
    :sort-by="paginationOptions.sortBy"
    :fixed-header="true"
    density="compact"
    @update:options="Object.assign(paginationOptions, $event)"
  >
    <template #[`item.id`]="{ item }">
      <navigation-resource-item :page-key="resourcePageKey" :item>
        <template #prepend>
          <lazy-navigation-user-reset-password
            :item="item"
            @click="emit('openResetPasswordDialog', item)"
          />
        </template>
      </navigation-resource-item>
    </template>
    <template #[`item.roles`]="{ item }">
      {{ reduceAppRoles(item.roles) }}
    </template>
  </v-data-table-server>
</template>
