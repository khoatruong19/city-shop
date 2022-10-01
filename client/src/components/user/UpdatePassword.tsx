import { Box, Button, Divider, Stack, Text, TextInput } from '@mantine/core';
import { KeyIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import { LockOpenIcon } from '@heroicons/react/24/outline';
import { useAppDispatch, useAppSelector } from '../../store';
import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import toaster from '../../utils/helpers/toaster';
import {
  clearProfileError,
  resetUpdateState,
  updatePassword,
} from '../../store/slices/profileSlice';
import { useNavigate } from 'react-router-dom';

interface FormData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const UpdatePassword = () => {
  const { isUpdated, loading, error } = useAppSelector(
    (state) => state.profile
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const form = useForm<FormData>({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },

    validate: {
      oldPassword: (value) =>
        value.length > 2 ? null : 'Password is more than 2 charaters',
      newPassword: (value) =>
        value.length > 2 ? null : 'Password is more than 2 charaters',
      confirmPassword: (value) =>
        value.length > 2 ? null : 'Password is more than 2 charaters',
    },
  });

  useEffect(() => {
    if (!loading) {
      if (error) {
        toaster({ id: 'update-password', message: error });
        dispatch(clearProfileError());
      }
      if (isUpdated) {
        toaster({
          id: 'update-password',
          message: 'Password updated',
          success: true,
        });
        dispatch(resetUpdateState());
        navigate(-1);
      }
    }
  }, [loading, error, isUpdated]);
  return (
    <Stack
      sx={{
        width: '100vw',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgray',
      }}
    >
      <Box
        sx={{
          width: '20vw',
          padding: '2rem 2rem 5rem',
          backgroundColor: 'white',
        }}
      >
        <Stack sx={{ textAlign: 'center' }}>
          <Text size={25}>Update Password</Text>
          <Divider size="sm" />
        </Stack>
        <form
          style={{ marginTop: '4rem' }}
          onSubmit={form.onSubmit((values) => dispatch(updatePassword(values)))}
        >
          <TextInput
            placeholder="Old password"
            size="lg"
            icon={<KeyIcon className="footerIcon" style={{ color: 'black' }} />}
            mb={20}
            {...form.getInputProps('oldPassword')}
          />
          <TextInput
            placeholder="New password"
            size="lg"
            icon={
              <LockClosedIcon
                className="footerIcon"
                style={{ color: 'black' }}
              />
            }
            mb={20}
            {...form.getInputProps('newPassword')}
          />
          <TextInput
            placeholder="Confirm password"
            size="lg"
            icon={
              <LockOpenIcon className="footerIcon" style={{ color: 'black' }} />
            }
            mb={20}
            {...form.getInputProps('confirmPassword')}
          />
          <Button
            type="submit"
            size="lg"
            style={{ width: '100%' }}
            color={'orange'}
          >
            Change
          </Button>
        </form>
      </Box>
    </Stack>
  );
};

export default UpdatePassword;
