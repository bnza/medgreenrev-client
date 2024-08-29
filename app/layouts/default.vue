<template>
  <app-bar>
    <template #center>
      <slot name="app-bar-center" />
    </template>
  </app-bar>
  <app-navigation-drawer />
  <NuxtLayout name="empty">
    <slot />
  </NuxtLayout>
  <app-snackbar />
</template>
