<script setup lang="ts">
import type { ApiResourceUser } from '~~/types'
import { isAclResource, isApiResourceItem } from '~/utils'

type RT = ApiResourceUser

const { resourcePageKey } = useResource<RT>('user', {})
const { tab } = useResourceTabState(resourcePageKey)
const bgColor = DATA_API_ACTIONS_BAR_COLOR['read']

const { isValidUser } = inject(userPasswordStateInjectionKey)
</script>

<template>
  <lazy-data-item-page resource-key="user" mode="read" code-key="email">
    <template #toolbar-append="{ item }">
      <user-password-dialog-open-button
        v-if="isAclResource(item) && item._acl.canUpdate"
      />
    </template>
    <template #default="{ item }">
      <lazy-user-password-dialog
        v-if="isValidUser(item)"
        :item
        :mode="'reset'"
      />
      <v-tabs v-model="tab" color="anchor" :bg-color="bgColor">
        <v-tab value="data">data</v-tab>
        <v-tab value="sites">sites</v-tab>
      </v-tabs>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="data">
          <lazy-data-item-user-form v-if="item" :item="item" mode="read" />
        </v-tabs-window-item>
        <v-tabs-window-item value="sites" data-testid="tabs-window-sites">
          <lazy-data-collection-card
            v-if="isApiResourceItem(item)"
            resource-key="sitesUser"
            :parent="['user.id', item.id]"
            create-button
            :download-button="false"
            :search-button="false"
          />
        </v-tabs-window-item>
      </v-tabs-window>
    </template>
  </lazy-data-item-page>
</template>
