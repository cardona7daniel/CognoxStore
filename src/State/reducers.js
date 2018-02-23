import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import login from './login/reducer';
// import generic from './generic/reducer';

export default combineReducers({
  login,
  routing: routerReducer,
});
