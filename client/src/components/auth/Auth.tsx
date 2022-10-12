import { Box, Container, Group, Image } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store';
import MetaData from '../layout/MetaData';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useMediaQuery } from '@mantine/hooks';
import { mediumScreenQuery, smallScreenQuery } from '../../utils/constants';

const Auth = () => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const tabletScreen = useMediaQuery(mediumScreenQuery);
  const mobileScreen = useMediaQuery(smallScreenQuery);
  const { isAuthenticated, loading } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && isAuthenticated) navigate('/');
  }, [isAuthenticated, loading]);

  return (
    <>
      <MetaData title="Authentication" />
      <Container
        sx={{
          display: 'flex',
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5rem',
          padding: '0 1rem',
        }}
      >
        {!tabletScreen && (
          <Image
            src="https://litextension.com/wp-content/themes/yootheme/cache/1.1-645c9556.png"
            alt=""
          />
        )}
        <Box
          sx={{
            flex: 1,
            minHeight: '50vh',
            padding: '2rem',
            boxShadow: '0px 0px 15px gray',
            borderRadius: '10px',
            maxWidth: mobileScreen ? '80vw' : '60vw',
          }}
        >
          <Box
            sx={{
              height: '3rem',
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
