import {requestJson} from 'utils/request';

const api = {
  getAuth: '/api/auth/select/', // 查看
  addApproval: '/api/auth/approval/', // 查看
  getBlock: '/api/block/select/', // 查看
  getDoc: '/api/doc/select', // 查看
  delDoc: '/api/doc/delete', // 查看
  addDoc: '/api/doc/insert', // 查看
};

// 查询
export async function getAuth(payload) {
  return requestJson(api.getAuth, {
    method: 'POST',
    payload,
  });
}

// 添加
export async function addApproval(payload) {
  return requestJson(api.addApproval, {
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
