import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

const Confirmation = () => {
  return (
    <Container className="text-center">
      <div>
        <h1>CONFIRMATION</h1>
        <h2>PURCHASE SUCCESSFUL!</h2>
        <p>Your receipt has been emailed to you.</p>
        <img src="https://perdidointranslation.files.wordpress.com/2016/07/pokemon-happy.gif" />
        <br />
        <Link to="/">Back to Home Page</Link>
      </div>
    </Container>
  );
};

export default Confirmation;
