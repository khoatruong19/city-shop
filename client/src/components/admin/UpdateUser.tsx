import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { ShieldCheckIcon, UserIcon } from '@heroicons/react/24/solid';
import {
  Box,
  Button,
  Group,
  Select,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import userApi from '../../api/userApi';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  clearUserError,
  resetUpdateUserStatus,
  updateUser,
} from '../../store/slices/userSlice';
import { userRoleOptions } from '../../utils/data';
import toaster from '../../utils/helpers/toaster';
import { UserRoles } from '../../utils/types/user.type';
import AdminLayout from '../layout/AdminLayout';
import MetaData from '../layout/MetaData';
import WaitingLoader from '../others/WaitingLoader';

const UpdateUser = () => {
  const dispatch = useAppDispatch();
  const { error, updateLoading, isUpdated } = useAppSelector(
    (state) => state.user
  );
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRoles>('user');
  const [loading, setLoading] = useState(false);

  const handleChangeRole = (value: UserRoles) => {
    setRole(value);
  };

  const handleUpdateUserSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      updateUser({
        id: id!,
        name,
        email,
        role,
      })
    );
  };

  useEffect(() => {
    if (error) {
      toaster({ id: 'update user', message: error });
      dispatch(clearUserError());
    }

    if (isUpdated) {
      toaster({ id: 'update user', message: 'User updated!', success: true });
      navigate('/admin/users');
      dispatch(resetUpdateUserStatus());
    }
  }, [error, isUpdated]);

  useEffect(() => {
    setLoading(true);
    const getUserDetails = async () => {
      try {
        const res = await userApi.getUserById(id!);
        if (res.data) {
          const user = res.data.user;
          setName(user.name);
          setEmail(user.email);
          setRole(user.role);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toaster({ id: 'get user details', message: 'Get User Info fail!' });
      }
    };
    getUserDetails();
  }, [id]);

  return (
    <>
      <MetaData title="Update User" />

      <AdminLayout>
        {loading ? (
          <WaitingLoader />
        ) : (
          <Group
            sx={{
              width: '100%',
              height: '100vh',
              backgroundColor: 'lightgray',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                width: '50%',
                padding: '2.5rem 2rem',
                backgroundColor: 'whitesmoke',
                borderRadius: '15px',
              }}
            >
              <Title order={1} align="center" mb={20}>
                Update User
              </Title>
              <form action="" onSubmit={handleUpdateUserSubmit}>
                <Stack>
                  <TextInput
                    value={name}
                    icon={
                      <UserIcon
                        className="footerIcon"
                        style={{ color: 'gray' }}
                      />
                    }
                    size="md"
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextInput
                    value={email}
                    icon={
                      <EnvelopeIcon
                        className="footerIcon"
                        style={{ color: 'gray' }}
                      />
                    }
                    size="md"
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <Select
                    required
                    value={role}
                    size="md"
                    icon={
                      <ShieldCheckIcon
                        className="footerIcon"
                        style={{ color: 'gray' }}
                      />
                    }
                    data={userRoleOptions}
                    onChange={(value: string) =>
                      handleChangeRole(value as UserRoles)
                    }
                  />

                  <Button
                    loading={updateLoading}
                    type="submit"
                    color="orange"
                    size="lg"
                    mt={10}
                  >
                    Update
                  </Button>
                </Stack>
              </form>
            </Box>
          </Group>
        )}
      </AdminLayout>
    </>
  );
};

export default UpdateUser;
