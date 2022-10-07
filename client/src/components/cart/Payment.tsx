import { CalendarIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import { KeyIcon } from '@heroicons/react/24/solid';
import { Box, Button, Divider, Group, Stack, Title } from '@mantine/core';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import paymentApi from '../../api/paymentApi';
import { useAppDispatch, useAppSelector } from '../../store';
import { clearOrderError, createOrder } from '../../store/slices/orderSlice';
import toaster from '../../utils/helpers/toaster';
import MetaData from '../layout/MetaData';
import CheckoutSteps from './CheckoutSteps';

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo')!);

  const dispatch = useAppDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const { shippingInfo, cartItems } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.user);
  const { error, loading } = useAppSelector((state) => state.order);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  let order = {
    shippingInfo,
    orderItems: cartItems.map((item) => ({
      productName: item.name,
      productPrice: item.price,
      quantity: item.quantity,
      productImage: item.image,
      productId: item.product,
    })),
    itemsPrice: orderInfo.subtotal,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
    paymentInfo: {
      id: '',
      status: '',
    },
    taxPrice: orderInfo.totalPrice * 0.05,
  };

  const handleSubmitPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (payBtn.current) payBtn.current.disabled = true;
    try {
      const { data } = await paymentApi.processPayment(paymentData);
      const client_secret = data.client_secret;

      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement)!,
          billing_details: {
            name: user?.name,
            email: user?.email,
            address: {
              line1: shippingInfo.address,
              state: shippingInfo.state,
              city: shippingInfo.state,
              country: shippingInfo.country,
            },
          },
        },
      });
      if (result.error) {
        if (payBtn.current) payBtn.current.disabled = false;

        toaster({ id: 'payment', message: result.error.message! });
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          order = {
            ...order,
            paymentInfo: {
              id: result.paymentIntent.id,
              status: result.paymentIntent.status,
            },
          };

          dispatch(createOrder(order));

          navigate('/payment/success');
        } else {
          toaster({
            id: 'payment',
            message: "There's some issue while processing payment ",
          });
        }
      }
    } catch (error) {
      if (payBtn.current) payBtn.current.disabled = false;
      toaster({
        id: 'payment',
        message: "There's some issue while processing payment ",
      });
    }
  };

  useEffect(() => {
    if (error) {
      toaster({
        id: 'payment',
        message: error,
      });
      dispatch(clearOrderError());
    }
  }, [dispatch, error]);

  return (
    <>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <Group
        sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box>
          <Stack px={20} py={10}>
            <Title order={2} align="center">
              Card Info
            </Title>
          </Stack>
          <Divider />
          <form action="" onSubmit={handleSubmitPayment}>
            <Stack spacing={20} mt={30}>
              <Box
                sx={{
                  display: 'flex',
                  width: 400,
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '0.8rem 1rem',
                  border: '1px solid gray',
                  borderRadius: '0.5rem',
                }}
              >
                <CreditCardIcon className="footerIcon" />
                <CardNumberElement className="paymentInput" />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  width: 400,
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '0.8rem 1rem',
                  border: '1px solid gray',
                  borderRadius: '0.5rem',
                }}
              >
                <CalendarIcon className="footerIcon" />
                <CardExpiryElement className="paymentInput" />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  width: 400,
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '0.8rem 1rem',
                  border: '1px solid gray',
                  borderRadius: '0.5rem',
                }}
              >
                <KeyIcon className="footerIcon" />
                <CardCvcElement className="paymentInput" />
              </Box>

              <Button ref={payBtn} size="lg" color={'orange'} type="submit">
                Pay - ${orderInfo?.totalPrice}
              </Button>
            </Stack>
          </form>
        </Box>
      </Group>
    </>
  );
};

export default Payment;
