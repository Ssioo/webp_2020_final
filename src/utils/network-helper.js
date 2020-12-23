const BASE_URL = 'http://localhost:3000'


const get = async (url, isAdmin = false) => {
  const X_ACCESS_TOKEN = await sessionStorage.getItem(isAdmin ? 'x-access-token-admin' : 'x-access-token')
  const res = await fetch(`${BASE_URL}${url}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'x-access-token': X_ACCESS_TOKEN
    }
  })
  return res.json()
}

const post = async (url, body, isAdmin = false) => {
  const X_ACCESS_TOKEN = await sessionStorage.getItem(isAdmin ? 'x-access-token-admin' : 'x-access-token')
  const res = await fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'x-access-token': X_ACCESS_TOKEN
    },
    body: JSON.stringify(body)
  })
  return res.json()
}

const put = async (url, body, isAdmin = false) => {
  const X_ACCESS_TOKEN = await sessionStorage.getItem(isAdmin ? 'x-access-token-admin' : 'x-access-token')
  const res = await fetch(`${BASE_URL}${url}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      'x-access-token': X_ACCESS_TOKEN
    },
    body: JSON.stringify(body)
  })
  return res.json()
}
