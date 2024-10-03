<script setup lang="ts">
import type { ApiResourceSite, ResourcePageKey } from '~~/types'

type RT = ApiResourceSite
const props = defineProps<{
  item: Partial<RT>
  resourcePageKey: ResourcePageKey
}>()

const { item } = toRefs(props)
const { tab } = useResourceTabState(props.resourcePageKey)
const bgColor = DATA_API_ACTIONS_BAR_COLOR['read']
</script>

<template>
  <v-tabs v-model="tab" color="anchor" :bg-color="bgColor">
    <v-tab value="data">data</v-tab>
    <v-tab value="sus">stratigraphic units</v-tab>
  </v-tabs>
  <v-tabs-window v-model="tab">
    <v-tabs-window-item value="data">
      <lazy-data-item-site-form v-if="item" :item="item" mode="read" />
    </v-tabs-window-item>
    <v-tabs-window-item value="sus">
      <lazy-data-collection-card
        resource-key="stratigraphicUnit"
        :parent="['site.id', item.id]"
      />
    </v-tabs-window-item>
  </v-tabs-window>
</template>
