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
  <Activities />
</div>
</template>
<script>
import Activities from '@/components/public/activities'
export default {
  layout: 'public',
  components: {
    Activities
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
          text: 'Activities',
          disabled: true,
          href: 'breadcrumbs_link_1',
        }
      ]
    }
  }
}
</script>
