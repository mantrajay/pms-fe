<template>
  <v-container fluid>
    <RegistrationList class="mt-n4"/>
  </v-container>
</template>
<script>
import RegistrationList from '@/components/modules/registration'
export default {
  middleware: 'routerGuard',
  components: {
    RegistrationList
  }
}
</script>
