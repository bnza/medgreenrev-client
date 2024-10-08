<script setup lang="ts">
import type { ApiResourceItemMediaObject } from '~~/types'
import { mediaObjectJoinInjectionKey } from '~/composables/useMediaObjectJoin'

const props = defineProps<{
  apiBaseUrl: string
  item: ApiResourceItemMediaObject
  canUpdate: boolean
}>()
const mediaUrl = props.apiBaseUrl + props.item.mediaObject.contentUrl
const thumbnail = mediaUrl.replace(/\.(\w+)$/, '.thumb.jpeg')
const fileName = props.item.mediaObject.originalFilename.replace(/\.(\w+)$/, '')
const extension = props.item.mediaObject.originalFilename.slice(
  fileName.length + 1,
)
const { deletingItem } = inject(mediaObjectJoinInjectionKey)
</script>

<template>
  <v-card
    data-testid="media-object-join-card"
    class="mx-auto my-4"
    width="200"
    variant="outlined"
    color="surface-variant"
  >
    <v-img
      :lazy-src="thumbnail"
      :src="thumbnail"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="200"
      width="200"
      class="bg-grey-lighten-2 align-end"
      cover
    >
      <v-card-title class="text-body-2 text-white">{{ fileName }}</v-card-title>
      <template #placeholder>
        <v-row align-content="center" class="fill-height" justify="center">
          <v-progress-circular color="warning" indeterminate />
        </v-row>
      </template>
    </v-img>
    <template #actions>
      <v-btn
        v-if="canUpdate"
        class="mr-4"
        density="compact"
        :icon="true"
        variant="text"
        data-testid="delete-media-button"
        color="error"
        @click="deletingItem = item"
      >
        <v-icon icon="fa fa-minus" />
        <v-tooltip activator="parent" location="bottom">Delete media</v-tooltip>
      </v-btn>
      <v-spacer />
      <v-btn
        class="mr-4"
        density="compact"
        :icon="true"
        data-testid="download-media-button"
        :href="mediaUrl"
        target="_blank"
        download
      >
        <v-icon icon="fas fa-download" />
        <v-tooltip activator="parent" location="bottom">download</v-tooltip>
      </v-btn>
    </template>
  </v-card>
</template>

<style scoped></style>
