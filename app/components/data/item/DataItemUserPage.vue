<script setup lang="ts">
import type { ApiResourceUser, ResourcePageKey } from '~~/types'

type RT = ApiResourceUser
const props = defineProps<{
  item: Partial<RT>
  resourcePageKey: ResourcePageKey
}>()

const { tab } = useResourceTabState(props.resourcePageKey)
const bgColor = DATA_API_ACTIONS_BAR_COLOR['read']

const { isValidUser } = inject(userPasswordStateInjectionKey)
</script>

<template>
  <lazy-user-password-dialog v-if="isValidUser(item)" :item :mode="'reset'" />
  <v-tabs v-model="tab" color="anchor" :bg-color="bgColor">
    <v-tab value="data">data</v-tab>
    <v-tab value="sites">sites</v-tab>
  </v-tabs>
  <v-tabs-window v-model="tab">
    <v-tabs-window-item value="data">
      <lazy-data-item-user-form v-if="item" :item="item" mode="read" />
    </v-tabs-window-item>
    <v-tabs-window-item value="sites" data-testid="tabs-window-sites">
      <!--      <lazy-data-collection-card-->
      <!--        resource-key="stratigraphicUnit"-->
      <!--        :parent="['site.id', item.id]"-->
      <!--      />-->
    </v-tabs-window-item>
  </v-tabs-window>
</template>
