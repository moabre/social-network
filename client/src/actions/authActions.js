import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../setAuthToken';
import { useDispatch } from 'react-redux';
import {
  INDICATE_NO_ERRORS,
  GET_ERRORS,
  SET_CURRENT_USER,
} from './actionTypes';

export const registerUser = (user) => (dispatch) => {
  axios
    .post('/api/users', user)
    .then((res) => {
      dispatch({
        type: INDICATE_NO_ERRORS,
        payload: {
          success: true,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const loginUser = (user) => (dispatch) => {
  axios
    .post('http://localhost:5000/auth/signin', user)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwtDecode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) => {
      //dispatch({
      //   type: GET_ERRORS,
      //   payload: err.response,
      // });
    });
};

export const setCurrentUser = (decoded) => ({
  type: SET_CURRENT_USER,
  payload: decoded,
});

export const updateCurrentUser = (
  avatar,
  bio,
  email,
  name,
  userId,
  showEmail
) => (dispatch) =>
  axios
    .patch(`/api/users/${userId}`, { avatar, bio, email, name, showEmail })
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwtDecode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) => console.log(err));

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  window.location.href = '/auth/signin';
};
