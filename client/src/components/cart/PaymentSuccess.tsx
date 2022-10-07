import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Button, Group, Stack, Title } from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mainOrangeColor } from '../../utils/constants';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  return (
    <Group
      sx={{
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Stack align={'center'}>
        <CheckCircleIcon style={{ color: mainOrangeColor, width: '8rem' }} />
        <Title order={2}>Your Order has been placed successfully</Title>
        <Button size="lg" color={'orange'} onClick={() => navigate('/orders')}>
          View Orders
        </Button>
      </Stack>
    </Group>
  );
};

export default PaymentSuccess;
