import { INDICATE_NO_ERRORS, GET_ERRORS } from '../actions/actionTypes';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case INDICATE_NO_ERRORS:
      return action.payload;
    case GET_ERRORS:
      return action.payload;

    default:
      return state;
  }
}
