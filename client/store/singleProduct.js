import axios from 'axios';

const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT';
const initialState = {};

export const actionGetSingleProduct = (product) => {
  return {
    type: GET_SINGLE_PRODUCT,
    product,
  };
};

export const getSingleProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);

      dispatch(actionGetSingleProduct(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
