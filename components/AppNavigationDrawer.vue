<script setup>
const { visible } = useAppNavigationDrawerVisibleState()

const open = ref([])
</script>

<template>
  <v-navigation-drawer :model-value="visible" :permanent="true">
    <v-list v-model:opened="open">
      <v-list-item
        nuxt
        to="/"
        router
        :exact="true"
        prepend-icon="mdi-home"
        title="Home"
      />
      <v-list-group value="Data">
        <template #activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-text-box"
            title="Data"
            data-testid="app-nav-drawer-li-data"
          />
        </template>
        <v-list-item
          nuxt
          to="/data/sites"
          router
          title="Site"
          data-testid="app-nav-drawer-li-sites"
        />
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>
