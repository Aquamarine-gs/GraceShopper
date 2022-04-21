import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const { auth } = useSelector((state) => state);

  if (auth && auth.id) {
    return (
      <div>
        <h1>Welcome, {auth.firstName}</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Welcome, please log in</h1>
      </div>
    );
  }
};

export default Home;
