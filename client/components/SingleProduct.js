import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleProduct } from '../store/singleProduct';
import {
  Spinner,
  Figure,
  Button,
  Container,
  Stack,
  Col,
  Row,
} from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { SingleProductCard } from './SingleProductCard';

toast.configure();
export const SingleProduct = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => {
    return state;
  });

  let { productId } = useParams();

  useEffect(() => {}, [product]);

  useEffect(() => {
    dispatch(getSingleProduct(productId));
  }, []);

  const added = () => {
    injectStyle();
    toast.success('Added To Cart!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  if (product && product.name && product.similar) {
    return (
      <div>
        <Container fluid>
          <h2>{product.name}</h2>
          <Figure.Caption>{product.category}</Figure.Caption>
        </Container>
        <Col sm={3} className="m-auto">
          <Container fluid className="mt-5">
            <Figure>
              <Figure.Image
                width={171}
                height={180}
                alt="171x180"
                src={product.imageUrl}
              />
              <Stack direction="horizontal" gap={3}>
                <Figure.Caption>{product.description}</Figure.Caption>
                <DropdownButton id="dropdown-basic-button" title="Qty">
                  <a className="dropdown-item">1</a>
                  <a className="dropdown-item">2</a>
                  <a className="dropdown-item">3</a>
                  <a className="dropdown-item">4</a>
                  <a className="dropdown-item">5</a>
                </DropdownButton>
                <Stack>
                  <h5>${product.price / 100}</h5>
                  <Button variant="primary" onClick={added}>
                    Add To Cart
                  </Button>
                </Stack>
                <ToastContainer />
              </Stack>
            </Figure>
          </Container>
        </Col>
        <Container fluid>
          <h2>Other Great Products</h2>
          <Row xs={1} sm={2} md={3} lg={4} xl={product.similar.length - 1}>
            {product.similar.map((productMap) => {
              if (product.id !== productMap.id) {
                return (
                  <div key={productMap.id}>
                    <Col>
                      <SingleProductCard props={productMap} />
                    </Col>
                  </div>
                );
              }
            })}
          </Row>
        </Container>
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
