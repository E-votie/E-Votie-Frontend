import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {useEffect} from "react";
import {authGet} from "../Auth/authFetch.jsx";
import {navigate} from "react-big-calendar/lib/utils/constants.js";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";

const columns = [
    { id: 'Date', label: 'Date', minWidth: 170 },
    { id: 'Description', label: 'Description', minWidth: 100 },
    {id: 'Button', label: '', minWidth: 100}
];

export default function StickyHeadTable(data) {

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear().toString().slice(-2);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${day}, ${month}, ${year} ${hours}.${minutes}`;
    };
    const dataArray = Array.isArray(data) ? data : Object.values(data);
    console.log(`->>>>>>>>>>>>>>${dataArray}`);
    const navigate = useNavigate();

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', height: "100%" }}>
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
                        {dataArray && dataArray.length > 0 ? (
                            dataArray.map((row) => {
                                console.error(row);
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1}>
                                        <TableCell>
                                            {formatDate(row[0].createdAt)} {/* Assuming row.createdAt exists */}
                                        </TableCell>
                                        <TableCell>
                                            {"You have a new party join request from " + (row[0].party?.partyName || "Unknown Party")}
                                        </TableCell>
                                        <TableCell>
                                            {/* Assuming `row.party.registrationId` and `row.receiverNIC` exist */}
                                            <Button
                                                onClick={() => navigate(`/voter/party_request_details/${row[0].party?.registrationId}/${row[0].receiverNIC}`)}
                                            >
                                                View Details
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3}>No data available</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
