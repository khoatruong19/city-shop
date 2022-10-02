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
import { mainOrangeColor } from '../../utils/constants';

const Header = () => {
  const navRef = useRef<HTMLDivElement>(null);
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
      <Group style={{ justifyContent: 'space-between' }}>
        <Link to="/">
          <Image
            width={90}
            style={{ scale: '1.5', marginLeft: '3rem', cursor: 'pointer' }}
            alt=""
            src={Logo}
          />
        </Link>

        <div
          style={{
            backgroundColor: mainOrangeColor,
            width: '40vw',
            overflow: 'hidden',
            color: 'white',
            padding: '5px',
            fontFamily: 'Droid Sans',
          }}
        >
          <MovingText text="Welcome to our shop... You can find anything in here as your favourites..." />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <EnvelopeIcon width={20} height={20} />
          <Text mx={3}>Email:</Text>
          <Text>khoa.truongthdk@hcmut.edu.vn</Text>
        </div>
      </Group>
      <Group
        pl={30}
        py={20}
        style={{ justifyContent: 'space-between' }}
        ref={navRef}
      >
        <NavLinks />
        <Group spacing={'lg'}>
          <MagnifyingGlassIcon className="navIcon" />
          <Box sx={{ position: 'relative' }}>
            <HeartIcon className="navIcon" />
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
              2
            </Box>
          </Box>
          <Box sx={{ position: 'relative' }}>
            <ShoppingCartIcon className="navIcon" />
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
              2
            </Box>
          </Box>
          <UserIcon className="navIcon" />
        </Group>
      </Group>
    </Stack>
  );
};

export default Header;
