import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

export const Footer = () => {
  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand>POKÉ MART </Navbar.Brand>
        <Navbar.Text>1234 Pokemart Dr</Navbar.Text>
        <Navbar.Text>Phone: 123-123-1234</Navbar.Text>
        <Navbar.Text>Email: support@pokemart.com</Navbar.Text>
      </Container>
    </Navbar>
  );
};
