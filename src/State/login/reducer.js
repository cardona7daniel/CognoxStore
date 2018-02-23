import {
    REQUEST_GET_DATA_LOGIN,
    REQUEST_GET_DATA_LOGIN_SUCCESS,
    REQUEST_GET_DATA_LOGIN_FAILED,
} from './const';

const initialState = {
  dataLogin: [],
  loading: false,
};

export default function loginApp  (state = initialState, action) {
  switch (action.type) {
    case REQUEST_GET_DATA_LOGIN: {
      return {
        ...state,
        loading: true,
      };
    }
    case REQUEST_GET_DATA_LOGIN_SUCCESS: {
      return {
        ...state,
        dataLogin: action.dataLogin,
        loading: false,
      };
    }
    case REQUEST_GET_DATA_LOGIN_FAILED: {
      return {
        ...state,
        dataLogin: [],
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
}