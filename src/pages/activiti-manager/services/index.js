import { requestJson } from 'utils/request';

const api = {
  getDoc: '/api/doc/select', // 查看
};


export async function getDoc(payload) {
  return requestJson(api.getDoc, {
    method: 'POST',
    payload,
  });
}


