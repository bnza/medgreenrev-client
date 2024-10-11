<script setup lang="ts">
import type { ApiResourcePottery } from '~~/types'

const { resourcePageKey } = useResource<ApiResourcePottery>('sitesUser')
const bgColor = DATA_API_ACTIONS_BAR_COLOR['read']
</script>

<template>
  <lazy-data-item-page resource-key="sitesUser" mode="read" code-key="id">
    <template #default="{ item, resourcePageKey }">
      <lazy-data-item-sites-user-form v-if="item" :item="item" mode="read" />
    </template>
  </lazy-data-item-page>
</template>
