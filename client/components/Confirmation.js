import React from 'react';
import { Link } from 'react-router-dom';

export const Confirmation = () => {
  return (
    <div>
      <h1>CONFIRMATION</h1>
      <h2>PURCHASE SUCCESSFUL!</h2>
      <p>Your receipt has been emailed to you.</p>
      <img src="https://perdidointranslation.files.wordpress.com/2016/07/pokemon-happy.gif" />
      <br />
      <Link to>Back to Home Page</Link>
    </div>
  );
};
