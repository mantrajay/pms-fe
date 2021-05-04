export default {
  /**
  * API GET Method
  * @param { string } url
  */
  API_GET ({ dispatch }, { url }) {
    return new Promise(async (resolve, reject) => {
      try {
        let headers = await dispatch('SET_HEADERS')
        let response = await this.$axios.$get(url, headers)
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
  API_POST ({ dispatch }, { url, data }) {
    return new Promise(async (resolve, reject) => {
      try {
        data = data || {}
        let headers = await dispatch('SET_HEADERS')
        let response = await this.$axios.$post(url, data, headers)
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
  API_DELETE ({ dispatch }, { url }) {
    return new Promise(async (resolve, reject) => {
      try {
        let headers = await dispatch('SET_HEADERS')
        let response = await this.$axios.$delete(url, headers)
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
  API_PUT ({ dispatch }, { url, data }) {
    return new Promise(async (resolve, reject) => {
      try {
        data = data || {}
        let headers = await dispatch('SET_HEADERS')
        let response = await this.$axios.$put(url, data, headers)
        resolve(response)
      } catch (error) {
        dispatch('UNSET_TOKEN', { error, reject })
      }
    })
  },

  SET_HEADERS ({ getters }) {
    return new Promise( async (resolve, reject) => {
      if (getters.GET_AUTH.token) {
        resolve({ headers: { Authorization: getters.GET_AUTH.token }})
      }  else resolve({ headers: {}})
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