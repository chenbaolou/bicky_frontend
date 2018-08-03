import { stringify } from 'qs';
import request from '../utils/request';

export async function ap(params) {
  return request(`/ap?${stringify(params)}`);
}

export async function checkAPUnique(params) {
  return request(`/ap/checkUnique/?${stringify(params)}`);
}

export async function apDetail(apIndex) {
  return request(`/ap/${apIndex}/`);
}

export async function add(params) {
  return request('/ap/', {
    method: 'POST',
    body: params,
  });
}

export async function edit(params) {
  const { apIndex, ..._params } = params;
  return request(`/ap/${apIndex}/`, {
    method: 'PATCH',
    body: _params,
  });
}

export async function remove(params) {
  const { apIndex } = params;
  return request(`/ap/${apIndex}/`, {
    method: 'DELETE',
  });
}

export async function batch(params) {
  return request(`/ap/batch/`, {
    method: 'POST',
    body: params,
  });
}

export async function queryAPType(params) {
  return request(`/aptype?${stringify(params)}`);
}

export async function batchImportAP(params) {
  return request(`/ap/batchImportAP/`, {
    method: 'POST',
    body: params,
  });
}

export const exportURL = 'ap/export/';
