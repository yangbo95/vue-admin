import Cookie from 'cookie_js';

const adminToken = 'admin_token';
const usernameKey = 'username';

export function getToken() {
  return Cookie.get(adminToken);
} 

export function setToken(token) {
  return Cookie.set(adminToken, token);
} 

export function removeToken() {
  return Cookie.remove(adminToken);
} 

export function setUserName(value) {
  return Cookie.set(usernameKey, value)
}

export function getUserName() {
  return Cookie.get(usernameKey)
}