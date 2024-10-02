<script setup lang="ts">
import type { ApiAction, ApiResourceSite } from '~~/types'
type RT = ApiResourceSite
import useDataItemResourcePageWatchTriggerSubmit from '~/composables/useDataItemResourcePageWatchTriggerSubmit'
import useSiteValidation from '~/composables/validation/useSiteValidation'

const props = defineProps<{
  mode: ApiAction
  item: Partial<RT>
}>()

const { isAuthenticated } = useAppAuth()
const state = reactive(clone(props.item))

const validation = useSiteValidation(props.item)

const { triggerSubmit, submittingItem } = inject(dataItemPageInjectionKey)
useDataItemResourcePageWatchTriggerSubmit(triggerSubmit, state, submittingItem)
</script>

<template>
  <lazy-data-item-form :mode>
    <v-row v-if="isAuthenticated" no-gutters justify="end">
      <v-col cols="12" sm="3" class="px-2">
        <v-checkbox label="public" v-model="state.public" />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" xs="6" sm="2" class="px-2">
        <v-text-field
          class="text-input-secondary"
          :rules="validation.rules['code']"
          v-model="state.code"
          label="code"
        />
      </v-col>
      <v-col cols="12" xs="12" sm="10" class="px-2">
        <v-text-field
          v-model="state.name"
          :validation-value="state.name"
          :rules="validation.rules['name']"
          label="name"
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" xs="12" class="px-2">
        <v-textarea label="description" v-model="state.description" />
      </v-col>
    </v-row>
  </lazy-data-item-form>
</template>
