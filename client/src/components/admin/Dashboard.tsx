import { Box, Group, Stack, Text, Title } from '@mantine/core';
import { Chart as ChartJS, registerables } from 'chart.js';
import { useEffect } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { getAllOrdersByAdmin } from '../../store/slices/orderSlice';
import { getAllProductsByAdmin } from '../../store/slices/productSlice';
import { getAllUsers } from '../../store/slices/userSlice';
import { mainOrangeColor } from '../../utils/constants';
import AdminLayout from '../layout/AdminLayout';
import MetaData from '../layout/MetaData';
import WaitingLoader from '../others/WaitingLoader';

ChartJS.register(...registerables);

const Dashboard = () => {
  const dispatch = useAppDispatch();

  const {
    products,
    productsCount,
    loading: productsLoading,
  } = useAppSelector((state) => state.product);

  const { orders, loading: ordersLoading } = useAppSelector(
    (state) => state.order
  );

  const { users, loading: usersLoading } = useAppSelector(
    (state) => state.user
  );

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ['Initial Amount', 'Amount Earned'],
    datasets: [
      {
        label: 'TOTAL AMOUNT',
        backgroundColor: ['#3BB77E'],
        hoverBackgroundColor: ['#3BB77E'],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ['Out of Stock', 'InStock'],
    datasets: [
      {
        backgroundColor: ['#00A6B4', '#6800B4'],
        hoverBackgroundColor: ['#4B5000', '#35014F'],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  useEffect(() => {
    dispatch(getAllProductsByAdmin());
    dispatch(getAllOrdersByAdmin());
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <>
      <MetaData title="Dashboard" />
      <AdminLayout>
        {productsLoading || ordersLoading || usersLoading ? (
          <WaitingLoader />
        ) : (
          <Box
            sx={{
              padding: '2rem',
              flex: 1,
              maxHeight: '100vh',
              overflowY: 'scroll',
            }}
          >
            <Title align="center" order={1}>
              Dashboard
            </Title>
            <Stack
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem',
                marginTop: '2rem',
                backgroundColor: mainOrangeColor,
                color: 'whitesmoke',
                fontSize: '1.5rem',
                fontWeight: 600,
              }}
              spacing={0}
            >
              <Text>Total Amount</Text>
              <Text>${totalAmount}</Text>
            </Stack>
            <Group
              mt={40}
              spacing={100}
              sx={{
                fontSize: '1.8rem',
                fontWeight: 600,
                alignItems: 'center',
                justifyContent: 'center',
                color: 'whitesmoke',
              }}
            >
              <Link to="/admin/products" style={{ color: 'inherit' }}>
                <Group
                  sx={{
                    width: '12rem',
                    height: '12rem',
                    borderRadius: '50%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'lightgreen',
                    textAlign: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <Text>
                    Products <br /> {productsCount}
                  </Text>
                </Group>
              </Link>
              <Group
                sx={{
                  width: '12rem',
                  height: '12rem',
                  borderRadius: '50%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'salmon',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
              >
                <Text>
                  Orders <br /> {orders.length}
                </Text>
              </Group>
              <Group
                sx={{
                  width: '12rem',
                  height: '12rem',
                  borderRadius: '50%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'lightskyblue',
                  textAlign: 'center',
                }}
              >
                <Text>
                  Users <br /> {users.length}
                </Text>
              </Group>
            </Group>
            <Box style={{ width: '70%', margin: '2rem auto' }}>
              <Line data={lineState} />
            </Box>
            <Box style={{ width: '60%', margin: '2rem auto' }}>
              <Doughnut data={doughnutState} />
            </Box>
          </Box>
        )}
      </AdminLayout>
    </>
  );
};

export default Dashboard;
