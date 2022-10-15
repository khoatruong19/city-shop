import { Box, Group } from '@mantine/core';
import React from 'react';
import Sidebar from '../admin/Sidebar';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Group sx={{ width: '100vw', alignItems: 'flex-start' }} spacing={0}>
      <Sidebar />
      <Box sx={{ flex: 10 }}>{children}</Box>
    </Group>
  );
};

export default AdminLayout;
