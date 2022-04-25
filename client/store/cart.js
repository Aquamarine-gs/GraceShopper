import axios from 'axios';

const GET_CART = 'GET_CART';
const COMPLETE_CART = 'COMPLETE_CART';
const UPDATE_CART = 'UPDATE_CART';
const initialState = [];

export const actionGetCart = (cart) => {
  return {
    type: GET_CART,
    cart,
  };
};

export const actionCompleteCart = (cart) => {
  return {
    type: COMPLETE_CART,
    cart,
  };
};

export const actionUpdateCart = (cart) => {
  return {
    type: UPDATE_CART,
    cart,
  };
};

export const getCart = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/cart/${token}`);
      dispatch(actionGetCart(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const completePurchase = (token) => {
  return async (dispatch) => {
    try {
      const { data: complete } = await axios.put(`/api/cart/complete`, token);
      dispatch(actionCompleteCart(complete));
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateCart = (product) => {
  return async (dispatch) => {
    try {
      const { data: updated } = await axios.post(`/api/cart/edit`, product);
      dispatch(actionUpdateCart(updated));
    } catch (error) {
      console.log(error);
    }
  };
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return [...action.cart];

    case COMPLETE_CART:
      return [];
    case UPDATE_CART:
      return state.map((cart) =>
        cart.id === action.cart.id ? [...state, action.cart] : cart,
      );

    default:
      return state;
  }
}
