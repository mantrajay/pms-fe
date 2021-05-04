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
             <h4>{{ userId ? 'UPDATE' : 'CREATE'}} USER</h4>
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
                v-if="setting === 'update' || setting === 'create'"
                color="primary"
                elevation="0"
                :loading="confirm.loading"
                :disabled="confirm.loading"
                @click="confirmSubmit">
                {{ userId ? 'Update' : 'Create'}}
              </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text class="mt-n5">
       <v-container
        class="dotted mt-4"
        fluid>
        <v-row class="mt-n3">
          <v-col
            cols="12"
            md="8"
            sm="8">
            <v-row v-if="isOwnProfile">
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
              <v-col
                cols="12"
                sm="4"
                md="4">
                <v-text-field
                  class="mt-n3"
                  outlined
                  v-model="password.value"
                  :class="{'text-input': password.isEmpty}"
                  @blur="validationKey(password, 'Last Name')"
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
                  v-model="confirmPassword.value"
                  :class="{'text-input': confirmPassword.isEmpty}"
                  @blur="validationKey(confirmPassword, 'Last Name')"
                  :append-icon="visibleConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="visibleConfirmPassword ? 'text' : 'password'"
                  @click:append="visibleConfirmPassword = !visibleConfirmPassword"
                  dense
                  :disabled="!isChangePassword"
                  label="Enter Confirm Password *" />
              </v-col>
            </v-row>
            <v-row>
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
                  v-model="form.firstName.value"
                  :disabled="setting === 'view'"
                  :class="{'text-input': form.firstName.isEmpty, 'view-only': setting === 'view'}"
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
                  :disabled="setting === 'view'"
                  :class="{'text-input': form.middleName.isEmpty, 'view-only': setting === 'view'}"
                  @blur="validationKey(form.middleName,  'Middle Name')"
                  dense
                  label="Enter Middle Name"
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
                  :disabled="setting === 'view'"
                  :class="{'text-input': form.lastName.isEmpty, 'view-only': setting === 'view'}"
                  @blur="validationKey(form.lastName,  'Last Name')"
                  dense
                  label="Enter Last Name *"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4">
                <v-select
                  class="mt-n7"
                  :items="genderList"
                  v-model="form.sex.value"
                  :disabled="setting === 'view'"
                  :class="{'text-input': form.sex.isEmpty, 'view-only': setting === 'view'}"
                  @blur="validationKey(form.sex)"
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
                    class="mt-n7"
                    v-model="form.birthDate.value"
                    :disabled="setting === 'view'"
                    :class="{'text-input': form.birthDate.isEmpty, 'view-only': setting === 'view'}"
                    @blur="validationKey(form.birthDate,  'birthDate')"
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
                    v-model="form.birthDate.value"
                    @input="birthDate = false, validationKey(form.birthDate,  'birthDate')"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
                v-if="!isProfile">
                <v-select
                  class="mt-n7"
                  :loading="loadingRoles"
                  :items="userRoles"
                  v-model="form.roleId.value"
                  :disabled="setting === 'view'"
                  :class="{'text-input': form.roleId.isEmpty, 'view-only': setting === 'view'}"
                  @blur="validationKey(form.roleId)"
                  dense
                  outlined
                  label="Select Role"
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
                  :disabled="setting === 'view'"
                  :class="{'text-input': form.mobile.isEmpty, 'view-only': setting === 'view'}"
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
                  v-model="form.telephone.value"
                  :disabled="setting === 'view'"
                  :class="{'text-input': form.telephone.isEmpty, 'view-only': setting === 'view'}"
                  @blur="validationKey(form.telephone, 'telephone')"
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
                  :disabled="setting === 'view'"
                  :class="{'text-input': form.email.isEmpty, 'view-only': setting === 'view'}"
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
                  v-model="form.address.value"
                  :disabled="setting === 'view'"
                  :class="{'text-input': form.address.isEmpty, 'view-only': setting === 'view'}"
                  @blur="validationKey(form.address, 'address')"
                  required
                  dense
                  label="Enter Address *"
                ></v-text-field>
              </v-col>
              <!-- <v-col
                cols="12"
                sm="12"
                md="12"
                class="mt-n6"
                v-if="!isProfile">
                <p><b>Status *</b></p>
                <v-radio-group
                  v-model="form.status.value"
                  class="radio mt-n6">
                  <v-row>
                    <v-col
                      cols="6"
                      md="2"
                      sm="2"
                      v-for="(item, index) in statusList"
                      :key="index">
                      <v-radio
                        :disabled="setting === 'view'"
                        :label="item.text"
                        :value="item.value" />
                    </v-col>
                  </v-row>
                </v-radio-group>
              </v-col> -->
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
                  @click="fileToUpload = [],  removeImage = 'yes'">
                  <v-icon>mdi-eraser</v-icon>
                </v-btn>
                <v-img
                  :src="uploadLoading ? require('@/assets/loading/loading.gif') : files.file"
                  class="image-border"
                  aspect-ratio="1"/>
              </v-col>
              <v-col
                v-if="form.image.value"
                class="text-right mt-n13"
                cols="12"
                md="12"
                sm="12">
                <v-btn
                  class="remove-image"
                  color="error"
                  small
                  v-if="setting === 'update'"
                  fab
                  elevation="0"
                  @click="form.image.value = '', removeImage = 'yes'">
                  <v-icon>mdi-eraser</v-icon>
                </v-btn>
                <v-img
                  :class="{'mt-9': setting == 'view'}"
                  :src="loading ? require('@/assets/loading/loading.gif') : form.image.value"
                  class="image-border"
                  aspect-ratio="1"/>
              </v-col>
              <v-col
                class="text-center"
                cols="12"
                md="12"
                sm="12"
                v-if="!form.image.value && !fileToUpload.length">
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
  name: 'Create-Patient',
  props:{
    userId: {
      type: String,
      default: null
    },
    setting: {
      type: String,
      default: 'create'
    },
    isProfile: {
      type: Boolean,
      default: false
    },
    isOwnProfile: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      dialog: true,
      birthDate: false,
      uploadLoading: false,
      userRoles: [],
      groupList: [],
      form: {
        firstName: this.iRules('', true),
        middleName: this.iRules('', true),
        lastName: this.iRules('', true),
        sex: this.iRules('M', true),
        // status: this.iRules('A', true),
        email: this.iRules('', true, true),
        roleId: this.iRules(null, true),
        mobile: this.iRules('', true),
        birthDate: this.iRules('', true),
        telephone: this.iRules('', false),
        image: this.iRules(null, false),
        address: this.iRules('', true),
      },
      password: this.iRules('', true),
      confirmPassword: this.iRules('', true),
      genderList: [ 
        { value: 'M', text: 'Male' },
        { value: 'F', text: 'Female' },
      ],
      statusList: [
        { value: 'A', text: 'Active' },
        { value: 'D', text: 'Deactivate' },
      ],
      confirm: {
        msg: '',
        show: false,
        loading: false,
        title: 'Create User',
        variant: 'primary'
      },
      fileToUpload: [],
      selectedFile: '',
      loading: false,
      loadingRoles: false,
      removeImage: 'no',
      isChangePassword: false,
      loadingChangePw: false,
      visiblePassword: false,
      visibleConfirmPassword: false
    }
  },

  watch: {
    isChangePassword: {
      immediate: true,
      handler (val) {
        if (!val) {
          this.password = this.iRules('', false)
          this.confirmPassword = this.iRules('', false)
        } else {
          this.password = this.iRules('', true)
          this.confirmPassword = this.iRules('', true)
        }
      }
    }
  },

  computed: {
    ...mapGetters({
      IMAGE_EXT: 'common/IMAGE_EXT',
    })
  },

  fetch () {
    this.fetchUserRole()
    if (this.userId) this.fetchUser()
  },

  methods: {
    fetchUser () {
      this.API_POST({ url: 'Users/userById/' + this.userId })
        .then(response => {
          let data = response.data.data
          let image = response.data.image
          this.setForm(data, image)
        })
        .catch(error => { this.errorHandle(error) })
        .finally(this.loadingRoles = false)
    },
    
    setForm (data = {}, image = '') {
      this.form = {
        firstName: this.iRules(data.firstName || '', true),
        middleName: this.iRules(data.middleName || '', true),
        lastName: this.iRules(data.lastName || '', true),
        image: this.iRules(image || null, false),
        email: this.iRules(data.email || '', true, true),
        mobile: this.iRules(data.mobile || '', true),
        sex: this.iRules(data.sex, true),
        telephone: this.iRules(data.telephone || '', false),
        birthDate: this.iRules(data.birthDate || '', true),
        address: this.iRules(data.address || '', true),
        roleId: this.iRules(data.roleId || null, true),
        // status: this.iRules(data.status || null, true)
      }
    },

    fetchUserRole () {
      this.loadingRoles = true
      this.API_POST({ url: 'Common/userRoles'})
        .then(response => {
          let data = response.data
          this.userRoles = []
          data.forEach((item, index) => {
            this.userRoles.push({
              value: item.id,
              text: item.name
            })
          })
        })
        .catch(error => { this.errorHandle(error) })
        .finally(this.loadingRoles = false)
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
          this.isFile = true
          this.fileToUpload.push({
            type: item.type,
            file: e.target.result
          })
        }
        reader.readAsDataURL(this.selectedFile[index])
      })
    },

    confirmSubmit () {
      if (this.GET_AUTH.roleId == 3) this.form.groupId.required = true
      if (!this.validateForm(this.form)) {
        this.SET_ALERT_ERROR(this.errMessage)
        return false
      }
      if (this.isChangePassword) {
        if (this.confirmPassword.value !== this.password.value) {
          this.SET_ALERT_ERROR('Password and confirm password does not match.')
          this.password.isEmpty = true
          this.confirmPassword.isEmpty = true
          return
        }
        let willProceed = true
        if (!this.confirmPassword.value) {
          willProceed = false
          this.password.isEmpty = true
        }
        if (!this.password.value) {
          willProceed = false
          this.confirmPassword.isEmpty = true
        }
        if (!willProceed) {
          this.SET_ALERT_ERROR('Please fill in required fields!')
          return
        }
      }
      this.password.isEmpty = false
      this.confirmPassword.isEmpty = false
      this.confirm.show = true
      this.confirm.msg = `Are you sure you want to ${this.type} this patient?` 
    },
  
    submit () {
      this.confirm.loading = true
      let formData = this.formParams({
        firstName: this.form.firstName.value,
        middleName: this.form.middleName.value,
        lastName: this.form.lastName.value,
        image: this.selectedFile ? this.selectedFile : '',
        email: this.form.email.value,
        mobile: this.form.mobile.value,
        sex: this.form.sex.value,
        telephone: this.form.telephone.value,
        birthDate: this.form.birthDate.value,
        address: this.form.address.value,
        roleId: this.form.roleId.value,
        // status: this.form.status.value,
        removeImage: this.removeImage,
      })
      if (this.isChangePassword) {
        formData.append('password', this.password.value)
      }
      let method = 'create'
      if (this.userId) {
        method = 'edit'
        formData.append('userId', this.userId)
      }
      this.API_POST({url: `Users/${method}`, data: formData})
        .then(response => {
          this.resetForm()
          this.$emit('event', response.response.data)
          let message = response.response.message
          if (this.isChangePassword) {
            this.SET_AUTH({})
            this.goTo('/login')
            message = `Profile and password have updated successfully. <br/> Please relogin your account again!`
          }
          this.SET_ALERT_SUCCESS(message)
        })
        .catch(error => { this.errorHandle(error) })
        .finally(() => {
          this.confirm.show = false
          this.confirm.loading = false
        })
    }, 
    
    resetForm () {
      this.removeImage = 'no'
      this.form = {
        firstName: this.iRules('', true),
        middleName: this.iRules('', true),
        lastName: this.iRules('', true),
        sex: this.iRules('M', true),
        // status: this.iRules('A', true),
        email: this.iRules('', true, true),
        roleId: this.iRules(null, true),
        mobile: this.iRules('', true),
        birthDate: this.iRules('', true),
        telephone: this.iRules('', false),
        image: this.iRules(null, false),
        address: this.iRules('', true)
      }
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
.radio >>> .v-label {
  top: 0px !important;
  font-weight: bold !important;
}
h4 {
  color: #686565;
}
.view-only >>> fieldset {
  border: none !important;
}
</style>