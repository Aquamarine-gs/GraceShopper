import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../store/products';
import { SingleProductCard } from './SingleProductCard';

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
      {products.map((product) => (
        <div key={product.id}>
          <SingleProductCard props={product} />
        </div>
      ))}
    </div>
  );
};
