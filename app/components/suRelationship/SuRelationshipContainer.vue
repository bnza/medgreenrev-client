<script setup lang="ts">
import {
  stratigraphicUnitsRelationshipHelperInjectionKey,
  useStratigraphicUnitsRelationship,
} from '~/composables/useStratigraphicUnitsRelationship'

const props = defineProps<{
  sxSu: ApiAclItem<ApiResourceStratigraphicUnit>
}>()

const stratigraphicUnitsRelationshipHelper =
  await useStratigraphicUnitsRelationship(props.sxSu)
provide(
  stratigraphicUnitsRelationshipHelperInjectionKey,
  stratigraphicUnitsRelationshipHelper,
)

const { isLocked, canUpdate, fetchCollection, triggerRefreshCollection } =
  stratigraphicUnitsRelationshipHelper

const { items, refresh } = await fetchCollection()

watch(triggerRefreshCollection, (trigger) => {
  if (trigger) {
    triggerRefreshCollection.value = false
    refresh()
  }
})

const lockedIcon = computed(() =>
  isLocked.value ? 'fas fa-lock' : 'fas fa-lock-open',
)
const lockedTooltipText = computed(() =>
  isLocked.value ? 'Enable editing' : 'Disable editing',
)
</script>

<template>
  <v-container data-testid="su-relationships-container">
    <su-relationship-delete-dialog />
    <su-relationship-create-dialog />
    <v-row dense justify="end" style="min-height: 48px">
      <v-col class="text-right">
        <v-btn
          v-if="canUpdate"
          color="anchor"
          rounded="false"
          variant="text"
          :icon="true"
          @click="isLocked = !isLocked"
          data-testid="enable-editing-button"
        >
          <v-icon :icon="lockedIcon" color="primary" />
          <v-tooltip activator="parent" location="bottom">
            {{ lockedTooltipText }}
          </v-tooltip>
        </v-btn>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <su-relationship-card relationship-key="c" :items />
      </v-col>
      <v-col>
        <su-relationship-card relationship-key="C" :items />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <su-relationship-card relationship-key="x" :items />
      </v-col>
      <v-col>
        <su-relationship-card relationship-key="X" :items />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <su-relationship-card relationship-key="f" :items />
      </v-col>
      <v-col>
        <su-relationship-card relationship-key="F" :items />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <su-relationship-card relationship-key="e" :items />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
