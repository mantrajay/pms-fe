export default function ({app, store, redirect}) {
  store.dispatch('common/API_GET', {
    url: 'Auth/checkToken'
  }).then(response => {
    return redirect()
  }).catch((error) => {
    store.commit('common/SET_AUTH')
    return redirect('/')
  })
}