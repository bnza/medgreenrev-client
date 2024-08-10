<script setup lang="ts">
import { useResourceFiltersState } from '~/composables'

definePageMeta({
  auth: false,
})

const route = useRoute()

const id = ref(routeParamIdToInt(route.params.id))
const { resourceConfig, fetchItem, itemLabel } = useResourceSite()
const { item, error, code } = await fetchItem(id)

const tab = ref(null)

const { isAuthenticated } = useAppAuth()

const parent = { 'site.id': id.value }
const { resourceConfig: suResourceConfig, resourcePageKey: suRouteName } =
  useResourceStratigraphicUnit('data-stratigraphic-units', parent)

const { isFiltered } = useResourceFiltersState({
  resourcePageKey: suRouteName,
  resourceConfig: suResourceConfig,
})
</script>

<template>
  <resource-not-found
    v-if="error"
    :path="resourceConfig.appPath"
    :error="error"
  />
  <app-data-card v-if="item" :title="itemLabel" :code="code">
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
      <div>
        <v-tabs
          v-model="tab"
          color="anchor"
          :bg-color="DATA_API_ACTIONS_BAR_COLOR[API_ACTIONS.Read]"
        >
          <v-tab value="data">data</v-tab>
          <v-tab value="sus">stratigraphic units</v-tab>
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
            <v-card :rounded="false">
              <v-toolbar density="compact">
                <template #title>
                  <lazy-data-toolbar-title-append
                    v-if="isFiltered"
                    text="filtered"
                    :color="COLORS['secondary']"
                  />
                </template>
                <template #append>
                  <lazy-navigation-resource-item-create
                    v-if="isAuthenticated"
                    :path="{
                      path: `${getResourceConfig('stratigraphicUnits').appPath}/create`,
                      query: { parent: { 'site.id': id } },
                    }"
                  />
                  <lazy-navigation-resource-item-search
                    :path="{
                      path: `${getResourceConfig('stratigraphicUnits').appPath}/search`,
                      query: { parent: { 'site.id': id } },
                    }"
                  />
                </template>
              </v-toolbar>
              <lazy-data-collection-stratigraphic-units-table
                data-testid="children-collection-table"
                :parent="{ 'site.id': id }"
                route-name="data-sites-id-stratigraphicUnits"
              />
            </v-card>
          </v-tabs-window-item>
        </v-tabs-window>
      </div>
    </template>
  </app-data-card>
</template>
