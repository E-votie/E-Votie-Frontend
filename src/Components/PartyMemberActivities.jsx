import React, { useState } from 'react';
import Divider from '@mui/material/Divider';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

export const PartyMemberActivities = ({ activities }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

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
                Activities in Parliament
            </Typography>
            <Divider />

            <div className="p-4">
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><Typography variant="body1" sx={{ fontWeight: 'bold' }}>Hansard code</Typography></TableCell>
                                <TableCell><Typography variant="body1" sx={{ fontWeight: 'bold' }}>Date</Typography></TableCell>
                                <TableCell><Typography variant="body1" sx={{ fontWeight: 'bold' }}>Method of contribution</Typography></TableCell>
                                <TableCell><Typography variant="body1" sx={{ fontWeight: 'bold' }}>Topic</Typography></TableCell>
                                <TableCell><Typography variant="body1" sx={{ fontWeight: 'bold' }}>Page number</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {activities.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((activity, index) => (
                                <TableRow key={index}>
                                    <TableCell><Typography variant="body1">{activity.hansardCode}</Typography></TableCell>
                                    <TableCell><Typography variant="body1">{activity.date}</Typography></TableCell>
                                    <TableCell><Typography variant="body1">{activity.method}</Typography></TableCell>
                                    <TableCell><Typography variant="body1">{activity.topic}</Typography></TableCell>
                                    <TableCell><Typography variant="body1">Page {activity.page}</Typography></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={activities.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
        </div>
    );
};
