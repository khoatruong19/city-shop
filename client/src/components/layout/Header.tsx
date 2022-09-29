import React from 'react';
import Logo from '../../images/logo.png';
import { Image, Group, Stack, Text } from '@mantine/core';
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

const Header = () => {
  return (
    <Stack
      spacing={40}
      style={{ padding: '10px 5px 5px', borderBottom: '1px solid lightgray' }}
    >
      <Group style={{ justifyContent: 'space-between' }}>
        <Link to="/">
          <Image
            width={90}
            style={{ scale: '1.5', marginLeft: '3rem', cursor: 'poniyer' }}
            alt=""
            src={Logo}
          />
        </Link>

        <div
          style={{
            backgroundColor: 'orangered',
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
      <Group pl={30} style={{ justifyContent: 'space-between' }}>
        <NavLinks />
        <Group spacing={'lg'}>
          <MagnifyingGlassIcon className="navIcon" />
          <HeartIcon className="navIcon" />
          <ShoppingCartIcon className="navIcon" />
          <UserIcon className="navIcon" />
        </Group>
      </Group>
    </Stack>
  );
};

export default Header;
