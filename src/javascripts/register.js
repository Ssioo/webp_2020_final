const checkboxBuyer = document.getElementById('cb_buyer')
const checkboxSeller = document.getElementById('cb_seller')
const btnRegister = document.getElementById('btn_register')
const btnReset = document.getElementById('btn_reset')
const btnDuplicate = document.getElementById('duplicate')
const userId = document.getElementById('user_id')
const userPw = document.getElementById('user_pw')
const userName = document.getElementById('user_name')
let isNotDuplicated = null

checkboxBuyer.onclick = () => {
  checkboxSeller.checked = !checkboxBuyer.checked
}
checkboxSeller.onclick = () => {
  checkboxBuyer.checked = !checkboxSeller.checked
}
btnRegister.onclick = async () => {
  if (!isValidEmail(userId.value)) {
    alert('올바르지 않은 이메일입니다.')
    return
  }
  if (!isValidPassword(userPw.value)) {
    alert('8자 이상 20자 이하로 비밀번호를 입력해주세요.')
    return
  }
  if (!isValidUserName(userName.value)) {
    alert('이름을 입력해주세요.')
    return
  }
  if (!(checkboxSeller.checked || checkboxBuyer.checked)) {
    alert('사용자 타입을 선택해주세요.')
    return
  }
  if (!isNotDuplicated) {
    alert('아이디 중복확인을 진행해주세요.')
    return
  }

  try {
    const res = await post('/user', {
      email: userId.value,
      pwd: userPw.value,
      name: userName.value,
      role: !checkboxSeller.checked ? 'buyer' : 'seller'
    })
    if (res.code !== 200) throw new Error(res.msg)
    alert('가입에 성공하였습니다. 로그인을 진행해주세요.')
    window.location.href = '/src/views/login.html'
  } catch (e) {
    alert(e.message)
  }
}
userId.onkeyup = () => {
  isNotDuplicated = null
}

btnReset.onclick = () => {
  userId.value = ''
  userPw.value = ''
  userName.value = ''
  checkboxBuyer.checked = false
  checkboxSeller.checked = false
}

btnDuplicate.onclick = async () => {
  if (!isValidEmail(userId.value)) {
    alert('올바르지 않은 이메일입니다.')
    return
  }
  try {
    const res = await get(`/user/duplicate?email=${userId.value}`)
    if (res.code === 200) {
      alert('사용가능한 이메일입니다.')
      isNotDuplicated = true
    } else {
      alert('중복된 이메일입니다.')
      isNotDuplicated = false
    }
  } catch (e) {
    alert(e.message)
  }

}
