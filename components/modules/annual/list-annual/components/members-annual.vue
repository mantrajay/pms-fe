<template>
<div>
  <v-dialog v-model="dialog"
    persistent
    max-width="80%">
    <v-card>
      <v-card-title>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="6">
            <h4>MEMBER'S ARREARS</h4>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="6"
            class="text-right">
            <v-btn
              color="primary"
              text
              @click="$emit('close')">
              Close
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text v-if="loading">
        <v-progress-linear
          color="primary"
          indeterminate
          rounded
          height="6"
        />
      </v-card-text>
      <v-card-text
        v-else
        class="mt-n5">
        <v-container
          class="dotted mt-2"
          fluid>
          <v-row class="mt-n4">
            <v-col
              cols="12"
              md="3"
              sm="3">
              <p class="mt-4"><b>Membership:</b><span> {{ annualsMember.membership }}</span></p>
              <p class="mt-n2"><b>Year:</b><span> {{ annualsMember.year }}</span></p>
              <p class="mt-n2"><b>Amount:</b>
                <span>₱{{ formatMoney(annualsMember.amount) }}</span>
              </p>
              <p class="mt-n2"><b>Total Members:</b>
                <v-chip
                  label
                  outlined
                  color="success">
                  {{ members.length }}
                </v-chip>
              </p>
            </v-col>
            <v-col
              cols="12"
              md="3"
              sm="3"
              class="mt-3">
              <p><b>Total Collection:</b>
                <span>₱{{ formatMoney(members.length * annualsMember.amount) }}</span>
              </p>
              <p class="mt-n2"><b>Total Members Paid: </b>
                <span>₱{{ formatMoney(totalPaid) }}</span>
              </p>
              <p class="mt-n2"><b>Total Balance: </b>
                <span>₱{{ totalBalance }}</span>
              </p>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="6"
              class="mt-12">
              <v-text-field
                append-icon="mdi-magnify"
                v-model="search"
                label="Search"
                dense
                placeholder="Search members..."
                outlined
                hide-details
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="12"
              sm="12"
              class="mt-n2 dotted">
              <v-data-table
                :headers="headers"
                :items="members"
                :items-per-page="15"
                :search="search"
                :loading="loading">
                <template v-slot:item.status="{ item }">
                  <v-chip
                    label
                    elevation="0"
                    :color="
                      item.status === 'Paid'
                        ? 'success'
                        : item.status === 'Unpaid'
                          ? 'error'
                          : 'warning'
                      "
                    outlined>
                    {{ item.status }} &nbsp;
                    <v-icon small>mdi-{{
                      item.status === 'Paid'
                      ? 'check'
                      : item.status === 'Unpaid'
                        ? 'close'
                        : 'power-cycle'
                      }}
                    </v-icon>
                  </v-chip>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        elevation="0"
                        color="primary"
                        @click="memberDetail = item, showTransaction = true"
                        small>
                        <v-icon>mdi-brush</v-icon>
                      </v-btn>
                    </template>
                    <span>Settle Payment</span>
                  </v-tooltip>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
  <Transaction
    @close="showTransaction = false, getMemberByMembership()"
    v-if="showTransaction"
    :memberDetail="memberDetail"
    :arrearId="parseInt(annualsMember.id)"/>
</div>
</template>
<script>
import Transaction from './transaction'
export default {
  name: 'Create-Member-Annual',
  components: {
    Transaction
  },
  props:{
    annualsMember: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      dialog: true,
      loading: false,
      loadingMembership: false,
      search: '',
      headers: [
        { text: 'PRC Number', value: 'prcNo' },
        { text: 'Full Name', value: 'first_name' },
        { text: 'Middle Name', value: 'middle_name' },
        { text: 'Last Name', value: 'last_name' },
        { text: 'Total Amount Paid', value: 'amount' },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions' }
      ],
      members: [],
      showTransaction: false,
      memberDetail: null
    }
  },

  computed: {
    totalPaid () {
      let totalMemberPaid = 0
      this.members.forEach(items => {
        totalMemberPaid += items.amount
      })
      return totalMemberPaid
    },

    totalBalance () {
      let totalBalance = (this.members.length * parseInt(this.annualsMember.amount)) - parseInt(this.totalPaid)
      return this.formatMoney(totalBalance)
    }
  },

  fetch () {
    this.getMemberByMembership()
  },

  methods: {
    getMemberByMembership () {
      this.loadingMembership = true
      let formData = new FormData()
      formData.append('id', this.annualsMember.id)
      formData.append('membershipId', this.annualsMember.membershipId)
      formData.append('membershipFee', this.annualsMember.amount)
      this.API_POST({ url: 'Arrears/getMembersByMembership',  data: formData })
        .then(response => {
          this.members = response.data
        }).catch(error => {  })
        .finally( this.loadingMembership = false )
    }
  }
}
</script>
<style scoped>
.dotted {
  border-top: 2px #7777 dotted !important;
}
h4 {
  color: #686565;
}
p {
  font-size: 15px;
}
span {
  color: #4caf50;
}
</style>