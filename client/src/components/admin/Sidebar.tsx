import { Box } from '@mantine/core';
import React from 'react';

const Sidebar = () => {
  return (
    <Box
      sx={{
        flex: 2,
        borderRight: '1px solid lightgray',
        height: '100vh',
      }}
    >
      Sidebar
    </Box>
  );
};

export default Sidebar;
