import {requestJson} from 'utils/request';

const api = {
  getAuth: '/api/auth/select/', // 查看
  updAuth: '/api/auth/update/', // 查看
  getBlock: '/api/block/self/select/', // 查看
  getDoc: '/api/doc/self/select', // 查看
  delDoc: '/api/doc/delete', // 查看
  addDoc: '/api/doc/insert', // 查看
  getDashboard: '/api/user/dashboard', // 查看
};

// 查询
export async function getAuth(payload) {
  return requestJson(api.getAuth, {
    method: 'POST',
    payload,
  });
}

// 添加
export async function updAuth(payload) {
  return requestJson(api.updAuth, {
    method: 'POST',
    payload,
  });
}


export async function getBlock(payload) {
  return requestJson(api.getBlock, {
    method: 'POST',
    payload,
  });
}

export async function getDoc(payload) {
  return requestJson(api.getDoc, {
    method: 'POST',
    payload,
  });
}

export async function delDoc(payload) {
  return requestJson(api.delDoc, {
    method: 'GET',
    payload,
  });
}
export async function addDoc(payload) {
  return requestJson(api.addDoc, {
    method: 'POST',
    payload,
  });
}
export async function getDashboard(payload) {
  return requestJson(api.getDashboard, {
    method: 'POST',
    payload,
  });
}
