import { RectangleGroupIcon } from '@heroicons/react/24/solid';
import {
  Box,
  Button,
  Group,
  Image,
  Select,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  clearOrderError,
  getOrderDetail,
  resetUpdateOrderStatus,
  updateOrderStatus,
} from '../../store/slices/orderSlice';
import toaster from '../../utils/helpers/toaster';
import { OrderItem } from '../../utils/types/order.type';
import AdminLayout from '../layout/AdminLayout';
import MetaData from '../layout/MetaData';
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

const UpdateOrder = () => {
  const dispatch = useAppDispatch();
  const { order, error, loading, isUpdated } = useAppSelector(
    (state) => state.order
  );
  const { id } = useParams();

  const [status, setStatus] = useState(order.orderStatus || '');

  const updateOrderSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      updateOrderStatus({
        id: id!,
        status,
      })
    );
  };

  useEffect(() => {
    if (id) dispatch(getOrderDetail(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (error) {
      toaster({ id: 'update-order', message: error });
      dispatch(clearOrderError());
      return;
    }
    if (isUpdated) {
      toaster({
        id: 'update-order',
        message: 'Order updated!',
        success: true,
      });
      dispatch(resetUpdateOrderStatus());
    }
  }, [error, isUpdated, dispatch]);

  return (
    <>
      <MetaData title="Update Order" />
      <AdminLayout>
        <Group>
          {loading ? (
            <WaitingLoader />
          ) : (
            <>
              <Box
                sx={{
                  flex: 2,
                  padding: '3rem',
                  borderRight: '1px solid lightgray',
                  height: '100vh',
                  overflowY: 'auto',
                }}
              >
                <Stack spacing={25}>
                  <Title weight={600} order={2}>
                    Shipping Info
                  </Title>

                  <Stack pr={10} spacing={5}>
                    <GroupInfo field="Name" value={order.user?.name} />
                    <GroupInfo
                      field="Phone"
                      value={order.shippingInfo?.phoneNo}
                    />
                    <GroupInfo
                      field="Address"
                      value={order.shippingInfo?.address}
                    />
                  </Stack>

                  <Title weight={600} order={2}>
                    Payment
                  </Title>
                  <Stack pr={10} spacing={5}>
                    <Title color={'green'} order={4}>
                      PAID
                    </Title>

                    <GroupInfo
                      field="Amount"
                      value={order.totalPrice?.toString()}
                    />
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
                      {status}
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
              <Stack
                sx={{
                  flex: 1,
                  alignSelf: 'flex-start',
                  padding: '10rem 1rem',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Title order={1} mb={20}>
                  Process Order
                </Title>
                <form onSubmit={updateOrderSubmitHandler}>
                  <Select
                    value={status}
                    onChange={(value) => setStatus(value!)}
                    size="lg"
                    placeholder="Choose Status"
                    data={[
                      order.orderStatus === 'Processing'
                        ? 'Shipped'
                        : 'Delivered',
                    ]}
                    icon={<RectangleGroupIcon className="footerIcon" />}
                  />
                  <Button
                    type="submit"
                    sx={{ width: '100%' }}
                    size="lg"
                    color={'orange'}
                    mt={20}
                  >
                    Process
                  </Button>
                </form>
              </Stack>
            </>
          )}
        </Group>
      </AdminLayout>
    </>
  );
};

export default UpdateOrder;
