<script setup lang="ts">
import type { ApiAction, ApiResourceSitesUser, DataResourceKey } from '~~/types'
import useSitesUserValidation from '~/composables/validation/useSitesUserValidation'
import { ApiSiteRole } from '~/utils'
import useCreateParentStateKey from '~/composables/states/useCreateParentStateKey'
import useDataItemResourcePageWatchTriggerSubmit from '~/composables/useDataItemResourcePageWatchTriggerSubmit'

const props = defineProps<{
  mode: ApiAction
  item: Partial<ApiResourceSitesUser>
}>()

const state = reactive(clone(props.item))
if (props.mode === 'create') {
  state.privileges = 0
}

const rules = useSitesUserValidation(props.item)

const { triggerSubmit, submittingItem } = inject(dataItemPageInjectionKey)
useDataItemResourcePageWatchTriggerSubmit(triggerSubmit, state, submittingItem)
const isSiteEditor = computed({
  get() {
    return hasSitePrivilege(state.privileges, ApiSiteRole.Editor)
  },
  set(flag) {
    state.privileges = assignSitePrivilege(
      flag,
      state.privileges,
      ApiSiteRole.Editor,
    )
  },
})

const createParentState = useCreateParentStateKey()

onUnmounted(() => {
  createParentState.value = undefined
})

const parentResourceKey = computed(() =>
  createParentState.value
    ? createParentState.value[0] === 'site.id'
      ? ('site' as DataResourceKey)
      : createParentState.value[0] === 'user.id'
        ? ('user' as DataResourceKey)
        : undefined
    : undefined,
)
if (parentResourceKey.value) {
  state[parentResourceKey.value] = await useNuxtApp()
    .$api.getRepository(parentResourceKey.value)
    .fetchItem(createParentState.value[1])
}
</script>

<template>
  <lazy-data-item-form :mode>
    <v-row no-gutters>
      <v-col cols="12" xs="6" sm="4" class="px-2">
        <api-resource-site-autocomplete
          :disabled="mode === 'update' || 'site' === parentResourceKey"
          :validation-value="state"
          v-model="state.site"
          :rules="rules['site']"
        />
      </v-col>
      <v-col cols="12" xs="6" sm="4" class="px-2">
        <api-resource-autocomplete
          :disabled="mode === 'update' || 'user' === parentResourceKey"
          path="users"
          :validation-value="state"
          item-value="@id"
          item-title="email"
          v-model="state.user"
          :rules="rules['user']"
        />
      </v-col>
      <v-col cols="12" xs="12" sm="4" class="px-4">
        <v-checkbox
          v-model="isSiteEditor"
          :label="getSitePrivilegeKey(state.privileges)"
          :color="getSitePrivilegeColor(state.privileges)"
          :hint="
            ['read', 'delete'].includes(mode) ? '' : 'Click to change role'
          "
          :persistent-hint="!['update', 'create'].includes(mode)"
        />
      </v-col>
    </v-row>
  </lazy-data-item-form>
</template>

<style scoped></style>
