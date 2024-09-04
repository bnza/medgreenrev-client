<script setup lang="ts">
const { deletingRelation, deleteRelationship } = inject(
  stratigraphicUnitsRelationshipHelperInjectionKey,
)
const isOpen = computed(() => Boolean(deletingRelation.value))
</script>

<template>
  <v-dialog
    :model-value="isOpen"
    @after-leave="deletingRelation = undefined"
    max-width="400px"
  >
    <v-card data-testid="delete-su-relationship-card">
      <v-card-text class="text-center">
        <v-icon icon="fas fa-triangle-exclamation" color="error" />
        <br />
        <br />
        Are you sure you want to delete this relationship?
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" @click="deleteRelationship()">delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
