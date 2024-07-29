import React, { useState } from 'react';
import Divider from '@mui/material/Divider';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import { MoreOverMenu } from './MoreOverMenu';

const options = ["Edit", "Delete"];

export const PartyMemberManifestos = ({ manifestos }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRowClick = (id) => {
        // window.location.href = `party/member/manifesto/${id}`; // Assuming you have a route set up for this
        window.location.href = `member/manifesto`; // Assuming you have a route set up for this
    };

    const handleMenuClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div className="pb-2 mb-8">
            <Typography variant="h6" color="textSecondary" gutterBottom>
                Manifestos
            </Typography>
            <Divider />

            <div className="p-4">
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }} className='w-1/6'><Typography variant="body1">ID</Typography></TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} className='w-2/6'><Typography variant="body1">Manifesto Name</Typography></TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} className='w-1/6'><Typography variant="body1">Created Date</Typography></TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} className='w-1/6'><Typography variant="body1">Overall Progress</Typography></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {manifestos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((manifesto, index) => (
                                <TableRow key={index} onClick={() => handleRowClick(manifesto.id)} style={{ cursor: 'pointer' }} hover>
                                    <TableCell><Typography variant="body1">{manifesto.id}</Typography></TableCell>
                                    <TableCell><Typography variant="body1">{manifesto.manifestoName}</Typography></TableCell>
                                    <TableCell><Typography variant="body1">{manifesto.createdDate}</Typography></TableCell>
                                    <TableCell><Typography variant="body1">{manifesto.progress ? `${manifesto.progress}%` : '0%'}</Typography></TableCell>
                                    <TableCell onClick={handleMenuClick}><MoreOverMenu options={options}/></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={manifestos.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
        </div>
    );
};
