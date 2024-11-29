import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Typography, Divider } from '@mui/material';

export const PartyApplicationsList = ({ topic, partyData }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="pb-2 mb-8">
      <Typography variant="h6" color="textSecondary" gutterBottom>
        {topic}
      </Typography>
      <Divider />

      <div className="p-4">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant='body1' fontWeight="bold">Registration ID</Typography></TableCell>
                <TableCell><Typography variant='body1' fontWeight="bold">Party Name</Typography></TableCell>
                <TableCell><Typography variant='body1' fontWeight="bold">State</Typography></TableCell>
                <TableCell><Typography variant='body1' fontWeight="bold">Registered Date</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {partyData.map((party, index) => (
                <TableRow key={index} hover className='cursor-pointer'>
                  <TableCell><Typography variant='body1'>{party.registrationId}</Typography></TableCell>
                  <TableCell><Typography variant='body1'>{party.partyName}</Typography></TableCell>
                  <TableCell><Typography variant='body1'>{party.status}</Typography></TableCell>
                  <TableCell><Typography variant='body1'>{party.foundedDate}</Typography></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={partyData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};
