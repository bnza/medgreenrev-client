<script setup lang="ts">
const { visible } = storeToRefs(useUiAppNavigationDrawerStore())
const { hasRoleAdmin } = useAppAuth()

const open = ref([])
</script>

<template>
  <v-navigation-drawer :model-value="visible" :permanent="true">
    <v-list v-model:opened="open">
      <v-list-item nuxt to="/" router :exact="true" prepend-icon="mdi-home" title="Home">
      </v-list-item>
      <v-list-group value="Data">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-text-box"
            title="Data"
            data-testid="app-nav-drawer-li-data"
          ></v-list-item>
        </template>
        <v-list-item
          nuxt
          to="/data/sites"
          router
          title="Site"
          data-testid="app-nav-drawer-li-sites"
        >
        </v-list-item>
      </v-list-group>
      <v-list-group v-if="hasRoleAdmin" value="Admin">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-cog-box"
            title="Admin"
            data-testid="app-nav-drawer-li-admin"
          ></v-list-item>
        </template>
        <v-list-item
          nuxt
          to="/admin/users"
          router
          title="Users"
          data-testid="app-nav-drawer-li-users"
        >
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped></style>
