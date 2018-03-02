import {
  REQUEST_LIST_PRODUCTS,
  REQUEST_LIST_PRODUCTS_SUCCESS,
  REQUEST_LIST_PRODUCTS_FAILED,
} from './const';
import setMessage from '../generic/action';
import { getAllProducts } from '../../Api/product';

function getAllProductsProgress() {
  return {
    type: REQUEST_LIST_PRODUCTS,
  };
}

function getAllProductsSuccess(dataProducts) {
  return {
    type: REQUEST_LIST_PRODUCTS_SUCCESS,
    dataProducts,
  };
}

function getAllProductsFailed(bVerifyDataLiquidation) {
  return {
    type: REQUEST_LIST_PRODUCTS_FAILED,
  };
}

export default function requestGetAllProducts() {
  return (dispatch) => {
    dispatch(getAllProductsProgress());
    getAllProducts()
      .then((response) => {
        if (response.statusText === 'OK' && response.data !== null) {
          dispatch(getAllProductsSuccess(response.data));
        } else{
          dispatch(setMessage('No existen productos registrados', 'info'));
        }
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(getAllProductsFailed());
        dispatch(setMessage(error.stack, 'error', 'Error consultando la lista de productos.', 'Modal'));
      });
  };
}