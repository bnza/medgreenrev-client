<script setup lang="ts">
import { useResourceTabState } from '~/composables/states/useResourceTabState'

definePageMeta({
  auth: false,
})

const route = useRoute()

const id = ref(routeParamIdToInt(route.params.id))
const { resourceConfig, fetchItem, itemLabel, resourcePageKey } =
  await useResource<ApiResourceSample>('samples')
const { item, error, code } = await fetchItem(id)

const { hasRoleAdmin } = useAppAuth()

const { tab } = useResourceTabState(resourcePageKey)
const bgColor = DATA_API_ACTIONS_BAR_COLOR['read']
</script>

<template>
  <resource-not-found
    v-if="error"
    :path="resourceConfig.appPath"
    :error="error"
  />
  <data-card v-if="item" :title="itemLabel" :code="code">
    <template #toolbar-append>
      <navigation-resource-item-update
        class="mr-4"
        :item="item"
        :app-path="resourceConfig.appPath"
        size="large"
      />
      <navigation-resource-item-delete
        class="mr-4"
        :item="item"
        :app-path="resourceConfig.appPath"
        size="large"
      />
    </template>
    <template #toolbar-prepend>
      <navigation-resource-collection-list />
    </template>
    <template #default>
      <v-tabs v-model="tab" color="anchor" :bg-color="bgColor">
        <v-tab value="data">data</v-tab>
        <v-tab value="mus">microstratigraphic units</v-tab>
      </v-tabs>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="data">
          <lazy-data-item-sample-form v-if="item" :item="item" mode="read" />
        </v-tabs-window-item>
        <v-tabs-window-item value="mus">
          <v-empty-state title="No items found" />
        </v-tabs-window-item>
      </v-tabs-window>
    </template>
  </data-card>
</template>
