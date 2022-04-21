import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getSingleProduct from '../store/singleProduct';

export const SingleProduct = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => {
    return state;
  });
  useEffect(() => {
    dispatch(getSingleProduct());
  }, []);
  return (
    <div>
      <h1>{product.name}</h1>
    </div>
  );
};
