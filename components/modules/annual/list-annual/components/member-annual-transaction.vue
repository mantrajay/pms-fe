<template>
  <v-row>
    <v-col
      cols="12"
      md="12"
      sm="12"
      v-if="loading">
      <v-progress-linear
        :width="3"
        large
        color="primary"
        indeterminate />
    </v-col>
    <v-col
      v-for="(item, i) in annualFees"
      :key="i"
      cols="12"
      md="6"
      sm="6">
      <v-card
        class="mx-auto"
        max-width="100%"
        outlined>
        <v-card-text>
          <v-row>
            <v-col
              cols="9"
              md="9"
              sm="9">
              <h1 class="success--text">{{ item.year }}</h1>
            </v-col>
            <v-col
              cols="3"
              md="3"
              sm="3"
              class="text-right mt-n1">
              <v-chip
                small
                color="success">
                {{
                  parseInt(item.annualfees) < parseInt(item.amount) && !item.annualfees
                  ? 'Partial'
                  : !item.amount
                    ? 'Unpaid'
                    : 'Paid'
                }}
              </v-chip>
            </v-col>
          </v-row>
          <v-divider class="mt-2"></v-divider>
          <div class="text--primary mt-3">
            <h3 class="success--text">{{ item.name }}</h3>
            <b class="mr-1">Amount:</b>₱{{ formatMoney(item.annualfees[0].amount ) }}
          </div>
          <div class="text--primary">
            <b class="mr-1">Date Paid:</b>{{ getLocalDate(item.annualfees[0].date_paid, true).split('-')[0] }}
          </div>
        </v-card-text>
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
      panel: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      dialog: true,
      loading: false,
      annualFees: [],
      headers: [
        { text: 'Code', value: 'code' },
        { text: 'Name', value: 'name' },
        { text: 'Points', value: 'points' },
        { text: 'Start Time', value: 'start_time' },
        { text: 'End Time', value: 'end_time' }
      ],
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
          this.annualFees = response.data
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