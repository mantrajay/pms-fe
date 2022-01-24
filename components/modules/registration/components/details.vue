<template>
<v-row>
  <v-col
    cols="12"
    md="12"
    sm="12">
    <v-card outlined>
      <v-card-text class="mt-n5">
        <div
          class="mt-5"
          v-if="!details">
          No Registration details found.
        </div>
       <v-container
        v-else
        fluid>
        <v-row class="mt-3">
          <v-col 
            cols="12"
            sm="3"
            md="3">
            <h2>Registration Code</h2>
            <h1 class="mt-2">{{ details.code }}</h1>
          </v-col>
          <v-col 
            cols="12"
            sm="3"
            md="3">
            <h2>Status</h2>
            <v-chip :color="details.status ? 'success' : 'primary'">{{ details.status ? 'Registered' : 'For Review' }}</v-chip>
          </v-col>
        </v-row>
        <v-row class="dotted mt-5">
          <v-col
            cols="12"
            sm="3"
            md="3">
            <h3>Last Name</h3>
            <p>{{ details.lastName }}</p>
          </v-col>
          <v-col
            cols="12"
            sm="3"
            md="3">
            <h3>First Name</h3>
            <p>{{ details.firstName }}</p>
          </v-col>
          <v-col
            cols="12"
            sm="3"
            md="3">
            <h3>Middle Name</h3>
            <p>{{ details.middleName }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="3"
            md="3">
            <h3>PRC License No.</h3>
            <p>{{ details.prcNo }}</p>
          </v-col>
          <v-col
            cols="12"
            sm="3"
            md="3">
            <h3>PRC No. Expiry Date</h3>
            <p>{{ details.expiryDate }}</p>
          </v-col>
          <v-col
            cols="12"
            sm="3"
            md="3">
            <h3>PMA No.</h3>
            <p>{{ details.pmaNo }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="3"
            md="3">
            <h3>Date of Birth</h3>
            <p>{{ details.dateOfBirth }}</p>
          </v-col>
          <v-col
            cols="12"
            sm="3"
            md="3">
            <h3>Mobile No.</h3>
            <p>{{ details.cpNo }}</p>
          </v-col>
          <v-col
            cols="12"
            sm="3"
            md="3">
            <h3>Telephone No.</h3>
            <p>{{ details.telNo }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="3"
            md="3">
            <h3>Occupation</h3>
            <p>{{ details.occupation }}</p>
          </v-col>
          <v-col
            cols="12"
            sm="3"
            md="3">
            <h3>Email Address</h3>
            <p>{{ details.email }}</p>
          </v-col>
          <v-col
            cols="12"
            sm="4"
            md="4">
            <h3>Permanent Address</h3>
            <p>{{ details.address }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col 
            cols="12"
            sm="3"
            md="3">
            <h3>PMS Chapter</h3>
            <p>{{ details.chapter.name }}</p>
          </v-col>
          <v-col 
            cols="12"
            sm="3"
            md="3">
            <h3>Hospital Affiliation</h3>
            <p>{{ details.affiliation }}</p>
          </v-col>
          <v-col
            cols="12"
            sm="9"
            md="9">
            <h3>Clinic/Address</h3>
            <p>{{ details.clinicAddress }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="3"
            md="3"
            class="mt-n2">
            <h3>Mode of Payment</h3>
            <p>{{ details.modeOfPayment }}</p>
          </v-col>
          <v-col
            cols="12"
            sm="9"
            md="9"
            class="mt-n2">
            <h3>Schedule and Pricing</h3>
            <ul>
              <li>{{ details.pricing.dateName }}</li>
              <li>{{ details.pricing.name }}</li>
              <li>{{ formatMoney(details.pricing.amount) }}</li>
            </ul>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="5"
            sm="5">
            <h3>Payment Attachment Slip</h3>
            <v-img
              :src="details.image"  
              class="image-border mt-2"
              aspect-ratio="1.4"/>
          </v-col>
        </v-row>
        <v-row v-if="!details.status">
          <v-col
            cols="12"
            sm="6"
            md="6">
            <v-btn
              x-large
              class="white--text"
              color="rgb(16, 148, 109)"
              elevation="0"
              @click="confirmSubmit">
              <v-icon>mdi-thumb-up</v-icon>
              Resolve
            </v-btn>
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
  </v-col>
</v-row>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Register',
  data() {
    return {
      dialog: true,
      fileToUpload: [],
      details: null,
      confirm: {
        msg: '',
        show: false,
        loading: false,
        title: '',
        variant: 'primary'
      },
    }
  },

  fetch() {
    this.fetchRegistrationDetails()
  },

  methods: {
    fetchRegistrationDetails() {
      this.loading = true
      this.API_POST({ url: `Registration/details/${this.$route.params.id}`})
        .then(response => {
          this.details = response.data
        }).catch(error => {  })
        .finally(() => { this.loading = false })
    },

    confirmSubmit () {
      this.confirm.show = true
      this.confirm.msg = `Are you sure you want to resolve this registration?`
      this.confirm.title = `Confirm Submit`
    },

    submit () {
      this.confirm.loading = true
      this.API_POST({ url: `Registration/editRegistrationStatus/${this.$route.params.id}`})
      .then(response => {
        this.SET_ALERT_SUCCESS(response.response)
      })
      .catch(error => { this.SET_ALERT_ERROR(error.response) })
      .finally(() => {
        this.confirm.show = false
        this.confirm.loading = false
      })
    },
  }
}
</script>
<style scoped>
.indent {
  text-indent: 20px;
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
  color: rgb(16, 148, 109);
  font-weight: 500;
  outline: none;
  white-space: nowrap;
  cursor: pointer;
  font-size: 15px;
  text-decoration: inherit;
  vertical-align: inherit;
  position: absolute;
  left: 42% !important;
  top: 56% !important;
  background-color: #fafbfd;
}
.input-file-error {
  border: 3px dashed #ff3f3f !important;
}
.input-file {
  height: 240px !important;
  position: relative;
  left: -2px;
  width: 100%;
  top: -10px;
  border: 3px dashed #8A92A9;
  background: #FAFBFD 0% 0% no-repeat padding-box;
}
.expired-date {
  text-decoration: line-through;
  color: #7777;
}
.remove-photo {
  position: relative;
  top: 27px;
  z-index: 1;
}
.dotted {
  border-top: 4px dotted #777;
}
</style>