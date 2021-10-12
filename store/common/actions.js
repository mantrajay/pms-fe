export default {
  /**
  * API GET Method
  * @param { string } url
  */
  API_GET ({ dispatch, getters }, { url }) {
    return new Promise(async (resolve, reject) => {
      try {
        let response = getters.GET_AUTH.token
         ? await this.$axios.$get(url, { headers: { Authorization: getters.GET_AUTH.token } })
         : await this.$axios.$get(url)
        resolve(response)
      } catch (error) {
        dispatch('UNSET_TOKEN', { error, reject})
      }
    })
  },
  /**
  * API POST Method
  * @param { Array, Object } data
  * @param { String } url
  */
  API_POST ({ dispatch, getters }, { url, data }) {
    return new Promise(async (resolve, reject) => {
      try {
        data = data || {}
        let response = getters.GET_AUTH.token
         ? await this.$axios.$post(url, data, { headers: { Authorization: getters.GET_AUTH.token } })
         : await this.$axios.$post(url, data)
        resolve(response)
      } catch (error) {
        console.log(error)
        dispatch('UNSET_TOKEN', { error, reject})
      }
    })
  },

  /**
  * API DELETE Method
  * @param { String } url
  */
  API_DELETE ({ dispatch, getters }, { url }) {
    return new Promise(async (resolve, reject) => {
      try {
        let response = getters.GET_AUTH.token
         ? await this.$axios.$delete(url, { headers: { Authorization: getters.GET_AUTH.token } })
         : await this.$axios.$delete(url)
        resolve(response)
      } catch (error) {
        dispatch('UNSET_TOKEN', { error, reject})
      }
    })
  },

  /**
  * API PUT Method
  * @param { Array, Object } data
  * @param { String } url
  */
  API_PUT ({ dispatch, getters }, { url, data }) {
    return new Promise(async (resolve, reject) => {
      try {
        data = data || {}
          let response = getters.GET_AUTH.token
          ? await this.$axios.$put(url, data, { headers: { Authorization: getters.GET_AUTH.token } })
          : await this.$axios.$put(url, data)
        resolve(response)
      } catch (error) {
        dispatch('UNSET_TOKEN', { error, reject })
      }
    })
  },

  UNSET_TOKEN: ({ commit }, { error, reject}) => {
    const errors = error.response.data
    const status = error.response.status
    let router = $nuxt.$router.app
    if (status === 401) {
      commit('SET_AUTH')
      router._router.push('/login')
    }
    reject(errors)
  }
}