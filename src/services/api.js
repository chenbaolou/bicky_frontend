import { stringify } from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/notice');
}

export async function ap(params) {
  return request(`/ap?${stringify(params)}`);
}

export async function checkAPUnique(params) {
  return request(`/ap/checkUnique?${stringify(params)}`);
}

export async function apDetail(apIndex) {
  return request(`/ap/${apIndex}/`);
}

export async function addAP(params) {
  return request('/ap/', {
    method: 'POST',
    body: params,
  });
}

export async function editAP(params) {
  const { apIndex, ..._params } = params;
  return request(`/ap/${apIndex}/`, {
    method: 'PATCH',
    body: _params,
  });
}

export async function deleteAP(params) {
  const { apIndex } = params;
  return request(`/ap/${apIndex}/`, {
    method: 'DELETE',
  });
}

export async function queryAPType(params) {
  return request(`/aptype?${stringify(params)}`);
}
