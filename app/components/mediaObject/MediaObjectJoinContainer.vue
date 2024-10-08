<script setup lang="ts">
import type {
  ApiResourceCollectionParent,
  DataResourceKey,
  ApiResourceItemMediaObject,
  ApiResourceItem,
} from '~~/types'
import { mediaObjectJoinInjectionKey } from '~/composables/useMediaObjectJoin'

const props = defineProps<{
  resourceKey: DataResourceKey
  parent: ApiResourceCollectionParent
  canUpdate: boolean
}>()
const mediaObjectJoin = await useMediaObjectJoin(
  props.resourceKey,
  props.parent,
)
provide(mediaObjectJoinInjectionKey, mediaObjectJoin)
const { items } = mediaObjectJoin
const config = useRuntimeConfig()
const isCreateDialogOpen = ref(false)
const isMediaObjectItem = (
  item: ApiResourceItem,
): item is ApiResourceItemMediaObject => 'item' in item && 'mediaObject' in item
</script>

<template>
  <v-container>
    <media-object-join-delete-dialog />
    <media-object-join-create-dialog :parent v-model="isCreateDialogOpen" />
    <v-row dense justify="end" style="min-height: 48px">
      <v-col class="text-right">
        <v-btn
          v-if="canUpdate"
          class="mr-4"
          density="compact"
          :icon="true"
          variant="text"
          data-testid="create-media-button"
          @click="isCreateDialogOpen = true"
        >
          <v-icon icon="fa fa-plus" size="x-large" />
          <v-tooltip activator="parent" location="bottom">Add media</v-tooltip>
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="items.length > 0" no-gutters>
      <v-col v-for="item of items" :key="item['@id']" cols="3">
        <media-object-join-card
          v-if="isMediaObjectItem(item)"
          :item
          :api-base-url="config.public.apiBaseURL"
          :can-update
        />
      </v-col>
    </v-row>
    <v-row v-else justify="center">
      <v-empty-state
        title="No media found"
        text="No media are currently related to this item"
      />
    </v-row>
  </v-container>
</template>

<style scoped></style>
