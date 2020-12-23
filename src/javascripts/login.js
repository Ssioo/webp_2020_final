const btnLogin = document.getElementById('btn_login')
const userId = document.getElementById('user_id')
const userPw = document.getElementById('user_pw')

btnLogin.onclick = async () => {
  if (!isValidEmail(userId.value)) {
    await alert('올바른 이메일을 입력해주세요')
    return
  }

}
