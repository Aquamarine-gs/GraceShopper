import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../store/products';
import { getCart } from '../store/cart';
import { SingleProductCard } from './SingleProductCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

export const AllProducts = () => {
  const dispatch = useDispatch();
  const { products, auth } = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCart(auth.token));
  }, []);

  return (
    <Container fluid>
      <Row xs={1} sm={2} md={3} lg={4} xl={5}>
        {products.map((product) => (
          <div key={product.id}>
            <Col>
              <SingleProductCard props={product} />
            </Col>
          </div>
        ))}
      </Row>
    </Container>
  );
};
