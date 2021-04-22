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
      md="4"
      sm="4">
      <v-card
        class="mx-auto"
        max-width="344"
        outlined>
        <v-card-text>
          <h3>{{ item.name }} - <span class="success--text">{{ item.year }}</span></h3>
          <v-divider class="mt-2"></v-divider>
          <div class="text--primary mt-3">
            <b class="mr-1">Amount:</b>₱{{ formatMoney(item.annualfees[0].amount ) }}
          </div>
          <div class="text--primary">
            <b class="mr-1">Date Paid:</b>{{ getLocalDate(item.annualfees[0].date_paid, true).split('-')[0] }}
          </div>
        </v-card-text>
        <v-card-actions class="mt-n2">
          <v-chip
            label
            outlined
            color="success">
            {{
              parseInt(item.annualfees) < parseInt(item.amount) && !item.annualfees
              ? 'Partial'
              : !item.amount
                ? 'Unpaid'
                : 'Paid'
            }}
          </v-chip>
        </v-card-actions>
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