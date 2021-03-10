import axios from 'axios';
import {
  LOGIN_USER,
  GET_USER,
  GET_ALL_USERS,
  UPDATE_FOLLOWERS,
  UPDATE_FOLLOWING,
} from './actionTypes';

const productionLink = 'http://localhost:5000';
export const followUser = (userId, idToFollow) => (dispatch) =>
  axios
    .put(`${productionLink}/api/users/follow`, {
      idToFollow,
      userId,
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: UPDATE_FOLLOWING,
        payload: res.data,
        idToFollow,
      });
    });

export const unfollowUser = (userId, idToUnfollow) => (dispatch) =>
  axios
    .put(`${productionLink}/api/users/unfollow`, {
      idToUnfollow,
      userId,
    })
    .then((res) => {
      dispatch({
        type: UPDATE_FOLLOWERS,
        payload: res.data,
      });
    });

export const getUser = (userId) => (dispatch) =>
  axios.get(`${productionLink}/api/users/${userId}`).then((res) => {
    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  });
export const getLoginUser = (userId) => (dispatch) =>
  axios.get(`${productionLink}/api/users/${userId}`).then((res) => {
    dispatch({
      type: LOGIN_USER,
      payload: res.data,
    });
  });

export const getRecommended = (userId) => (dispatch) =>
  axios.get(`${productionLink}/api/users/findpeople/${userId}`).then((res) => {
    dispatch({
      type: GET_ALL_USERS,
      payload: res.data,
    });
  });
