<script setup lang="ts">
defineProps<{ item: ApiResourceStratigraphicUnitRelationship }>()
const { selectedSuId, selectedSu, isUpdatable, deletingRelation } = inject(
  stratigraphicUnitsRelationshipHelperInjectionKey,
)
</script>

<template>
  <v-chip
    @click="selectedSuId = item.dxSU.id"
    class="text-white"
    data-testid="su-relationship-chip"
  >
    {{ item.dxSU.year.toString().slice(-2) + '.' + item.dxSU.number }}
    <template #close>
      <v-icon
        data-testid="delete-relationship-button"
        icon="far fa-circle-xmark"
        size="x-small"
        v-if="isUpdatable"
        @click.stop="deletingRelation = item"
      />
    </template>
    <v-menu activator="parent">
      <su-relationship-selected-su-card :item="selectedSu" />
    </v-menu>
  </v-chip>
</template>
