export default function ({app, store, redirect}) {
  store.dispatch('common/API_GET', {
    url: '/Auth/checkToken'
  }).then(response => {
    redirect()
  }).catch((error) => {
    console.log(error)
    store.commit('common/SET_AUTH')
    redirect('/')
  })
}