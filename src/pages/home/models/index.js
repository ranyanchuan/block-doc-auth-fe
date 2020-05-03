import * as services from '../services';


const initTable={
  rows: [],
  pageNumber: 1,
  total: 0,
  pageSize: 20,
}

export default {
  namespace: 'homeModel',

  state: {

    taskData: {
      ...initTable,
    },
    totalData: {
      ...initTable,
    },

    readData: {
      ...initTable,
    },

    commentData: {
      ...initTable,
    },
    approvalData: {
      ...initTable,
    },
    docData: {
      ...initTable,
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
      const {type="total"} = payload;
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


    * updAuth({payload, callback}, {call, put, select}) {
      const data = yield call(services.updAuth, payload);
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

