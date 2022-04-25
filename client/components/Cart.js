import React, { useEffect, useState } from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';

const cartItems = [
  { name: 'Potion', quantity: 2, price: 1199 },
  { name: 'Great Ball', quantity: 3, price: 1999 },
  { name: 'Hyper Potion', quantity: 2, price: 1199 },
];

const Cart = () => {
  const [subtotal, setSubtotal] = useState(0);
  return (
    <Container>
      <h1>Checkout</h1>
      <Row>
        <Col>Items</Col>
        <Col>Quantity</Col>
        <Col>Price</Col>
      </Row>
      {cartItems ? (
        cartItems.map((item) => {
          const [quant, setQuant] = useState(item.quantity);
          if (quant < 1) return;
          setSubtotal((quant * item.price) / 100);
          return (
            <Row key={item.name}>
              <Col>{item.name}</Col>
              <Col>
                <button onClick={() => setQuant(quant - 1)}>-</button>
                {quant}
                <button onClick={() => setQuant(quant + 1)}>+</button>
              </Col>
              <Col>{(quant * item.price) / 100}</Col>
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
          {subtotal}
          {/* {cartItems.reduce((previousValue, currentValue) => {
            return (
              previousValue + (currentValue.quantity * currentValue.price) / 100
            );
          }, 0)} */}
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
