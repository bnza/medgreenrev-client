<script setup>
const props = defineProps({
  filter: { type: Object, required: true },
})
defineEmits(['removeFilter'])
</script>

<template>
  <v-list-item :key="filter.id" data-testid="filters-list-item">
    <v-container>
      <v-row align-content="space-evenly">
        <v-col cols="1">
          <v-btn
            color="error"
            :icon="true"
            variant="text"
            @click="$emit('removeFilter', filter)"
            data-testid="delete-filter-button"
          >
            <v-icon icon="fas fa-minus" size="large" />
            <v-tooltip activator="parent" location="bottom"
              >Delete filter
            </v-tooltip>
          </v-btn>
        </v-col>
        <v-col>
          <v-text-field :readonly="true" :model-value="filter.property" />
        </v-col>
        <v-col>
          <v-text-field
            :readonly="true"
            :model-value="API_FILTERS[filter.filter].label"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-for="operand in filter.operands"
            :readonly="true"
            :model-value="operand"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-list-item>
</template>

<style scoped></style>
