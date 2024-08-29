<script setup>
const {toggle} = useAppNavigationDrawerVisibleState()
</script>

<template>
  <v-app-bar color="primary" height="48" :flat="true">
    <template #prepend>
      <v-tooltip location="bottom" text="toggle navigation">
        <template #activator="{ props }">
          <v-app-bar-nav-icon
            v-bind="props"
            data-testid="app-bar-nav-icon"
            @click.stop="toggle()"
          />
        </template>
      </v-tooltip>
    </template>
    <!--    <v-img class="mx-2" src="logowhite35.png" max-height="40" contain />-->
    <slot name="center"/>
    <template #append>
      <auth-app-bar-icon/>
    </template>
  </v-app-bar>
</template>
