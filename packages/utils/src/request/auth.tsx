import cookie from 'react-cookies';

const TokenKey = 'access-token';

export function getToken() {
  return cookie.load(TokenKey);
}

export function setToken(token: string) {
  return cookie.save(TokenKey, token, { path: '/' });
}

export function removeToken() {
  return cookie.remove(TokenKey);
}
