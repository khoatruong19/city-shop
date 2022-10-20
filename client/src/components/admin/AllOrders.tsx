import { Box, Button, Group, Title } from '@mantine/core';
import {
  DataGrid,
  dateFilterFn,
  numberFilterFn,
  stringFilterFn,
} from 'mantine-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { getAllOrdersByAdmin } from '../../store/slices/orderSlice';
import {
  clearProductError,
  deleteProduct,
  getAllProductsByAdmin,
  resetDeleteProductStatus,
} from '../../store/slices/productSlice';
import toaster from '../../utils/helpers/toaster';
import AdminLayout from '../layout/AdminLayout';
import ConfirmModal from '../others/ConfirmModal';
import WaitingLoader from '../others/WaitingLoader';

const AllOrders = () => {
  const dispatch = useAppDispatch();
  const { orders, loading, error, isDeleted } = useAppSelector(
    (state) => state.order
  );
  const [productId, setProductId] = useState('');
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);

  const handleDeleteProductClick = (id: string) => {
    setOpenModal(true);
    setProductId(id);
  };

  const handleConfirmDelete = (yes: boolean) => {
    if (yes) {
      dispatch(deleteProduct(productId));
      setOpenModal(false);
    } else setOpenModal(false);
    setProductId('');
  };

  useEffect(() => {
    dispatch(getAllOrdersByAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toaster({ id: 'delete product', message: 'Delete Product fail!' });
      dispatch(clearProductError());
    }
    if (isDeleted) {
      toaster({
        id: 'delete product',
        message: 'Product deleted!',
        success: true,
      });
      dispatch(resetDeleteProductStatus());
    }
  }, [dispatch, error, isDeleted]);

  console.log({ orders });

  return (
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
            All Products
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
                            `/admin/edit/product/${cell.row.original._id}`
                          )
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        color="red"
                        onClick={() =>
                          handleDeleteProductClick(cell.row.original._id)
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
            title="Delete Product"
            open={openModal}
            setOpen={setOpenModal}
            handleConfirm={handleConfirmDelete}
          />
        </Box>
      )}
    </AdminLayout>
  );
};

export default AllOrders;