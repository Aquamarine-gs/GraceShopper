import React from 'react';

import NavbarComponent from './components/Navbar';
import { Footer } from './components/Footer';
import Routes from './Routes';
import { AllProducts } from './components/AllProducts';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div>
      <NavbarComponent />
      <Routes />
      <Footer />
    </div>
  );
};

export default App;
