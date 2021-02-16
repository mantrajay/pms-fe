<template>
  <v-dialog v-model="dialog"
    persistent
    max-width="30%">
    <v-card>
      <v-card-title>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="6">
            <h4>{{ membershipId ? 'UPDATE' : 'CREATE'}} MEMBERSHIP</h4>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="6"
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
                v-if="form.name.value"
                :loading="confirm.loading"
                :disabled="confirm.loading"
                @click="confirmSubmit">
                {{ membershipId ? 'Update' : 'Create'}}
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
            md="12">
            <v-text-field
              class="mt-n3"
              outlined
              v-model="form.name.value"
              :class="{'text-input': form.name.isEmpty}"
              @blur="validationKey(form.name, 'Membership Name')"
              dense
              label="Enter Membership Name *"
            ></v-text-field>
          </v-col>
        </v-row>
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
  name: 'Create-Membership',
  props:{
    membershipId: {
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
      form: {
        name: this.iRules('', true)
      },
      confirm: {
        msg: '',
        show: false,
        loading: false,
        title: 'Create Membership',
        variant: 'primary'
      }
    }
  },

  fetch () {
    if (this.membershipId) this.fetchMembership()
  },

  methods: {
    fetchMembership () {
      this.loading = true
      this.API_POST({ url: 'Memberships/fetchById/' + this.membershipId})
        .then(response => {
          let data = response.data
          this.form.name.value = data.name
        }).catch(error => {  })
        .finally(this.loading = false)
    },

    confirmSubmit () {
      if (!this.validateForm(this.form)) {
        this.SET_ALERT_ERROR(this.errMessage)
        return false
      }
      let type = this.membershipId ? 'Update' : 'Create'
      this.confirm.show = true
      this.confirm.msg = `Are you sure you want to ${type.toLowerCase()} this membership?`
      this.confirm.title = `${type} Membership`
    },

    submit () {
      this.confirm.loading = true
      let formData = this.formParams({
        name: this.form.name.value,
      })
      let method = 'create'
      if (this.membershipId) {
        method = 'update'
        formData.append('id', this.membershipId)
      }
      this.API_POST({url: `Memberships/${method}`, data: formData})
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
      this.form.name = this.iRules('', true)
    }
  }
}
</script>
<style scoped>
.remove-image {
  position: relative;
  top: 20px;
  left: 10px;
  cursor: pointer;
  z-index: 10;
}
.input-file::-webkit-file-upload-button {
  visibility: hidden;
}
.input-file {
  opacity: 1;
  outline: none;
}
input[type='file'] {
  color: transparent;    /* Hides your "No File Selected" */
  direction: rtl;        /* Sets the Control to Right-To-Left */
}
.drop-label {
  position: relative;
  top: -160px
}
.input-file::before {
  content: "Select Image";
  display: inline-block;
  border-radius: 3px;
  padding: 5px 8px;
  color: #00B8FF;
  font-weight: 500;
  outline: none;
  white-space: nowrap;
  cursor: pointer;
  font-size: 15px;
  text-decoration: inherit;
  vertical-align: inherit;
  position: absolute;
  left: 37% !important;
  top: 56% !important;
  background-color: #fafbfd;
}
.input-file {
  height: 240px !important;
  position: relative;
  left: -2px;
  width: 100%;
  top: -10px;
  border: 1px dashed #8A92A9;
  background: #FAFBFD 0% 0% no-repeat padding-box;
}
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