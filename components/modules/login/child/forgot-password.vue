<template>
  <v-dialog v-model="dialog"
    persistent
    :max-width="$vuetify.breakpoint.lg ? '40%' : '100%'">
    <v-card>
      <v-card-title>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="6">
            <h4>Forgot Password</h4>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text class="mt-n5">
       <v-container
        class="dotted mt-4"
        fluid>
        <v-row class="mt-1">
          <v-col
            cols="12"
            md="12"
            sm="12">
            <v-text-field
              :disabled="loading"
              outlined
              v-model="form.prcNo.value"
              :class="{'text-input': form.prcNo.isEmpty}"
              @input="validationKey(form.prcNo,  'PRC Number')"
              dense
              label="PRC number"
            ></v-text-field>
            <p class="error-text mt-1">{{ form.prcNo.msg }}</p>
          </v-col>
          <v-col
            cols="12"
            md="12"
            sm="12"
            class="mt-n8">
            <v-text-field
              :disabled="loading"
              outlined
              v-model="form.email.value"
              :class="{'text-input': form.email.isEmpty}"
              @input="validationKey(form.email,  'Email address')"
              dense
              label="Email address"
            ></v-text-field>
            <p class="error-text mt-1">{{ form.email.msg }}</p>
          </v-col>
          <v-col
            cols="12"
            md="12"
            sm="12"
            class="mt-n5 text-right">
            <v-btn
              @click="$emit('close')"
              text
              color="error"
              :loading="loading">
              Cancel
            </v-btn>
            <v-btn
              color="primary"
              :disabled="isSubmitBtn"
              @click="forgotPassword"
              :loading="loading">
              Submit
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</v-dialog>
</template>
<script>
export default {
  name: 'Forgot-Password',
  data() {
    return {
      dialog: true,
      loading: false,
      form: {
        email: this.iRules('', true, true),
        prcNo: this.iRules('', true),
      }
    }
  },

  methods: {
    forgotPassword () {
      if (!this.validateForm(this.form)) {
        this.SET_ALERT_ERROR(this.errMessage)
        return false
      }
      this.loading = true
      let formData = new FormData()
      formData.append('email', this.form.email.value)
      formData.append('prcNo', this.form.prcNo.value)
      this.API_POST({ url: 'Public_Controller/forgotPassword', data: formData })
        .then(response => {
          this.SET_ALERT_SUCCESS(response.response)
          this.$emit('close')
        }).catch(error => {
          this.SET_ALERT_ERROR(error.response)
        })
        .finally(this.loading = false)
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
.points {
  padding: 10px 17px;
  background-color: #4caf50;
  color: #fff;
  border-radius: 25px;
}
</style>