<script setup lang="ts">
import { useRouteStackState } from '~/composables/states/useRouteStackState'

const props = withDefaults(
  defineProps<{
    appPath: string
    item: ResourceAclItem & ApiResourceItem<ApiId>
    size?: string
    fromItem?: boolean
  }>(),
  {
    size: 'xsmall',
    fromItem: false,
  },
)

const { fromItem } = useRouteStackState()
const router = useRouter()
const go = () => {
  if (props.fromItem) {
    fromItem.value = true
  }
  router.push(to.value)
}

const disabled = computed(() => {
  return !props.item._acl.canDelete
})
const color = computed(() => {
  return disabled.value ? '' : 'error'
})
const to = computed(() => {
  return `${props.appPath}/${props.item.id}/delete`
})
</script>

<template>
  <v-btn
    :color="color"
    density="compact"
    :disabled="disabled"
    :icon="true"
    variant="text"
    data-testid="delete-item-button"
    @click="go()"
  >
    <v-icon icon="fas fa-minus" :size="size" />
    <v-tooltip activator="parent" location="bottom">Delete item</v-tooltip>
  </v-btn>
</template>
