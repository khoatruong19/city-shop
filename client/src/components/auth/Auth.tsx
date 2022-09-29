import { Box, Container, Group, Image } from '@mantine/core';
import React, { useState } from 'react';
import MetaData from '../layout/MetaData';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const Auth = () => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  return (
    <>
      <MetaData title="Authentication" />
      <Container
        sx={{
          display: 'flex',
          width: '100vw',
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5rem',
        }}
      >
        <Image
          src="https://litextension.com/wp-content/themes/yootheme/cache/1.1-645c9556.png"
          alt=""
        />
        <Box
          sx={{
            flex: 1,
            height: '50vh',
            padding: '0.5rem 2rem',
            boxShadow: '0px 0px 15px gray',
            borderRadius: '10px',
          }}
        >
          <Box
            sx={{
              height: '12%',
              display: 'flex',
              marginBottom: '2rem',
              fontWeight: 600,
            }}
          >
            <Group
              sx={{
                flex: 1,
                justifyContent: 'center',
                cursor: 'pointer',
                borderBottom: authMode === 'login' ? '4px solid #1C7ED6' : '',
              }}
              onClick={() => setAuthMode('login')}
            >
              LOGIN
            </Group>
            <Group
              sx={{
                flex: 1,
                justifyContent: 'center',
                cursor: 'pointer',
                borderBottom: authMode === 'signup' ? '4px solid #1C7ED6' : '',
              }}
              onClick={() => setAuthMode('signup')}
            >
              REGISTER
            </Group>
          </Box>
          {authMode === 'login' ? <LoginForm /> : <SignupForm />}
        </Box>
      </Container>
    </>
  );
};

export default Auth;
