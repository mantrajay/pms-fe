export default function ({app, store, redirect}) {
  store.dispatch('common/API_GET', {
    url: 'Auth/checkToken'
  }).then(() => {
    return redirect()
  }).catch(() => {
    store.commit('common/SET_AUTH', {})
    return redirect('/login')
  })
}