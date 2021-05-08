<template>
  <v-row class="creator">
    <v-col
      cols="12"
      md="12"
      sm="12">
      <p>Created By: {{ items.createdBy }}</p>
      <p class="mt-n3">Date Created: {{ items.createdAt }}</p>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'Creator',
  props: {
    items: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>
<style scoped>
.creator {
  color: #9e9e9e;
  border-top: dotted 2px #7777;
}
</style>