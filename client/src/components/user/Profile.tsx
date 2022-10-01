import { Anchor, Box, Group, Image, Loader, Stack, Title } from '@mantine/core';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import MetaData from '../layout/MetaData';

const Profile = () => {
  const { user, loading, isAuthenticated } = useAppSelector(
    (state) => state.user
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) navigate('/auth');
  }, [isAuthenticated, loading]);

  if (loading) return <Loader color="orange" />;

  return (
    <>
      <MetaData title={`${user?.name}'s profile`} />
      <Header />
      <Stack
        sx={{
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
        }}
      >
        <Title order={1}>My Profile</Title>
        <Image
          alt="user-avatar"
          src={
            'https://portfolio2022-liart.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdzo2rkafy%2Fimage%2Fupload%2Fv1664178702%2Fuploads%2Fefm4idlsz9hovrxywlgb.jpg&w=2048&q=75'
          }
          width="9rem"
          height="9rem"
          sx={{
            borderRadius: '50%',
            overflow: 'hidden',
            objectFit: 'cover',
          }}
        />
        <Anchor component={Link} to="/me/update-profile">
          Edit Profile
        </Anchor>
        <Box>
          <Group spacing={5} mb={3}>
            <Title order={4}>Full name: </Title>
            <span>{user?.name}</span>
          </Group>
          <Group spacing={5} mb={3}>
            <Title order={4}>Email: </Title>
            <span>{user?.email}</span>
          </Group>
          <Group spacing={5}>
            <Title order={4}>Joined On: </Title>
            <span>{user?.createdAt.substring(0, 10)}</span>
          </Group>

          <Stack align={'flex-start'} spacing={0} mt={15}>
            <Anchor
              component={Link}
              to="/orders"
              className="anchor"
              style={{ color: '#0066CC' }}
            >
              My Orders
            </Anchor>
            <Anchor
              component={Link}
              to="/me/update-password"
              className="anchor"
              style={{ color: '#0066CC' }}
            >
              Change Password
            </Anchor>
          </Stack>
        </Box>
      </Stack>
      <Footer />
    </>
  );
};

export default Profile;
