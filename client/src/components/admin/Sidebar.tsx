import {
  ClipboardDocumentListIcon,
  DocumentPlusIcon,
  PencilSquareIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { Squares2X2Icon, TagIcon, UsersIcon } from '@heroicons/react/24/solid';
import { Box, Group, Image, Stack, Text } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../images/logo.png';
import { useEffect, useState } from 'react';
import { mainOrangeColor } from '../../utils/constants';

const Sidebar = () => {
  const location = useLocation();
  const [activeNav, setActiveNav] = useState('dashboard');

  useEffect(() => {
    let nav = location.pathname.slice(1, location.pathname.length);
    if (nav.includes('admin')) nav = nav.slice(6, nav.length);
    setActiveNav(nav);
  }, [location]);

  return (
    <Stack
      sx={{
        flex: 2,
        borderRight: '1px solid lightgray',
        height: '100vh',
        alignItems: 'center',
      }}
      spacing={10}
    >
      <Link to="/">
        <Box sx={{ position: 'relative', width: '10rem' }}>
          <Image className="img" alt="" src={Logo} />
        </Box>
      </Link>
      <Stack sx={{ width: '100%' }}>
        <Link to="/dashboard">
          <Group
            className="sidebar-hover"
            sx={{ color: activeNav === 'dashboard' ? mainOrangeColor : 'gray' }}
            px={30}
            py={10}
          >
            <Squares2X2Icon className="navIcon" />
            <Text size={20}>Dashboard</Text>
          </Group>
        </Link>
        <Link to="/admin/products">
          <Group
            className="sidebar-hover"
            sx={{ color: activeNav === 'products' ? mainOrangeColor : 'gray' }}
            px={30}
            py={10}
          >
            <DocumentPlusIcon className="navIcon" />
            <Text size={20}>All Products</Text>
          </Group>
        </Link>
        <Link to="/admin/product">
          <Group
            className="sidebar-hover"
            sx={{ color: activeNav === 'product' ? mainOrangeColor : 'gray' }}
            px={30}
            py={10}
          >
            <PlusIcon className="navIcon" />
            <Text size={20}>Create Product</Text>
          </Group>
        </Link>
        <Link to="/commingsoon">
          <Group
            className="sidebar-hover"
            sx={{ color: 'gray' }}
            px={30}
            py={10}
          >
            <TagIcon className="navIcon" />
            <Text size={20}>All Offers</Text>
          </Group>
        </Link>
        <Link to="/commingsoon">
          <Group
            className="sidebar-hover"
            sx={{ color: 'gray' }}
            px={30}
            py={10}
          >
            <TagIcon className="navIcon" />
            <Text size={20}>Create Offer</Text>
          </Group>
        </Link>
        <Link to="/admin/orders">
          <Group
            className="sidebar-hover"
            sx={{ color: activeNav === 'orders' ? mainOrangeColor : 'gray' }}
            px={30}
            py={10}
          >
            <ClipboardDocumentListIcon className="navIcon" />
            <Text size={20}>Orders</Text>
          </Group>
        </Link>
        <Link to="/admin/users">
          <Group
            className="sidebar-hover"
            sx={{ color: activeNav === 'users' ? mainOrangeColor : 'gray' }}
            px={30}
            py={10}
          >
            <UsersIcon className="navIcon" />
            <Text size={20}>Users</Text>
          </Group>
        </Link>
        <Link to="/admin/reviews">
          <Group
            className="sidebar-hover"
            sx={{ color: activeNav === 'reviews' ? mainOrangeColor : 'gray' }}
            px={30}
            py={10}
          >
            <PencilSquareIcon className="navIcon" />
            <Text size={20}>Reviews</Text>
          </Group>
        </Link>
      </Stack>
    </Stack>
  );
};

export default Sidebar;
