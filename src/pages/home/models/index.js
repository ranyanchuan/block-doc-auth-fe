import * as services from '../services';

export default {
  namespace: 'homeModel',

  state: {

    taskData: {
      rows: [],
      pageNumber: 1,
      total: 0,
      pageSize: 20,

    },

    docData: {
      rows: [],
      pageNumber: 1,
      total: 0,
      pageSize: 20,

    },
  },


  reducers: {

    updateState(state, {res}) { //更新state
      return {
        ...state,
        ...res,
      };
    },
  },


  effects: {

    //  获取区块数据
    * getBlockData({payload, callback}, {call, put, select}) {
      const {type} = payload;
      const {data} = yield call(services.getBlock, payload);
      if (data) {
        yield put({type: 'updateState', res: {[`${type}Data`]: data}});
      }
      if (callback) {
        callback(data);
      }
    },

    * getTaskData({payload, callback}, {call, put, select}) {
      const {data} = yield call(services.getAuth, payload);
      if (data) {
        yield put({type: 'updateState', res: {taskData: data}});
      }
      if (callback) {
        callback(data);
      }
    },


    * addApproval({payload, callback}, {call, put, select}) {
      const {data} = yield call(services.addApproval, payload);
      if (data) {
        yield put({type: 'updateState', res: {taskData: data}});
      }
      if (callback) {
        callback(data);
      }
    },



    * getDocData({payload, callback}, {call, put, select}) {
      const {data} = yield call(services.getDoc, payload);
      if (data) {
        yield put({type: 'updateState', res: {docData: data}});
      }
      if (callback) {
        callback(data);
      }
    },

    // 删除
    * delDoc({payload, callback}, {call, put, select}) {
      const data = yield call(services.delDoc, payload);
      if (callback) {
        callback(data);
      }
    },

    // 添加
    * addDoc({payload, callback}, {call, put, select}) {
      const data = yield call(services.addDoc, payload);
      if (callback) {
        callback(data);
      }
    },


  },


};

