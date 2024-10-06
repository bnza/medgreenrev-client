<script setup lang="ts">
const { data, status } = useAuth()
const role = computed(() => reduceAppRoles(data.value.roles))

const userPassword = useUserPasswordState()
provide(userPasswordStateInjectionKey, userPassword)
</script>

<template>
  <lazy-data-card title="Current user:" :code="data.email">
    <template #toolbar-append>
      <user-password-dialog-open-button />
    </template>
    <lazy-user-password-dialog :item="data" :mode="'change'" />
    <v-form readonly>
      <v-container>
        <v-row no-gutters>
          <v-col class="px-2">
            <v-text-field v-model="data.email" label="email" />
          </v-col>
          <v-col data-cy="roles-input-col">
            <v-radio-group v-model="role">
              <v-radio label="ROLE_ADMIN" color="error" value="ROLE_ADMIN" />
              <v-radio
                label="ROLE_EDITOR"
                color="warning"
                value="ROLE_EDITOR"
              />
              <v-radio label="ROLE_USER" color="success" value="ROLE_USER" />
            </v-radio-group>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </lazy-data-card>
</template>

<style scoped></style>
