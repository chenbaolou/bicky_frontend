import request from '../utils/request';

export async function query() {
  return request('/user/');
}

export async function queryCurrent() {
  return request('/user/current/');
}

export async function accountLogin(params) {
  return request('/user/login/', {
    method: 'POST',
    body: params,
  });
}

export async function accountLogout() {
  return request('/user/logout/');
}
