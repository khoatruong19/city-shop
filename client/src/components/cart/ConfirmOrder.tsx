import {
  Box,
  Button,
  Checkbox,
  Divider,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store';
import { CartItem } from '../../utils/types/cart.type';
import MetaData from '../layout/MetaData';
import GroupInfo from '../others/GroupInfo';
import CheckoutSteps from './CheckoutSteps';

const ItemCard = ({ item }: { item: CartItem }) => {
  return (
    <Group sx={{ justifyContent: 'space-between' }}>
      <Group>
        <Box
          sx={{
            position: 'relative',
            width: '5rem',
            height: '5rem',
          }}
        >
          <Image className="img" src={item.image} alt="" />
        </Box>
        <Text mt={-20} weight={500}>
          {item.name}
        </Text>
      </Group>
      <Text>
        {item.quantity} x ${item.price}={' '}
        <span style={{ fontWeight: 600, fontSize: '1.25rem' }}>
          ${item.price * item.quantity}
        </span>
      </Text>
    </Group>
  );
};

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useAppSelector((state) => state.cart);
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  let productPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const subtotal = productPrice;
  const shippingCharges = productPrice > 1000 ? 0 : 50;
  const totalPrice = subtotal + shippingCharges;
  const address = `${shippingInfo.address}, ${shippingInfo.state}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      totalPrice,
    };

    sessionStorage.setItem('orderInfo', JSON.stringify(data));

    navigate('/process/payment');
  };

  return (
    <>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <Group
        sx={{ marginTop: '2rem', minHeight: '80vh', alignItems: 'flex-start' }}
      >
        <Stack sx={{ flex: 2, padding: '5rem' }}>
          <Box>
            <Title order={2}>Shipping Info:</Title>
            <Stack px={40} mt={20}>
              <GroupInfo field="Name" value={user?.name} />
              <GroupInfo field="Phone" value={shippingInfo.phoneNo} />
              <GroupInfo field="Address" value={address} />
            </Stack>
          </Box>
          <Box>
            <Title order={2}>Your Cart Items:</Title>
            <Stack px={40} mt={20}>
              {cartItems.map((item) => (
                <ItemCard key={item.product} item={item} />
              ))}
            </Stack>
          </Box>
        </Stack>
        <Divider orientation="vertical" />
        <Stack sx={{ flex: 1, padding: '5rem' }}>
          <Title order={2} align="center">
            Order Summary
          </Title>
          <Divider />
          <Stack py={20}>
            <GroupInfo between field="Subtotal" value={`$${subtotal}`} />
            <GroupInfo
              between
              field="Shipping Charges"
              value={`$${shippingCharges}`}
            />
          </Stack>
          <Divider mb={10} />
          <GroupInfo between field="Total" value={`$${totalPrice}`} />

          <Button onClick={proceedToPayment} size="lg" color={'orange'}>
            Proceed To Payment
          </Button>
        </Stack>
      </Group>
    </>
  );
};

export default ConfirmOrder;
