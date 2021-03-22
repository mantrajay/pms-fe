/* eslint-disable */
import { mapGetters, mapMutations, mapActions } from 'vuex'
export const Mixins = {
  data () {
    return {
      errMessage: 'Please fix the form error(s)!',
      imageToAccept: [
        { type: 'image/jpeg' },
        { type: 'image/png' }
      ],
      metaKeyWordNotAllowed: [
        { key: 35, char: '#' },
        { key: 59, char: ';' },
        { key: 60, char: '<' },
        { key: 61, char: '=' },
        { key: 62, char: '>' },
        { key: 123, char: '{' },
        { key: 125, char: '}' },
        {key: 46, char: '.'},
        {key: 44, char: ','},
        {key: 45, char: '-'},
        {key: 32, char: ' '},
        {key: 39, char: `'`}, 
      ],
      queueLoading: false
    }
  },

  computed: {
    ...mapGetters({
      GET_ALERT: 'common/GET_ALERT',
      GET_LOADING: 'common/GET_LOADING',
      GET_AUTH: 'common/GET_AUTH'
    }),
    tableParams () {
      return this.jsonToForm({
        currentPage: { value: this.TABLE.currentPage },
        search: { value: this.TABLE.search },
        limit: { value: this.TABLE.limit }
      })
    },
  },

  methods: {
    ...mapMutations({
      SET_ALERT: 'common/SET_ALERT',
      SET_ALERT_CLOSE: 'common/SET_ALERT_CLOSE',
      SET_LOADING: 'common/SET_LOADING',
      SET_CLOSE_LOADING: 'common/SET_CLOSE_LOADING',
      SET_ALERT_ERROR: 'common/SET_ALERT_ERROR',
      SET_ALERT_WARNING: 'common/SET_ALERT_WARNING',
      SET_ALERT_CONFIRM: 'common/SET_ALERT_CONFIRM',
      SET_ALERT_SUCCESS: 'common/SET_ALERT_SUCCESS',
      SET_PAGE_LOADING: 'common/SET_PAGE_LOADING',
      SET_AUTH: 'common/SET_AUTH'
    }),
    ...mapActions({
      API_POST: 'common/API_POST',
      API_GET: 'common/API_GET'
    }),

    capitalizeChar (item) {
      let lastName = item.last_name.charAt(0).toUpperCase() + item.last_name.slice(1).toLowerCase()
      let firstName = item.first_name.charAt(0).toUpperCase() + item.first_name.slice(1).toLowerCase()
      let middleName = item.middle_name.charAt(0).toUpperCase() + item.middle_name.slice(1).toLowerCase()
      return `${lastName}, ${firstName} ${middleName}`
    },

    capitalizeName (item) {
      let lastName = item.lastName.charAt(0).toUpperCase() + item.lastName.slice(1).toLowerCase()
      let firstName = item.firstName.charAt(0).toUpperCase() + item.firstName.slice(1).toLowerCase()
      let middleName = item.middleName.charAt(0).toUpperCase() + item.middleName.slice(1).toLowerCase()
      return `${lastName}, ${firstName} ${middleName}`
    },

    checkChar(event) {
      let keyCode = event.keyCode
      this.metaKeyWordNotAllowed.forEach(item => {
        if (item.key === keyCode) event.preventDefault()
      })
    },

    isSpecialChar (event) {
      let specialChar = /[~`!#$%\^&*()@+=\\[\]\\;/{}|\\":<>\?1234567890]/g.test(event.key)
      if (specialChar) event.preventDefault()
    },

    integerOnly(event) {
      var key = window.event ? event.keyCode : event.which;
      if (event.keyCode === 8 || event.keyCode === 46 || key < 48 || key > 57) {
        event.preventDefault();
      }
    },
  
    errorHandle (error) {
      let errorCode = error.response
      if (errorCode === 'Unauthorized!' || error.status === 401) {
        this.SET_AUTH()
        this.goTo('/')
        return
      }
      let message = error.response
      this.SET_ALERT_ERROR(message)
    },

    /**
     * @param { Number } amount
     * Will convert amount into Money format 
     */
    formatMoney (amount) {
      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP'
      })
      let total = formatter.format(amount)
      return total.split('PHP')[1]
    },

    /**
     * @param {string} route 
     */
    goTo (route) {
      this.$router.push(route)
    },

    /**
     * Will route to previous page
     */
    goBack () {
      this.$router.go(-1)
    },

    /**
     * Form validation
     * @param { string } value
     * @param { boolean } required value required
     * @param { boolean } email value email
     * @param { array } lenMax min and max length value
     */
    iRules (value = null, required = false, email = false, lenMax = []) {
      return {
        value: value,
        required: required,
        email: email,
        lenMax: lenMax,
        isEmpty: false,
        msg: ''
      }
    },

    /**
     * 
     * @param { object } form
     * Will reset form
     */
    resetForm (form) {
      return Object.keys(form).forEach(index => {
        this.form[index].isEmpty = false
        this.form[index].value = null
        this.form[index].msg = ''
      })
    },
    
    /**
     * 
     * @param { object } form
     * Json object will convert into form data
     */
    jsonToForm (form) {
      let data = new FormData()
      Object.keys(form).forEach((index) => {
        let value = form[index].value
        data.append(index, value)
      })
      return data
    },

    formParams (form) {
      let data = new FormData()
      Object.keys(form).forEach((index) => {
        if (typeof form[index] === 'object') {
          console.log(form[index])
          Object.keys(form[index]).forEach(keys => {
            let fileValue = form[index][keys]
            let fileName = form[index][keys].name.split('.')[0]
            data.append(index, fileValue, fileName)
          })
        } else {
          data.append(index, form[index])
        }
      })
      return data
    },

    generateArrayOfYears() {
      let max = new Date().getFullYear() + 9
      let min = max - 70
      for (let i = max; i >= min; i--) {
        this.yearList.push(i)
      }
    },

    /**
     * Form validation
     * @param { Object } valueRules
     * @param { String } field
     * Will validate the form according to  field
     * via Keypress
     */
    
    validationKey (valueRules, field) {
      const isRequired = valueRules.required
      const isEmail = valueRules.email
      const lenMax = valueRules.lenMax
      let value = valueRules.value
      if (!value && isRequired) {
        valueRules.isEmpty = true
        valueRules.msg = `${field} is required`
      } else if (isEmail && value) {
        if (!this.isEmail(value)) {
          valueRules.isEmpty = true
          valueRules.msg = 'Invalid email'
        } else {
          valueRules.isEmpty = false
          valueRules.msg = ''
        }
      } else if (lenMax.length && value) {
        let min = lenMax[0], max = lenMax[1], val = value.length
        if (val < min) {
          valueRules.isEmpty = true
          valueRules.msg = `${field} length not less than ${min}`
        } else if (val > max) {
          valueRules.isEmpty = true
          valueRules.msg = `${field} length not greater than ${max}`
        } else {
          valueRules.isEmpty = false
          valueRules.msg = ''
        }
      } else {
        valueRules.msg = ''
        valueRules.isEmpty = false
      }
    },
    
    
    /**
     * Form validation
     * @param { array } form
     * Will validate the form according to @function rules
     */
    validateForm (form) {
      let willProceed = true
      Object.keys(form).forEach((keys) => {
        const isRequired = this.form[keys].required
        const value = this.form[keys].value
        const isEmail = this.form[keys].email
        const lenMax = this.form[keys].lenMax
        if (!value && isRequired) {
          this.form[keys].isEmpty = true
          this.form[keys].msg = `${keys} is required`
          willProceed = false
        } else if (isEmail && value) {
          if (!this.isEmail(value)) {
            this.form[keys].isEmpty = true
            this.form[keys].msg = 'Invalid email'
            willProceed = false
          } else {
            this.form[keys].isEmpty = false
            this.form[keys].msg = ''
          }
        } else if (lenMax.length && value) {
          const min = lenMax[0]
          const max = lenMax[1]
          const val = value.length
          if (val < min) {
            this.form[keys].isEmpty = true
            this.form[keys].msg = `${keys} length not less than ${min}`
            willProceed = false
          } else if (val > max) {
            this.form[keys].isEmpty = true
            this.form[keys].msg = `${keys} length not greater than ${max}`
            willProceed = false
          } else {
            this.form[keys].isEmpty = false
            this.form[keys].msg = ''
          }
        } else {
          this.form[keys].isEmpty = false
        }
      })
      return willProceed
    },

    /**
     * Will check if the valus is email
     * @param { string } value
     */
    isEmail(value) {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!pattern.test(value)) return false
      return true
    },

    getLocalDate(date, time = false) {
      var months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
      let tempDate = date.split('-')
      if (time) {
        let dayTemp = tempDate[2].split(' ')
        let day = dayTemp[0]
        let time = dayTemp[1]
        return  months[Number(tempDate[1]) - 1] + ' ' + day + ', ' + tempDate[0] + ' - ' + time
      }
      return  months[Number(tempDate[1]) - 1] + ' ' + tempDate[2] + ', ' + tempDate[0]
    },

    monthString (date) {
      let dateLocal = this.getLocalDate(date)
      let dateValue = dateLocal.split(' ')
      return dateValue[1] + ' ' + dateValue[2]
    },

    filterArray (form, type) {
      console.log(form)
      let typeValue = false
      form.filter((value) => {
        if (value.type === type) typeValue = true
      })
      return typeValue
    },

    stringLimit (string, length) {
      let charLimit = !length ? this.charLimit : length
      if (string.length >= charLimit) {
        return string.slice(0, charLimit) + ' ..'
      }
      return string
    },

    b64toBlob (b64Data, contentType, sliceSize) {
      contentType = contentType || ''
      sliceSize = sliceSize || 512
      var byteCharacters = atob(b64Data)
      var byteArrays = []
      for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize)
        var byteNumbers = new Array(slice.length)
        for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i)
        }
        var byteArray = new Uint8Array(byteNumbers)
        byteArrays.push(byteArray)
      }
      var blob = new Blob(byteArrays, {type: contentType})
      return blob
    }
  }
}
