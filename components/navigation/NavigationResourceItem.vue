<script setup lang="ts">
import { getResourcePageRootKey } from '~/lib/resources'

const props = defineProps<{
  pageKey: ResourcePageKey
  item: ResourceAclItem
}>()

const appPath = getResourceConfig(getResourcePageRootKey(props.pageKey)).appPath
</script>

<template>
  <div class="item-nav">
    <slot name="prepend" />
    <navigation-resource-item-read :app-path :page-key :item />
    <navigation-resource-item-update :app-path :item />
    <navigation-resource-item-delete :app-path :item />
    <slot name="append" />
  </div>
</template>
