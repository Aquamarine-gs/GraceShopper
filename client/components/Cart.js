import React, { useEffect, useState } from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../store/products';
import { getCart, updateCart, completePurchase } from '../store/cart';
import history from '../history';
import { toast, ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';

const Cart = () => {
  toast.configure();

  const dispatch = useDispatch();
  const [updated, setUpdated] = useState(false);
  const { cart, auth } = useSelector((state) => {
    return state;
  });
  const [formData, setFormData] = useState({
    creditCard: '',
    expiration: '',
    code: '',
    street: '',
    city: '',
    state: '',
    zip: '',
  });

  const { creditCard, expiration, code, street, city, state, zip } = formData;

  const whatever = async () => {
    await dispatch(getProducts());
    await dispatch(getCart(auth.token));
  };
  useEffect(() => {
    whatever();
  }, [updated]);

  const onChange = (e) => {
    e.persist();
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const add = async (product) => {
    await dispatch(
      updateCart({
        token: auth.token,
        productId: product.productId,
        updatedQuantity: 1,
        unitPrice: product.unitPrice,
      }),
    );
    setUpdated(!updated);
  };

  const minus = async (product) => {
    await dispatch(
      updateCart({
        token: auth.token,
        productId: product.productId,
        updatedQuantity: -1,
        unitPrice: product.unitPrice,
      }),
    );
    setUpdated(!updated);
  };

  const deleteAll = async (product) => {
    await dispatch(
      updateCart({
        token: auth.token,
        productId: product.productId,
        updatedQuantity: -1000,
        unitPrice: product.unitPrice,
      }),
    );
    setUpdated(!updated);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    injectStyle();
    if (!cart || cart.length < 1) {
      toast.error("There aren't any items in your cart!", {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    const userData = {
      creditCard,
      expiration,
      code,
      street,
      city,
      state,
      zip,
    };
    dispatch(completePurchase({ token: auth.token }));
    history.push('/confirm');
  };
  return (
    <Container>
      <h1>Checkout</h1>
      <Row>
        <Col>Items</Col>
        <Col>Quantity</Col>
        <Col>Price</Col>
      </Row>

      {cart && cart.length ? (
        cart.map((item) => {
          return (
            <Row key={item.productId}>
              <Col>{item && item.product ? item.product.name : 'no name'}</Col>
              <Col>
                <button onClick={() => minus(item)}>-</button>
                {item.quantity}
                <button onClick={() => add(item)}>+</button>
                <button onClick={() => deleteAll(item)}>Trash</button>
              </Col>
              <Col>${(item.totalPrice / 100).toFixed(2)}</Col>
            </Row>
          );
        })
      ) : (
        <h3>There aren't any items in your cart</h3>
      )}
      <hr />
      <Row>
        <Col>Subtotal:</Col>
        <Col></Col>
        <Col>
          $
          {cart
            .reduce((previousValue, currentValue) => {
              return previousValue + currentValue.totalPrice / 100;
            }, 0)
            .toFixed(2)}
        </Col>
      </Row>
      <hr />
      <Row>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="creditCard">Credit Card Number</label>
            <input
              type="text"
              required
              name="creditCard"
              value={creditCard}
              placeholder="Credit Card Number"
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor="expiration">Expiration Date</label>
            <input
              type="month"
              required
              name="expiration"
              value={expiration}
              placeholder="Expiration Date"
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor="code">Pin Code</label>
            <input
              type="number"
              required
              min="0000"
              max="9999"
              name="code"
              value={code}
              placeholder="Code"
              onChange={onChange}
            />
          </div>

          <div>
            <label htmlFor="street">Street</label>
            <input
              type="text"
              required
              name="street"
              value={auth && auth.street ? auth.street : street}
              placeholder="Street Address"
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input
              type="text"
              required
              name="city"
              value={auth && auth.city ? auth.city : city}
              placeholder="City"
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <input
              type="text"
              required
              name="state"
              value={auth && auth.state ? auth.state : state}
              placeholder="State"
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor="zip">Zip Code</label>
            <input
              type="text"
              required
              name="zip"
              value={auth && auth.zip ? auth.zip : zip}
              placeholder="Zip Code"
              onChange={onChange}
            />
          </div>
          <div>
            <button type="submit">Complete Purchase!</button>
          </div>
        </form>
      </Row>
    </Container>
  );
};

export default Cart;
