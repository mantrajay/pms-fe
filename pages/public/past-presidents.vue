<template>
<div>
  <v-breadcrumbs :items="items">
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item
        :href="item.href"
        :disabled="item.disabled"
      >
        {{ item.text.toUpperCase() }}
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
  <PastPresidents />
</div>
</template>
<script>
import PastPresidents from '@/components/public/past-presidents'
export default {
  layout: 'public',
  components: {
    PastPresidents
  },

  data () {
    return {
      items: [
        {
          text: 'Home',
          disabled: false,
          href: '/',
        },
        {
          text: 'About Us',
          disabled: true,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: 'Past Presidents',
          disabled: true,
          href: 'breadcrumbs_link_1',
        }
      ]
    }
  }
}
</script>
