<script setup>
import { dataFormModeProp, dataFormItemProp } from '~/lib/props.js'
import useSubmitForm from '~/composables/form/useSubmitForm.js'
import { useSitesUsersPrivileges } from '~/composables/useSitesUsersPrivileges.ts'

const props = defineProps({
  triggerSubmit: Boolean,
  mode: dataFormModeProp,
  item: dataFormItemProp,
  parent: Object,
})

const { readonly } = useDataForm({
  type: props.mode,
})

const emit = defineEmits([
  'update:invalid',
  'validationReady',
  'update:triggerSubmit',
  'submitForm',
])
const { state, v$ } = await useSubmitForm('sitesUsers', props, emit)
const { assignPrivilege, hasPrivilege, getPrivilegeKey, getPrivilegeColor } =
  useSitesUsersPrivileges()
const isSiteEditor = computed({
  get() {
    return hasPrivilege(state.privileges, 'ROLE_SITE_EDITOR')
  },
  set(flag) {
    state.privileges = assignPrivilege(
      flag,
      state.privileges,
      'ROLE_SITE_EDITOR',
    )
  },
})
</script>

<template>
  <v-form :readonly="readonly" @submit.prevent>
    <v-container>
      <slot name="alert" />
      <v-row no-gutters>
        <v-col cols="12" xs="12" sm="4" class="px-2">
          <autocomplete-api
            label="site"
            path="sites"
            order-by="code"
            item-title="code"
            item-subtitle="name"
            :error-messages="v$.site.$errors.map((e) => e.$message)"
            v-model="state.site"
          />
        </v-col>
        <v-col cols="12" xs="12" sm="4" class="px-2">
          <autocomplete-api
            label="user"
            path="users"
            item-title="email"
            item-value="id"
            :error-messages="v$.user.$errors.map((e) => e.$message)"
            v-model="state.user"
          />
        </v-col>
        <v-col cols="12" xs="12" sm="4" class="px-4">
          <v-checkbox
            v-model="isSiteEditor"
            color="primary"
            :label="getPrivilegeKey(state.privileges)"
            :color="getPrivilegeColor(state.privileges)"
            :error-messages="v$.privileges.$errors.map((e) => e.$message)"
            hint="Click to change role"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<style scoped>
.text-input-secondary:deep(input) {
  font-weight: bold;
  color: #80bc37;
}
</style>
