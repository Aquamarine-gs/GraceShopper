import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { getSingleProduct } from '../store/singleProduct';
import Card from 'react-bootstrap/Card';
import { Link, useParams } from 'react-router-dom';
import history from '../history';
import { toast, ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';

const styles = {
  card: {
    backgroundColor: '#B7E0F2',
    borderRadius: 50,
    padding: '1rem',
    margin: '10px',
  },
  cardImage: {
    objectFit: 'scale-down',
    borderRadius: 50,
    height: '250px',
  },
};

export const SingleProductCard = (props) => {
  const dispatch = useDispatch();
  const { imageUrl, name, price, category, id } = props.props;

  const { productId } = useParams();

  if (productId) {
    useEffect(() => {
      dispatch(getSingleProduct(productId));
    }, [productId]);
  }

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

  return (
    // <Card style={{ width: '18rem', margin: '10px' }}>
    <Card style={styles.card} className="singleProduct">
      <Link to={`/products/${id}`}>
        <Card.Img variant="top" src={imageUrl} style={styles.cardImage} />
      </Link>
      <Card.Body>
        <Link
          to={`/products/${id}`}
          style={{ textDecoration: 'none', color: 'black' }}>
          <Card.Title>{name}</Card.Title>
        </Link>
        <Card.Subtitle>{category}</Card.Subtitle>
        <Card.Text>{`$ ${price / 100} `}</Card.Text>
        <Button variant="primary" onClick={added}>
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default SingleProductCard;
