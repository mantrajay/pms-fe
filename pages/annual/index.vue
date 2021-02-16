<template>
  <v-container fluid>
    <Annual class="mt-n4"/>
  </v-container>
</template>
<script>
import Annual from '@/components/modules/annual/list-annual'
export default {
  middleware: 'routerGuard',
  components: {
    Annual
  }
}
</script>
