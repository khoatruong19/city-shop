import React, { useEffect, useRef, useState } from 'react';
import { TextInput, Button, Group, Box, Title, Image } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAppDispatch, useAppSelector } from '../../store';
import { clearUserError, registerUser } from '../../store/slices/userSlice';
import { showNotification } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import toaster from '../../utils/helpers/toaster';

type FormData = {
  name: string;
  email: string;
  password: string;
};

const SignupForm = () => {
  const { isAuthenticated, loading, error } = useAppSelector(
    (state) => state.user
  );
  const fileRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState('/profile.png');
  const dispatch = useAppDispatch();

  const form = useForm<FormData>({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        value.length > 2 ? null : 'Password is more than 2 charaters',
    },
  });

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result as string);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

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
  }, [dispatch, loading, error]);

  return (
    <Box sx={{ maxWidth: 500 }} mx="auto">
      <form
        onSubmit={form.onSubmit((values) => console.log({ ...values, avatar }))}
      >
        <TextInput
          withAsterisk
          label="Name"
          placeholder="Your name..."
          {...form.getInputProps('name')}
          sx={{ width: 300, marginBottom: '1rem' }}
        />

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

        <Group spacing={18} mt={20}>
          <Title order={5}>Avatar: </Title>
          <Image
            height={80}
            width={80}
            style={{ objectFit: 'cover' }}
            alt="avatar"
            src={avatar}
          />
          <TextInput
            onChange={handleChangeImage}
            ref={fileRef}
            type="file"
            sx={{ display: 'none' }}
          />
          <Button onClick={() => fileRef.current?.click()} color={'cyan'}>
            Choose image
          </Button>
        </Group>

        <Group position="right" mt="lg">
          <Button loading={loading} type="submit" sx={{ width: '100%' }}>
            Register
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default SignupForm;
