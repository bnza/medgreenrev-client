<script setup lang="ts">
import useUserChangePasswordValidation from '~/composables/validation/useUserChangePasswordValidation'
import type { UserChangePasswordBody } from '~~/types'

enum Form {
  OldPassword,
  NewPassword,
  RepeatPassword,
}
const showPassword = reactive([false, false, false])
const fieldTypes = computed(() =>
  showPassword.map((show) => (show ? 'text' : 'password')),
)
const icons = computed(() =>
  showPassword.map((show) => `fas fa-eye${show ? '' : '-slash'}`),
)
const toggleShow = (index: number) => {
  showPassword[index] = !showPassword[index]
}
const state = reactive({
  oldPassword: '',
  newPassword: '',
  repeatPassword: '',
})

const form = useTemplateRef('form')

const changePasswordRequestBody = defineModel<UserChangePasswordBody | {}>({})
watchEffect(() => {
  if (form.value) {
    changePasswordRequestBody.value = Boolean(form.value.isValid)
      ? clone(state)
      : {}
  }
})

const rules = useUserChangePasswordValidation()
</script>

<template>
  <v-card-text>
    <v-container>
      <v-form @submit.prevent ref="form">
        <v-row class="mx-4 pt-4" justify="center">
          <v-text-field
            autocomplete="new-password"
            :type="fieldTypes[Form.OldPassword]"
            :rules="rules.oldPassword"
            v-model="state.oldPassword"
            label="old password"
            :append-inner-icon="icons[Form.OldPassword]"
            @click:append-inner="toggleShow(Form.OldPassword)"
          />
        </v-row>
        <v-row class="mx-4 pt-8">
          <v-text-field
            autocomplete="new-password"
            :type="fieldTypes[Form.NewPassword]"
            :rules="rules.newPassword"
            v-model="state.newPassword"
            label="new password"
            :append-inner-icon="icons[Form.NewPassword]"
            @click:append-inner="toggleShow(Form.NewPassword)"
          />
        </v-row>
        <v-row class="mx-4 pt-8">
          <v-text-field
            autocomplete="new-password"
            :type="fieldTypes[Form.RepeatPassword]"
            :rules="rules.repeatPassword"
            :validation-value="state"
            v-model="state.repeatPassword"
            label="repeat password"
            :append-inner-icon="icons[Form.RepeatPassword]"
            @click:append-inner="toggleShow(Form.RepeatPassword)"
          />
        </v-row>
      </v-form>
    </v-container>
  </v-card-text>
</template>
