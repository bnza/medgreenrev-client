<script setup lang="ts">
import type { ApiResourceStratigraphicUnit } from '~~/types'

type RT = ApiResourceStratigraphicUnit

const { resourcePageKey } = useResource<RT>('stratigraphicUnit', {})
const { tab } = useResourceTabState(resourcePageKey)
const bgColor = DATA_API_ACTIONS_BAR_COLOR['read']
</script>

<template>
  <lazy-data-item-page resource-key="stratigraphicUnit" mode="read">
    <template #default="{ item }">
      <v-tabs v-model="tab" color="anchor" :bg-color="bgColor">
        <v-tab value="data">data</v-tab>
        <v-tab value="sites">samples</v-tab>
      </v-tabs>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="data">
          <lazy-data-item-stratigraphic-unit-form
            v-if="item"
            :item="item"
            mode="read"
          />
        </v-tabs-window-item>
        <v-tabs-window-item value="samples" data-testid="tabs-window-samples">
          <!--      <lazy-data-collection-card-->
          <!--        resource-key="stratigraphicUnit"-->
          <!--        :parent="['site.id', item.id]"-->
          <!--      />-->
        </v-tabs-window-item>
      </v-tabs-window>
    </template>
  </lazy-data-item-page>
</template>
