import React from 'react';
import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';

type FormData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const form = useForm<FormData>({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        value.length > 3 ? null : 'Password is more than 3 charaters',
    },
  });
  return (
    <Box sx={{ maxWidth: 500 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
