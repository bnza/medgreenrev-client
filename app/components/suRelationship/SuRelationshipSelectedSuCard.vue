<script setup lang="ts">
import resourceConfig from '~/lib/resources/stratigraphic-units'

defineProps<{ item: ApiResourceStratigraphicUnit | undefined }>()

const secondary = COLORS['secondary']
</script>

<template>
  <div class="scoped" v-if="item">
    <v-card
      data-testid="su-relationship-selected-card"
      variant="flat"
      min-width="500px"
      :title="resourceConfig.getCodeFn(item)()"
    >
      <template #append>
        <navigation-resource-item-read
          :app-path="resourceConfig.appPath"
          :item="item"
        />
      </template>
      <v-card-text>
        <v-row dense>
          <v-col cols="3" class="text-right text-caption font-weight-bold">
            description:
          </v-col>
          <v-col cols="9">
            {{ item.description }}
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="3" class="text-right text-caption font-weight-bold">
            interpretation:
          </v-col>
          <v-col cols="9">
            {{ item.interpretation }}
          </v-col>
        </v-row>
        <v-row></v-row>
      </v-card-text>
    </v-card>
  </div>
  <p v-else>loading...</p>
</template>

<style scoped>
.scoped:deep(.v-card-title) {
  padding-left: 4px;
  font-weight: bold;
  color: v-bind(secondary);
}
</style>
