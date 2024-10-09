<script setup lang="ts">
import type { ApiResourcePottery } from '~~/types'

const { resourcePageKey } = useResource<ApiResourcePottery>('pottery', {})
const { tab } = useResourceTabState(resourcePageKey)
const bgColor = DATA_API_ACTIONS_BAR_COLOR['read']

const { isAuthenticated } = useAppAuth()
</script>

<template>
  <lazy-data-item-page resource-key="pottery" mode="read">
    <template #default="{ item, resourcePageKey }">
      <v-tabs v-model="tab" color="anchor" :bg-color="bgColor">
        <v-tab value="data">data</v-tab>
        <!--        <v-tab value="sus">stratigraphic units</v-tab>-->
      </v-tabs>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="data">
          <lazy-data-item-pottery-form v-if="item" :item="item" mode="read" />
        </v-tabs-window-item>
        <!--        <v-tabs-window-item-->
        <!--          value="sus"-->
        <!--          data-testid="tabs-window-stratigraphic-units"-->
        <!--        >-->
        <!--          <lazy-data-collection-card-->
        <!--            v-if="isApiResourceItem(item)"-->
        <!--            resource-key="stratigraphicUnit"-->
        <!--            :parent="['site.id', item.id]"-->
        <!--            :create-button="isAuthenticated"-->
        <!--          />-->
        <!--        </v-tabs-window-item>-->
      </v-tabs-window>
    </template>
  </lazy-data-item-page>
</template>
