import React, { useState } from 'react';
import {
  HomeIcon,
  ClipboardDocumentIcon,
  ShoppingCartIcon,
  HeartIcon,
  UserIcon,
  FlagIcon,
  ArrowRightOnRectangleIcon,
  ChartBarIcon,
} from '@heroicons/react/24/solid';
import { useAppDispatch, useAppSelector } from '../../store';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/userSlice';
import toaster from '../../utils/helpers/toaster';
import { Box, Image, Overlay, Stack, Tooltip } from '@mantine/core';

const UserNav = () => {
  const { user } = useAppSelector((state) => state.user);
  const cartItems = [];
  const favouriteItems = [];
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [visible, setVisible] = useState(false);

  const options = [
    { icon: <HomeIcon className="navIcon" />, name: 'Home', func: home },
    {
      icon: <ClipboardDocumentIcon className="navIcon" />,
      name: 'Orders',
      func: orders,
    },
    {
      icon: (
        <ShoppingCartIcon
          className="navIcon"
          style={{
            color: cartItems.length === 0 ? '' : 'tomato',
          }}
        />
      ),
      name: `Cart (${cartItems.length})`,
      func: cart,
    },
    {
      icon: (
        <HeartIcon
          className="navIcon"
          style={{
            color: favouriteItems.length === 0 ? '' : 'tomato',
          }}
        />
      ),
      name: `Favourite (${favouriteItems.length})`,
      func: favourite,
    },
    { icon: <UserIcon className="navIcon" />, name: 'Profile', func: account },
    { icon: <FlagIcon className="navIcon" />, name: 'Report us', func: report },
    {
      icon: <ArrowRightOnRectangleIcon className="navIcon" />,
      name: 'Logout',
      func: logoutUser,
    },
  ];

  if (user?.role === 'admin') {
    options.unshift({
      icon: <ChartBarIcon className="navIcon" />,
      name: 'Dashboard',
      func: dashboard,
    });
  }
  if (user?.role === 'creator') {
    options.unshift({
      icon: <ChartBarIcon className="navIcon" />,
      name: 'Dashboard',
      func: dashboard,
    });
  }

  function dashboard() {
    navigate('/dashboard');
  }
  function home() {
    navigate('/');
  }
  function orders() {
    navigate('/orders');
  }
  function cart() {
    navigate('/cart');
  }
  function favourite() {
    navigate('/favourites');
  }
  function account() {
    navigate('/me');
  }

  function report() {
    navigate('/support');
  }

  function logoutUser() {
    dispatch(logout());
    toaster({
      id: 'user-logout',
      message: 'Logout Successfully',
      success: true,
    });
  }
  return (
    <>
      <Box
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        sx={{
          position: 'fixed',
          right: '1rem',
          top: '12rem',
          zIndex: 30,
          padding: '1rem',
        }}
      >
        <Image
          alt={''}
          src="https://portfolio2022-liart.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdzo2rkafy%2Fimage%2Fupload%2Fv1664178702%2Fuploads%2Fefm4idlsz9hovrxywlgb.jpg&w=2048&q=75"
          width={50}
          height={50}
          sx={{ borderRadius: '50%', overflow: 'hidden', cursor: 'pointer' }}
        />
        <Stack mt={20}>
          {visible &&
            options.map((item) => (
              <Tooltip key={item.name} position="left" label={item.name}>
                <Stack
                  sx={{
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '50%',
                    background: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'gray',
                    '&:hover': {
                      opacity: 0.8,
                    },
                  }}
                  onClick={item.func}
                >
                  {item.icon}
                </Stack>
              </Tooltip>
            ))}
        </Stack>
      </Box>
      {visible && (
        <Box
          sx={{
            position: 'fixed',
            right: 0,
            top: 0,
            height: '100vh',
            width: '100vw',
            zIndex: 20,
          }}
        >
          <Overlay opacity={0.6} color="#000" zIndex={20} />
        </Box>
      )}
    </>
  );
};

export default UserNav;