<template>
<v-row>
  <v-col
    cols="12"
    md="2"
    sm="2">
  </v-col>
  <v-col
    cols="12"
    md="8"
    sm="8">
    <v-card outlined>
      <v-card-title>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="6">
            <h5>REGISTRATION FORM</h5>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text class="mt-n5">
       <v-container
        class="dotted"
        fluid>
        <v-row class="mt-3">
          <v-col
            cols="12"
            sm="4"
            md="4">
            <v-text-field
              class="mt-n3"
              outlined
              v-model="form.firstName.value"
              :class="{'text-input': form.firstName.isEmpty}"
              @blur="validationKey(form.firstName, 'First Name')"
              dense
              label="Enter First Name *"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="4"
            md="4">
            <v-text-field
              class="mt-n3"
              outlined
              v-model="form.middleName.value"
              :class="{'text-input': form.middleName.isEmpty}"
              @blur="validationKey(form.middleName, 'Middle Name')"
              dense
              label="Enter Middle Name *"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="4"
            md="4">
            <v-text-field
              class="mt-n3"
              outlined
              v-model="form.lastName.value"
              :class="{'text-input': form.lastName.isEmpty}"
              @blur="validationKey(form.lastName, 'Last Name')"
              dense
              label="Enter Last Name *"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="6">
            <v-text-field
              class="mt-n3"
              outlined
              v-model="form.prcNo.value"
              :class="{'text-input': form.prcNo.isEmpty}"
              @blur="validationKey(form.prcNo, 'License No.')"
              dense
              label="PRC License No. *"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="6">
            <v-menu
              v-model="expireDate"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                class="mt-n3"
                readonly
                v-model="form.expiryDate.value"
                :class="{'text-input': form.expiryDate.isEmpty}"
                @blur="validationKey(form.expiryDate,  'Expiry Date')"
                outlined
                dense
                label="PRC No. Expiry Date *"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
              <v-date-picker
                v-model="form.expiryDate.value"
                @input="expireDate = false, validationKey(form.expiryDate,  'expiryDate')"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="6">
            <v-text-field
              class="mt-n3"
              outlined
              v-model="form.pmaNo.value"
              :class="{'text-input': form.pmaNo.isEmpty}"
              @blur="validationKey(form.pmaNo, 'PMA No.')"
              dense
              label="PMA No. *"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="6">
            <v-menu
              v-model="birthDate"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                class="mt-n3"
                readonly
                v-model="form.dateOfBirth.value"
                @blur="validationKey(form.dateOfBirth,  'Expiry Date')"
                :class="{'text-input': form.dateOfBirth.isEmpty}"
                outlined
                dense
                label="Date of Birth *"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
              <v-date-picker
                v-model="form.dateOfBirth.value"
                @input="birthDate = false, validationKey(form.dateOfBirth,  'dateOfBirth')"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="4"
            md="4">
            <v-text-field
              class="mt-n3"
              outlined
              v-model="form.cpNo.value"
              :class="{'text-input': form.cpNo.isEmpty}"
              @blur="validationKey(form.cpNo, 'Cellphone No.')"
              dense
              label="Mobile No. *"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="4"
            md="4">
            <v-text-field
              class="mt-n3"
              outlined
              v-model="form.telNo.value"
              :class="{'text-input': form.telNo.isEmpty}"
              @blur="validationKey(form.telNo, 'Telephone No.')"
              dense
              label="Telephone No."
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="4"
            md="4">
            <v-text-field
              class="mt-n3"
              outlined
              v-model="form.email.value"
              :class="{'text-input': form.email.isEmpty}"
              @blur="validationKey(form.email, 'Email Address')"
              dense
              label="Email Address *"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-3">
          <v-col
            cols="12"
            sm="12"
            md="12">
            <v-text-field
              class="mt-n3"
              outlined
              v-model="form.address.value"
              :class="{'text-input': form.address.isEmpty}"
              @blur="validationKey(form.address, 'Address')"
              dense
              label="Permanent Address *"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="8"
            md="8">
            <v-text-field
              class="mt-n3"
              outlined
              v-model="form.affiliation.value"
              :class="{'text-input': form.affiliation.isEmpty}"
              @blur="validationKey(form.affiliation, 'Hospital Affiliation')"
              dense
              label="Hospital Affiliation"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="12">
            <v-text-field
              class="mt-n3"
              outlined
              v-model="form.clinicAddress.value"
              :class="{'text-input': form.clinicAddress.isEmpty}"
              @blur="validationKey(form.clinicAddress, 'Clinic/Address')"
              dense
              label="Clinic/Address"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row
          :class="{'input-file-error': form.occupation.isEmpty}"
          class="mt-n5">
          <v-col
            cols="12"
            sm="12"
            md="12">
            <h3>Occupation</h3>
            <v-radio-group
              @change="changeOccupation"
              v-model="form.occupation.value"
              column>
              <v-row>
                <v-col
                  cols="12"
                  md="12"
                  class="mt-n2"
                  sm="12"
                  v-for="(item, index) in occupationList"
                  :key="index">
                  <v-radio
                    color="rgb(16, 148, 109)"
                    :label="item.name"
                    :value="item.name" />
                </v-col>
              </v-row>
            </v-radio-group>
          </v-col>
          <v-col
            class="mt-n5"
            cols="12"
            sm="5"
            md="5"
            v-if="form.occupation.value === 'Others'">
            <v-text-field
              class="mt-n3"
              outlined
              v-model="form.occupationOthers.value"
              :class="{'text-input': form.occupationOthers.isEmpty}"
              @blur="validationKey(form.occupationOthers, 'Occupation')"
              dense
              label="Enter Occupation *"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="12"
            md="12">
            <h3>PMS Chapter</h3>
            <small class="error--text">Note: Select only if you are PMS Member.</small>
            <v-radio-group
              v-model="form.chapterId.value"
              column>
              <v-row>
                <v-col
                  cols="12"
                  md="12"
                  class="mt-n2"
                  sm="12"
                  v-for="(item, index) in chapters"
                  :key="index">
                  <v-radio
                    color="rgb(16, 148, 109)"
                    :label="item.name"
                    :value="item.id" />
                </v-col>
              </v-row>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row :class="{'input-file-error': form.pricing.isEmpty}">
          <v-col
            cols="12"
            sm="12"
            md="12"
            class="mt-n2">
            <h3>Schedule and Pricing</h3>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="12"
            v-for="(item, index) in pricingList"
            :key="index"
            :class="{'mt-n6': index > 0}">
            <h4 :class="{'expired-date': disabledPricing(item.date)}">{{index + 1}}. {{ item.name }}</h4>
            <v-radio-group
              v-model="form.pricing.value"
              @change="validationKey(form.pricing,  'Pricing')"
              :disabled="disabledPricing(item.date)"
              column>
              <v-row>
                <v-col
                  class="mt-n3"
                  cols="6"
                  md="3"
                  sm="3"
                  v-for="(value, index) in item.pricing"
                  :key="index">
                  <small>{{ value.name }}</small>
                  <v-radio
                    color="rgb(16, 148, 109)"
                    :label="currency(value.amount)"
                    :value="value.id" />
                </v-col>
              </v-row>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row :class="{'input-file-error mt-5': form.modeOfPayment.isEmpty}">
          <v-col
            cols="12"
            sm="12"
            md="12">
            <h3>Mode of Payment</h3>
            <v-radio-group
              @change="validationKey(form.modeOfPayment,  'Mode of Payment')"
              v-model="form.modeOfPayment.value"
              column>
              <v-row>
                <v-col
                  cols="12"
                  md="12"
                  sm="12"
                  v-for="(item, index) in paymentMethod"
                  :key="index"
                  class="mt-n3">
                  <v-radio
                    color="rgb(16, 148, 109)"
                    :label="item.name"
                    :value="item.value" />
                </v-col>
              </v-row>
            </v-radio-group>
          </v-col>
            <v-col
              class="text-center"
              cols="12"
              md="6"
              sm="6"
              v-show="!fileToUpload.length">
              <input
                type="file"
                ref="fileUpload"
                @change="fileImageHandler"
                class="input-file"
                accept="image/png, image/jpeg"
                multiple/>
              <div class="drop-label">
                <span>Drop your deposit slip image here.</span>
              </div>
            </v-col>
            <v-col
              v-for="(files, index) in fileToUpload"
              :key="index"
              class="mt-n14"
              cols="12"
              md="5"
              sm="5">
              <v-btn
                color="error"
                class="remove-photo"
                small
                fab
                elevation="0"
                @click="removeImage">
                <v-icon>mdi-eraser</v-icon>
              </v-btn>
              <v-img
                :src="files.file"
                class="image-border"
                aspect-ratio="1.4"/>
            </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="12"
            md="12">
            <h3>Bank Account</h3>
            <div class="mt-2">Name: Pangasinan Medical Society, Inc</div>
            <div>Account No.: SA 00348-029-3772</div>
            <div>Bank Branch: BDO AB Fernandez Avenue Branch</div>
            <h3 class="mt-4">GCash Account</h3>
            <div>09613672549</div>
            <h4 class="mt-3 error--text">Note:</h4>
            <div>1. Please send proof of payment to:</div>
            <div class="indent">
              <div>AB Fernandez West, Dagupan City, Pangasinan</div>
              <div>Telephone No. (075) 515-45-10</div>
              <div>Cellphone No. Ms. Edna 09613672549</div>
              <div>Cellphone No. Ms. Rubelyn 09987934363</div>
              <div>Email: <b>pangmedsoc@gmail.com</b></div>
            </div>
            <div class="mt-2">*PRC CPD units applied</div>
            <div>*3 PMS points</div>
            <div class="mt-4 error--text">
              <p>* I agree that my personal data will be collected for this activity and are protected under the Data Privacy Act of 2012. *</p>
              <h3 class="mt-n3">* Registration is non-refundable and non-transferable *</h3>
            </div>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="12"
            class="text-center">
            <v-btn
              x-large
              class="white--text"
              color="rgb(16, 148, 109)"
              elevation="0"
              @click="confirmSubmit">
              <v-icon>mdi-pencil</v-icon>
              Submit
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
  <v-col
    cols="12"
    md="2"
    sm="2">
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
      expireDate: false,
      birthDate: false,
      form: {
        firstName: this.iRules('', true),
        middleName: this.iRules('', true),
        lastName: this.iRules('', true),
        pmaNo: this.iRules('', false),
        prcNo: this.iRules('', true),
        dateOfBirth: this.iRules('', true),
        expiryDate: this.iRules('', true),
        cpNo: this.iRules('', true),
        telNo: this.iRules('', false),
        email: this.iRules('', true),
        address: this.iRules('', true),
        clinicAddress: this.iRules('', false),
        affiliation: this.iRules('', false),
        pricing: this.iRules('', true),
        modeOfPayment: this.iRules('', true),
        chapterId: this.iRules('', false),
        occupation: this.iRules('Others', true),
        occupationOthers: this.iRules('', true),
      },
      fileToUpload: [],
      selectedFile: '',
      loading: false,
      paymentMethod: [
        { value: 'cash', name: 'Cash' },
        { value: 'g-cash', name: 'GCash' },
        { value: 'bank-transfer', name: 'Bank Transfer' },
      ],
      pricingList: [],
      chapters: [],
      occupationList: [
        { name: 'Physician' },
        { name: 'Medical Technology' },
        { name: 'Nursing' },
        { name: 'Midwifery' },
        { name: 'Others' },
      ],
      confirm: {
        msg: '',
        show: false,
        loading: false,
        title: '',
        variant: 'primary'
      },
    }
  },

  computed: {
    ...mapGetters({
      IMAGE_EXT: 'common/IMAGE_EXT',
    })
  },

  fetch() {
    this.fetchPostgraduate()
    this.fetchChapters()
  },

  methods: {
    fetchPostgraduate() {
      this.loading = true
      this.API_POST({ url: 'Registration/fetchPostgraduate'})
        .then(response => {
          this.pricingList = response.data
        }).catch(error => {  })
        .finally(() => { this.loading = false })
    },

    fetchChapters() {
      this.loading = true
      this.API_POST({ url: 'Registration/fetchChapters'})
        .then(response => {
          this.chapters = response.data
        }).catch(error => {  })
        .finally(() => { this.loading = false })
    },

    confirmSubmit () {
      if (!this.validateForm(this.form)) {
        this.SET_ALERT_ERROR(this.errorRequired)
        return false
      }
      this.confirm.show = true
      this.confirm.msg = `Are you sure you want to submit this form?`
      this.confirm.title = `Confirm Submit`
    },

    submit () {
      this.confirm.loading = true
      let formData = this.formParams({
        firstName: this.form.firstName.value,
        middleName: this.form.middleName.value,
        lastName: this.form.lastName.value,
        pmaNo: this.form.pmaNo.value,
        prcNo: this.form.prcNo.value,
        dateOfBirth: this.form.dateOfBirth.value,
        expiryDate: this.form.expiryDate.value,
        cpNo: this.form.cpNo.value,
        telNo: this.form.telNo.value,
        email: this.form.email.value,
        address: this.form.address.value,
        clinicAddress: this.form.clinicAddress.value,
        affiliation: this.form.affiliation.value,
        pricingId: this.form.pricing.value,
        modeOfPayment: this.form.modeOfPayment.value,
        chapterId: this.form.chapterId.value,
        occupation: this.form.occupation.value === 'Others'
         ? this.form.occupationOthers.value
         : this.form.occupation.value,
        image: this.selectedFile
      })
      this.API_POST({
        url: 'Registration/create',
        data: formData
      })
      .then(response => {
        this.resetForm()
        this.$router.push(`/public/congrats/${response.response.code}`)
      })
      .catch(error => { 
        this.SET_ALERT_ERROR(error.response)
       })
      .finally(() => {
        this.confirm.show = false
        this.confirm.loading = false
      })
    },

    disabledPricing(date) {
      const dateExpire = Date.parse(date)
      if(dateExpire === 1646064000000) return false
      return dateExpire < Date.now()
    },

    changeOccupation() {
      this.validationKey(this.form.occupation,  'occupation')
      if(this.form.occupation.value === 'Others') this.form.occupationOthers = this.iRules('', true)
      else this.form.occupationOthers = this.iRules('', false)
    },

    fileImageHandler() {
      this.selectedFile = this.$refs.fileUpload.files // Loop for multiple
      Object.keys(this.selectedFile).forEach(index => {
        let item = this.selectedFile[index]
        if (!this.filterArray(this.IMAGE_EXT, item.type)) {
          this.ALERT({ title: 'Error', msg: 'File must be in jpeg or png format.' })
          return false
        }
        var reader = new FileReader()
        reader.onload = (e) => {
          this.fileToUpload.push({
            type: item.type,
            file: e.target.result
          })
        }
        reader.readAsDataURL(this.selectedFile[index])
      })
    },

    removeImage() {
      this.$refs.fileUpload.value = null
      this.fileToUpload = []
    },
    
    resetForm () {
      this.form.firstName = this.iRules('', true),
      this.form.middleName = this.iRules('', true),
      this.form.lastName = this.iRules('', true),
      this.form.pmaNo = this.iRules('', false),
      this.form.prcNo = this.iRules('', true),
      this.form.dateOfBirth = this.iRules('', true),
      this.form.expiryDate = this.iRules('', true),
      this.form.cpNo = this.iRules('', true),
      this.form.telNo = this.iRules('', false),
      this.form.email = this.iRules('', true),
      this.form.address = this.iRules('', true),
      this.form.clinicAddress = this.iRules('', false),
      this.form.affiliation = this.iRules('', false),
      this.form.pricing = this.iRules('', true),
      this.form.modeOfPayment = this.iRules('cash', true)
      this.form.chapterId = this.iRules('', false)
      this.form.occupation = this.iRules('', true)
      this.form.occupationOthers = this.iRules('', false)
      this.removeImage()
    }
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
  left: 36% !important;
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
</style>