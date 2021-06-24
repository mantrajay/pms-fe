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
  <ContactUs />
</div>
</template>
<script>
import ContactUs from '@/components/public/contact-us'
export default {
  layout: 'public',
  components: {
    ContactUs
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
          text: 'Contact Us',
          disabled: true,
          href: 'breadcrumbs_dashboard',
        }
      ]
    }
  }
}
</script>
