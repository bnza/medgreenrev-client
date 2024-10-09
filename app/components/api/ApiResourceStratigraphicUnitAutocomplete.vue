<script setup lang="ts"></script>

<template>
  <api-resource-autocomplete
    label="stratigraphic unit"
    path="stratigraphic_units"
  >
    <template #selection="{ props, item }">
      <v-list-item v-bind="props">
        <template #title
          ><span class="text-secondary font-weight-bold">{{
            item.raw.code
          }}</span>
          - <span>{{ item.raw.site?.name }}</span></template
        >
      </v-list-item>
    </template>
  </api-resource-autocomplete>
</template>
