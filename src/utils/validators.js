const isValidEmail = (email) => {
  return /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(email)
}

const isValidPassword = (password) => {
  return password.length >= 8 && password.length <= 20
}

const isValidUserName = (name) => {
  return name.length > 0
}
