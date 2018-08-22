import sdk from '../../sdk';

export default {
  namespace: 'test',

  state: {
    list: ['test', '123', sdk.store.config],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'queryList',
        payload: ['test', '123'],
      });
    },
    *appendFetch({ payload }, { call, put }) {
      yield put({
        type: 'appendList',
        payload: ['test', '123'],
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    appendList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload),
      };
    },
  },
};
