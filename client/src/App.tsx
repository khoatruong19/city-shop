import React, { useEffect } from 'react';
import Home from './components/home/Home';
import WebFont from 'webfontloader';
import { Route, Routes } from 'react-router-dom';
import ProductDetails from './components/product/ProductDetails';
import Auth from './components/auth/Auth';

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    });
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
