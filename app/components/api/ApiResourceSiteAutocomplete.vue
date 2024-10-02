<script setup lang="ts"></script>

<template>
  <api-resource-autocomplete
    label="site"
    path="sites"
    :item-props="
      (value) => ({
        value: value.id,
        title: value.code,
        subtitle: value.name,
      })
    "
  >
    <template #selection="{ props, item }">
      <v-list-item v-bind="props">
        <template #title
          ><span class="text-secondary font-weight-bold">{{
            item.raw.code
          }}</span>
          - <span>{{ item.raw.name }}</span></template
        >
      </v-list-item>
    </template>
  </api-resource-autocomplete>
</template>
