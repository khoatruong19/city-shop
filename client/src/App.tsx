import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import WebFont from 'webfontloader';
import paymentApi from './api/paymentApi';
import About from './components/about/About';
import AllOrders from './components/admin/AllOrders';
import AllProducts from './components/admin/AllProducts';
import AllReviews from './components/admin/AllReviews';
import AllUsers from './components/admin/AllUsers';
import CreateProduct from './components/admin/CreateProduct';
import Dashboard from './components/admin/Dashboard';
import EditProduct from './components/admin/EditProduct';
import UpdateOrder from './components/admin/UpdateOrder';
import UpdateUser from './components/admin/UpdateUser';
import Auth from './components/auth/Auth';
import Cart from './components/cart/Cart';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Favourites from './components/cart/Favourites';
import Payment from './components/cart/Payment';
import PaymentSuccess from './components/cart/PaymentSuccess';
import Shipping from './components/cart/Shipping';
import Home from './components/home/Home';
import CommingSoon from './components/others/CommingSoon';
import NotFound from './components/others/NotFound';
import ProductDetails from './components/product/ProductDetails';
import Products from './components/product/Products';
import Search from './components/product/Search';
import ProtectedRoute from './components/route/ProtectedRoute';
import Support from './components/support/Support';
import EditProfile from './components/user/EditProfile';
import ForgotPassword from './components/user/ForgotPassword';
import MoreOptions from './components/user/MoreOptions';
import MyOrder from './components/user/MyOrder';
import Profile from './components/user/Profile';
import ResetPassword from './components/user/ResetPassword';
import UpdatePassword from './components/user/UpdatePassword';
import UserNav from './components/user/UserNav';
import { useAppDispatch, useAppSelector } from './store';
import { me } from './store/slices/userSlice';

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
    isAuthenticated && getStripeApiKey();
  }, [dispatch, isAuthenticated]);

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
        <Route path="/more" element={<MoreOptions />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/commingsoon" element={<CommingSoon />} />
        <Route path="/offers" element={<CommingSoon />} />
        <Route path="/creater" element={<CommingSoon />} />
        <Route path="/faq" element={<CommingSoon />} />
        <Route path="*" element={<NotFound />} />
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
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAdmin>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute isAdmin>
              <AllProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/product"
          element={
            <ProtectedRoute isAdmin>
              <CreateProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/edit/product/:id"
          element={
            <ProtectedRoute isAdmin>
              <EditProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute isAdmin>
              <AllOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/edit/order/:id"
          element={
            <ProtectedRoute isAdmin>
              <UpdateOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute isAdmin>
              <AllUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/edit/user/:id"
          element={
            <ProtectedRoute isAdmin>
              <UpdateUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reviews"
          element={
            <ProtectedRoute isAdmin>
              <AllReviews />
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
