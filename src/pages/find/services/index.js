import { requestJson } from 'utils/request';

const api = {
  getDoc: '/api/doc/select', // 查看
  addView: '/api/doc/view', // 查看
  addAuth: '/api/auth/insert/', // 提交申请
  reInsert: '/api/auth/reInsert/', // 提交申请
  addComment: '/api/comment/insert/', // 提交申请
};


export async function getDoc(payload) {
  return requestJson(api.getDoc, {
    method: 'POST',
    payload,
  });
}

export async function addView(payload) {
  return requestJson(api.addView, {
    method: 'POST',
    payload,
  });
}


export async function addAuth(payload) {
  return requestJson(api.addAuth, {
    method: 'POST',
    payload,
  });
}
export async function reInsert(payload) {
  return requestJson(api.reInsert, {
    method: 'POST',
    payload,
  });
}


export async function addComment(payload) {
  return requestJson(api.addComment, {
    method: 'POST',
    payload,
  });
}


