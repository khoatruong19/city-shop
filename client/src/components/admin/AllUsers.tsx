import { Box, Button, Group, Title } from '@mantine/core';
import { DataGrid, stringFilterFn } from 'mantine-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  clearUserError,
  deleteUser,
  getAllUsers,
  resetDeleteUserStatus,
} from '../../store/slices/userSlice';
import toaster from '../../utils/helpers/toaster';
import AdminLayout from '../layout/AdminLayout';
import MetaData from '../layout/MetaData';
import ConfirmModal from '../others/ConfirmModal';
import WaitingLoader from '../others/WaitingLoader';

const AllUsers = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error, isDeleted } = useAppSelector(
    (state) => state.user
  );
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);

  const handleDeleteUserClick = (id: string) => {
    setOpenModal(true);
    setUserId(id);
  };

  const handleConfirmDelete = (yes: boolean) => {
    if (yes) {
      dispatch(deleteUser(userId));
      setOpenModal(false);
    } else setOpenModal(false);
    setUserId('');
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toaster({ id: 'delete user', message: 'Delete User fail!' });
      dispatch(clearUserError());
    }
    if (isDeleted) {
      toaster({
        id: 'delete user',
        message: 'User deleted!',
        success: true,
      });
      dispatch(resetDeleteUserStatus());
    }
  }, [dispatch, error, isDeleted]);

  return (
    <>
      <MetaData title="All Users" />
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
              All Users
            </Title>
            <DataGrid
              data={users}
              withGlobalFilter
              withPagination
              fontSize={16}
              pageSizes={['10']}
              columns={[
                {
                  size: 220,
                  header: 'User ID',
                  filterFn: stringFilterFn,
                  accessorFn: (row) => row._id,
                },
                {
                  size: 220,
                  header: 'Email',
                  filterFn: stringFilterFn,
                  accessorFn: (row) => row.email,
                },
                {
                  header: 'Name',
                  filterFn: stringFilterFn,
                  accessorFn: (row) => row.name,
                },
                {
                  header: 'Role',
                  filterFn: stringFilterFn,
                  accessorFn: (row) => row.role,
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
                              `/admin/edit/user/${cell.row.original._id}`
                            )
                          }
                        >
                          Edit
                        </Button>
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
              title="Delete User"
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

export default AllUsers;
