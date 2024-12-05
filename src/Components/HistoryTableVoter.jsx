import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { AiOutlineNotification } from 'react-icons/ai'; // You can use any icon you prefer, here we're using an external one for style.
import { useEffect } from "react";

const columns = [
    { id: 'Date', label: 'Date', minWidth: 170 },
    { id: 'Description', label: 'Description', minWidth: 100 },
    { id: 'Button', label: '', minWidth: 100 }
];

export default function StickyHeadTable({ data }) {

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear().toString().slice(-2);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${day}, ${month}, ${year} ${hours}:${minutes}`;
    };

    const dataArray = Array.isArray(data) ? data : Object.values(data);
    const navigate = useNavigate();

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <Paper sx={{ width: '100%', overflow: 'hidden' }} className="rounded-xl shadow-lg">
                <div className="flex items-center justify-between p-4 bg-blue-500 text-white rounded-t-xl">
                    <div className="text-2xl font-semibold">Notifications</div>
                    <AiOutlineNotification size={30} />
                </div>
                <TableContainer sx={{ maxHeight: 440 }} className="rounded-b-xl">
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                        className="text-sm font-semibold text-gray-600"
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataArray && dataArray.length > 0 ? (
                                dataArray.map((row, index) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                            <TableCell className="text-sm text-gray-700">
                                                {formatDate(row[0].createdAt)}
                                            </TableCell>
                                            <TableCell className="text-sm text-gray-700">
                                                {"You have a new party join request from " + (row[0].party?.partyName || "Unknown Party")}
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    onClick={() => navigate(`/voter/party_request_details/${row[0].party?.registrationId}/${row[0].receiverNIC}`)}
                                                    variant="contained"
                                                    color="primary"
                                                    className="text-white"
                                                >
                                                    View Details
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center text-xl text-gray-600">
                                        <img src="https://via.placeholder.com/150" alt="No notifications" className="mx-auto mb-4" />
                                        No notifications are available
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}
