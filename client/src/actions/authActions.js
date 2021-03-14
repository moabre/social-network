import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { history } from '../App';
import setAuthToken from '../setAuthToken';
import store from '../store';
import {
  INDICATE_NO_ERRORS,
  GET_ERRORS,
  SET_CURRENT_USER,
} from './actionTypes';

const devLink = process.env.REACT_APP_PRODUCTION_LINK;
const productionLink = '';

export const registerUser = (user) => (dispatch) => {
  axios
    .post(`${productionLink}/api/users`, user)
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
    .post(`${productionLink}/auth/signin`, user)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwtDecode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response,
      });
    });
};

export const setCurrentUser = (decoded) => ({
  type: SET_CURRENT_USER,
  payload: decoded,
});

export const updateCurrentUser = (updates, userId) => (dispatch) => {
  axios
    .patch(`${productionLink}/api/users/${userId}`, { updates })
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwtDecode(token);
      dispatch(setCurrentUser(decoded));
      dispatch({
        type: 'REDIRECT',
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  history.push('/');
};

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (
      err.response.status === 401 ||
      err.response.data.message === '401 Unauthorized'
    ) {
      store.dispatch(logoutUser());
    }
    return Promise.reject(err);
  }
);
