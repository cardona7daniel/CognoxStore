import {
  REQUEST_LIST_PRODUCTS,
  REQUEST_LIST_PRODUCTS_SUCCESS,
  REQUEST_LIST_PRODUCTS_FAILED,
} from './const';

const initialState = {
dataProducts: [],
loading: false,
};

export default function productApp  (state = initialState, action) {
switch (action.type) {
  case REQUEST_LIST_PRODUCTS: {
    return {
      ...state,
      loading: true,
    };
  }
  case REQUEST_LIST_PRODUCTS_SUCCESS: {
    return {
      ...state,
      dataProducts: action.dataProducts,
      loading: false,
    };
  }
  case REQUEST_LIST_PRODUCTS_FAILED: {
    return {
      ...state,
      dataProducts: [],
      loading: false,
    };
  }
  default: {
    return state;
  }
}
}