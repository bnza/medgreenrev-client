<script setup>
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  },
})

const { signIn } = useAuth()
const email = ref('')
const password = ref('')
const loginFailed = ref(false)
const isLoading = ref(false)
const loginFailedText = computed(() =>
  loginFailed.value ? 'Login failed!' : '',
)
const isSubmitDisabled = computed(() => {
  return password.value.length === 0 || isLoading.value
})

const { redirectUrl } = useLoginRedirectUrlState()
const { show } = useAppSnackbarState()
const signInAndFeedback = async ({ email, password }) => {
  isLoading.value = true
  loginFailed.value = false
  try {
    await signIn({ email, password }, { callbackUrl: redirectUrl.value })
    show({
      color: 'success',
      text: `User ${email} successfully logged in`,
      timeout: 4000,
    })
  } catch (e) {
    loginFailed.value = true
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <v-dialog :model-value="true" width="400px" :persistent="true">
    <v-card variant="flat" data-testid="login-data-card">
      <v-progress-linear
        color="primary"
        :active="isLoading"
        :indeterminate="true"
      />
      <v-card-title class="text-secondary">Login</v-card-title>
      <v-card-text
        >Enter your credentials
        <span v-if="loginFailed" class="text-error font-weight-bold">{{
          loginFailedText
        }}</span></v-card-text
      >
      <v-form class="px-6" @submit.prevent>
        <v-text-field v-model="email" label="e-mail" />
        <v-text-field v-model="password" type="password" label="password" />
      </v-form>
      <v-card-actions>
        <NuxtLink :to="{ name: 'index' }">
          <v-btn color="anchor" :disabled="isLoading" :flat="true">
            cancel
          </v-btn>
        </NuxtLink>
        <v-spacer />
        <v-btn
          :flat="true"
          color="secondary"
          :disabled="isSubmitDisabled"
          @click="signInAndFeedback({ email, password })"
          >login
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
