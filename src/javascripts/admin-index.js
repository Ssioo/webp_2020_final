const peopleContents = document.getElementById('people_contents')

window.onload = async () => {
  if (!await sessionStorage.getItem('x-access-token-admin')) {
    window.location.href = '/src/views/admin/login.html'
  }
  const people = await fetchUser()
  drawTable(people)
}

const drawTable = (people) => {
  peopleContents.innerHTML = ''
  people.forEach((person) => {
    const row = document.createElement('tr')
    const idx = document.createElement('td')
    idx.innerHTML = person.id.toString()
    const email = document.createElement('td')
    email.innerHTML = person.email
    const pwd = document.createElement('td')
    pwd.innerHTML = person.pwd
    const name = document.createElement('td')
    name.innerHTML = person.name
    const role = document.createElement('td')
    role.style.textAlign = 'center'
    role.innerHTML = person.role
    const statusBtn = document.createElement('td')
    if (person.role !== 'admin') {
      statusBtn.classList.add(person.status === 'ACTIVE' ? 'person_status_active' : 'person_status_inactive')
      statusBtn.onclick = async () => { await onClickPersonStatus(person) }
    }
    statusBtn.style.textAlign = 'center'
    statusBtn.innerHTML = person.status
    const createdAt = document.createElement('td')
    createdAt.style.textAlign = 'center'
    createdAt.innerHTML = person.created_at.substr(0, 10) + ' ' +  person.created_at.substr(11, 8)
    row.appendChild(idx)
    row.appendChild(email)
    row.appendChild(pwd)
    row.appendChild(name)
    row.appendChild(role)
    row.appendChild(statusBtn)
    row.appendChild(createdAt)
    peopleContents.appendChild(row)
  })
}

const onClickPersonStatus = async (person) => {
  try {
    if (person.status === 'ACTIVE') {
      alert(`${person.name}의 상태를 비활성으로 변경할까요?`)
      await put('/user/status', { userId: person.id, newStatus: 'INACTIVE'})
    } else {
      alert(`${person.name}의 상태를 활성으로 변경할까요?`)
      await put('/user/status', { userId: person.id, newStatus: 'ACTIVE'})
    }
    alert('상태 변경에 성공하였습니다.')
  } catch (e) {
    alert(e.message)
  } finally {
    const people = await fetchUser()
    drawTable(people)
  }
}

const fetchUser = async () => {
  try {
    const res = await get('/user')
    if (res.code !== 200) throw new Error(res.msg)
    return res.data
  } catch (e) {
    alert(e.message)
    return []
  }
}
