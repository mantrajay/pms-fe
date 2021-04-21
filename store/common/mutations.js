export default {
  SET_AUTH: (state, data = {}) => {
    state.auth.token = data.token || ''
    state.auth.userId = data.userId || ''
    state.auth.roleId = data.roleId || ''
    state.auth.roleName = data.roleName || ''
    state.auth.accountName = data.accountName || ''
    state.auth.chapter = data.chapter || ''
    state.auth.membership = data.membership || ''
    state.auth.photo = data.photo || ''
    state.auth.isInfoUpdated = data.isInfoUpdated || false
  },

  SET_AUTH_INFO: (state, photo) => {
    state.auth.isInfoUpdated = false
    state.auth.photo = photo
    console.log(state.auth)
  },

  /**
   * Alert Method
   */
  
  SET_ALERT_ERROR: (state, message) => {
    state.alert.toggle = true
    state.alert.title = 'Error'
    state.alert.variant = 'error'
    state.alert.message = message
  },

  SET_ALERT_SUCCESS: (state, message) => {
    state.alert.toggle = true
    state.alert.title = 'Success'
    state.alert.variant = 'success'
    state.alert.message = message
  },

  SET_ALERT_WARNING: (state, message) => {
    state.alert.toggle = true
    state.alert.title = 'Warning'
    state.alert.variant = 'warning'
    state.alert.message = message
  },

  SET_ALERT_CONFIRM: (state, message) => {
    state.alert.toggle = true
    state.alert.title = 'Confirm'
    state.alert.variant = 'primary'
    state.alert.message = message
  },

  SET_ALERT_CLOSE: (state) => {
    state.alert.toggle = false
  },

  /**
   * Loaidng Methods
   */
  SET_LOADING: (state, title = 'LOADING') => {
    state.loading.toggle = true
    state.loading.title = title
  },

  SET_CLOSE_LOADING: (state) => {
    state.loading.toggle = false
    state.loading.title = ''
  },

  SET_PAGE_LOADING: (state) => {
    state.pageLoading.toggle = true
  },

  SET_PAGE_LOADING_CLOSE: (state) => {
    state.pageLoading.toggle = false
  }
}
