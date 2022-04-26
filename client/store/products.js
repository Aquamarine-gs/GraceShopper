import axios from 'axios';

const GET_PRODUCTS = 'GET_PRODUCTS';
const CREATE_PRODUCT = 'CREATE_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const initialState = [];

export const actionGetProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products,
  };
};

export const actionCreateProduct = (product) => {
  return {
    type: CREATE_PRODUCT,
    product,
  };
};

export const actionDeleteProduct = (product) => {
  return {
    type: DELETE_PRODUCT,
    product,
  };
};

export const actionUpdateProduct = (product) => {
  return {
    type: UPDATE_PRODUCT,
    product,
  };
};

export const getProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/products');
      dispatch(actionGetProducts(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createProduct = (product) => {
  return async (dispatch) => {
    try {
      const { data: created } = await axios.post('/api/products', product);
      dispatch(actionCreateProduct(created));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteProduct = (data) => {
  return async (dispatch) => {
    try {
      const { token, product } = data;
      const { data: toBeDeleted } = await axios.delete(
        `/api/products/${product.id}/${token}`,
      );
      dispatch(actionDeleteProduct(toBeDeleted));
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateProduct = (product) => {
  return async (dispatch) => {
    try {
      const { data: update } = await axios.put(
        `/api/products/${product.id}`,
        product,
      );
      dispatch(actionUpdateProduct(update));
    } catch (error) {
      console.log(error);
    }
  };
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return [...action.products];
    case CREATE_PRODUCT:
      return [...state, action.product];
    case DELETE_PRODUCT:
      return state.filter((product) => product.id !== action.product.id);
    case UPDATE_PRODUCT:
      return state.map((product) =>
        product.id === action.product.id ? action.product : product,
      );

    default:
      return state;
  }
}
