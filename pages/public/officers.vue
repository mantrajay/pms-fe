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
  <Officers />
</div>
</template>
<script>
import Officers from '@/components/public/officers'
export default {
  layout: 'public',
  components: {
    Officers
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
          text: 'Officers',
          disabled: true,
          href: 'breadcrumbs_link_1',
        }
      ]
    }
  }
}
</script>
