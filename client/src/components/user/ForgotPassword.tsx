import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { Button, Divider, Group, Stack, TextInput, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { clearUserError, forgotPassword } from '../../store/slices/userSlice';
import { mediumScreenQuery, smallScreenQuery } from '../../utils/constants';
import toaster from '../../utils/helpers/toaster';
import MetaData from '../layout/MetaData';

const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const { error, message, loading } = useAppSelector((state) => state.user);
  const mobileScreen = useMediaQuery(smallScreenQuery);
  const tabletScreen = useMediaQuery(mediumScreenQuery);

  const [email, setEmail] = useState('');

  const handleforgotPasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error && error !== 'Not authenticated') {
      toaster({ id: 'Forgot-password', message: error });
      dispatch(clearUserError());
    }

    if (message) {
      toaster({ id: 'Forgot-password', message, success: true });
    }
  }, [dispatch, error, message, loading]);

  return (
    <>
      <MetaData title="Forgot Password" />
      <Group
        sx={{
          width: '100vw',
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'whitesmoke',
        }}
      >
        <Stack
          sx={{
            width: mobileScreen ? '95%' : tabletScreen ? '70%' : '30%',
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            borderRadius: '15px',
            boxShadow: '0 0 5px 3px lightgray',
          }}
        >
          <Stack
            sx={{
              width: mobileScreen ? '80%' : '60%',
              justifySelf: 'center',
              marginBottom: '2rem',
            }}
          >
            <Title order={2} align="center">
              Forgot Password
            </Title>
            <Divider />
          </Stack>
          <form
            action=""
            style={{ width: '100%' }}
            onSubmit={handleforgotPasswordSubmit}
          >
            <Stack>
              <TextInput
                type={'email'}
                value={email}
                placeholder="Email"
                icon={
                  <EnvelopeIcon
                    className="footerIcon"
                    style={{ color: 'gray' }}
                  />
                }
                size="md"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                type="submit"
                size="md"
                color={'orange'}
                sx={{ fontSize: '1.2rem' }}
                loading={loading}
              >
                Send
              </Button>
            </Stack>
          </form>
        </Stack>
      </Group>
    </>
  );
};

export default ForgotPassword;
