<template>
  <v-row>
    <v-col
      cols="12"
      md="6"
      sm="6">
      <v-card>
        <v-card-text class="d-flex">
          <h4 class="mt-2">BALANCE ARREAR(S)</h4>
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
    <v-col
      cols="12"
      md="12"
      sm="12">
      <v-card>
        <v-card-text>
          <h4>PAID ARREAR(S)</h4>
        </v-card-text>
        <v-data-table
          class="pa-3 mt-n3"
          :headers="headers"
          :items="annualFees"
          :items-per-page="15"
          :loading="loading">
          <template v-slot:item.status="{ item }">
            <v-chip color="success">
              {{ 
                parseInt(item.annualfees) < parseInt(item.amount) && !item.annualfees
                  ? 'Partial'
                  : !item.amount
                    ? 'Unpaid'
                    : 'Paid'
              }}
            </v-chip>
          </template>
          <template v-slot:item.name="{ item }">
            <h3 class="default--text">{{ item.name }}</h3>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'Member-Annual-Transaction',
  props:{
    memberId: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      loading: false,
      annualFees: [],
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
      this.API_POST({ url: 'Members/fetchMemberAnnualFees/' + this.memberId})
        .then(response => {
          this.memberArrearsNotPaid = response.data.memberArrearsNotPaid
          this.annualFees = response.data.membersAnnuals.map(item => {
            return {
              name: item.name,
              amount: `₱ ${this.formatMoney(item.annualfees[0].amount )}`,
              status: item.status,
              year: item.year,
              date: this.getLocalDate(item.annualfees[0].date_paid, true).split('-')[0]
            }
          })
        }).catch(error => {  })
        .finally(this.loading = false)
    },

    totalPaid (items) {
      let total = 0
      items.forEach(values => {
        total+=parseInt(values.amount)
      })
      return this.formatMoney(total)
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