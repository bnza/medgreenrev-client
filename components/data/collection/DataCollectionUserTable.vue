<script setup>
const tableProps = defineProps(resourceDataTableProps)
const { items, pending, totalItems } = toRefs(tableProps)
const paginationOptions = defineModel('paginationOptions')

const { headers, resourceConfig } = useResourceUser()

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
      <navigation-resource-item :resource="resourceConfig" :item="item">
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
