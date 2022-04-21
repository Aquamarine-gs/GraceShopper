import React from 'react';

import Navbar from './components/Navbar';
import Routes from './Routes';
import { AllProducts } from './components/AllProducts';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div>
      <Navbar />
      <AllProducts />
      <Routes />
    </div>
  );
};

export default App;
