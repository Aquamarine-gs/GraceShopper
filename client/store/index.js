import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './auth';
import productsReducer from './products';
import singleProductReducer from './singleProduct';
import cartReducer from './cart';
import adminReducer from './admin';

const reducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  product: singleProductReducer,
  cart: cartReducer,
  admin: adminReducer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true })),
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
