import React from 'react';

import Navbar from './components/Navbar';
import Routes from './Routes';
import { AllProducts } from './components/AllProducts';

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
