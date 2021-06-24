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
  <Home />
</div>
</template>
<script>
import Home from '@/components/public/home'
export default {
  layout: 'public',
  components: {
    Home
  },

  data () {
    return {
      items: [
        {
          text: 'Home',
          disabled: true,
          href: '/',
        }
      ]
    }
  }
}
</script>
