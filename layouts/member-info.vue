<template>
  <v-dialog v-model="dialog"
    persistent
    max-width="100%">
    <v-card>
      <v-card-title>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="6">
            <h4>PERSONAL INFORMATION</h4>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="6"
            class="text-right">
            <v-btn
              v-if="!isPorfile"
              text
              elevation="0"
              @click="$emit('close')">
              Close
            </v-btn>
            <v-btn
              color="primary"
              elevation="0"
              :loading="confirm.loading"
              :disabled="confirm.loading"
              @click="confirmSubmit">
              {{ memberId ? 'Update' : 'Create'}}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text class="mt-n5">
       <v-container
        class="dotted mt-4"
        fluid>
        <v-row class="mt-n5">
          <v-col
            cols="12"
            md="8"
            sm="8">
            <v-row>
              <v-col
                cols="12"
                sm="12"
                md="12">
                <h4>Authentication Information</h4>
              </v-col>
              <v-col
                cols="12"
                sm="12"
                md="12"
                class="mt-4">
                <small class="error-text">Please  change your password for first use and every 30-90 days.</small>
              </v-col>
              <v-col
                cols="12"
                sm="12"
                md="12"
                class="mt-n14">
                <v-switch
                  v-model="isChangePassword"
                  label="Change Password"
                  color="primary"
                  hide-details />
              </v-col>
              <!-- <v-col
                cols="12"
                sm="4"
                md="4">
                <v-text-field
                  class="mt-n3"
                  outlined
                  disabled
                  v-model="form.username.value"
                  :class="{'text-input': form.username.isEmpty}"
                  @blur="validationKey(form.username, 'Username')"
                  dense
                  label="Enter Username *" />
              </v-col> -->
              <v-col
                cols="12"
                sm="4"
                md="4">
                <v-text-field
                  class="mt-n3"
                  outlined
                  v-model="form.password.value"
                  :class="{'text-input': form.password.isEmpty}"
                  @blur="validationKey(form.password, 'Last Name')"
                  :append-icon="visiblePassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="visiblePassword ? 'text' : 'password'"
                  @click:append="visiblePassword = !visiblePassword"
                  dense
                  :disabled="!isChangePassword"
                  label="Enter New Password *" />
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4">
                <v-text-field
                  class="mt-n3"
                  outlined
                  v-model="form.confirmPassword.value"
                  :class="{'text-input': form.confirmPassword.isEmpty}"
                  @blur="validationKey(form.confirmPassword, 'Last Name')"
                  :append-icon="visibleConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="visibleConfirmPassword ? 'text' : 'password'"
                  @click:append="visibleConfirmPassword = !visibleConfirmPassword"
                  dense
                  :disabled="!isChangePassword"
                  label="Enter Confirm Password *" />
              </v-col>
            </v-row>
            <v-row class="mt-n8">
              <v-col
                cols="12"
                sm="12"
                md="12">
                <h4>Personal Information</h4>
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
                  label="Enter Last Name *" />
              </v-col>
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
                  label="Enter First Name *" />
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
                  label="Enter Middle Name *" />
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4">
                <v-select
                  class="mt-n3"
                  :items="religionList"
                  v-model="form.religion.value"
                  :class="{'text-input': form.religion.isEmpty}"
                  @blur="validationKey(form.religion)"
                  dense
                  outlined
                  label="Select Religion *"
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4">
                <v-select
                  class="mt-n3"
                  :items="civilList"
                  v-model="form.civilStatus.value"
                  :class="{'text-input': form.civilStatus.isEmpty}"
                  @blur="validationKey(form.civilStatus)"
                  dense
                  outlined
                  label="Select Civil Status *"
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4">
                <v-select
                  class="mt-n3"
                  :items="genderList"
                  v-model="form.gender.value"
                  :class="{'text-input': form.gender.isEmpty}"
                  @blur="validationKey(form.gender)"
                  dense
                  outlined
                  label="Select Gender *"
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4">
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
                    v-model="form.birthday.value"

                    :class="{'text-input': form.birthday.isEmpty}"
                    @blur="validationKey(form.birthday,  'birthday')"
                    outlined
                    dense
                    label="Select Birth Date *"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                  <v-date-picker
                    v-model="form.birthday.value"
                    @input="birthDate = false, validationKey(form.birthday,  'birthDate')"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4">
                <v-text-field
                  class="mt-n3"
                  outlined
                  v-model="form.specialty.value"
                  :class="{'text-input': form.specialty.isEmpty}"
                  @blur="validationKey(form.specialty, 'Specialty')"
                  dense
                  label="Enter Specialty *"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4">
                <v-text-field
                  class="mt-n3"
                  outlined
                  v-model="form.hospitalAffiliation.value"
                  :class="{'text-input': form.hospitalAffiliation.isEmpty}"
                  @blur="validationKey(form.hospitalAffiliation, 'Hospital Affiliation')"
                  dense
                  label="Enter Hospital Affiliation *"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mt-n7">
              <v-col
                cols="12"
                sm="12"
                md="12">
                <h4>License Information</h4>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4">
                <v-text-field
                  class="mt-n3"
                  outlined
                  v-model="form.pmaNo.value"
                  :class="{'text-input': form.pmaNo.isEmpty}"
                  @blur="validationKey(form.pmaNo, 'PMA Number')"
                  dense
                  label="Enter PMA No. *" />
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4">
                <v-text-field
                  class="mt-n3"
                  outlined
                  v-model="form.prcNo.value"
                  @keypress="checkChar($event)"
                  :class="{'text-input': form.prcNo.isEmpty}"
                  @blur="validationKey(form.prcNo, 'Prc Number')"
                  dense
                  label="Enter PRC License No. *" />
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4">
                <v-menu
                  v-model="expDate"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    type="date"
                    class="mt-n3"
                    v-model="form.prcExp.value"
                    :class="{'text-input': form.prcExp.isEmpty}"
                    @blur="validationKey(form.prcExp,  'PRC Expiration')"
                    outlined
                    dense
                    label="Select PRC License Expiration Date *"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                  <v-date-picker
                    v-model="form.prcExp.value"
                    @input="expDate = false, validationKey(form.prcExp,  'PRC Expiration')"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4">
                <v-select
                  disabled
                  class="mt-n3"
                  :items="chapterList"
                  item-text="name"
                  item-value="id"
                  v-model="form.chapter.value"
                  :class="{'text-input': form.chapter.isEmpty}"
                  @blur="validationKey(form.chapter)"
                  dense
                  outlined
                  label="Select Chapter *"
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4">
                <v-select
                  disabled
                  class="mt-n3"
                  :items="membershipList"
                  v-model="form.membership.value"
                  item-text="name"
                  item-value="id"
                  :class="{'text-input': form.membership.isEmpty}"
                  @blur="validationKey(form.membership)"
                  dense
                  outlined
                  label="Select Membership *"
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4">
                <v-select
                  class="mt-n3"
                  :items="yearList"
                  v-model="form.year.value"
                  item-text="name"
                  item-value="id"
                  :class="{'text-input': form.year.isEmpty}"
                  @blur="validationKey(form.year)"
                  dense
                  outlined
                  label="Select Year Registered *"
                ></v-select>
              </v-col>
            </v-row>
            <v-row class="mt-n7">
              <v-col
                cols="12"
                sm="12"
                md="12">
                <h4>Contact Information</h4>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4">
                <v-text-field
                  class="mt-n3"
                  outlined
                  v-model="form.mobile.value"
                  :class="{'text-input': form.mobile.isEmpty}"
                  @blur="validationKey(form.mobile, 'Mobile No.')"
                  dense
                  label="Enter Mobile # *"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4">
                <v-text-field
                  class="mt-n3"
                  outlined
                  v-model="form.phone.value"
                  :class="{'text-input': form.phone.isEmpty}"
                  @blur="validationKey(form.phone, 'phone')"
                  required
                  dense
                  label="Enter Telephone #"
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
                  @blur="validationKey(form.email, 'Email')"
                  required
                  dense
                  label="Enter Email Address"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="12"
                md="12"
                class="mt-n6">
                <v-text-field
                  class="mt-n3"
                  outlined
                  v-model="form.homeAdd.value"
                  :class="{'text-input': form.homeAdd.isEmpty}"
                  @blur="validationKey(form.homeAdd, 'Home Address')"
                  required
                  dense
                  label="Enter Home Address *"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="12"
                md="12"
                class="mt-n6">
                <v-text-field
                  class="mt-n3"
                  outlined
                  v-model="form.workAdd.value"
                  :class="{'text-input': form.workAdd.isEmpty}"
                  @blur="validationKey(form.workAdd, 'Work Address')"
                  required
                  dense
                  label="Enter Work Address *"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col
            cols="12"
            md="4"
            sm="4">
            <v-row>
              <v-col
                cols="12"
                md="12">
                <span class="summary">This is the profile image of your account.</span>
              </v-col>
              <v-col
                v-for="(files, index) in fileToUpload"
                :key="index"
                class="text-right mt-n13"
                cols="12"
                md="12"
                sm="12">
                <v-btn
                  class="remove-image"
                  color="error"
                  small
                  fab
                  elevation="0"
                  @click="fileToUpload = [], removeImage = 'yes'">
                  <v-icon>mdi-eraser</v-icon>
                </v-btn>
                <v-img
                  :src="files.file"
                  class="image-border"
                  aspect-ratio="1"/>
              </v-col>
              <v-col
                v-if="form.photo.value"
                class="text-right mt-n13"
                cols="12"
                md="12"
                sm="12">
                <v-btn
                  class="remove-image"
                  color="error"
                  small
                  fab
                  elevation="0"
                  @click="form.photo.value = '', removeImage = 'yes'">
                  <v-icon>mdi-eraser</v-icon>
                </v-btn>
                <v-img
                  :src="form.photo.value"
                  class="image-border"
                  aspect-ratio="1"/>
              </v-col>
              <v-col
                class="text-center"
                cols="12"
                md="12"
                sm="12"
                v-if="!form.photo.value && !fileToUpload.length">
                <input type="file"
                  ref="fileUpload"
                  @change="fileImageHandler"
                  class="input-file"
                  multiple/>
                <div class="drop-label">
                  <span>Drop your image here.</span>
                </div>
              </v-col>
            </v-row>
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
import { mapGetters } from 'vuex'
export default {
  name: 'Member-Info-Update',
  props:{
    memberId: {
      type: String,
      default: ''
    },
  
    isPorfile: {
      type: Boolean,
      default: false
    }
  },

  data() {
    let date = new Date()
    let currentYear = parseInt(date.getFullYear())
    return {
      dialog: true,
      birthDate: false,
      expDate: false,
      visiblePassword: false,
      visibleConfirmPassword: false,
      form: {
        username: this.iRules('', false),
        password: this.iRules('', true),
        confirmPassword: this.iRules('', true),
        firstName: this.iRules('', true),
        middleName: this.iRules('', true),
        lastName: this.iRules('', true),
        pmaNo: this.iRules('', true),
        prcNo: this.iRules('', true),
        prcExp: this.iRules('', true),
        birthday: this.iRules('', true),
        religion: this.iRules('', true),
        civilStatus: this.iRules('', true),
        gender: this.iRules('', true),
        hospitalAffiliation: this.iRules('', true),
        specialty: this.iRules('', true),
        homeAdd: this.iRules('', false),
        workAdd: this.iRules('', false),
        mobile: this.iRules('', true),
        phone: this.iRules('', false),
        chapter: this.iRules('', true),
        membership: this.iRules('', true),
        year: this.iRules(currentYear, true),
        email: this.iRules('', false),
        photo: this.iRules('', false)
      },
      isChangePassword: false,
      yearList: [],
      genderList: [ 
        { value: 'Male', text: 'Male' },
        { value: 'Female', text: 'Female' },
      ],
      civilList: [ 
        { value: 'Single', text: 'Single' },
        { value: 'Married', text: 'Married' },
        { value: 'Widowed', text: 'Widowed' },
        { value: 'Separated', text: 'Separated' },
        { value: 'Divorced', text: 'Divorced' }
      ],
      religionList: [ 
        { value: 'Roman Catholic', text: 'Roman Catholic' },
        { value: 'Iglesia ni Cristo', text: 'Iglesia ni Cristo' },
        { value: 'Born Again', text: 'Born Again' },
        { value: 'Seventh-day Adventist', text: 'Seventh Day Advintist' },
        { value: 'Jehovah Witnesses', text: 'Jehovah Witnesses' },
        { value: 'Baptists', text: 'Baptists' },
        { value: 'Mormons', text: 'Mormons' },
        { value: 'Muslim', text: 'Muslim' },
        { value: 'Others', text: 'Others' },
      ],
      chapterList: [],
      membershipList: [],
      confirm: {
        msg: '',
        show: false,
        loading: false,
        title: 'Create Member',
        variant: 'primary'
      },
      fileToUpload: [],
      selectedFile: '',
      loadingAttr: false,
      loading: false,
      removeImage: 'no'
    }
  },

  computed: {
    ...mapGetters({
      IMAGE_EXT: 'common/IMAGE_EXT',
    })
  },

  watch: {
    isChangePassword: {
      immediate: true,
      handler (val) {
        if (!val) {
          this.form.password = this.iRules('', false)
          this.form.confirmPassword = this.iRules('', false)
        } else {
          this.form.password = this.iRules('', true)
          this.form.confirmPassword = this.iRules('', true)
        }
      }
    }
  },

  created () {
    if (this.memberId) this.fetchMember()
    this.fetchAttribute()
    this.yearListRegistration()
  },

  methods: {
    fetchAttribute () {
      this.loading = true
      this.API_POST({ url: 'Common/getAttributes' })
        .then(response => {
          let data = response.data
          this.chapterList = data.chapters
          this.membershipList = data.memberships
        }).catch(error => {  })
        .finally(this.loading = false)
    },

    fetchMember () {
      this.loading = true
      let formData = new FormData()
      formData.append('id', this.memberId)
      formData.append('type', 'member')
      this.API_POST({ url: 'Members/fetchById', data: formData})
        .then(response => {
          let data = response.data
          let member = data.member
          let image = data.image
          this.setForm(member, image)
        }).catch(error => {  })
        .finally(this.loading = false)
    },

    setForm (data = {}, image = '') {
      this.form.firstName.value = data.first_name
      this.form.middleName.value = data.middle_name
      this.form.lastName.value = data.last_name
      this.form.civilStatus.value = data.civil_status
      this.form.religion.value = data.religion
      this.form.hospitalAffiliation.value = data.hospital_affiliation
      this.form.specialty.value = data.specialty
      this.form.pmaNo.value = data.pma_no
      this.form.prcNo.value = data.prcNumber
      this.form.prcExp.value = data.prc_exp
      this.form.birthday.value = data.birthday
      this.form.gender.value = data.gender
      this.form.homeAdd.value = data.home_add
      this.form.workAdd.value = data.work_add
      this.form.mobile.value = data.mobile
      this.form.phone.value = data.phone
      this.form.chapter.value = data.chapter_id
      this.form.email.value = data.email
      this.form.membership.value = data.membership_id
      this.form.photo.value = image
      this.form.year.value = parseInt(data.year)
    },

    fileImageHandler() {
      this.selectedFile = this.$refs.fileUpload.files // Loop for multiple
      Object.keys(this.selectedFile).forEach(index => {
        let item = this.selectedFile[index]
        if (!this.filterArray(this.IMAGE_EXT, item.type)) {
          this.ALERT({ title: 'Error', msg: 'File must be in jpeg or png format.' })
          return false
        }
        this.removeImage = 'change'
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

    confirmSubmit () {
      if (!this.validateForm(this.form)) {
        this.SET_ALERT_ERROR(this.errMessage)
        return false
      }
      if (this.form.confirmPassword.value !== this.form.password.value) {
        this.SET_ALERT_ERROR('Password and confirm password does not match.')
        this.form.password.isEmpty = true
        this.form.confirmPassword.isEmpty = true
        return
      }
      this.form.password.isEmpty = false
      this.form.confirmPassword.isEmpty = false
      let type = this.memberId ? 'Update' : 'Create'
      this.confirm.show = true
      this.confirm.msg = `Are you sure you want to ${type.toLowerCase()} this member?`
      this.confirm.title = `${type} Member`
    },

    submit () {
      this.confirm.loading = true
      let formData = this.formParams({
        user_id: this.GET_AUTH.userId,
        password: this.form.password.value,
        first_name: this.form.firstName.value,
        middle_name: this.form.middleName.value,
        last_name: this.form.lastName.value,
        pma_no: this.form.pmaNo.value,
        prc_no : this.form.prcNo.value,
        prc_exp: this.form.prcExp.value,
        birthday: this.form.birthday.value,
        gender: this.form.gender.value,
        hospital_affiliation: this.form.hospitalAffiliation.value,
        specialty: this.form.specialty.value,
        civil_status: this.form.civilStatus.value,
        religion: this.form.religion.value,
        home_add: this.form.homeAdd.value,
        work_add: this.form.workAdd.value,
        phone: this.form.phone.value,
        mobile: this.form.mobile.value,
        email: this.form.email.value,
        phone: this.form.phone.value,
        chapter_id: this.form.chapter.value,
        membership_id: this.form.membership.value,
        photo: this.selectedFile ? this.selectedFile : '',
        removeImage: this.removeImage,
        year: this.form.year.value,
        isChangePassword: this.isChangePassword ? 1 : 0
      })
      this.API_POST({url: `Members/updateMemberProfile/${this.memberId}`, data: formData})
        .then(response => {
          this.SET_ALERT_SUCCESS(response.response.message)
          this.SET_AUTH_INFO({
            accountName: `${this.form.firstName.value} ${this.form.lastName.value}`,
            photo: response.response.photo
          })
          this.$emit('close')
        })
        .catch(error => { this.SET_ALERT_ERROR(error.response) })
        .finally(() => {
          this.confirm.show = false
          this.confirm.loading = false
        })
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