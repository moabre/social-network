import { SET_CURRENT_USER } from '../actions/actionTypes';
import isEmpty from '../validation/isEmpty';

const initialState = {
  isAuthenticated: false,
  user: {},
  redirectToProfile: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case 'REDIRECT':
      return {
        ...state,
        redirectToProfile: true,
      };
    case 'CLEAN UP':
      return {
        ...state,
        redirectToProfile: false,
      };
    default:
      return state;
  }
};

export default authReducer;
