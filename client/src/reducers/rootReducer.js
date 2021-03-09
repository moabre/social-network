import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import postReducer from './postsReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  authReducer: authReducer,
  error: errorReducer,
  posts: postReducer,
  user: userReducer,
});

export default rootReducer;
