const btnLogin = document.getElementById('btn_login')
const btnRegister = document.getElementById('btn_register')
const userId = document.getElementById('user_id')
const userPw = document.getElementById('user_pw')

btnLogin.onclick = async () => {
  if (!isValidEmail(userId.value)) {
    await alert('올바른 이메일을 입력해주세요')
    return
  }
  try {
    const res = await post('/user/token', {
      email: userId.value,
      pwd: userPw.value,
    })
    if (res.code !== 200) throw new Error(res.msg)
    alert('환영합니다')
    console.log(res.data.token)
    await sessionStorage.setItem('x-access-token', res.data.token)
    window.location.href = '/src/views/index.html'
  } catch (e) {
    alert(e.message)
  }
}
btnRegister.onclick = () => {
  window.location.href = '/src/views/register.html'
}
