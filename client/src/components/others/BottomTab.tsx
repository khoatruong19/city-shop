import {
  Bars3Icon,
  HeartIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import {
  HomeIcon,
  ShoppingCartIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import { Box, Group } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store';
import { mainOrangeColor, smallScreenQuery } from '../../utils/constants';

const BottomTab = () => {
  const cartItemsCount = useAppSelector((state) => state.cart.cartItems).length;
  const mobileScreen = useMediaQuery(smallScreenQuery);
  const favouriteItemsCount = useAppSelector(
    (state) => state.favourite.favouriteItems
  ).length;
  return (
    <Group
      sx={{
        position: 'fixed',
        bottom: 0,
        left: mobileScreen ? 0 : '50%',
        translate: mobileScreen ? '' : '-50% 0',
        width: mobileScreen ? '100%' : '60%',
        backgroundColor: 'white',
        zIndex: 99,
        justifyContent: 'space-around',
        alignItems: 'center',
        boxShadow: '0 0px 3px 0 lightgray',
      }}
    >
      <Link to="/">
        <Group
          px={5}
          py={10}
          sx={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <HomeIcon className="navIcon hover" />
        </Group>
      </Link>
      <Link to="/search">
        <Group
          px={5}
          py={10}
          sx={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <MagnifyingGlassIcon className="navIcon hover" />
        </Group>
      </Link>
      <Link to="/cart">
        <Group
          px={5}
          py={10}
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <ShoppingCartIcon className="navIcon hover" />
          <Box
            sx={{
              position: 'absolute',
              top: '4px',
              right: '-3px',
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
        </Group>
      </Link>
      <Link to="/favourites">
        <Group
          px={5}
          py={10}
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <HeartIcon className="navIcon hover" />
          <Box
            sx={{
              position: 'absolute',
              top: '4px',
              right: '-3px',
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
        </Group>
      </Link>
      <Link to="/me">
        <Group
          px={5}
          py={10}
          sx={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <UserIcon className="navIcon hover" />
        </Group>
      </Link>

      <Link to="/more">
        <Group
          px={5}
          py={10}
          sx={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <Bars3Icon className="navIcon hover" />
        </Group>
      </Link>
    </Group>
  );
};

export default BottomTab;
