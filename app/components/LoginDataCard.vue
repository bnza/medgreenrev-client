<script setup lang="ts">
import useLoginRedirectFromState from '~/composables/states/useLoginRedirectFromState'

const pending = ref(false)
const email = ref('')
const password = ref('')
const loginFailed = ref(false)

const { signIn, status } = useAuth()
const { showSuccess } = useAppSnackbarState()

const disabled = computed(() => {
  return !password.value || !email.value || pending.value
})

const redirectFrom = useLoginRedirectFromState()
const route = useRoute()
const router = useRouter()
const prevMode = () => {
  if (redirectFrom.value) {
    const to =
      status.value === 'authenticated'
        ? route.redirectedFrom?.fullPath || '/'
        : '/'
    router.replace(to)
  }
  prev()
}
const signInAndFeedback = async ({
  email,
  password,
}: Record<string, string>) => {
  pending.value = true
  loginFailed.value = false
  try {
    await signIn({ email, password }, { redirect: false })
    showSuccess({
      text: `User ${email} successfully logged in`,
    })
    prevMode()
  } catch (e) {
    loginFailed.value = true
  } finally {
    pending.value = false
  }
}

const { mode, prev, logoutPending } = useDataUiModeState()

watch(
  status,
  () => {
    if (status.value === 'authenticated') {
      prevMode()
    }
  },
  { immediate: true },
)
</script>

<template>
  <v-card data-testid="login-data-card" width="400px">
    <v-progress-linear
      color="primary"
      :active="pending"
      :indeterminate="true"
    />
    <v-card-title class="text-secondary">Login</v-card-title>
    <v-card-text
      >Enter your credentials
      <span v-if="loginFailed" class="text-error font-weight-bold"
        >Login failed!</span
      >
    </v-card-text>
    <v-form class="px-6" @submit.prevent>
      <v-text-field v-model="email" label="e-mail" />
      <v-text-field v-model="password" type="password" label="password" />
    </v-form>
    <v-card-actions>
      <v-btn color="anchor" :disabled="pending" @click="prevMode()">
        cancel
      </v-btn>
      <v-spacer />
      <v-btn
        color="secondary"
        :disabled
        @click="signInAndFeedback({ email, password })"
        >login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped></style>
