import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

const ErrorPage = () => {
  return (
    <Container className="text-center">
      <div>
        <h1>Page Not Found</h1>

        <img
          width="500"
          height="500"
          src="https://cdn.vox-cdn.com/thumbor/He_VVk5IhW5UI0w8RciuhRgIfjc=/0x15:500x348/1400x1400/filters:focal(0x15:500x348):format(gif)/cdn.vox-cdn.com/uploads/chorus_image/image/36992002/tumblr_lmwsamrrxT1qagx30.0.0.gif"
        />
        <br />
        <Link to="/">Click here to return to Home Page</Link>
      </div>
    </Container>
  );
};

export default ErrorPage;
