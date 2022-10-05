import { Box, Button, Group, Image, Stack, Text } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { removeFavouriteItem } from '../../store/slices/favouriteSlice';
import { CartItem } from '../../utils/types/cart.type';

interface IProps {
  item: CartItem;
  removeItem: (id: string) => void;
}

const FavouriteItemCard = ({ item, removeItem }: IProps) => {
  const dispatch = useAppDispatch();

  return (
    <Group sx={{ padding: '1rem' }} spacing={30}>
      <Link style={{ cursor: 'pointer' }} to={`/product/${item.product}`}>
        <Box sx={{ position: 'relative', width: '6rem' }}>
          <Image src={item.image} alt="" />
        </Box>
      </Link>
      <Stack spacing={0} align="flex-start">
        <Text size={'lg'} weight={600} sx={{ fontFamily: 'Chilanka' }}>
          {item.name}
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

export default FavouriteItemCard;
