<template>
  <v-container fluid>
    <ResetPasswordRequest class="mt-n4"/>
  </v-container>
</template>
<script>
import ResetPasswordRequest from '@/components/modules/reset-password'
export default {
  middleware: 'routerGuard',
  components: {
    ResetPasswordRequest
  }
}
</script>
