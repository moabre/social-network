import axios from 'axios';
import {
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  GET_POST_USER,
  GET_POST_FEED,
  CREATE_POST,
  EDIT_POST,
  DELETE_POST,
  UPDATE_POST_LIKES,
} from './actionTypes';

export const addComment = (action, commenterId, postId, text, timestamp) => (
  dispatch
) =>
  axios
    .patch(`/posts/${postId}`, { action, commenterId, text, timestamp })
    .then((res) =>
      dispatch({
        type: ADD_COMMENT,
        payload: res.data,
        commenterId,
        text,
        timestamp,
      })
    );

export const deleteComment = (action, commentId, postId) => (dispatch) =>
  axios.patch(`/posts/${postId}`, { action, commentId }).then((res) =>
    dispatch({
      type: DELETE_COMMENT,
      payload: res.data,
    })
  );

export const editComment = (action, commentId, postId, text) => (dispatch) =>
  axios.patch(`/posts/${postId}`, { action, commentId, text }).then((res) =>
    dispatch({
      type: EDIT_COMMENT,
      payload: res.data,
    })
  );

export const getPostFeed = (user) => (dispatch) =>
  axios.get(`/api/posts/feed/:${user.userId}`).then((res) =>
    dispatch({
      type: GET_POST_FEED,
      payload: res.data,
    })
  );
export const getPostUser = (user) => (dispatch) =>
  axios.get(`/api/posts/by/:${user.userId}`).then((res) =>
    dispatch({
      type: GET_POST_USER,
      payload: res.data,
    })
  );

export const createPost = (text, user) => (dispatch) =>
  axios
    .post(`/api/posts/new/:${user.userId}`, {
      text,
    })
    .then((res) =>
      dispatch({
        type: CREATE_POST,
        payload: res.data,
      })
    );

export const editPost = (id, text, author) => (dispatch) =>
  axios.patch(`/posts/${id}`, { id, text, author }).then((res) =>
    dispatch({
      type: EDIT_POST,
      id,
      text,
      author,
    })
  );

export const deletePost = (id) => (dispatch) =>
  axios.delete(`/posts/${id}`).then((res) =>
    dispatch({
      type: DELETE_POST,
      id,
    })
  );

export const updatePostLikes = (action, postId, likerId) => (dispatch) =>
  axios.patch(`/posts/${postId}`, { action, id: likerId }).then((res) =>
    dispatch({
      type: UPDATE_POST_LIKES,
      payload: res.data,
    })
  );
