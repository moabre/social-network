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
  POST_LIKE,
  POST_UNLIKE,
} from './actionTypes';

export const addComment = (postId, userId, comment) => (dispatch) =>
  axios.put(`api/posts/comment`, { postId, userId, comment }).then((res) =>
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    })
  );

export const deleteComment = (comment, postId) => (dispatch) =>
  axios.patch(`/api/posts/uncomment`, { comment, postId }).then((res) =>
    dispatch({
      type: DELETE_COMMENT,
      payload: res.data,
    })
  );

export const editComment = (comment, postId) => (dispatch) =>
  axios.patch(`/api/posts/edit/comment}`, { comment, postId }).then((res) =>
    dispatch({
      type: EDIT_COMMENT,
      payload: res.data,
    })
  );

export const getPostFeed = (userId) => (dispatch) =>
  axios.get(`/api/posts/feed/:${userId}`).then((res) =>
    dispatch({
      type: GET_POST_FEED,
      payload: res.data,
    })
  );
export const getPostUser = (userId) => (dispatch) =>
  axios.get(`/api/posts/by/:${userId}`).then((res) =>
    dispatch({
      type: GET_POST_USER,
      payload: res.data,
    })
  );

export const createPost = (text, userId) => (dispatch) =>
  axios
    .post(`/api/posts/new/:${userId}`, {
      text,
    })
    .then((res) =>
      dispatch({
        type: CREATE_POST,
        payload: res.data,
      })
    );

export const editPost = (postId, text) => (dispatch) =>
  axios.put(`/api/posts/edit/${postId}`, { text, postId }).then((res) =>
    dispatch({
      type: EDIT_POST,
      payload: res.data,
      id,
      text,
      author,
    })
  );

export const deletePost = (postId) => (dispatch) =>
  axios.delete(`/api/posts/${postId}`).then((res) =>
    dispatch({
      type: DELETE_POST,
      postId,
    })
  );

export const postLike = (postId, userId) => (dispatch) =>
  axios.patch(`/api/posts/like`, { postId, userId }).then((res) =>
    dispatch({
      type: POST_LIKE,
      payload: res.data,
    })
  );
export const postUnlike = (postId, userId) => (dispatch) =>
  axios.patch(`/api/posts/unlike`, { postId, userId }).then((res) =>
    dispatch({
      type: POST_UNLIKE,
      payload: res.data,
    })
  );
