export default () => ({
  auth: {
    token: '',
    userId: '',
    roleId: '',
    roleName: '',
    accountName: '',
    chapter: '',
    membership: ''
  },
  alert: {
    toggle: false,
    title: 'Success',
    variant: 'success',
    message: 'Success'
  },
  loading: {
    toggle: false,
    title: ''
  },
  imageExtension: [
    { type: 'image/jpeg' },
    { type: 'image/png' }
  ],
  pageLoading: {
    boilerplate: false,
    toggle: false,
    type: 'article, article, article'
  }
})
