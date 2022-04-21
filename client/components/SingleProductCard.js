import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

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
  const { imageUrl, name, price, category } = props.props;

  return (
    // <Card style={{ width: '18rem', margin: '10px' }}>
    <Card style={styles.card} className="singleProduct">
      <Card.Img variant="top" src={imageUrl} style={styles.cardImage} />
      <Card.Body>
        <Card.Title>
          <b>{name}</b>
        </Card.Title>
        <Card.Subtitle>{category}</Card.Subtitle>
        <Card.Text>{`$ ${price / 100} `}</Card.Text>
        <Button variant="primary">Add to Cart</Button>
      </Card.Body>
    </Card>
  );
};
