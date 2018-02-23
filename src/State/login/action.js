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

export default function requestGetDataLogin(data) {
  return (dispatch) => {
    dispatch(getDataLoginProgress());
    getDataUser(data)
      .then((response) => {
        if (response.statusText === 'OK') {
          dispatch(getDataLoginSuccess(response.data.User));
        } else{
          dispatch(setMessage('Usuario o contraseña incorrecta', 'info'));
        }
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(getDataLoginFailed());
        dispatch(setMessage('Error consultando los datos del usuario...', 'error'));
      });
  };
}
