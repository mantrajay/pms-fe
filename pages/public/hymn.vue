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
  <Hymn />
</div>
</template>
<script>
import Hymn from '@/components/public/hymn'
export default {
  layout: 'public',
  components: {
    Hymn
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
          text: 'Hymn',
          disabled: true,
          href: 'breadcrumbs_link_1',
        }
      ]
    }
  }
}
</script>
