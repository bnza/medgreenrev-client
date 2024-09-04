<script setup lang="ts">
import {
  type StratigraphicUnitRelationshipKey,
  stratigraphicUnitRelationshipMap,
} from '~/lib/resources/vocabulary'

const props = defineProps<{
  relationshipKey: StratigraphicUnitRelationshipKey
  items: Array<ApiResourceStratigraphicUnitRelationship> | undefined
}>()
const name = stratigraphicUnitRelationshipMap[props.relationshipKey]

const { items } = toRefs(props)

const relationships = computed(() =>
  items.value
    ? items.value.filter(
        (current) => current.relationship.slice(-1) === props.relationshipKey,
      )
    : [],
)

const { isUpdatable, creatingRelationshipType } = inject(
  stratigraphicUnitsRelationshipHelperInjectionKey,
)
</script>

<template>
  <v-card
    data-testid="su-relationship-card"
    height="100%"
    min-height="100px"
    class="mx-auto"
    variant="outlined"
    color="grey lighten-2"
    :title="name"
  >
    <template #append>
      <v-btn
        v-if="isUpdatable"
        data-testid="add-relationship-button"
        class="mx-4"
        color="anchor"
        rounded="false"
        variant="text"
        :icon="true"
        @click="creatingRelationshipType = relationshipKey"
        size="x-small"
      >
        <v-icon icon="fas fa-plus" size="x-small" />
        <v-tooltip activator="parent" location="bottom"
          >Add relationship
        </v-tooltip>
      </v-btn>
    </template>
    <v-card-text>
      <v-chip-group>
        <su-relationship-chip
          v-for="item in relationships"
          :key="item.id"
          :item
        />
      </v-chip-group>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.mx-auto:deep(.v-card-title) {
  color: white;
  margin-left: 16px;
  font-size: 14px;
  text-transform: uppercase !important;
  min-height: 32px !important;
}
</style>
