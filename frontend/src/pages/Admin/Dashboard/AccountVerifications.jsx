import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'mobile_number', label: 'Mobile Number', minWidth: 100 },
  {
    id: 'license_number',
    label: 'License Number',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'address',
    label: 'Address',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
];

function createData(name, mobile_number, license_number, address, actions) {
  return { name, mobile_number, license_number, address, actions };
}

const rows = [
  createData('India', 9009900990, 1324171354, "lorem ipsum", "view"),
  createData('China', 1403500365, 9596961, 'CN', 'view'),
  createData('Italy', 60483973, 301340, 'IT', 'view'),
  createData('Italy', 60483973, 301340, 'IT', 'view'),
  createData('Italy', 60483973, 301340, 'IT', 'view'),
  createData('Italy', 60483973, 301340, 'IT', 'view'),
  createData('Italy', 60483973, 301340, 'IT', 'view'),
  createData('Italy', 60483973, 301340, 'IT', 'view'),
  createData('Italy', 60483973, 301340, 'IT', 'view'),
  createData('Italy', 60483973, 301340, 'IT', 'view'),
  createData('Italy', 60483973, 301340, 'IT', 'view'),
  createData('Italy', 60483973, 301340, 'IT', 'view'),
  createData('Italy', 60483973, 301340, 'IT', 'view'),
  createData('Italy', 60483973, 301340, 'IT', 'view'),
  createData('Italy', 60483973, 301340, 'IT', 'view'),
];

export default function AccountVerifications() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 540 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}