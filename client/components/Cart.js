import React, { useEffect, useState } from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../store/products';
import { getCart, updateCart } from '../store/cart';

const Cart = () => {
  const dispatch = useDispatch();
  const [updated, setUpdated] = useState(false);
  const { products, cart, auth } = useSelector((state) => {
    return state;
  });
  const whatever = async () => {
    await dispatch(getProducts());
    await dispatch(getCart(auth.token));
  };
  useEffect(() => {
    whatever();
  }, [updated]);

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

  return (
    <Container>
      <h1>Checkout</h1>
      <Row>
        <Col>Items</Col>
        <Col>Quantity</Col>
        <Col>Price</Col>
      </Row>

      {cart ? (
        cart.map((item) => {
          return (
            <Row key={item.productId}>
              <Col>{item && item.product ? item.product.name : 'no name'}</Col>
              <Col>
                <button onClick={() => minus(item)}>-</button>
                {item.quantity}
                <button onClick={() => add(item)}>+</button>
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
        <Col>
          $
          {cart
            .reduce((previousValue, currentValue) => {
              return previousValue + currentValue.totalPrice / 100;
            }, 0)
            .toFixed(2)}
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
