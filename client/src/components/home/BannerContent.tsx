import { Button, Stack, Text } from '@mantine/core';
import React from 'react';

const BannerContent = () => {
  return (
    <Stack
      sx={{
        width: '50%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text size={50} weight={400} color={'white'} mb={-40}>
        By 2 Get <span style={{ color: 'yellow' }}>1 Free</span>
      </Text>
      <Text size={80} weight={600} color={'white'} mb={-50}>
        Fashionable
      </Text>
      <Text size={80} weight={400} color={'white'} mb={-40}>
        Collection
      </Text>
      <Text size={20} color={'white'}>
        Get free Shipping on all orders over $99.00
      </Text>
      <Button
        variant="gradient"
        gradient={{ from: 'teal', to: 'lime', deg: 105 }}
      >
        SHOP NOW
      </Button>
    </Stack>
  );
};

export default BannerContent;
