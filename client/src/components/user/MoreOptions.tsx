import {
  ArrowPathIcon,
  ArrowRightOnRectangleIcon,
  BuildingOfficeIcon,
  BuildingStorefrontIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
  DocumentTextIcon,
  HeartIcon,
  KeyIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import {
  ExclamationTriangleIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/solid';
import { Box, Divider, Group, Image, Stack, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { logout } from '../../store/slices/userSlice';
import { largeScreenQuery } from '../../utils/constants';
import toaster from '../../utils/helpers/toaster';
import Header from '../layout/Header';
import MetaData from '../layout/MetaData';
import BottomTab from '../others/BottomTab';

const MoreOptions = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.user);
  const largeScreen = useMediaQuery(largeScreenQuery);
  const dispatch = useAppDispatch();

  const logoutUser = () => {
    dispatch(logout());
    toaster({
      id: 'user-logout',
      message: 'Logout Successfully',
      success: true,
    });
  };

  return (
    <Box sx={{ width: '100vw', overflow: 'hidden', marginBottom: '3rem' }}>
      <MetaData title="More Options" />
      <Header />
      <Stack
        sx={{
          width: largeScreen ? '50%' : '100%',
          margin: '0 auto',
          height: '60vh',
          justifyContent: largeScreen ? 'center' : '',
          alignItems: largeScreen ? 'center' : '',
        }}
      >
        <Stack spacing={10} p={10}>
          {isAuthenticated && (
            <Link to="/me">
              <Group sx={{ cursor: 'pointer' }} className="option-hover">
                <Box
                  sx={{
                    position: 'relative',
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '50%',
                    overflow: 'hidden',
                  }}
                >
                  <Image alt="" src={user?.avatar.url} className={'img'} />
                </Box>
                <Box>
                  <Text size={18} weight={500}>
                    {user?.name}
                  </Text>
                  <Text size={15} color="gray">
                    View your profile
                  </Text>
                </Box>
              </Group>
              <Divider mt={5} />
            </Link>
          )}
          <Link to="/products">
            <Group
              sx={{
                alignItems: 'center',
              }}
              className="option-hover"
            >
              <BuildingStorefrontIcon className="navIcon" />
              <Text>Visit Shop</Text>
            </Group>
          </Link>
          <Link to="/search">
            <Group
              sx={{
                alignItems: 'center',
              }}
              className="option-hover"
            >
              <MagnifyingGlassIcon className="navIcon" />
              <Text>Search Products</Text>
            </Group>
          </Link>
          <Link to="/cart">
            <Group
              sx={{
                alignItems: 'center',
              }}
              className="option-hover"
            >
              <ShoppingCartIcon className="navIcon" />
              <Text>View Cart</Text>
            </Group>
          </Link>
          <Link to="/favourites">
            <Group
              sx={{
                alignItems: 'center',
              }}
              className="option-hover"
            >
              <HeartIcon className="navIcon" />
              <Text>View Favourites</Text>
            </Group>
          </Link>
          {isAuthenticated && (
            <>
              <Link to="/orders">
                <Group
                  sx={{
                    alignItems: 'center',
                  }}
                  className="option-hover"
                >
                  <ClipboardDocumentCheckIcon className="navIcon" />
                  <Text>My Orders</Text>
                </Group>
              </Link>
              <Link to="/commingsoon">
                <Group
                  sx={{
                    alignItems: 'center',
                  }}
                  className="option-hover"
                >
                  <BuildingOfficeIcon className="navIcon" />
                  <Text>Create Own Shop</Text>
                </Group>
              </Link>
              <Link to="/commingsoon">
                <Group
                  sx={{
                    alignItems: 'center',
                  }}
                  className="option-hover"
                >
                  <ChatBubbleOvalLeftEllipsisIcon className="navIcon" />
                  <Text>Live Chat Support</Text>
                </Group>
              </Link>
              <Link to="/me/update-password">
                <Group
                  sx={{
                    alignItems: 'center',
                  }}
                  className="option-hover"
                >
                  <KeyIcon className="navIcon" />
                  <Text>Change Password</Text>
                </Group>
              </Link>
              <Link to="/forgot-password">
                <Group
                  sx={{
                    alignItems: 'center',
                  }}
                  className="option-hover"
                >
                  <ArrowPathIcon className="navIcon" />
                  <Text>Forgot Password</Text>
                </Group>
              </Link>
              <Link to="/me/update-profile">
                <Group
                  sx={{
                    alignItems: 'center',
                  }}
                  className="option-hover"
                >
                  <DocumentTextIcon className="navIcon" />
                  <Text>Update Profile</Text>
                </Group>
              </Link>
            </>
          )}
          <Link to="/contact">
            <Group
              sx={{
                alignItems: 'center',
              }}
              className="option-hover"
            >
              <PhoneIcon className="navIcon" />
              <Text>Contact Us</Text>
            </Group>
          </Link>
          <Link to="/faq">
            <Group
              sx={{
                alignItems: 'center',
              }}
              className="option-hover"
            >
              <ClipboardDocumentIcon className="navIcon" />
              <Text>User Rules</Text>
            </Group>
          </Link>
          <Link to="/support">
            <Group
              sx={{
                alignItems: 'center',
              }}
              className="option-hover"
            >
              <ExclamationTriangleIcon className="navIcon" />
              <Text>Report Us</Text>
            </Group>
          </Link>
          {isAuthenticated && (
            <Group
              sx={{
                alignItems: 'center',
              }}
              className="option-hover"
              onClick={logoutUser}
            >
              <ArrowRightOnRectangleIcon className="navIcon" />
              <Text>Logout</Text>
            </Group>
          )}
        </Stack>
      </Stack>
      <BottomTab />
    </Box>
  );
};

export default MoreOptions;
