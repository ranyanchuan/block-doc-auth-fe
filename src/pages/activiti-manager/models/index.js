import * as services from '../services';


const initTable = {
  rows: [],
  pageNumber: 0,
  total: 0,
  pageSize: 20,
};

export default {
  namespace: 'activitiManagerModel',

  state: {

    mainData: {
      ...initTable,
    },
    childData: {
      ...initTable,
    },
  },


  reducers: {

    updateState(state, { res }) { //更新state
      return {
        ...state,
        ...res,
      };
    },
  },


  effects: {

    //  获取主表数据
    * getMainData({ payload, callback }, { call, put, select }) {
      const { data } = yield call(services.getDeployment, payload);
      let mainData = initTable;
      if (data) {
        mainData = data;
        yield put({ type: 'updateState', res: { mainData } });
      }
      if (callback) {
        callback(data);
      }
    },

    // 删除一条主表数据
    * delMainData({ payload, callback }, { call, put, select }) {
      const data = yield call(services.delDeployment, payload);
      if (callback) {
        callback(data);
      }
    },

    // 获取流程图片
    * getProcessImg({ payload, callback }, { call, put, select }) {
      const data = yield call(services.getProcessImg, payload);
      if (callback) {
        callback(data);
      }
    },

    //  保存流程定义
    * saveProcessDefinition({ payload, callback }, { call, put, select }) {
      const data = yield call(services.saveProcessDefinition, payload);
      if (callback) {
        callback(data);
      }
    },
    // 发布流程定义
    * pubProcessDefinition({ payload, callback }, { call, put, select }) {
      const data = yield call(services.pubProcessDefinition, payload);
      if (callback) {
        callback(data);
      }
    },
    // 启动流程定义
    * startProcessDefinition({ payload, callback }, { call, put, select }) {
      const data = yield call(services.startProcessDefinition, payload);
      if (callback) {
        callback(data);
      }
    },
    // 停用流程定义
    * stopProcessDefinition({ payload, callback }, { call, put, select }) {
      const data = yield call(services.stopProcessDefinition, payload);
      if (callback) {
        callback(data);
      }
    },

  },


};

