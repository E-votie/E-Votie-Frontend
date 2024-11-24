import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Typography, Divider } from '@mui/material';
import Button from "@mui/material/Button";

export const Elections = ({ topic, electionData, navigate }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleButtonClick = (status, electionID) => {
    switch (status) {
      case 'Voter Registration':
        navigate('/voter-registration');
        break;
      case 'Nomination':
        navigate(`/Election/AddCandidates/${electionID}`);
        break;
      case 'Election Date':
        navigate('/election-date');
        break;
      default:
        return;
    }
  };

  // Function to determine the button text based on election status
  const getButtonText = (status) => {
    switch (status) {
      case 'Voter_Registration':
        return 'Abort';
      case 'Nomination':
        return 'Add Candidates';
      case 'Election_Date':
        return 'Setup the Machines';
      default:
        return 'No action';
    }
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
                <TableCell><Typography variant='body1' fontWeight="bold"></Typography></TableCell>
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
                  <TableCell>
                    <Button onClick={() => handleButtonClick(election.status, election.id)}>
                      {getButtonText(election.status)}
                    </Button>
                  </TableCell>
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
