<template>
  <v-container fluid>
    <Members class="mt-n4"/>
  </v-container>
</template>
<script>
import Members from '@/components/modules/members/list-members'
export default {
  middleware: 'routerGuard',
  components: {
    Members
  }
}
</script>
