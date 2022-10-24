import { Box, Group, Image, Stack, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { clearOrderError, getOrderDetail } from '../../store/slices/orderSlice';
import { largeScreenQuery, smallScreenQuery } from '../../utils/constants';
import toaster from '../../utils/helpers/toaster';
import { OrderItem } from '../../utils/types/order.type';
import MetaData from '../layout/MetaData';
import BottomTab from '../others/BottomTab';
import GroupInfo from '../others/GroupInfo';
import WaitingLoader from '../others/WaitingLoader';

const ItemCard = ({ item }: { item: OrderItem }) => {
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
          <Image className="img" src={item.productImage} alt="" />
        </Box>
        <Text mt={-20} weight={500}>
          {item.productName}
        </Text>
      </Group>
      <Text>
        {item.quantity} x ${item.productPrice}={' '}
        <span style={{ fontWeight: 600, fontSize: '1.25rem' }}>
          ${item.productPrice * item.quantity}
        </span>
      </Text>
    </Group>
  );
};

const MyOrderDetails = () => {
  const dispatch = useAppDispatch();
  const { order, error, loading } = useAppSelector((state) => state.order);
  const { id } = useParams();
  const largeScreen = useMediaQuery(largeScreenQuery);
  const mobileScreen = useMediaQuery(smallScreenQuery);

  useEffect(() => {
    if (id) dispatch(getOrderDetail(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (error) {
      toaster({ id: 'get-order', message: error });
      dispatch(clearOrderError());
      return;
    }
  }, [error, dispatch]);
  return (
    <>
      <MetaData title="Order Details" />
      {loading ? (
        <WaitingLoader />
      ) : (
        <Box
          sx={{
            padding: !mobileScreen ? '3rem' : '5rem 0',
            height: '100vh',
            overflowY: 'auto',
            width: largeScreen ? '50vw' : mobileScreen ? '95vw' : '70vw',
            margin: '0 auto',
          }}
        >
          <Stack spacing={25}>
            <Title weight={600} order={2}>
              Shipping Info
            </Title>

            <Stack pr={10} spacing={5}>
              <GroupInfo field="Name" value={order.user?.name} />
              <GroupInfo field="Phone" value={order.shippingInfo?.phoneNo} />
              <GroupInfo field="Address" value={order.shippingInfo?.address} />
            </Stack>

            <Title weight={600} order={2}>
              Payment
            </Title>
            <Stack pr={10} spacing={5}>
              <Title color={'green'} order={4}>
                PAID
              </Title>

              <GroupInfo field="Amount" value={order.totalPrice?.toString()} />
            </Stack>

            <Title weight={600} order={2}>
              Order Status
            </Title>
            <Stack pr={10} spacing={5}>
              <Title
                color={
                  order.orderStatus && order.orderStatus === 'Delivered'
                    ? 'green'
                    : 'red'
                }
                order={4}
              >
                {order.orderStatus}
              </Title>
            </Stack>
            <Title weight={600} order={2}>
              Cart Items:
            </Title>
            <Stack pr={10} spacing={5}>
              {order.orderItems &&
                order.orderItems.map((item) => (
                  <ItemCard key={item.productId} item={item} />
                ))}
            </Stack>
          </Stack>
        </Box>
      )}
      <BottomTab />
    </>
  );
};

export default MyOrderDetails;
