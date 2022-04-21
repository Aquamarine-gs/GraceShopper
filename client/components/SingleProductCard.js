import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const SingleProductCard = (props) => {
  console.log(props.props.imageUrl);

  const { imageUrl, name, price, category } = props.props;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{category}</Card.Text>
        <Card.Text>{price}</Card.Text>
        <Button variant="primary">Add to Cart</Button>
      </Card.Body>
    </Card>
  );
};
