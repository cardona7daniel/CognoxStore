import {
  REQUEST_GET_DATA_LOGIN,
  REQUEST_GET_DATA_LOGIN_SUCCESS,
  REQUEST_GET_DATA_LOGIN_FAILED,
} from './const';
import setMessage from '../generic/action';
import { getDataUser } from '../../Api/login';

function getDataLoginProgress() {
  return {
    type: REQUEST_GET_DATA_LOGIN,
  };
}

function getDataLoginSuccess(dataLogin) {
  return {
    type: REQUEST_GET_DATA_LOGIN_SUCCESS,
    dataLogin,
  };
}

function getDataLoginFailed(bVerifyDataLiquidation) {
  return {
    type: REQUEST_GET_DATA_LOGIN_FAILED,
  };
}

export default function requestGetDataLogin(data, next) {
  return (dispatch) => {
    dispatch(getDataLoginProgress());
    getDataUser(data)
      .then((response) => {
        if (response.statusText === 'OK') {
          console.log(response.data);
          dispatch(getDataLoginSuccess(response.data));
          next();
        } else{
          dispatch(setMessage('Usuario o contraseña incorrecta', 'info'));
        }
      })
      .catch((error) => {
        console.log(error.response);
        if(error.response && error.response.status === 403) {
          dispatch(setMessage('Usuario o contraseña incorrecta', 'info'));
        } else{
          dispatch(setMessage(error.stack, 'error', 'Error consultando la información del usuario.', 'Modal'));
        }
        dispatch(getDataLoginFailed());
      });
  };
}
