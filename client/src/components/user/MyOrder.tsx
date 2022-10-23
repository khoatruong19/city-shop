import { Box, Button, Group, Title } from '@mantine/core';
import { DataGrid, numberFilterFn, stringFilterFn } from 'mantine-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  clearOrderError,
  getAllUserOrders,
} from '../../store/slices/orderSlice';
import toaster from '../../utils/helpers/toaster';
import Header from '../layout/Header';
import MetaData from '../layout/MetaData';
import WaitingLoader from '../others/WaitingLoader';

const MyOrders = () => {
  const dispatch = useAppDispatch();
  const { orders, loading, error } = useAppSelector((state) => state.order);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllUserOrders());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toaster({ id: 'get orders', message: 'Get Orders fail!' });
      dispatch(clearOrderError());
    }
  }, [dispatch, error]);

  return (
    <>
      <MetaData title="My Orders" />
      <Header />
      {loading ? (
        <WaitingLoader />
      ) : (
        <Box
          sx={{
            padding: '2rem',
          }}
        >
          <Title align="center" order={1} mb={20}>
            My Orders
          </Title>
          <DataGrid
            data={orders}
            withGlobalFilter
            withPagination
            fontSize={16}
            pageSizes={['10']}
            iconColor="orange"
            columns={[
              {
                size: 220,
                header: 'Order ID',
                filterFn: stringFilterFn,
                accessorFn: (row) => row._id,
              },
              {
                header: 'Status',
                filterFn: stringFilterFn,
                accessorFn: (row) => row.orderStatus,
              },
              {
                header: 'Items Qty',
                filterFn: numberFilterFn,
                accessorFn: (row) => row.orderItems.length,
              },
              {
                header: 'Amount',
                filterFn: numberFilterFn,
                accessorFn: (row) => row.totalPrice,
              },
              {
                header: 'Actions',
                size: 200,
                cell: (cell) => {
                  return (
                    <Group spacing={10}>
                      <Button
                        color="green"
                        onClick={() =>
                          navigate(`/orders/${cell.row.original._id}`)
                        }
                      >
                        View
                      </Button>
                    </Group>
                  );
                },
              },
            ]}
          />
        </Box>
      )}
    </>
  );
};

export default MyOrders;
