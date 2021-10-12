<template>
<div>
  <v-dialog
    transition="dialog-bottom-transition"
    v-model="dialog"
    persistent
    max-width="80%">
    <v-card>
      <v-card-title>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="6">
            <h4>{{ `${memberDetail.last_name}, ${memberDetail.first_name} ${memberDetail.middle_name}` }}
              <v-chip
                color="success">
                {{ memberDetail.prcNo }}
              </v-chip>
            </h4>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="6"
            class="text-right">
              <v-btn
                color="primary"
                text
                @click="closeMemberArrear">
                Close
              </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text
        class="mt-n2">
        <v-container
          class="dotted"
          fluid>
          <v-row>
            <v-col
              cols="12"
              sm="4"
              md="4">
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="6">
                  <p><b>Membership:</b> {{ arrears.membership }}</p>
                  <p class="mt-n4"><b>Amount:</b>{{ formatMoney(arrears.amount) }}</p>
                  <p class="mt-n4"><b>Year:</b> {{ arrears.year }}</p>
                </v-col>
                <v-col
                  cols="12"
                  md="12"
                  sm="12"
                  class="mt-n6">
                  <v-text-field
                    outlined
                    v-model="form.amount.value"
                    :class="{'text-input': form.amount.isEmpty}"
                    @blur="validationKey(form.amount, 'Amount')"
                    dense
                    label="Enter Amount *"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  class="mt-n5">
                  <v-menu
                    v-model="date"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.date.value"
                      :class="{'text-input': form.date.isEmpty }"
                      @blur="validationKey(form.date,  'Pay Date')"
                      outlined
                      dense
                      append-icon="mdi-calendar"
                      readonly
                      label="Select Date *"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                    <v-date-picker
                      v-model="form.date.value"
                      @input="date = false, validationKey(form.date,  'Pay Date')"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  class="mt-n5">
                  <v-menu
                    ref="time"
                    v-model="time"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="form.time.value"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="form.time.value"
                        :class="{'text-input': form.time.isEmpty }"
                        @blur="validationKey(form.time,  'Start Time')"
                        label="Select Time *"
                        append-icon="mdi-clock-time-four-outline"
                        readonly
                        outlined
                        dense
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="time"
                      v-model="form.time.value"
                      full-width
                      @click:minute="$refs.time.save(form.time.value)"
                    ></v-time-picker>
                  </v-menu>
                </v-col>
                <v-col
                  cols="12"
                  md="9"
                  sm="9"
                  class="mt-n5">
                  <v-btn
                    block
                    color="primary"
                    elevation="0"
                    :loading="loading"
                    :disabled="loading"
                    @click="confirmSubmit">
                    Submit
                  </v-btn>
                </v-col>
                <v-col
                  cols="12"
                  md="3"
                  sm="3"
                  class="mt-n5">
                  <v-btn
                    block
                    color="error"
                    elevation="0"
                    :loading="loading"
                    :disabled="loading"
                    @click="resetForm">
                    Clear
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col
              cols="12"
              sm="8"
              md="8">
              <h4 class="ml-5">Payment Transactions</h4>

              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Amount</th>
                      <th class="text-left">Date Paid</th>
                      <th class="text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in transactions"
                      :key="item.amount"
                    >
                      <td>{{ item.amount }}</td>
                      <td>{{ getLocalDate(item.date_paid, true) }}</td>
                      <td>
                        <v-btn
                          elevation="0"
                          color="primary"
                          @click="editTransaction(item)"
                          small>
                        <v-icon>mdi-brush</v-icon>
                      </v-btn>
                      <v-btn
                        elevation="0"
                        color="error"
                        small
                        @click="confirmDelete(item.id)">
                        <v-icon>mdi-eraser</v-icon>
                      </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
  <AlertCallBack
    v-if="confirm.show"
    :callBack="confirm"
    @close="confirm.show = false"
    @event="submit"/>
  <AlertCallBack
    v-if="deleteConfirm.show"
    :callBack="deleteConfirm"
    @close="deleteConfirm.show = false"
    @event="deleteTransaction"/>
