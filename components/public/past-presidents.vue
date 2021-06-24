<template>
<v-row>
  <v-col
    cols="12"
    md="3"
    sm="3"
    v-for="(item, index) in presidents"
    :key="index">
    <v-alert
      color="#10946d"
      border="left"
      elevation="2"
      colored-border
      icon="mdi-check-circle">
      <h2>{{ item.year }}</h2>
      <h5>{{ item.name }}</h5>
      <v-rating
        readonly
        background-color="warning"
        color="warning"
        length="5"
        size="20"
        value="5" />  
    </v-alert>
  </v-col>
</v-row>
</template>
<script>
export default {
  name: 'Home',
  data () {
    return {
      presidents: [],
    }
  },

  created () {
    this.fetchAllPresidents()
  },

  methods: {
    fetchAllPresidents () {
      this.loading = true
      this.API_POST({ url: 'Public_Controller/fetchAllPresidents'})
        .then(response => {
          let data = response.data
          this.presidents = data
        }).catch(error => {  })
        .finally(() => { this.loading = false })
    }
  }
}
</script>
<style scoped>
p {
  margin: auto;
}
</style>