import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleProduct } from '../store/singleProduct';
import { Spinner } from 'react-bootstrap';

export const SingleProduct = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => {
    return state;
  });
  let { productId } = useParams();
  useEffect(() => {
    dispatch(getSingleProduct(productId));
  }, []);

  if (product && product.name) {
    return (
      <div>
        <h1>{product.name}</h1>
      </div>
    );
  } else {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
};
