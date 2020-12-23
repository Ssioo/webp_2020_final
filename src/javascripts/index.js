window.onload = async () => {
  if (!await sessionStorage.getItem('x-access-token')) {
    window.location.href = '/src/views/login.html'
  }
}
