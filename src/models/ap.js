import { ap, queryAPType, add, edit, remove, batch } from '../api/ap';

export default {
  namespace: 'ap',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    apType: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(ap, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchAPType({ payload }, { call, put }) {
      const response = yield call(queryAPType, payload);
      yield put({
        type: 'saveAPType',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(add, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *edit({ payload, callback }, { call, put }) {
      const response = yield call(edit, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(remove, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *batch({ payload, callback }, { call, put }) {
      const response = yield call(batch, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    saveAPType(state, action) {
      return {
        ...state,
        apType: action.payload,
      };
    },
  },
};
