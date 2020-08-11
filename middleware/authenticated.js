export default function (context) {
  if (context.$auth.$storage.getLocalStorage('isLogin')) {
    return context.redirect('/')
  }
}
