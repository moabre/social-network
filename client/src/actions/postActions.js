import axios from 'axios';
import {
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  GET_POST_USER,
  GET_POST_FEED,
  CREATE_POST,
  DELETE_POST,
  POST_LIKE,
  POST_UNLIKE,
  GET_ERRORS,
} from './actionTypes';

const devLink = process.env.REACT_APP_PRODUCTION_LINK;
const productionLink = '';

export const addComment = (postId, userId, comment) => (dispatch) =>
  axios
    .put(`${productionLink}/api/posts/comment`, { postId, userId, comment })
    .then((res) =>
      dispatch({
        type: ADD_COMMENT,
        payload: res.data,
      })
    );

export const deleteComment = (comment, postId) => (dispatch) =>
  axios
    .put(`${productionLink}/api/posts/uncomment`, { comment, postId })
    .then((res) =>
      dispatch({
        type: DELETE_COMMENT,
        payload: res.data,
      })
    );

export const editComment = (comment, postId) => (dispatch) =>
  axios
    .patch(`${productionLink}/api/posts/edit/comment}`, { comment, postId })
    .then((res) =>
      dispatch({
        type: EDIT_COMMENT,
        payload: res.data,
      })
    );

export const getPostFeed = (userId) => (dispatch) =>
  axios.get(`${productionLink}/api/posts/feed/${userId}`).then((res) => {
    dispatch({
      type: GET_POST_FEED,
      payload: res.data,
    });
  });
export const getPostUser = (userId) => (dispatch) => {
  axios
    .get(`${productionLink}/api/posts/by/${userId}`)
    .then((res) =>
      dispatch({
        type: GET_POST_USER,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response,
      });
    });
};

export const createPost = (text, userId, image) => (dispatch) =>
  axios
    .post(`${productionLink}/api/posts/new/${userId}`, {
      text,
      image,
    })
    .then((res) => {
      dispatch({
        type: CREATE_POST,
        payload: res.data,
      });
    });

export const deletePost = (postId) => (dispatch) =>
  axios.delete(`${productionLink}/api/posts/${postId}`).then((res) =>
    dispatch({
      type: DELETE_POST,
      postId,
    })
  );

export const postLike = (postId, userId) => (dispatch) =>
  axios
    .put(`${productionLink}/api/posts/like`, { postId, userId })
    .then((res) =>
      dispatch({
        type: POST_LIKE,
        payload: res.data,
      })
    );
export const postUnlike = (postId, userId) => (dispatch) =>
  axios
    .put(`${productionLink}/api/posts/unlike`, { postId, userId })
    .then((res) =>
      dispatch({
        type: POST_UNLIKE,
        payload: res.data,
      })
    );
