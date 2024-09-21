<script setup lang="ts">
const props = defineProps<{
  id: number
  mediaObject: ApiResourceMediaObject
  baseURL: string
  canUpdate: boolean
}>()

const mediaUrl = `${props.baseURL.slice(0, -1)}${props.mediaObject.contentUrl}`
const thumbnail = mediaUrl.replace(/\.(\w+)$/, '.thumb.jpeg')
const fileName = props.mediaObject.originalFilename.replace(/\.(\w+)$/, '')
const extension = props.mediaObject.originalFilename.slice(fileName.length + 1)
const emit = defineEmits<{
  (e: 'delete', id: number): void
}>()
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
      height="200"
      width="200"
      class="bg-grey-lighten-2"
      cover
    >
      <template #placeholder>
        <v-row align-content="center" class="fill-height" justify="center">
          <v-progress-circular color="warning" indeterminate />
        </v-row>
      </template>
      <template #error>
        <v-container>
          <v-row
            align="center"
            align-content="center"
            justify="center"
            class="my-6"
          >
            <v-icon icon="far fa-file-excel" color="teal" size="x-large" />
          </v-row>
          <v-row
            align="center"
            align-content="center"
            justify="center"
            class="my-4"
          >
            <div style="overflow-wrap: break-word">
              <p class="text-black">{{ fileName }}</p>
            </div>
          </v-row>
          <v-row align="center" align-content="center" justify="center">
            <div style="overflow-wrap: break-word">
              <strong class="font-weight-black text-teal text-uppercase">{{
                extension
              }}</strong>
            </div>
          </v-row>
        </v-container>
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
        @click="$emit('delete', id)"
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
        <v-icon icon="far fa-circle-down" />
        <v-tooltip activator="parent" location="bottom">download</v-tooltip>
      </v-btn>
    </template>
  </v-card>
</template>

<style scoped></style>
