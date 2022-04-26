import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import history from '../history';
import { register } from '../store/auth';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
    street: '',
    city: '',
    state: '',
    zip: '',
  });

  const {
    firstName,
    lastName,
    email,
    password,
    password2,
    street,
    city,
    state,
    zip,
  } = formData;

  const dispatch = useDispatch();

  const { auth } = useSelector((state) => state);

  useEffect(() => {
    if (auth && auth.id) {
      history.push('/');
    }
  }, [auth]);

  const onChange = (e) => {
    e.persist();
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      console.error('Passwords do not match');
    } else {
      const userData = {
        firstName,
        lastName,
        email,
        password,
        street,
        city,
        state,
        zip,
      };

      dispatch(register(userData));
    }
  };

  return (
    <Form className="text-center" onSubmit={onSubmit}>
      <h1>Sign up</h1>
      <hr />
      <Row>
        <Col>
          <Form.Label>First Name </Form.Label>

          <Form.Control
            name="firstName"
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={onChange}
          />
        </Col>
        <Col>
          <Form.Label>Last Name</Form.Label>

          <Form.Control
            name="lastName"
            placeholder="Last name"
            type="text"
            value={lastName}
            onChange={onChange}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridPassword2">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            name="password2"
            type="password"
            placeholder="Password"
            value={password2}
            onChange={onChange}
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control
            name="street"
            placeholder="1234 Main St"
            value={street}
            onChange={onChange}
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            name="city"
            type="text"
            value={city}
            placeholder="City"
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            name="state"
            value={state}
            placeholder="State"
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Zip</Form.Label>
          <Form.Control
            name="zip"
            type="text"
            value={zip}
            placeholder="Zip Code"
            onChange={onChange}
          />
        </Form.Group>
      </Row>

      <Button variant="primary" type="submit">
        Register
      </Button>
      <Row></Row>
    </Form>
  );
};

export default SignupPage;
