import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../store/products';
import { SingleProductCard } from './SingleProductCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

export const AllProducts = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <Container fluid>
      <Row xs={1} md={5}>
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
