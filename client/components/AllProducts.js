import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../store/products';

export const AllProducts = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => {
    return state;
  });
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};
