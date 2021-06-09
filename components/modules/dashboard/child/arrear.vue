<template>
  <v-row>
    <v-col
      cols="12"
      md="6"
      sm="6"
      v-if="memberArrearsNotPaid.length">
      <v-card>
        <v-card-text>
          <h4 class="mt-2">BALANCE ARREAR(S)</h4>
        </v-card-text>
        <v-card-text class="d-flex mt-n3">
          <div class="ml-2">
            <v-chip
              class="ma-1"
              v-for="(year, index) in memberArrearsNotPaid"
              :key="index"
              color="error">
              {{ year }}
            </v-chip>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'Member-Annual-Transaction',
  data() {
    return {
      loading: false,
      memberArrearsNotPaid: [],
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Year', value: 'year' },
        { text: 'Amount', value: 'amount' },
        { text: 'Date Paid', value: 'date' },
        { text: 'Status', value: 'status' }
      ]
    }
  },

  fetch () {
    this.fetchMemberAnnualFees()
  },

  methods: {
    fetchMemberAnnualFees () {
      this.loading = true
      this.API_POST({ url: 'Members/fetchMemberAnnualFees/' + this.GET_AUTH.userId})
        .then(response => {
          this.memberArrearsNotPaid = response.data.memberArrearsNotPaid
        }).catch(error => {  })
        .finally(this.loading = false)
    }
  }
}
</script>
<style scoped>
.v-expansion-panel::before {
  box-shadow: none !important;
}
.dotted {
  border-top: 2px #7777 dotted !important;
}
h4 {
  color: #686565;
}
.points {
  padding: 10px 17px;
  background-color: #4caf50;
  color: #fff;
  border-radius: 25px;
}
</style>