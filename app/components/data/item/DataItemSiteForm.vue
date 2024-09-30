<script setup lang="ts">
import type { ApiAction, ApiResourceSite } from '~~/types'
type RT = ApiResourceSite
import useDataItemResourcePageWatchTriggerSubmit from '~/composables/useDataItemResourcePageWatchTriggerSubmit'

const props = defineProps<{
  mode: ApiAction
  item: Partial<RT>
}>()

const rules = {
  code: [
    (value: string | undefined) => Boolean(value) || 'This field is required',
    (value: string) => value.length <= 3 || 'Must be less than 3 char',
    async (value: string) => {
      return await Promise.resolve(value).then(
        (value) => Boolean(value) || 'Async validation failed ailed',
      )
    },
  ],
  name: [
    (value: string | undefined) => Boolean(value) || 'This field is required',
  ],
}

const state = reactive(clone(props.item))

const { triggerSubmit, submittingItem } = inject(dataItemPageInjectionKey)
useDataItemResourcePageWatchTriggerSubmit(triggerSubmit, state, submittingItem)
</script>

<template>
  <lazy-data-item-form :mode>
    <v-row no-gutters>
      <v-col cols="12" xs="6" sm="2" class="px-2">
        <v-text-field
          class="text-input-secondary"
          variant="underlined"
          :rules="rules['code']"
          v-model="state.code"
          label="code"
        />
      </v-col>
      <v-col cols="12" xs="12" sm="10" class="px-2">
        <v-text-field
          variant="underlined"
          v-model="state.name"
          :rules="rules['name']"
          label="name"
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" xs="12" class="px-2">
        <v-textarea
          variant="underlined"
          label="description"
          v-model="state.description"
        />
      </v-col>
    </v-row>
  </lazy-data-item-form>
</template>