</div>
</template>
<script>
export default {
  name: 'Create-Transaction',
  props:{
    arrearId: {
      type: Number,
      default: null
    },

    memberDetail: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      dialog: true,
      loading: false,
      date: false,
      time: null,
      form: {
        amount: this.iRules('', true),
        date: this.iRules('', true),
        time: this.iRules('', true)
      },
      confirm: {
        msg: '',
        show: false,
        loading: false,
        title: 'Create Transaction',
        variant: 'primary'
      },
      deleteConfirm: {
        msg: '',
        show: false,
        loading: false,
        title: 'Create Transaction',
        variant: 'primary'
      },
      arrears: {
        membership: '',
        amount: '',
        year: ''
      },
      headers: [
        { text: 'Amount', value: 'amount' },
        { text: 'Date Paid', value: 'date_paid' },
        { text: 'Actions', value: 'actions' }
      ],
      transactions: [],
      transactionId: '',
      edit: false
    }
  },

  computed: {
    isBtnEnabled () {
      let enable = true
      Object.keys(this.form).forEach(index => {
        let value = this.form[index].value
        let required = this.form[index].required
        if (required) {
          if (!value) enable = false
        }
      })
      return enable
    }
  },

  fetch () {
    this.fetchArrearDetail()
  },

  methods: {
    fetchArrearDetail () {
      let formData = this.formParams({
        arrearId: this.arrearId,
        prcNo: this.memberDetail.prcNo
      })
      this.API_POST({ url: 'Arrears/arrearDetailsAndMemberTransaction', data: formData })
        .then(response => {
          let data = response.data
          this.setForm(data)
        }).catch(error => {  })
        .finally(this.loading = false)
    },

    setForm (data = {}) {
      this.arrears = {
        membership: data.name,
        amount: data.amount,
        year: data.year
      }
      this.transactions = data.transactions
    },

    confirmSubmit () {
      if (!this.validateForm(this.form)) {
        this.SET_ALERT_ERROR(this.errMessage)
        return false
      }
      this.confirm.show = true
      this.confirm.msg = `Are you sure you want to ${this.edit ? 'update': 'create'} this transaction?`
      this.confirm.title = `Pay Arrear`
    },

    confirmDelete (id) {
      this.transactionId = id
      this.deleteConfirm.show = true
      this.deleteConfirm.msg = `Are you sure you want to delete this transaction?`
      this.deleteConfirm.title = `Delete Transaction`
      this.deleteConfirm.variant = 'error'
    },

    submit () {
      this.confirm.loading = true
      let formData = this.formParams({
        arrearId: this.arrearId,
        prcNo: this.memberDetail.prcNo,
        datePaid: `${this.form.date.value} ${this.form.time.value}`,
        amount: parseInt(this.form.amount.value),
        membershipFee: parseInt(this.arrears.amount),
      })
      let method = !this.edit ? 'createTransaction' : `createTransaction/${this.transactionId}`
      this.API_POST({url: `Arrears/${method}`, data: formData})
        .then(response => {
          this.resetForm()
          this.$emit('event')
          this.fetchArrearDetail()
          this.SET_ALERT_SUCCESS(response.response)
        })
        .catch(error => { this.SET_ALERT_ERROR(error.response) })
        .finally(() => {
          this.confirm.show = false
          this.confirm.loading = false
        })
    },

    deleteTransaction () {
      this.deleteConfirm.loading = true
      let formData = this.formParams({
        prcNo: this.memberDetail.prcNo,
        year: this.arrears.year
      })
      this.API_POST({url: `Arrears/deleteTransaction/${this.transactionId}`, data: formData})
        .then(response => {
          this.$emit('event')
          this.fetchArrearDetail()
          this.SET_ALERT_SUCCESS(response.response)
        })
        .catch(error => { this.SET_ALERT_ERROR(error.response) })
        .finally(() => {
          this.deleteConfirm.show = false
          this.deleteConfirm.loading = false
        })
    },

    editTransaction (item) {
      this.edit = true
      this.transactionId = item.id
      let date = item.date_paid.split(' ')[0]
      let time = item.date_paid.split(' ')[1]
      this.form = {
        amount: this.iRules(item.amount, true),
        date: this.iRules(date, true),
        time: this.iRules(time, true)
      }
    },

    resetForm () {
      this.edit = false
      this.form = {
        amount: this.iRules('', true),
        date: this.iRules('', true),
        time: this.iRules('', true)
      }
    },

    closeMemberArrear () {
      this.$emit('close')
      this.$emit('event')
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
  font-size: 13px;
}
</style>