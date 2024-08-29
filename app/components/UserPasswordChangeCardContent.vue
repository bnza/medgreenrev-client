<script setup>
import useResourceUserChangePasswordValidation from '~/composables/validation/useResourceUserChangePasswordValidation.js'

defineProps({
  pending: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['close', 'changePassword', 'update:invalid'])
const { state, v$ } = useResourceUserChangePasswordValidation({}, emit)
const OLD_PASSWORD = 0
const NEW_PASSWORD = 1
const REPEAT_PASSWORD = 2
const showPassword = reactive([false, false, false])
const toggleShow = (index) => {
  showPassword[index] = !showPassword[index]
}
const icons = computed(() =>
  showPassword.map((show) => `fas fa-eye${show ? '' : '-slash'}`),
)
const types = computed(() =>
  showPassword.map((show) => (show ? 'text' : 'password')),
)

const validateAndSubmit = async () => {
  if (!(await v$.value.$validate())) {
    return
  }
  emit('changePassword', unref(state))
}
</script>

<template>
  <v-card-text>
    <v-container v-if="pending" style="min-height: 300px">
      <v-row align-content="center" class="fill-height" justify="center">
        <v-col class="text-subtitle-1 text-center" cols="12">
          Changing password
        </v-col>
        <v-col cols="6">
          <v-progress-linear
            color="warning"
            height="6"
            indeterminate
            rounded
          ></v-progress-linear>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else style="height: 300px">
      <v-row class="mx-4 pt-4" justify="center">
        <v-text-field
          autocomplete="new-password"
          :type="types[OLD_PASSWORD]"
          variant="underlined"
          v-model="state.oldPassword"
          label="old password"
          :error-messages="v$.oldPassword.$errors.map((e) => e.$message)"
          @input="v$.oldPassword.$touch"
          @blur="v$.oldPassword.$touch"
          :append-inner-icon="icons[OLD_PASSWORD]"
          @click:append-inner="toggleShow(OLD_PASSWORD)"
        />
      </v-row>
      <v-row class="mx-4 pt-8">
        <v-text-field
          autocomplete="new-password"
          :type="types[NEW_PASSWORD]"
          variant="underlined"
          v-model="state.newPassword"
          label="new password"
          :error-messages="v$.newPassword.$errors.map((e) => e.$message)"
          @input="v$.newPassword.$touch"
          @blur="v$.newPassword.$touch"
          :append-inner-icon="icons[NEW_PASSWORD]"
          @click:append-inner="toggleShow(NEW_PASSWORD)"
        />
      </v-row>
      <v-row class="mx-4 pt-8">
        <v-text-field
          autocomplete="new-password"
          :type="types[REPEAT_PASSWORD]"
          type="password"
          variant="underlined"
          v-model="state.repeatPassword"
          label="repeat password"
          :error-messages="v$.repeatPassword.$errors.map((e) => e.$message)"
          @input="v$.repeatPassword.$touch"
          @blur="v$.repeatPassword.$touch"
          :append-inner-icon="icons[REPEAT_PASSWORD]"
          @click:append-inner="toggleShow(REPEAT_PASSWORD)"
        />
      </v-row>
    </v-container>
  </v-card-text>
  <v-card-actions>
    <v-tooltip location="bottom" text="Close">
      <template #activator="{ props }">
        <v-btn
          data-testid="close-button"
          :disabled="pending"
          color="anchor"
          @click="emit('close')"
          icon="fas fa-xmark"
          v-bind="props"
        />
      </template>
    </v-tooltip>
    <v-spacer />
    <v-tooltip location="bottom" text="Change password">
      <template #activator="{ props }">
        <v-btn
          data-testid="change-pw-button"
          :disabled="pending || v$.$invalid"
          color="secondary"
          @click="validateAndSubmit"
          icon="fas fa-arrow-up-from-bracket"
          v-bind="props"
        />
      </template>
    </v-tooltip>
  </v-card-actions>
</template>
