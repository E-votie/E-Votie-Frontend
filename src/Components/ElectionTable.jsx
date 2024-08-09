import React, { useState } from 'react';
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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ElectionTable({ rows, columns }) {
    const [open, setOpen] = useState(false);
    const [selectedDescription, setSelectedDescription] = useState('');

    const handleClickOpen = (description) => {
        setSelectedDescription(description);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Card sx={{ minWidth: 650, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    Election Information
                </Typography>
                <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
                    <Table aria-label="election table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column, index) => (
                                    <TableCell
                                        key={index}
                                        align={index === 0 ? 'left' : 'right'}
                                        sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}
                                    >
                                        {column}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, rowIndex) => (
                                <TableRow
                                    key={rowIndex}
                                    onClick={() => handleClickOpen(row.description)}
                                    sx={{
                                        cursor: 'pointer',
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5',
                                        },
                                    }}
                                >
                                    {Object.values(row).map((value, cellIndex) => (
                                        <TableCell
                                            key={cellIndex}
                                            align={cellIndex === 0 ? 'left' : 'right'}
                                        >
                                            {value}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="sm"
                fullWidth
                sx={{
                    '& .MuiDialog-paper': {
                        borderRadius: '12px',
                        padding: '20px',
                    },
                }}
            >
                <DialogTitle
                    id="alert-dialog-title"
                    sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}
                >
                    Election Description
                </DialogTitle>
                <DialogContent>
                    <DialogContentText
                        id="alert-dialog-description"
                        sx={{ fontSize: '1rem', color: '#555' }}
                    >
                        {selectedDescription}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        variant="contained"
                        color="primary"
                        sx={{
                            borderRadius: '20px',
                            textTransform: 'none',
                            padding: '8px 24px',
                        }}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}
