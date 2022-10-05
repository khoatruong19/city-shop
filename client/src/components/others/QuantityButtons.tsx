import { Group, Stack } from '@mantine/core';
import React from 'react';

interface IProps {
  handleControlQuantity: (value: 'down' | 'up') => void;
  quantity: number;
  size: 'sm' | 'lg';
}

const QuantityButtons = ({ handleControlQuantity, quantity, size }: IProps) => {
  return (
    <Group>
      <Stack
        sx={{
          padding: size === 'sm' ? '0.25rem' : '0.5rem',
          width: '3rem',
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
        sx={{ minWidth: '2rem', fontSize: '1.2rem' }}
        align="center"
        justify="center"
      >
        {quantity}
      </Stack>
      <Stack
        sx={{
          padding: size === 'sm' ? '0.25rem' : '0.5rem',
          width: '3rem',
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
