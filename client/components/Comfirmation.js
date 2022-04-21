import React from 'react';
import { Link } from 'react-router-dom';

export const Comfirmation = () => {
  return (
    <div>
      <h1>COMFIRMATION</h1>
      <h2>PURCHASE SUCCESSFUL!</h2>
      <p>Your receipt has been emailed to you</p>
      <img src="https://perdidointranslation.files.wordpress.com/2016/07/pokemon-happy.gif" />
      <br />
      <Link>Back to Home Page</Link>
    </div>
  );
};
