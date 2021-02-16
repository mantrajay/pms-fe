<template>
  <v-container fluid>
    <Chapters class="mt-n4"/>
  </v-container>
</template>
<script>
import Chapters from '@/components/modules/chapters/list-chapters'
export default {
  middleware: 'routerGuard',
  components: {
    Chapters
  }
}
</script>
