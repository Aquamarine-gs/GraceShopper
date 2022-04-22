import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import history from '../history';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';

const NavbarComponent = ({ handleClick, isLoggedIn }) => {
  const { auth } = useSelector((state) => state);
  return (
    <Navbar bg="light">
      <Navbar.Brand href="/">
        <img id="logo" src="../images/logo/pokemart.png" />
      </Navbar.Brand>
      <Container className="navbar-right">
        {isLoggedIn ? (
          <Nav>
            <Navbar.Text>Welcome {auth.firstName}!</Navbar.Text>
            <Nav.Link href="/" onClick={handleClick}>
              Sign Out
            </Nav.Link>
          </Nav>
        ) : (
          <Nav>
            <Navbar.Text>Welcome Guest!</Navbar.Text>
            <NavDropdown title="LOGIN" id="navbarScrollingDropdown">
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
            </NavDropdown>
          </Nav>
        )}
        {/* need to change cart link */}
        <Nav>
          <Nav.Link href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              className="bi bi-cart-fill"
              viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
            CART
          </Nav.Link>
        </Nav>
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
