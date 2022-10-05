import { Box, Button, Group, Image, Stack, Text } from '@mantine/core';
import React from 'react';
import { CartItem } from '../../utils/types/cart.type';

interface IProps {
  item: CartItem;
  removeItem: (id: string) => void;
}

const CartItemCard = ({ item, removeItem }: IProps) => {
  return (
    <Group sx={{ padding: '1rem' }} spacing={30}>
      <Box sx={{ position: 'relative', width: '6rem' }}>
        <Image src={item.image} alt="" />
      </Box>
      <Stack spacing={0} align="flex-start">
        <Text size={'lg'} weight={600} sx={{ fontFamily: 'Chilanka' }}>
          {item.name}
        </Text>
        <Text mb={5}>
          Price:{' '}
          <span style={{ color: 'green', fontWeight: 600, fontSize: '1.2rem' }}>
            ${item.price}
          </span>
        </Text>
        <Button
          onClick={() => removeItem(item.product)}
          variant="outline"
          size="xs"
          color={'red'}
        >
          Remove
        </Button>
      </Stack>
    </Group>
  );
};

export default CartItemCard;
