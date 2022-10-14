import { Group, Stack } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react';
import { smallScreenQuery } from '../../utils/constants';

interface IProps {
  handleControlQuantity: (value: 'down' | 'up') => void;
  quantity: number;
  size: 'sm' | 'lg';
}

const QuantityButtons = ({ handleControlQuantity, quantity, size }: IProps) => {
  const mobileScreen = useMediaQuery(smallScreenQuery);
  return (
    <Group sx={{ alignItems: 'center' }}>
      <Stack
        sx={{
          padding: '0.5rem',
          width: size === 'sm' ? '2rem' : '3rem',
          height: size === 'sm' ? '2rem' : '3rem',
          fontSize: '1.5rem',
          backgroundColor: 'coral',
          cursor: 'pointer',
          '&:hover': {
            opacity: '0.8',
          },
        }}
        align="center"
        justify="center"
        onClick={() => handleControlQuantity('down')}
      >
        -
      </Stack>
      <Stack
        sx={{
          minWidth: '2rem',
          fontSize: '1.2rem',
          marginBottom: mobileScreen ? '-3rem' : '',
        }}
        align="center"
        justify="center"
      >
        {quantity}
      </Stack>
      <Stack
        sx={{
          padding: '0.5rem',
          width: size === 'sm' ? '2rem' : '3rem',
          height: size === 'sm' ? '2rem' : '3rem',
          fontSize: '1.5rem',
          backgroundColor: 'coral',
          cursor: 'pointer',
          '&:hover': {
            opacity: '0.8',
          },
        }}
        align="center"
        justify="center"
        onClick={() => handleControlQuantity('up')}
      >
        +
      </Stack>
    </Group>
  );
};

export default QuantityButtons;
