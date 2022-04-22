import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import history from '../history';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';

const NavbarComponent = ({ handleClick, isLoggedIn }) => {
  return (
    <Navbar bg="light">
      <Navbar.Brand href="/">
        <img id="logo" src="../images/logo/pokemart.png" />
      </Navbar.Brand>
      <Container className="col-md-4">
        {isLoggedIn ? (
          <Nav.Link href="/" onClick={handleClick}>
            Sign Out
          </Nav.Link>
        ) : (
          <NavDropdown title="Login" id="navbarScrollingDropdown">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signup">Sign Up</Nav.Link>
          </NavDropdown>
        )}
        {/* need to change cart link */}
        <Nav.Link href="/">Cart</Nav.Link>
      </Container>
    </Navbar>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
      history.push('/');
    },
  };
};

export default connect(mapState, mapDispatch)(NavbarComponent);
