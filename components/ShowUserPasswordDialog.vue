<script setup>
const {plainPassword, reset} = useUserPlainPasswordState()
const isOpen = computed(() => !!plainPassword.value)

</script>

<template>
  <v-dialog :model-value="isOpen" width="400px" :persistent="true">
    <v-card>
      <v-card-text>
        <v-container>
          <v-row class="mx-4 pt-4" justify="center">
            <v-col cols="12" sm="8">
              <div class="text-center">
                <div id="resetPassword"
                     class="text-secondary border pa-4 font-weight-bold"
                >{{
                    plainPassword
                  }}
                </div>
              </div>
            </v-col>
          </v-row>
          <v-row class="mx-4 pt-8 text-center">
            Copy and save the new password and provide it to the user. You won’t
            be able to see it again!
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="anchor" @click="reset()"
        >Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
