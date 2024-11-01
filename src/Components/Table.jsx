import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress
import { useData } from '../services/TableDataContext.jsx';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Box} from "@mui/system";
import {FormControl, InputLabel, Select, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

export default function ColumnGroupingTable({ link, title }) {
    const { columns, rows, loading } = useData(); // Get loading from context
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const navigate = useNavigate();
    const [status, setStatus] = useState('');
    const [search, setSearch] = useState('');

    const handleStatusChange = (event) => setStatus(event.target.value);
    const handleSearchChange = (event) => setSearch(event.target.value);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleRowClick = (applicationID) => {
        navigate(`${link}${applicationID}`);
    };

    return (
        <div className="min-h-[600px] flex flex-col bg-base-100 shadow-2xl px-4 pb-4 gap-6 rounded-2xl">
            <div className="flex my-7 justify-center items-center bg-[#f8f8f8] h-[70px]">
                <AccountCircleIcon />
                <h2 className="ml-5">{title}</h2>
            </div>
            {loading ? ( // Show loading indicator while fetching
                <div className="flex flex-col items-center justify-center flex-grow">
                    <CircularProgress />
                </div>
            ) : rows.length === 0 ? (
                <div className="flex flex-col items-center justify-center flex-grow">
                    <img className="w-[550px]" src="./../../public/NoTask.jpg" alt="No new applications" />
                </div>
            ) : (
                <Paper sx={{ width: '100%' }}>
                    <Box className="flex items-center justify-end gap-4 p-4">
                        <FormControl variant="outlined" size="small" className="w-40">
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={status}
                                onChange={handleStatusChange}
                                label="Status"
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="Verified">Verified</MenuItem>
                                <MenuItem value="Completed">Completed</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            variant="outlined"
                            size="small"
                            label="Search"
                            value={search}
                            onChange={handleSearchChange}
                        />

                        <Button variant="contained" color="primary" onClick={() => {/* Add search logic */}}>
                            Search
                        </Button>
                    </Box>

                    <TableContainer sx={{ maxHeight: 440 }}>
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
                                    .filter(row =>
                                        (!status || row.status === status) &&
                                        (!search || Object.values(row).some(value => value.toString().toLowerCase().includes(search.toLowerCase())))
                                    )
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.applicationID}
                                            onClick={() => handleRowClick(row.applicationID)}
                                        >
                                            {columns.map((column) => (
                                                <TableCell key={column.id} align={column.align}>
                                                    {row[column.id]}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
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
            )}
        </div>
    );
}
