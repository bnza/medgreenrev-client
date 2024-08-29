<script setup>
const props = defineProps({
  item: {
    type: Object,
    validator(value) {
      return (
        Object.keys(value).length === 0 || ('id' in value && 'email' in value)
      )
    },
  },
  visible: {
    type: Boolean,
    default: false,
  },
})
const { visible } = toRefs(props)
</script>

<template>
  <v-dialog
    :model-value="visible"
    width="400px"
    :persistent="true"
    data-testid="user-password-dialog"
  >
    <v-card v-if="'email' in item">
      <v-card-title
        >User:
        <span class="text-secondary" data-testid="user-pw-identifier">{{
          props.item.email
        }}</span></v-card-title
      >
      <slot>
        <v-card-text>
          <v-container style="height: 200px" />
        </v-card-text>
        <v-card-actions>
          <v-btn :disabled="true" color="anchor" icon="fas fa-xmark" />
        </v-card-actions>
      </slot>
    </v-card>
  </v-dialog>
</template>
