import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import history from '../history';
import { register } from '../store/auth';

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
    <div>
      <h1>Sign up</h1>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            name="firstName"
            value={firstName}
            placeholder="First Name"
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="lastName"
            value={lastName}
            placeholder="Last Name"
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email Address"
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type="password"
            name="password2"
            value={password2}
            placeholder="Confirm Password"
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="street"
            value={street}
            placeholder="Street Address"
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="city"
            value={city}
            placeholder="City"
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="state"
            value={state}
            placeholder="State"
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="zip"
            value={zip}
            placeholder="Zip Code"
            onChange={onChange}
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
