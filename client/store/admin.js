import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_AUTH = 'GET_AUTH';

let initialState = false;

/*
 * ACTION CREATORS
 */

// Get auth admin
export const getAdminStatus = (user) => {
  return {
    type: GET_AUTH,
    user,
  };
};

/*
 * THUNK CREATORS
 */

// Get auth admin status
export const getAdmin = (auth) => {
  console.log(auth);
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `api/users/${auth.id}/${auth.token}/isAdmin`,
      );
      dispatch(getAdminStatus(data));
    } catch (error) {
      console.log(error);
    }
  };
};

/*
 * REDUCER
 */
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case GET_AUTH:
      return action.user;
    default:
      return state;
  }
}
