import {
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
    case 'REDUCE_FOLLOWER':
      return {
        ...state,
        currUser: {
          ...state.currUser,
          followers: state.currUser.followers.filter(
            (i) => i._id !== action.id
          ),
        },
      };
    case 'INCREASE_FOLLOWER':
      return {
        ...state,
        currUser: {
          ...state.currUser,
          followers: state.currUser.followers.concat([action.user]),
        },
      };
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
        recommended: action.payload,
      };
    case UPDATE_FOLLOWING:
      return {
        ...state,
        recommended: state.recommended.filter(
          (i) => i._id !== action.idToFollow
        ),
        following: action.payload.following.length
          ? action.payload.following
          : [],
        followers: action.payload.followers.length
          ? action.payload.followers
          : [],
      };
    case UPDATE_FOLLOWERS:
      return {
        ...state,
        following: action.payload.following.length
          ? action.payload.following
          : [],
        followers: action.payload.followers.length
          ? action.payload.followers
          : [],
      };
    default:
      return state;
  }
}
