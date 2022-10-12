import React, { useRef } from 'react';
import Logo from '../../images/logo.png';
import { Image, Group, Stack, Text, Box } from '@mantine/core';
import {
  MagnifyingGlassIcon,
  HeartIcon,
  ShoppingCartIcon,
  UserIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import NavLinks from '../home/NavLinks';
import MovingText from '../home/MovingText';
import { Link } from 'react-router-dom';
import {
  largeScreenQuery,
  mainOrangeColor,
  smallScreenQuery,
} from '../../utils/constants';
import { useAppSelector } from '../../store';
import { useMediaQuery } from '@mantine/hooks';

const Header = () => {
  const cartItemsCount = useAppSelector((state) => state.cart.cartItems).length;
  const favouriteItemsCount = useAppSelector(
    (state) => state.favourite.favouriteItems
  ).length;
  const navRef = useRef<HTMLDivElement>(null);
  const largeScreen = useMediaQuery(largeScreenQuery);
  const mobileScreen = useMediaQuery(smallScreenQuery);

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
      navRef.current?.classList.add('navActive');
    } else {
      navRef.current?.classList.remove('navActive');
    }
  });
  return (
    <Stack
      spacing={20}
      style={{ padding: '10px 5px 5px', borderBottom: '1px solid lightgray' }}
    >
      <Group
        style={{ justifyContent: !mobileScreen ? 'space-between' : 'center' }}
      >
        <Link to="/">
          <Image
            width={90}
            style={{
              scale: '1.5',
              marginLeft: !mobileScreen ? '3rem' : '',
              cursor: 'pointer',
            }}
            alt=""
            src={Logo}
          />
        </Link>

        {!mobileScreen && (
          <div
            style={{
              backgroundColor: mainOrangeColor,
              overflow: 'hidden',
              color: 'white',
              padding: '5px',
              fontFamily: 'Droid Sans',
            }}
          >
            <MovingText text="Welcome to our shop... You can find anything in here as your favourites..." />
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <EnvelopeIcon width={20} height={20} />
          <Text mx={3}>Email:</Text>
          <Text>khoa.truongthdk@hcmut.edu.vn</Text>
        </div>
      </Group>
      {!mobileScreen && (
        <Group
          px={30}
          py={20}
          style={{ justifyContent: 'space-between' }}
          ref={navRef}
        >
          <NavLinks />
          <Group
            spacing={'lg'}
            sx={{
              width: !largeScreen ? '100%' : '',
              justifyContent: !largeScreen ? 'center' : '',
            }}
          >
            <Link to={'/search'}>
              <MagnifyingGlassIcon className="navIcon linkHover" />
            </Link>
            <Link to="/favourites">
              <Box sx={{ position: 'relative' }}>
                <HeartIcon className="navIcon linkHover" />
                <Box
                  sx={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-8px',
                    textAlign: 'center',
                    width: '1.3rem',
                    height: '1.3rem',
                    borderRadius: '50%',
                    backgroundColor: mainOrangeColor,
                    color: 'white',
                  }}
                >
                  {favouriteItemsCount}
                </Box>
              </Box>
            </Link>
            <Link to="/cart">
              <Box sx={{ position: 'relative' }}>
                <ShoppingCartIcon className="navIcon linkHover" />
                <Box
                  sx={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-8px',
                    textAlign: 'center',
                    width: '1.3rem',
                    height: '1.3rem',
                    borderRadius: '50%',
                    backgroundColor: mainOrangeColor,
                    color: 'white',
                  }}
                >
                  {cartItemsCount}
                </Box>
              </Box>
            </Link>
            <UserIcon className="navIcon linkHover" />
          </Group>
        </Group>
      )}
    </Stack>
  );
};

export default Header;
