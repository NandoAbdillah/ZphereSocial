import { useEffect, useMemo, useState } from 'react';
import axiosClient from '../axios-client';
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from 'material-react-table';
import {
  Box,
  Button,
  ListItemIcon,
  MenuItem,
  Typography,
  lighten,
  Modal,
  Badge,
} from '@mui/material';
import { Delete, Block } from '@mui/icons-material';

// Modal for confirmation
const ConfirmModal = ({ open, onClose, onConfirm, title, message }) => (
  <Modal open={open} onClose={onClose}>
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        p: 4,
        boxShadow: 24,
        borderRadius: 1,
      }}
    >
      <Typography variant="h6" component="h2">
        {title}
      </Typography>
      <Typography sx={{ mt: 2 }}>{message}</Typography>
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={onClose} variant="contained" color="secondary">
          Batal
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error">
          Iya
        </Button>
      </Box>
    </Box>
  </Modal>
);

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [modalState, setModalState] = useState({ open: false, action: null, userId: null });

  // Fetch data using axios
  useEffect(() => {
    axiosClient.get("/all-users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  const handleAction = (action, userId) => {
    setModalState({ open: true, action, userId });
  };

  const handleConfirmAction = () => {
    const { action, userId } = modalState;
    axiosClient.post(`/users/${userId}/${action}`).then(() => {
      if (action === 'ban')
      {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId
              ? { ...user, is_banned: action === 'ban' ? 1 : user.is_banned } // update status if banning
              : user
          )
        );
      } 
      else if (action === 'unban')
      {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId
              ? { ...user, is_banned: action === 'unban' ? 0 : user.is_banned } // update status if unbanning
              : user
          )
        );
      }
    });
    // alert(userId + "=> " + action );
    setModalState({ open: false, action: null, userId: null });
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'uuid',
        header: 'UUID',
      },
      {
        accessorKey: 'profile',
        header: 'Profile',
        Cell: ({ cell }) => (
          <img
            alt="profile"
            height={50}
            src={`${import.meta.env.VITE_ASSET_URL}${cell.getValue()}`}
            loading="lazy"
            style={{ borderRadius: '50%', width: '3rem', height: '3rem' }}
          />
        ),
      },
      {
        accessorKey: 'first_name',
        header: 'First Name',
      },
      {
        accessorKey: 'last_name',
        header: 'Last Name',
      },
      {
        accessorKey: 'username',
        header: 'Username',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'is_banned',
        header: 'Is Banned',
        Cell: ({ cell }) => (
          <Badge
            color={cell.getValue() === 1 ? 'error' : 'info'}
            badgeContent={cell.getValue() === 1 ? 'Yes' : 'No'}
          />
        ),
      },
      {
        accessorKey: 'role',
        header: 'Role',
      },
      {
        accessorKey: 'created_at',
        header: 'Created At',
        Cell: ({ cell }) => new Date(cell.getValue()).toLocaleDateString(),
      },
      {
        accessorKey: 'updated_at',
        header: 'Updated At',
        Cell: ({ cell }) => new Date(cell.getValue()).toLocaleDateString(),
      },
      {
        id: 'actions',
        header: 'Actions',
        Cell: ({ row }) => (
          <Box sx={{ display: 'flex', gap: '0.5rem' }}>
            {/* <Button
              variant="contained"
              color="error"
              onClick={() => handleAction('delete', row.original.id)}
              startIcon={<Delete />}
            >
              Delete
            </Button> */}
            <Button
              variant="contained"
              color={row.original.is_banned ? 'info' : 'warning'}
              onClick={() => handleAction(row.original.is_banned ? 'unban' : 'ban', row.original.id)}
              startIcon={<Block />}
            >
              {row.original.is_banned ? 'Unban' : 'Ban'}
            </Button>
          </Box>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: users, // data from axios
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableFacetedValues: true,
    enableRowSelection: true, // Disable row actions to avoid duplication
    enableRowActions: false,  // Make sure no additional action column is added
    initialState: {
      showColumnFilters: true,
      showGlobalFilter: true,
    },
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    muiSearchTextFieldProps: {
      size: 'small',
      variant: 'outlined',
    },
    muiPaginationProps: {
      color: 'secondary',
      rowsPerPageOptions: [10, 20, 30],
      shape: 'rounded',
      variant: 'outlined',
    },
  });

  return (
    <div className='card p-5'>
      <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '50rem', maxWidth : '83rem' }}>
        <MaterialReactTable table={table} />
      </div>
      <ConfirmModal
        open={modalState.open}
        onClose={() => setModalState({ open: false, action: null, userId: null })}
        onConfirm={handleConfirmAction}
        title="Konfirmasi Tindakan"
        message={`Apakah Anda yakin ingin ${modalState.action} user ini?`}
      />
    </div>
  );
};

export default ManageUsers;
