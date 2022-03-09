export default () => ({
  auth: {
    token: '',
    userId: '',
    prcNumber: '',
    isDeceased: '',
    roleId: '',
    roleName: '',
    accountName: '',
    chapterId: '',
    chapter: '',
    membership: '',
    photo: '',
    isInfoUpdated: ''
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
  },
  likeHeart: {
    like: '',
    heart: ''
  }
})
