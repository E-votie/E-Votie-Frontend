import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function createData(name, type, startDate, endDate) {
    return { name, type, startDate, endDate };
}

const rows = [
    createData('Election 1', 'Presidential', '2024-10-01', '2024-10-15'),
    createData('Election 2', 'Congressional', '2024-11-01', '2024-11-15'),
    createData('Election 3', 'Local', '2024-12-01', '2024-12-15'),
];

export default function ElectionTable() {
    return (
        <Card sx={{ minWidth: 650 }}>
            <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                    Upcoming Elections
                </Typography>
                <TableContainer component={Paper}>
                    <Table aria-label="election table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Type</TableCell>
                                <TableCell align="right">Start Date</TableCell>
                                <TableCell align="right">End Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.type}</TableCell>
                                    <TableCell align="right">{row.startDate}</TableCell>
                                    <TableCell align="right">{row.endDate}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
}
