import {
  GET_FOLLOWERS,
  GET_FOLLOWING,
  GET_USER,
  GET_ALL_USERS,
  UPDATE_FOLLOWERS,
  UPDATE_FOLLOWING,
  LOGIN_USER,
} from '../actions/actionTypes';

const initialState = {
  recommended: [],
  followers: [],
  following: [],
  currUser: {},
  loginedInUser: {},
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loginedInUser: action.payload.user,
      };
    case GET_USER:
      return {
        ...state,
        currUser: action.payload.user,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    case UPDATE_FOLLOWING:
      return {
        ...state,
        following: action.payload.following,
        followers: action.paylod.followers,
      };
    default:
      return state;
  }
}
