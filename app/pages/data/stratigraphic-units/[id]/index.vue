<script setup>
import { useResourceTabState } from '~/composables/states/useResourceTabState'

definePageMeta({
  auth: false,
})
const route = useRoute()

const id = ref(routeParamIdToInt(route.params.id))
const { resourceConfig, fetchItem, itemLabel, resourcePageKey } =
  await useResource('stratigraphicUnits')
const { item, error, code } = await fetchItem(id)

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
      <div>
        <v-tabs v-model="tab" color="anchor" :bg-color="bgColor">
          <v-tab value="data">data</v-tab>
          <v-tab value="relationships">relationships</v-tab>
          <v-tab value="samples">samples</v-tab>
          <v-tab value="media">media</v-tab>
        </v-tabs>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="data">
            <lazy-data-item-stratigraphic-unit-form
              v-if="item"
              :item="item"
              mode="read"
            />
          </v-tabs-window-item>
          <v-tabs-window-item
            value="relationships"
            data-testid="tabs-window-relationships"
          >
            <su-relationship-container v-if="item" :sx-su="item" />
          </v-tabs-window-item>
          <v-tabs-window-item value="samples" data-testid="tabs-window-samples">
            <lazy-data-collection-child-card
              :parent="{ 'stratigraphicUnit.id': id }"
              resource-key="samples"
            />
          </v-tabs-window-item>
          <v-tabs-window-item value="media" data-testid="tabs-window-media">
            <lazy-media-object-join-container
              resource-key="stratigraphicUnitsMediaObjects"
              :parent="{ 'item.id': id }"
              :can-update="item._acl.canUpdate"
            />
          </v-tabs-window-item>
        </v-tabs-window>
      </div>
    </template>
  </data-card>
</template>

<style scoped></style>
