import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import login from './login/reducer';
import product from './product/reducer';
// import generic from './generic/reducer';

export default combineReducers({
  login,
  product,
  routing: routerReducer,
});
