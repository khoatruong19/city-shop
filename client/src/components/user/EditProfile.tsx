import { EnvelopeIcon, FaceSmileIcon } from '@heroicons/react/24/outline';
import {
  Box,
  Button,
  Divider,
  Group,
  Image,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  clearProfileError,
  resetUpdateState,
  updateProfile,
} from '../../store/slices/profileSlice';
import { me } from '../../store/slices/userSlice';
import toaster from '../../utils/helpers/toaster';

interface FormData {
  name: string;
  email: string;
}

const EditProfile = () => {
  const { user } = useAppSelector((state) => state.user);
  const { isUpdated, loading, error } = useAppSelector(
    (state) => state.profile
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const fileRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState(user?.avatar.url || '');

  const form = useForm<FormData>({
    initialValues: {
      name: user?.name!,
      email: user?.email!,
    },

    validate: {
      name: (value) =>
        value.length > 4 ? null : 'Password is more than 4 charaters',
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
    if (!loading) {
      if (error) {
        toaster({ id: 'update-profile', message: error });
        dispatch(clearProfileError());
      }
      if (isUpdated) {
        toaster({
          id: 'update-profile',
          message: 'Profile updated',
          success: true,
        });
        dispatch(me());
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
          borderRadius: '1rem',
        }}
      >
        <Stack sx={{ textAlign: 'center' }}>
          <Text size={25}>Update Profile</Text>
          <Divider size="sm" />
        </Stack>
        <form
          style={{ marginTop: '4rem' }}
          onSubmit={form.onSubmit((values) =>
            dispatch(updateProfile({ ...values, avatar }))
          )}
        >
          <TextInput
            placeholder="Your name"
            size="lg"
            icon={
              <FaceSmileIcon
                className="footerIcon"
                style={{ color: 'black' }}
              />
            }
            mb={20}
            {...form.getInputProps('name')}
          />

          <TextInput
            type="email"
            placeholder="Your email"
            size="lg"
            icon={
              <EnvelopeIcon className="footerIcon" style={{ color: 'black' }} />
            }
            mb={20}
            {...form.getInputProps('email')}
          />

          <Group spacing={10} my={20}>
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

          <Button
            type="submit"
            size="lg"
            style={{ width: '100%' }}
            color={'orange'}
            loading={loading}
          >
            Update
          </Button>
        </form>
      </Box>
    </Stack>
  );
};

export default EditProfile;
