<template>
  <v-container fluid>
    <RegistrationDetails class="mt-n4"/>
  </v-container>
</template>
<script>
import RegistrationDetails from '@/components/modules/registration/details'
export default {
  middleware: 'routerGuard',
  components: {
    RegistrationDetails
  }
}
</script>
