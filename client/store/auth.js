import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const REGISTER_USER = 'REGISTER_USER';
const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';

// Get user from localStorage if it exists
const user = JSON.parse(localStorage.getItem('user'));

let initialState = {};

if (user) {
  initialState = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    street: user.street,
    city: user.city,
    state: user.state,
    zip: user.zip,
    token: user.token,
  };
}

/*
 * ACTION CREATORS
 */

// Register User Action Creator
export const actionRegister = (data) => {
  return {
    type: REGISTER_USER,
    data,
  };
};

// Login User Action Creator
export const actionLogin = (user) => {
  return {
    type: LOGIN_USER,
    user,
  };
};

// Logout User Action Creator
export const actionLogout = (user) => {
  return {
    type: LOGOUT_USER,
    user,
  };
};

/*
 * THUNK CREATORS
 */

// Register User
export const register = (userData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/users', userData);
      if (data) {
        localStorage.setItem('user', JSON.stringify(data));
      }
      dispatch(actionRegister(data));
    } catch (error) {
      console.log(error);
    }
  };
};

// Login User
export const login = (userData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/users/login', userData);
      if (data) {
        localStorage.setItem('user', JSON.stringify(data));
      }
      dispatch(actionLogin(data));
    } catch (error) {
      console.error('Invalid Credentials, please try again!');
      console.log(error);
    }
  };
};

// Logout User
export const logout = () => {
  localStorage.removeItem('user');
  history.push('/login');
};

/*
 * REDUCER
 */
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER:
      return action.data;
    case LOGIN_USER:
      return action.user;
    case LOGOUT_USER:
      return {};
    default:
      return state;
  }
}
