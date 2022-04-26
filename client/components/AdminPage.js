import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { createProduct, getProducts, deleteProduct } from '../store/products';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { getAdmin } from '../store/admin';

const AdminPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    description: '',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0581/9138/0663/files/pokemart_logo_2_1200x1200.png',
    quantity: 0,
    category: '',
  });

  const { name, price, description, imageUrl, quantity, category } = formData;
  const [updated, setUpdated] = useState(false);
  const dispatch = useDispatch();

  const { auth, products, admin } = useSelector((state) => state);

  const onChange = (e) => {
    e.persist();
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    dispatch(getAdmin(auth));
    dispatch(getProducts());
  }, [auth]);

  if (admin === false) {
    return <h1>Get outta here!</h1>;
  }

  const deleteProductFunc = async (product) => {
    await dispatch(
      deleteProduct({
        token: auth.token,
        product,
      }),
    );
    setUpdated(!updated);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const productData = {
      name,
      price,
      description,
      imageUrl,
      quantity,
      category,
      token: auth.token,
    };

    dispatch(createProduct(productData));
  };

  // if (isAdmin && isAdmin.data === false) {
  //   return <h1>Get outta here!</h1>;
  // }

  return (
    <div>
      <h1>Admin Page</h1>
      <h3>Create new product</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Product Name"
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input type="number" name="price" value={price} onChange={onChange} />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            value={description}
            placeholder="Description"
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="imageUrl">Image Url</label>
          <input
            type="text"
            name="imageUrl"
            value={imageUrl}
            placeholder="imageUrl"
            onChange={onChange}
          />
        </div>
        <div>
          <div>
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={quantity}
              onChange={onChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            value={category}
            placeholder="Category"
            onChange={onChange}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <Row>
        <Col>Name</Col>
        <Col>Price</Col>
        <Col>Description</Col>
        <Col>Quantity</Col>
      </Row>
      <hr />

      {products && products.length ? (
        products.map((item) => {
          return (
            <Row key={item.id}>
              <Col xs={3}>{item && item.name ? item.name : 'no name'}</Col>
              <Col xs={2}>${(item.price / 100).toFixed(2)}</Col>
              <Col>{item.description}</Col>
              <Col xs={1}>{item.quantity}</Col>

              <Col xs={1}>
                <Button
                  variant="outline-primary"
                  onClick={() => deleteProductFunc(item)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash"
                    viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                    <path
                      filule="evenodd"
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                    />
                  </svg>
                </Button>
              </Col>
            </Row>
          );
        })
      ) : (
        <h3>There aren't any products</h3>
      )}
    </div>
  );
};

export default AdminPage;
