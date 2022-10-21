import { StarIcon } from '@heroicons/react/24/solid';
import { Box, Button, Group, Stack, TextInput, Title } from '@mantine/core';
import { DataGrid, numberFilterFn, stringFilterFn } from 'mantine-data-grid';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  clearProductError,
  deleteProductReview,
  getProductReviews,
  resetDeleteProductStatus,
} from '../../store/slices/productSlice';
import toaster from '../../utils/helpers/toaster';
import AdminLayout from '../layout/AdminLayout';
import MetaData from '../layout/MetaData';
import ConfirmModal from '../others/ConfirmModal';

const AllReviews = () => {
  const dispatch = useAppDispatch();
  const { productReviews, reviewLoading, error, isDeleted } = useAppSelector(
    (state) => state.product
  );

  const [openModal, setOpenModal] = useState(false);
  const [reviewId, setReviewId] = useState('');
  const [productId, setProductId] = useState('');

  const handleProductIdSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(getProductReviews(productId));
  };

  const handleDeleteUserClick = (id: string) => {
    setOpenModal(true);
    setReviewId(id);
  };

  const handleConfirmDelete = (yes: boolean) => {
    if (yes) {
      dispatch(
        deleteProductReview({
          productId,
          reviewId,
        })
      );
      setOpenModal(false);
    } else setOpenModal(false);
    setReviewId('');
  };

  useEffect(() => {
    if (error) {
      toaster({ id: 'delete-review', message: error });
      dispatch(clearProductError());
    }
    if (isDeleted) {
      toaster({
        id: 'delete-review',
        message: 'Review deleted!',
        success: true,
      });
      dispatch(resetDeleteProductStatus());
    }
  }, [error, isDeleted, dispatch]);
  return (
    <>
      <MetaData title="Product Reviews" />
      <AdminLayout>
        <Box
          sx={{
            padding: '2rem',
          }}
        >
          <Title align="center" order={1} mb={20}>
            Product Reviews
          </Title>

          <form
            onSubmit={handleProductIdSubmit}
            style={{ width: '30vw', margin: '3rem auto 2rem' }}
          >
            <Stack>
              <TextInput
                placeholder="Product ID"
                icon={
                  <StarIcon className="footerIcon" style={{ color: 'gray' }} />
                }
                size="md"
                required
                onChange={(e) => setProductId(e.target.value)}
              />
              <Button type="submit" size="md" color="orange">
                Search
              </Button>
            </Stack>
          </form>

          <DataGrid
            data={productReviews.reviews}
            withPagination
            fontSize={16}
            pageSizes={['10']}
            columns={[
              {
                size: 220,
                header: 'Review ID',
                filterFn: stringFilterFn,
                accessorFn: (row) => row._id,
              },
              {
                size: 200,
                header: 'User',
                filterFn: stringFilterFn,
                accessorFn: (row) => row.name,
              },
              {
                size: 600,
                header: 'Comment',
                filterFn: stringFilterFn,
                accessorFn: (row) => row.comment,
              },
              {
                header: 'Rating',
                filterFn: numberFilterFn,
                accessorFn: (row) => row.rating,
              },
              {
                header: 'Actions',
                size: 200,
                cell: (cell) => {
                  return (
                    <Group spacing={10}>
                      <Button
                        color="red"
                        onClick={() =>
                          handleDeleteUserClick(cell.row.original._id)
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
            title="Delete Review"
            open={openModal}
            setOpen={setOpenModal}
            handleConfirm={handleConfirmDelete}
          />
        </Box>
      </AdminLayout>
    </>
  );
};

export default AllReviews;
