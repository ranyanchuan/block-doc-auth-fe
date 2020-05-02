import { requestJson } from 'utils/request';

const api = {
  getDeployment: '/api/bpm/select/deployment', // 查看流程部署 + 流程定义信息
  delDeployment: '/api/bpm/delete/deployment', // 删除流程部署
  getProcessImg: '/api/bpm/select/processImg', // 查看流程图片

  saveProcessDefinition: '/api/bpm/save/processDefinition', //  保存流程定义
  pubProcessDefinition: '/api/bpm/stop/processDefinition', //  保存流程定义
  startProcessDefinition: '/api/bpm/start/processDefinition', // 启动流程定义
  stopProcessDefinition: '/api/bpm/stop/processDefinition', // 停用流程定义

};


export async function getDeployment(payload) {
  return requestJson(api.getDeployment, {
    method: 'POST',
    payload,
  });
}


export async function delDeployment(payload) {
  return requestJson(api.delDeployment, {
    method: 'GET',
    payload,
  });
}

export async function getProcessImg(payload) {
  return requestJson(api.getProcessImg, {
    method: 'GET',
    payload,
  });
}


export async function saveProcessDefinition(payload) {
  return requestJson(api.saveProcessDefinition, {
    method: 'POST',
    payload,
  });
}

export async function pubProcessDefinition(payload) {
  return requestJson(api.pubProcessDefinition, {
    method: 'POST',
    payload,
  });
}

export async function startProcessDefinition(payload) {
  return requestJson(api.startProcessDefinition, {
    method: 'GET',
    payload,
  });
}

export async function stopProcessDefinition(payload) {
  return requestJson(api.stopProcessDefinition, {
    method: 'GET',
    payload,
  });
}



