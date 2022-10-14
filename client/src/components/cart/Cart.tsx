import {
  Box,
  Button,
  Divider,
  Group,
  Image,
  Stack,
  Table,
  Text,
  Title,
} from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  decreaseItemQuantity,
  increaseItemQuantity,
  removeItem,
} from '../../store/slices/cartSlice';
import { mainOrangeColor, mediumScreenQuery } from '../../utils/constants';
import toaster from '../../utils/helpers/toaster';
import Header from '../layout/Header';
import MetaData from '../layout/MetaData';
import QuantityButtons from '../others/QuantityButtons';
import CartItemCard from './CartItemCard';
import EmptyCart from '../../images/empty-cart.png';
import { useMediaQuery } from '@mantine/hooks';
import BottomTab from '../others/BottomTab';

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const tabletScreen = useMediaQuery(mediumScreenQuery);

  let totalPrice = cartItems.reduce(
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

  return (
    <>
      <MetaData title="Cart" />
      <Header />
      {cartItems.length === 0 ? (
        <Box
          sx={{
            width: 'fit-content',
            margin: '5rem auto',
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '6rem',
              marginLeft: '4.5rem',
            }}
          >
            <Image className="img" alt="" src={EmptyCart} />
          </Box>
          <Title order={1}>No Items In Cart</Title>
          <Button
            size="md"
            color="orange"
            onClick={() => navigate('/products')}
            mt={10}
          >
            View Products
          </Button>
        </Box>
      ) : (
        <Stack
          sx={{
            width: !tabletScreen ? '90vw' : '98%',
            margin: '2rem auto 4rem',
          }}
        >
          <Table captionSide="bottom">
            <thead style={{ backgroundColor: mainOrangeColor }}>
              <tr style={{}}>
                <th style={{ color: 'white' }}>Product</th>
                <th style={{ color: 'white' }}>Quantity</th>
                <th style={{ color: 'white' }}>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
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
          <Stack
            sx={{
              alignSelf: 'flex-end',
              width: 'fit-content',
            }}
            spacing={tabletScreen ? 10 : 20}
          >
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
            <Box sx={{ alignSelf: 'flex-end' }}>
              <Button
                size={tabletScreen ? 'md' : 'lg'}
                color={'orange'}
                onClick={handleCheckout}
              >
                Check Out
              </Button>
            </Box>
          </Stack>
        </Stack>
      )}
      <BottomTab />
    </>
  );
};

export default Cart;
