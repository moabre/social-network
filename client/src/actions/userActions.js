import axios from 'axios';
import {
  LOGIN_USER,
  GET_USER,
  GET_ALL_USERS,
  UPDATE_FOLLOWERS,
  UPDATE_FOLLOWING,
} from './actionTypes';

export const followUser = (userId, idToFollow) => (dispatch) =>
  axios
    .put(`/api/users/follow`, {
      idToFollow,
      userId,
    })
    .then((res) => {
      dispatch({
        type: UPDATE_FOLLOWING,
        payload: res.data,
      });
    });

export const unfollowUser = (userId, idToUnfollow) => (dispatch) =>
  axios
    .put(`/api/users/unfollow`, {
      idToUnfollow,
      userId,
    })
    .then((res) => {
      dispatch({
        type: UPDATE_FOLLOWING,
        payload: res.data,
      });
    });

export const getUser = (userId) => (dispatch) =>
  axios.get(`api/users/${userId}`).then((res) => {
    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  });
export const getLoginUser = (userId) => (dispatch) =>
  axios.get(`api/users/${userId}`).then((res) => {
    dispatch({
      type: LOGIN_USER,
      payload: res.data,
    });
  });

export const getRecommended = (userId) => (dispatch) =>
  axios.get(`/api/users/findpeople/${userId}`).then((res) => {
    dispatch({
      type: GET_ALL_USERS,
      payload: res.data,
    });
  });
