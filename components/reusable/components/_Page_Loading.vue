<template>
<div class="mt-n3 pa-3">
  <v-row>
    <v-col md="6"
      class="mt-2">
      <v-skeleton-loader
        class="ml-2"
        :boilerplate="GET_PAGE_LOADING.boilerplate"
        type="heading" />
    </v-col>
    <v-col md="6"
      class="mt-n3">
      <v-skeleton-loader
      class="float-right"
        :boilerplate="GET_PAGE_LOADING.boilerplate"
        type="actions"/>
    </v-col>
  </v-row>
  <v-row>
    <v-col class="mt-n8 ml-n1 pa-6">
      <v-skeleton-loader
        ref="skeleton"
        :boilerplate="GET_PAGE_LOADING.boilerplate"
        :type="GET_PAGE_LOADING.type"/>
    </v-col>
  </v-row>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Page-Loading',
  computed: {
    ...mapGetters({
      GET_PAGE_LOADING: 'GET_PAGE_LOADING'
    })
  }
}
</script>
