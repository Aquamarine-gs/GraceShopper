import React, { useEffect, useState } from 'react';
import { Button, Container, Col, Row, Form } from 'react-bootstrap';
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
        <Col xs={3}>Items</Col>
        <Col xs={2}>Unit Price</Col>
        <Col xs={1} />
        <Col xs={3}>Quantity</Col>
        <Col xs={1}>Price</Col>
      </Row>
      <hr />
      {cart && cart.length ? (
        cart.map((item) => {
          return (
            <Row key={item.productId}>
              <Col xs={3}>
                {item && item.product ? item.product.name : 'no name'}
              </Col>
              <Col xs={2}>${(item.unitPrice / 100).toFixed(2)}</Col>
              <Col xs={1}>
                <Button variant="outline-primary" onClick={() => minus(item)}>
                  -
                </Button>
              </Col>
              <Col xs={1}>{item.quantity}</Col>
              <Col xs={1}>
                <Button variant="outline-primary" onClick={() => add(item)}>
                  +
                </Button>
              </Col>
              <Col xs={1}>
                <Button
                  variant="outline-primary"
                  onClick={() => deleteAll(item)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-trash"
                    viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                    <path
                      fill-rule="evenodd"
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                    />
                  </svg>
                </Button>
              </Col>

              <Col xs={1}>${(item.totalPrice / 100).toFixed(2)}</Col>
            </Row>
          );
        })
      ) : (
        <h3>There aren't any items in your cart</h3>
      )}
      <hr />
      <Row>
        <Col xs={9}>Subtotal:</Col>
        <Col xs={1}>
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
