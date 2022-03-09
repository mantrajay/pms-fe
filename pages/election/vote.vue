<template>
  <v-container fluid>
    <ElectionVote class="mt-n4"/>
  </v-container>
</template>
<script>
import ElectionVote from '@/components/modules/election/vote'
export default {
  middleware: 'routerGuard',
  components: {
    ElectionVote
  }
}
</script>
