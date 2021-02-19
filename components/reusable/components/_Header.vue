<template>
<v-row>
  <v-col
    cols="12"
    md="12"
    sm="12">
    <h2>{{ title }}</h2>
  </v-col>
</v-row>
</template>
<script>
export default {
  name: 'Header',
  props: {
    title: {
      type: String,
      default: ''
    },
    btnLabel: {
      type: String,
      default: ''
    },
    showBtn: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style scoped>
h2 {
  font-size: 15pt;
  color: #595959;
}
</style>