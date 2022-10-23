import { Box, Button, Group, Title } from '@mantine/core';
import { DataGrid, numberFilterFn, stringFilterFn } from 'mantine-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  clearOrderError,
  deleteOrder,
  getAllOrdersByAdmin,
  resetDeleteOrderStatus,
} from '../../store/slices/orderSlice';
import toaster from '../../utils/helpers/toaster';
import AdminLayout from '../layout/AdminLayout';
import MetaData from '../layout/MetaData';
import ConfirmModal from '../others/ConfirmModal';
import WaitingLoader from '../others/WaitingLoader';

const AllOrders = () => {
  const dispatch = useAppDispatch();
  const { orders, loading, error, isDeleted } = useAppSelector(
    (state) => state.order
  );
  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);

  const handleDeleteOrderClick = (id: string) => {
    setOpenModal(true);
    setOrderId(id);
  };

  const handleConfirmDelete = (yes: boolean) => {
    if (yes) {
      dispatch(deleteOrder(orderId));
      setOpenModal(false);
    } else setOpenModal(false);
    setOrderId('');
  };

  useEffect(() => {
    dispatch(getAllOrdersByAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toaster({ id: 'delete order', message: 'Delete Order fail!' });
      dispatch(clearOrderError());
    }
    if (isDeleted) {
      toaster({
        id: 'delete order',
        message: 'Order deleted!',
        success: true,
      });
      dispatch(resetDeleteOrderStatus());
    }
  }, [dispatch, error, isDeleted]);

  return (
    <>
      <MetaData title="All Orders" />
      <AdminLayout>
        {loading ? (
          <WaitingLoader />
        ) : (
          <Box
            sx={{
              padding: '2rem',
            }}
          >
            <Title align="center" order={1} mb={20}>
              All Orders
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
                            navigate(
                              `/admin/edit/order/${cell.row.original._id}`
                            )
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          color="red"
                          onClick={() =>
                            handleDeleteOrderClick(cell.row.original._id)
                          }
                        >
                          Delete
                        </Button>
                      </Group>
                    );
                  },
                },
              ]}
            />
            <ConfirmModal
              title="Delete Order"
              open={openModal}
              setOpen={setOpenModal}
              handleConfirm={handleConfirmDelete}
            />
          </Box>
        )}
      </AdminLayout>
    </>
  );
};

export default AllOrders;
