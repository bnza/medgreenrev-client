<template>
  <app-bar>
    <template #center>
      <slot name="app-bar-center" />
    </template>
  </app-bar>
  <app-navigation-drawer />
  <v-main class="d-flex align-center justify-center">
    <slot />
  </v-main>
  <app-snackbar />
</template>
