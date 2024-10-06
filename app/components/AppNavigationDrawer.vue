<script setup>
const { visible } = useAppNavigationDrawerVisibleState()

const open = ref([])
const { hasRoleAdmin } = useAppAuth()
</script>

<template>
  <v-navigation-drawer
    :model-value="visible"
    :permanent="true"
    data-testid="app-navigation-drawer"
  >
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
            prepend-icon="fas fa-table-list"
            title="Data"
            data-testid="app-nav-drawer-li-data"
          />
        </template>
        <v-list-item
          nuxt
          to="/data/samples"
          router
          title="Sample"
          data-testid="app-nav-drawer-li-samples"
        />
        <v-list-item
          nuxt
          to="/data/sites"
          router
          title="Site"
          data-testid="app-nav-drawer-li-sites"
        />
        <v-list-item
          nuxt
          to="/data/stratigraphic-units"
          router
          title="Stratigraphic Unit"
          data-testid="app-nav-drawer-li-sus"
        />
      </v-list-group>
      <v-list-group v-if="hasRoleAdmin" value="Admin">
        <template #activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="fas fa-screwdriver-wrench"
            title="Admin"
            data-testid="app-nav-drawer-li-admin"
          />
        </template>
        <v-list-item
          nuxt
          to="/admin/users"
          router
          title="Users"
          data-testid="app-nav-drawer-li-users"
        />
        <!--              <v-list-item
                nuxt
                to="/admin/sites-users-privileges"
                router
                title="Sites/Users Privileges"
                data-testid="app-nav-drawer-li-sites-users-privileges"
              />-->
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>
