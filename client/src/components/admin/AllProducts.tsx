import { Box, Button, Group, Title } from '@mantine/core';
import {
  DataGrid,
  dateFilterFn,
  numberFilterFn,
  stringFilterFn,
} from 'mantine-data-grid';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { getAllProductsByAdmin } from '../../store/slices/productSlice';
import AdminLayout from '../layout/AdminLayout';
import WaitingLoader from '../others/WaitingLoader';

const AllProducts = () => {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.product);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllProductsByAdmin());
  }, []);

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
            data={products}
            withGlobalFilter
            withPagination
            fontSize={16}
            pageSizes={['10']}
            columns={[
              {
                size: 220,
                header: 'Product ID',
                filterFn: stringFilterFn,
                accessorFn: (row) => row._id,
              },
              {
                header: 'Name',
                filterFn: stringFilterFn,
                accessorFn: (row) => row.name,
              },
              {
                header: 'Stock',
                filterFn: numberFilterFn,
                accessorFn: (row) => row.stock,
              },
              {
                header: 'Price',
                filterFn: numberFilterFn,
                accessorFn: (row) => row.price,
              },
              {
                header: 'Actions',
                size: 200,
                cell: (cell) => {
                  console.log({ cell });
                  return (
                    <Group spacing={10}>
                      <Button
                        color="green"
                        onClick={() =>
                          navigate(`/edit/product/${cell.row.original._id}`)
                        }
                      >
                        Edit
                      </Button>
                      <Button color="red">Delete</Button>
                    </Group>
                  );
                },
              },
            ]}
          />
        </Box>
      )}
    </AdminLayout>
  );
};

export default AllProducts;
