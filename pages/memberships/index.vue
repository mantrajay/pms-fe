<template>
  <v-container fluid>
    <Memberships class="mt-n4"/>
  </v-container>
</template>
<script>
import Memberships from '@/components/modules/memberships/list-memberships'
export default {
  middleware: 'routerGuard',
  components: {
    Memberships
  }
}
</script>
