<script setup lang="ts">
import { useResourceTabState } from '~/composables/states/useResourceTabState'

definePageMeta({
  auth: false,
})

const route = useRoute()

const id = ref(routeParamIdToInt(route.params.id))
const { resourceConfig, fetchItem, itemLabel } = await useResource('sites')
const { item, error, code } = await fetchItem(id)

const { hasRoleAdmin } = useAppAuth()

const { tab } = useResourceTabState('sites')
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
        :resource="resourceConfig"
        size="large"
      />
      <navigation-resource-item-delete
        class="mr-4"
        :item="item"
        :resource="resourceConfig"
        size="large"
      />
    </template>
    <template #toolbar-prepend>
      <navigation-resource-collection-list :path="resourceConfig.appPath" />
    </template>
    <template #default>
      <v-tabs
        v-model="tab"
        color="anchor"
        :bg-color="DATA_API_ACTIONS_BAR_COLOR[API_ACTIONS.Read]"
      >
        <v-tab value="data">data</v-tab>
        <v-tab value="sus">stratigraphic units</v-tab>
        <v-tab v-if="hasRoleAdmin" value="users">users</v-tab>
      </v-tabs>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="data">
          <lazy-data-item-site-form
            v-if="item"
            :item="item"
            :mode="API_ACTIONS.Read"
          />
        </v-tabs-window-item>
        <v-tabs-window-item
          value="sus"
          data-testid="tabs-window-stratigraphic-units"
        >
          <lazy-data-collection-child-card
            :parent="{ 'site.id': id }"
            resource-key="stratigraphicUnits"
          />
        </v-tabs-window-item>
        <v-tabs-window-item
          v-if="hasRoleAdmin"
          value="users"
          data-testid="tabs-window-sites-users"
        >
          <lazy-data-collection-child-card
            :parent="{ 'site.id': id }"
            resource-key="sitesUsers"
          />
        </v-tabs-window-item>
      </v-tabs-window>
    </template>
  </data-card>
</template>
