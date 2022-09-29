import React, { useEffect } from 'react';
import { TextInput, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAppDispatch, useAppSelector } from '../../store';
import { clearError, loginUser } from '../../store/slices/userSlice';
import { showNotification } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';

type FormData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const { isAuthenticated, loading, error } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
    if (error) {
      showNotification({
        id: 'login-error',
        disallowClose: false,
        autoClose: 3000,
        message: error,
        color: 'red',
        sx: { fontWeight: 700 },
        loading: false,
      });
      dispatch(clearError());
    }

    if (isAuthenticated) navigate('/');
  }, [dispatch, isAuthenticated, loading, error]);

  return (
    <Box sx={{ maxWidth: 500 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => dispatch(loginUser(values)))}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
          sx={{ width: 300, marginBottom: '1rem' }}
        />

        <TextInput
          withAsterisk
          label="Password"
          placeholder="Your password..."
          {...form.getInputProps('password')}
        />

        <Group position="right" mt="lg">
          <Button type="submit" sx={{ width: '100%' }}>
            Login
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default LoginForm;
