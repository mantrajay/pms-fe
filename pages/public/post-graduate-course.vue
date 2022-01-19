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
  <RegiterForm />
</div>
</template>
<script>
import RegiterForm from '@/components/public/post-graduate-course'
export default {
  layout: 'public',
  components: {
    RegiterForm
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
          text: 'Register',
          disabled: true,
          href: 'breadcrumbs_link_1',
        }
      ]
    }
  }
}
</script>
