<script setup lang="ts">
import type { ApiResourceCollectionParent, DataResourceKey } from '~~/types'
import useVocabulariesState from '~/composables/states/useVocabulariesState'

defineProps<{ parent?: ApiResourceCollectionParent }>()

const resourceKey: DataResourceKey = 'pottery'
const getVocabulary = useVocabulariesState()
const getFunctionalGroupVocabulary = getVocabulary(
  'vocabularyPotteryFunctionalGroup',
)
const getTypologyVocabulary = getVocabulary('vocabularyPotteryTypology')
const getPartVocabulary = getVocabulary('vocabularyPotteryPart')
</script>

<template>
  <lazy-data-collection-table :resource-key :parent>
    <template #[`item.id`]="{ item, resourceConfig }">
      <navigation-resource-item
        :id="item.id"
        :acl="item._acl"
        :app-path="resourceConfig.appPath"
      />
    </template>
    <template #[`item.functionalGroup.value`]="{ item }">
      {{ getFunctionalGroupVocabulary(item.functionalGroup, 'value') }}
    </template>
    <template #[`item.typology.value`]="{ item }">
      {{ getTypologyVocabulary(item.typology, 'value') }}
    </template>
    <template #[`item.part.value`]="{ item }">
      {{ getPartVocabulary(item.part, 'value') }}
    </template>
    <template #[`item.public`]="{ item }">
      <v-checkbox-btn
        density="compact"
        :inline="true"
        :readonly="true"
        :model-value="item.public"
      />
    </template>
  </lazy-data-collection-table>
</template>
