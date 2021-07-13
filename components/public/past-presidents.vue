<template>
<div>
  <v-row>
    <v-col
      cols="12"
      md="7"
      sm="7">
      <v-card outlined>
        <v-img
          :lazy-src="require(`@/assets/loading/loading.gif`)"
          :src="require('@/assets/images/former-pres.jpg')" />
      </v-card>
    </v-col>
    <v-col
      cols="12"
      md="5"
      sm="5">
      <v-card outlined>
        <v-data-table
          :headers="headers"
          :loading="loading"
          :items="presidents"
          :items-per-page="15"
          item-key="name"
          class="elevation-1"
          :footer-props="{
            showFirstLastPage: true,
            firstIcon: 'mdi-arrow-collapse-left',
            lastIcon: 'mdi-arrow-collapse-right',
            prevIcon: 'mdi-minus',
            nextIcon: 'mdi-plus'
          }"
        >
        <template v-slot:item.status="{ item, index }">
          <v-chip
            class="white--text"
            :color="item.status === 'Current' ? '#10946d' : 'primary'">
            {{ item.status }}
          </v-chip>
        </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</div>
</template>
<script>
export default {
  name: 'Home',
  data () {
    return {
      loading: false,
      headers: [
        { text: 'Name of the President', value: 'name' },
        { text: 'Year(s) of Service', value: 'year' },
        { text: 'Status', value: 'status' },
      ],
      presidents: []
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
          this.presidents = data.map((items, index) => {
            return {
              id: items.id,
              name: items.name,
              year: items.year,
              status: !index ? 'Current' : 'Finished'
            }
          })
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
.year {
  background-color: #ffb463;
  font-size: 17px !important;
  border-radius: 35px;
}
</style>