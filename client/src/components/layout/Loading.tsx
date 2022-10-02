import { Loader, Stack } from '@mantine/core';
import React from 'react';
import { mainOrangeColor } from '../../utils/constants';

const Loading = () => {
  return (
    <Stack
      sx={{
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Loader size="xl" color={mainOrangeColor} />;
    </Stack>
  );
};

export default Loading;
