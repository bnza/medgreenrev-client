<script setup lang="ts">
import type { BaseAcl } from '~~/types'
import { defaultBaseAcl } from '~/utils'

const props = defineProps<{
  appPath: string
  id: string | number
  acl?: Partial<BaseAcl>
}>()

const aclComputed = computed(() =>
  Object.assign({}, defaultBaseAcl, props.acl || {}),
)
</script>

<template>
  <div class="item-nav">
    <slot name="prepend" />
    <navigation-resource-item-read
      :app-path
      :id
      :disabled="!aclComputed.canRead"
    />
    <navigation-resource-item-update
      :app-path
      :id
      :disabled="!aclComputed.canUpdate"
    />
    <navigation-resource-item-delete
      :app-path
      :id
      :disabled="!aclComputed.canDelete"
    />
    <slot name="append" />
  </div>
</template>
