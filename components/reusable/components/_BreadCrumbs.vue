<template>
  <v-breadcrumbs :items="items"
    class="mt-n3 ml-n5 mb-n3" />
</template>
<script>
export default {
  name: 'Bread-Crumbs',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>