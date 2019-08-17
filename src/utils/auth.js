import Cookies from 'js-cookie'

// const TokenKey = 'Admin-Token'

export function getToken(TokenKey) {
  return Cookies.get(TokenKey)
}

export function setToken(TokenKey,token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken(TokenKey) {
  return Cookies.remove(TokenKey)
}
