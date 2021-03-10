import {
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  GET_POST_USER,
  GET_POST_FEED,
  CREATE_POST,
  EDIT_POST,
  DELETE_POST,
  POST_LIKE,
  POST_UNLIKE,
} from '../actions/actionTypes';

const initialState = {
  posts: [],
};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return {
              ...action.payload,
            };
          }
          return post;
        }),
      };
    case DELETE_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return {
              ...action.payload,
            };
          }
          return post;
        }),
      };
    case EDIT_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return {
              ...action.payload,
            };
          }
          return post;
        }),
      };
    case GET_POST_USER:
      return {
        ...initialState,
        posts: action.payload,
      };
    case GET_POST_FEED:
      return {
        ...initialState,
        posts: action.payload,
      };
    case CREATE_POST: {
      return {
        ...state,
        posts: [{ ...action.payload }, ...state.posts],
      };
    }
    case EDIT_POST: {
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return {
              ...action.payload,
            };
          }
          return post;
        }),
      };
    }
    case POST_LIKE: {
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return {
              ...action.payload,
            };
          }
          return post;
        }),
      };
    }
    case POST_UNLIKE: {
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return {
              ...action.payload,
            };
          }
          return post;
        }),
      };
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter(({ _id }) => _id !== action.postId),
      };
    }
    default:
      return state;
  }
}
