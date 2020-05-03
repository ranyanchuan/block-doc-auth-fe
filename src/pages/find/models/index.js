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

    docData: {
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

    * getDocData({payload, callback}, {call, put, select}) {
      const {data} = yield call(services.getDoc, payload);
      if (data) {
        yield put({type: 'updateState', res: {docData: data}});
      }
      if (callback) {
        callback(data);
      }
    },



    // 添加
    * addAuth({payload, callback}, {call, put, select}) {
      const data = yield call(services.addAuth, payload);
      if (callback) {
        callback(data);
      }
    },

 // 添加
    * addComment({payload, callback}, {call, put, select}) {
      const data = yield call(services.addComment, payload);
      if (callback) {
        callback(data);
      }
    },


  },


};

