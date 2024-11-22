import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Typography, Divider } from '@mui/material';

export const Elections = ({ topic, electionData }) => {
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
      <Typography variant="h6" color="textSecondary" gutterBottom className="p-4">
        {topic}
      </Typography>
      <Divider />

      <div className="p-4">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant='body1' fontWeight="bold">Name</Typography></TableCell>
                <TableCell><Typography variant='body1' fontWeight="bold">Type</Typography></TableCell>
                <TableCell><Typography variant='body1' fontWeight="bold">Start Date</Typography></TableCell>
                <TableCell><Typography variant='body1' fontWeight="bold">End Date</Typography></TableCell>
                <TableCell><Typography variant='body1' fontWeight="bold">Status</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {electionData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((election, index) => (
                <TableRow key={index} hover className='cursor-pointer'>
                  <TableCell><Typography variant='body1'>{election.type}</Typography></TableCell>
                  <TableCell><Typography variant='body1'>{election.name}</Typography></TableCell>
                  <TableCell><Typography variant='body1'>{election.electionStartDate}</Typography></TableCell>
                  <TableCell><Typography variant='body1'>{election.electionEndDate}</Typography></TableCell>
                  <TableCell><Typography variant='body1'>{election.status}</Typography></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={electionData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};
