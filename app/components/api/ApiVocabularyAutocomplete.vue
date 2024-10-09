<script setup lang="ts">
import type { VocabularyResourceKey } from '~~/types'
import useVocabulariesState from '~/composables/states/useVocabulariesState'

const props = withDefaults(
  defineProps<{
    itemValue?: string
    returnObject?: boolean
    vocabularyKey: VocabularyResourceKey
  }>(),
  {
    itemValue: '@id',
    returnObject: false,
  },
)
const getVocabulary = useVocabulariesState()(props.vocabularyKey)
const vocabularies = Object.values(getVocabulary())
</script>

<template>
  <v-autocomplete
    :items="vocabularies"
    :item-value
    :return-object
    item-title="value"
  />
</template>

<style scoped></style>
