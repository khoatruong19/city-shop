import React, { useEffect, useState } from 'react';
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
import Favourites from './components/cart/Favourites';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import paymentApi from './api/paymentApi';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from './components/cart/Payment';
import PaymentSuccess from './components/cart/PaymentSuccess';
import MyOrder from './components/user/MyOrder';

function App() {
  const { isAuthenticated } = useAppSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState('');
  const dispatch = useAppDispatch();

  async function getStripeApiKey() {
    try {
      const { data } = await paymentApi.getApiKey();
      if (data) setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    });
    dispatch(me());
    getStripeApiKey();
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
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/order/confirm" element={<ConfirmOrder />} />
        <Route path="/orders" element={<MyOrder />} />
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
        {stripeApiKey && (
          <>
            <Route
              path="/process/payment"
              element={
                <ProtectedRoute>
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Payment />
                  </Elements>
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment/success"
              element={
                <ProtectedRoute>
                  <PaymentSuccess />
                </ProtectedRoute>
              }
            />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
