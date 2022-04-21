import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../store/auth';
import history from '../history';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const { auth } = useSelector((state) => state);

  useEffect(() => {
    if (auth && auth.id) {
      history.push('/');
    }
  }, [auth]);

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  return (
    <div>
      <h1>LoginPage</h1>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginPage;
