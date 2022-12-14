import { Anchor, Box, Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { clearUserError, loginUser } from '../../store/slices/userSlice';
import toaster from '../../utils/helpers/toaster';

type FormData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const { isAuthenticated, loading, error } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();
  const form = useForm<FormData>({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        value.length > 2 ? null : 'Password is more than 2 charaters',
    },
  });

  useEffect(() => {
    if (error && error !== 'Not authenticated') {
      toaster({ id: 'login-error', message: error });
      dispatch(clearUserError());
    }
    if (isAuthenticated) {
      toaster({
        id: 'welcome-user',
        message: 'Welcome to CITY SHOP!',
        success: true,
      });
    }
  }, [dispatch, loading, error, isAuthenticated]);

  return (
    <Box sx={{ maxWidth: 500 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => dispatch(loginUser(values)))}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
          sx={{ marginBottom: '1rem', minWidth: '300px' }}
        />

        <TextInput
          withAsterisk
          label="Password"
          placeholder="Your password..."
          {...form.getInputProps('password')}
          type="password"
        />

        <Group position="right" mt="lg">
          <Button loading={loading} type="submit" sx={{ width: '100%' }}>
            Login
          </Button>
        </Group>
      </form>
      <Anchor
        sx={{ fontSize: '0.8rem', float: 'right', marginTop: '1rem' }}
        component={Link}
        to="/password/forgot"
      >
        Forgot Password?
      </Anchor>
    </Box>
  );
};

export default LoginForm;
