import axios from 'axios';
import {
  LOGIN_USER,
  GET_USER,
  GET_ALL_USERS,
  UPDATE_FOLLOWERS,
  UPDATE_FOLLOWING,
  GET_ERRORS,
} from './actionTypes';
import setAuthToken from '../setAuthToken';
import { setCurrentUser } from './authActions';

const devLink = process.env.REACT_APP_PRODUCTION_LINK;
const productionLink = '';
export const followUser = (userId, idToFollow) => (dispatch) => {
  axios
    .put(`${productionLink}/api/users/follow`, {
      idToFollow,
      userId,
    })
    .then((res) => {
      dispatch({
        type: UPDATE_FOLLOWING,
        payload: res.data,
        idToFollow,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response,
      });
    });
};

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

export const getUser = (userId) => (dispatch) => {
  axios
    .get(`${productionLink}/api/users/${userId}`)
    .then((res) => {
      dispatch({
        type: GET_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response,
      });
    });
};

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

export const deleteUser = (userId) => (dispatch) => {
  axios
    .delete(`${productionLink}/api/users/${userId}`)
    .then((res) => {
      localStorage.removeItem('jwtToken');
      setAuthToken(false);
      dispatch(setCurrentUser({}));
      window.location.href = '/';
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response,
      });
    });
};
