import { WrenchScrewdriverIcon } from '@heroicons/react/24/solid';
import { Box, Stack } from '@mantine/core';
import React from 'react';
import { mainOrangeColor } from '../../utils/constants';
import BottomTab from './BottomTab';

const CommingSoon = () => {
  return (
    <Stack
      sx={{
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <WrenchScrewdriverIcon
        style={{ width: '10rem', height: '10rem', color: mainOrangeColor }}
      />
      <BottomTab />
    </Stack>
  );
};

export default CommingSoon;
