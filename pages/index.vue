<template>
<div class="mt-12">
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
