import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

const rootReducer = combineReducers({
  authReducer: authReducer,
  error: errorReducer,
});

export default rootReducer;
