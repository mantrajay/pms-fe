<template>
  <v-dialog
    transition="dialog-bottom-transition"
    v-model="dialog"
    persistent
    max-width="30%">
    <v-card>
      <v-card-title>
        <v-row>
          <v-col
            cols="12"
            sm="4"
            md="4">
            <h4>{{ otherFeesId ? 'UPDATE' : 'CREATE'}}</h4>
          </v-col>
          <v-col
            cols="12"
            sm="8"
            md="8"
            class="text-right">
            <v-btn
              color="primary"
              text
              @click="$emit('close')"
              v-if="!confirm.loading">
              Close
            </v-btn>
            <v-btn
              color="primary"
              elevation="0"
              :loading="confirm.loading"
              :disabled="confirm.loading"
              @click="confirmSubmit">
              {{ otherFeesId ? 'Update' : 'Create'}}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text class="mt-n5">
       <v-container
        class="dotted mt-4"
        fluid>
        <v-row class="mt-3">
          <v-col
            cols="12"
            sm="12"
            md="12"
            class="mt-n4">
            <v-text-field
              outlined
              v-model="form.description.value"
              :class="{'text-input': form.description.isEmpty}"
              @blur="validationKey(form.description, 'Description Name')"
              dense
              label="Enter description *"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="12"
            class="mt-n7">
            <v-menu
              v-model="paymentDate"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="form.date.value"
                :disabled="setting === 'view'"
                :class="{'text-input': form.date.isEmpty, 'view-only': setting === 'view'}"
                @blur="validationKey(form.date,  'date')"
                outlined
                dense
                append-icon="mdi-calendar"
                readonly
                label="Select payment date *"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
              <v-date-picker
                v-model="form.date.value"
                @input="paymentDate = false, validationKey(form.date,  'Payment Date')"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="12"
            class="mt-n7">
            <v-select
              :loading="loadingMembers"
              :items="memberList"
              item-value="id"
              item-text="name"
              v-model="form.memberId.value"
              :class="{'text-input': form.memberId.isEmpty}"
              @blur="validationKey(form.memberId)"
              dense
              outlined
              label="Select Member *"
            ></v-select>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="12"
            class="mt-n7">
            <v-text-field
              outlined
              @keypress="integerOnly($event)"
              v-model="form.amount.value"
              :class="{'text-input': form.amount.isEmpty}"
              @blur="validationKey(form.amount, 'amount Name')"
              dense
              label="Enter amount *"
            ></v-text-field>
          </v-col>
        </v-row>
        <Creator :items="creator" />
      </v-container>
    </v-card-text>
    <AlertCallBack
      v-if="confirm.show"
      :callBack="confirm"
      @close="confirm.show = false"
      @event="submit"/>
  </v-card>
</v-dialog>
</template>
<script>
export default {
  name: 'Create-Other-Fees',
  props:{
    otherFeesId: {
      type: String,
      default: ''
    },
    setting: {
      type: String,
      default: 'create'
    }
  },

  data() {
    return {
      dialog: true,
      paymentDate: false,
      form: {
        memberId: this.iRules('', true),
        description: this.iRules('', false),
        date: this.iRules('', true),
        amount: this.iRules('', true)
      },
      loadingMembers: false,
      memberList: [],
      confirm: {
        msg: '',
        show: false,
        loading: false,
        title: 'Create Chapter',
        variant: 'primary'
      }
    }
  },

  fetch () {
    if (this.otherFeesId) this.fetchOtherFee()
    this.fetchMembers()
  },

  methods: {
    fetchOtherFee () {
      this.loading = true
      this.API_POST({ url: 'Other_Fees/fetchById/' + this.otherFeesId})
        .then(response => {
          let creator = response.data.creator
          this.creator = {
            createdBy: `${creator.creator.firstName} ${creator.creator.lastName}`,
            createdAt: creator.createdAt
          }
          this.setForm(response.data.otherFees)
        }).catch(error => {  })
        .finally(this.loading = false)
    },

    setForm (data = {}) {
      this.form.description.value = data.description
      this.form.memberId.value = data.member_id
      this.form.amount.value = data.amount
      this.form.date.value = data.payment_date
    },

    fetchMembers () {
      this.loadingMembers = true
      this.API_POST({ url: 'Common/getMembers'})
        .then(response => {
          this.memberList = response.data.map(items => {
            return {
              id: items.prc_no,
              name: `${items.last_name}, ${items.first_name} ${items.middle_name}`
            }
          })
        }).catch(error => {  })
        .finally(this.loadingMembers = false)
    },

    confirmSubmit () {
      if (!this.validateForm(this.form)) {
        this.SET_ALERT_ERROR(this.errMessage)
        return false
      }
      let type = this.otherFeesId ? 'Update' : 'Create'
      this.confirm.show = true
      this.confirm.msg = `Are you sure you want to ${type.toLowerCase()} this other fee?`
      this.confirm.title = `${type} Other Fee`
    },

    submit () {
      this.confirm.loading = true
      let formData = this.formParams({
        description: this.form.description.value,
        memberId: this.form.memberId.value,
        amount: this.form.amount.value,
        date: this.form.date.value
      })
      let method = 'create'
      if (this.otherFeesId) {
        method = 'update'
        formData.append('id', this.otherFeesId)
      }
      this.API_POST({url: `Other_Fees/${method}`, data: formData})
        .then(response => {
          this.resetForm()
          this.$emit('event')
          this.SET_ALERT_SUCCESS(response.response)
        })
        .catch(error => { this.SET_ALERT_ERROR(error.response) })
        .finally(() => {
          this.confirm.show = false
          this.confirm.loading = false
        })
    },

    resetForm () {
      this.form.memberId = this.iRules('', true)
      this.form.description = this.iRules('', true)
      this.form.date = this.iRules('', true)
      this.form.amount = this.iRules('', true)
    }
  }
}
</script>
<style scoped>
.dotted {
  border-top: 2px #7777 dotted !important;
}
.disabled >>> .v-input__slot{
  background-color: #eeeeee;
}
h4 {
  color: #686565;
}
.view-only >>> fieldset {
  border: none !important;
}
</style>