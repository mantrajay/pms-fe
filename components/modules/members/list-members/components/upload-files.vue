<template>
<div>
  <v-dialog
    transition="dialog-bottom-transition"
    v-model="dialog"
    persistent
    :max-width="$vuetify.breakpoint.lg ? '90%' : '100%'">
    <v-card>
      <v-card-title>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="6">
            <h4>UPLOAD MEMBER'S FILES</h4>
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
              :loading="confirm.loading"
              :disabled="confirm.loading"
              @click="confirmSubmit">
              Upload
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text class="mt-n2">
        <v-container fluid>
          <v-row class="mt-2">
            <v-col
              class="text-center"
              cols="3"
              md="3"
              sm="3">
              <input
                type="file"
                ref="memberFileUpload"
                @change="fileImageHandler"
                class="input-file"
                multiple/>
              <div class="drop-label">
                <span>Drop your image here.</span>
              </div>
            </v-col>  
            <v-col
              v-for="(files, index) in fileToUpload"
              :key="index"
              class="text-right mt-n13"
              cols="3"
              md="3"
              sm="3">
              <v-btn
                class="remove-image"
                color="error"
                small
                fab
                elevation="0"
                @click="deleteImage(index)">
                <v-icon>mdi-eraser</v-icon>
              </v-btn>
              <img
                :src="files.file"
                class="image-border"/>
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
    @event="submitUpload"/>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Member-Detail',
  props:{
    memberId: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      dialog: true,
      loading: false,
      memberDetails: [],
      headers: [],
      files: '',
      fileToUpload: [],
      selectedFile: '',
      confirm: {
        msg: '',
        show: false,
        loading: false,
        title: 'Create Member',
        variant: 'primary'
      },
    }
  },

  computed: {
    ...mapGetters({
      IMAGE_EXT: 'common/IMAGE_EXT',
    })
  },

  methods: {
    fileImageHandler(arg) {
      this.selectedFile = arg.target.files || arg.dataTransfer.files // Loop for multiple
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

    confirmSubmit () {
      if (!this.selectedFile) {
        this.SET_ALERT_ERROR(this.errMessage)
        return false
      }
      this.confirm.show = true
      this.confirm.msg = `Are you sure you want to upload the file(s)?`
      this.confirm.title = `Upload Member's File(s)`
    },

    submitUpload () {
      let formData = this.formParams({
        photo: this.selectedFile ? this.selectedFile : ''
      })
      this.API_POST({url: `Members/uploadFiles`, data: formData})
        .then(response => {
          this.resetForm()
          this.$emit('event')
          this.SET_ALERT_SUCCESS(response.response.message)
        })
        .catch(error => { this.SET_ALERT_ERROR(error.response) })
        .finally(() => {
          this.confirm.show = false
          this.confirm.loading = false
        })
    },

    deleteImage (index) {
      this.fileToUpload.splice(index, 1)
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
  top: -250px
}
.input-file::before {
  content: "Select Image(s)";
  display: inline-block;
  border-radius: 3px;
  padding: 5px 8px;
  color: #10946d;
  font-weight: 500;
  outline: none;
  white-space: nowrap;
  cursor: pointer;
  font-size: 15px;
  text-decoration: inherit;
  vertical-align: inherit;
  position: absolute;
  left: 25% !important;
  top: 150px !important;
  background-color: #fafbfd;
  border: 1px
  solid #10946d;
}
.input-file {
  height: 350px !important;
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
.image-border {
  width: 100%;
  height: 350px;
}
</style>