import React, { useEffect } from 'react';
import Home from './components/home/Home';
import WebFont from 'webfontloader';
import { Route, Routes } from 'react-router-dom';
import ProductDetails from './components/product/ProductDetails';
import Auth from './components/auth/Auth';
import { useAppDispatch, useAppSelector } from './store';
import { me } from './store/slices/userSlice';
import UserNav from './components/user/UserNav';
import ProtectedRoute from './components/route/ProtectedRoute';
import Profile from './components/user/Profile';
import UpdatePassword from './components/user/UpdatePassword';
import EditProfile from './components/user/EditProfile';
import About from './components/about/About';
import Products from './components/product/Products';
import Search from './components/product/Search';
import Support from './components/support/Support';
import Cart from './components/cart/Cart';

function App() {
  const { isAuthenticated } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    });
    dispatch(me());
  }, []);
  return (
    <div className="App">
      {isAuthenticated && <UserNav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/support" element={<Support />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/me"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/me/update-password"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/me/update-profile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
