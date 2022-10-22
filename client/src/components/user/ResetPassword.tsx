import { LockOpenIcon } from '@heroicons/react/24/outline';
import { LockClosedIcon } from '@heroicons/react/24/solid';
import { Button, Divider, Group, Stack, TextInput, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { clearUserError, resetPassword } from '../../store/slices/userSlice';
import { mediumScreenQuery, smallScreenQuery } from '../../utils/constants';
import toaster from '../../utils/helpers/toaster';
import Loading from '../layout/Loading';
import MetaData from '../layout/MetaData';

const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const { error, message, loading } = useAppSelector((state) => state.user);
  const mobileScreen = useMediaQuery(smallScreenQuery);
  const tabletScreen = useMediaQuery(mediumScreenQuery);
  const { token } = useParams();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleforgotPasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword)
      return toaster({
        id: 'Reset password',
        message: 'Passwords not matched!',
      });
    dispatch(
      resetPassword({
        token: token!,
        password,
        confirmPassword,
      })
    );
  };

  useEffect(() => {
    if (error && error !== 'Not authenticated') {
      toaster({ id: 'Reset-password', message: error });
      dispatch(clearUserError());
    }

    if (message) {
      toaster({ id: 'Reset-password', message, success: true });
    }
  }, [dispatch, error, message, loading]);

  return (
    <>
      <MetaData title="Reset Password" />
      {loading ? (
        <Loading />
      ) : (
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
                Reset Password
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
                  value={password}
                  placeholder="New password"
                  icon={
                    <LockOpenIcon
                      className="footerIcon"
                      style={{ color: 'gray' }}
                    />
                  }
                  size="md"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <TextInput
                  value={confirmPassword}
                  placeholder="Confirm password"
                  icon={
                    <LockClosedIcon
                      className="footerIcon"
                      style={{ color: 'gray' }}
                    />
                  }
                  size="md"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  size="md"
                  color={'orange'}
                  sx={{ fontSize: '1.2rem' }}
                  loading={loading}
                >
                  Reset Password
                </Button>
              </Stack>
            </form>
          </Stack>
        </Group>
      )}
    </>
  );
};

export default ResetPassword;
