import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { getSingleProduct } from '../store/singleProduct';
import Card from 'react-bootstrap/Card';
import { Link, useParams } from 'react-router-dom';
import history from '../history';

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

  return (
    // <Card style={{ width: '18rem', margin: '10px' }}>
    <Card style={styles.card} className="singleProduct">
      <Card.Img variant="top" src={imageUrl} style={styles.cardImage} />
      <Card.Body>
        <Link
          to={`/products/${id}`}
          style={{ textDecoration: 'none', color: 'black' }}>
          <Card.Title>{name}</Card.Title>
        </Link>
        <Card.Subtitle>{category}</Card.Subtitle>
        <Card.Text>{`$ ${price / 100} `}</Card.Text>
        <Button variant="primary">Add to Cart</Button>
      </Card.Body>
    </Card>
  );
};

export default SingleProductCard;
