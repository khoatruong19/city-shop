import { Box, Button, Divider, Group, Stack, Table, Text } from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  decreaseItemQuantity,
  increaseItemQuantity,
  removeItem,
} from '../../store/slices/cartSlice';
import { mainOrangeColor } from '../../utils/constants';
import toaster from '../../utils/helpers/toaster';
import Header from '../layout/Header';
import MetaData from '../layout/MetaData';
import QuantityButtons from '../others/QuantityButtons';
import CartItemCard from './CartItemCard';

const Favourites = () => {
  const favouriteItems = useAppSelector(
    (state) => state.favourite.favouriteItems
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let totalPrice = favouriteItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const handleControlQuantity = (
    mode: 'up' | 'down',
    id: string,
    quantity: number,
    stock: number
  ) => {
    if (mode === 'up') {
      if (stock <= quantity) {
        return toaster({
          id: 'increase-quantity',
          message: 'Product Stock Limited',
        });
      }
      dispatch(increaseItemQuantity(id));
    } else {
      if (quantity <= 1) return;
      dispatch(decreaseItemQuantity(id));
    }
  };

  const handleRemoveItem = (id: string) => dispatch(removeItem(id));

  const handleCheckout = () => {
    navigate('/login?redirect=shipping');
  };

  if (favouriteItems.length === 0) return <p>No items</p>;

  return (
    <>
      <MetaData title="Cart" />
      <Header />
      <Stack
        sx={{
          width: '90vw',
          margin: '2rem auto',
        }}
      >
        <Table captionSide="bottom">
          <thead style={{ backgroundColor: mainOrangeColor }}>
            <tr style={{}}>
              <th style={{ color: 'white' }}>Product</th>
              <th style={{ color: 'white', paddingLeft: '4rem' }}>Quantity</th>
              <th style={{ color: 'white' }}>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {favouriteItems.map((item) => (
              <tr
                key={item.product}
                style={{ borderBottom: '1px solid lightgray' }}
              >
                <td>
                  <CartItemCard removeItem={handleRemoveItem} item={item} />
                </td>
                <td>
                  <QuantityButtons
                    handleControlQuantity={(mode: 'up' | 'down') =>
                      handleControlQuantity(
                        mode,
                        item.product,
                        item.quantity,
                        item.stock
                      )
                    }
                    quantity={item.quantity}
                    size="sm"
                  />
                </td>
                <td style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                  ${item.quantity * item.price}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Stack sx={{ alignSelf: 'flex-end', width: '30%' }}>
          <Divider size={'lg'} color={mainOrangeColor} />
          <Group
            sx={{
              fontSize: '1.5rem',
              fontWeight: 600,
              justifyContent: 'space-between',
            }}
          >
            <Text>Price Total</Text>
            <Text>${totalPrice}</Text>
          </Group>
          <Box sx={{ width: '30%', alignSelf: 'flex-end' }}>
            <Button size="lg" color={'orange'} onClick={handleCheckout}>
              Check Out
            </Button>
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

export default Favourites;
