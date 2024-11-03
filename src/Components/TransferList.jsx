import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Swal from 'sweetalert2';  // Import SweetAlert2

// Utility functions (same as before)
function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
    return [...a, ...not(b, a)];
}

export default function TransferList() {
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([
        { id: 0, name: 'John Doe', party: 'Party A' },
        { id: 1, name: 'Jane Smith', party: 'Party B' },
        { id: 2, name: 'Alice Johnson', party: 'Party C' },
        { id: 3, name: 'Bob Brown', party: 'Party D' },
    ]);
    const [right, setRight] = React.useState([
        { id: 4, name: 'Charlie Davis', party: 'Party E' },
        { id: 5, name: 'Diana Green', party: 'Party F' },
        { id: 6, name: 'Edward White', party: 'Party G' },
        { id: 7, name: 'Fiona Black', party: 'Party H' },
    ]);

    const leftChecked = intersection(checked, left.map(item => item.id));
    const rightChecked = intersection(checked, right.map(item => item.id));

    // SweetAlert2 Popup for viewing candidate details
    const handleView = (candidate) => () => {
        Swal.fire({
            title: 'Candidate Details',
            html: `
                <strong>Name:</strong> ${candidate.name}<br>
                <strong>Party:</strong> ${candidate.party}
               <br> <strong>Details:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit
        `,
            icon: 'info',
            confirmButtonText: 'Close',
        });
    };

    const handleToggle = (id) => () => {
        const currentIndex = checked.indexOf(id);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(id);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleApprove = (id) => () => {
        if (!checked.includes(id)) {
            setChecked([...checked, id]);
        }
    };

    const handleRemove = (id) => () => {
        const itemToRemove = right.find(item => item.id === id);
        setRight(right.filter(item => item.id !== id));
        setLeft([...left, itemToRemove]);
        setChecked(checked.filter(checkedId => checkedId !== id));
    };

    const numberOfChecked = (items) => intersection(checked, items.map(item => item.id)).length;

    const handleToggleAll = (items) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items.map(item => item.id)));
        } else {
            setChecked(union(checked, items.map(item => item.id)));
        }
    };

    const handleCheckedRight = () => {
        setRight(right.concat(left.filter(item => leftChecked.includes(item.id))));
        setLeft(left.filter(item => !leftChecked.includes(item.id)));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(right.filter(item => rightChecked.includes(item.id))));
        setRight(right.filter(item => !rightChecked.includes(item.id)));
        setChecked(not(checked, rightChecked));
    };

    const customTable = (title, items, isRight) => (
        <Card sx={{ width: '100%', height: 400, overflow: 'auto', boxShadow: 3 }}>
            <CardHeader
                sx={{ px: 2, py: 1, backgroundColor: '#f5f5f5' }}
                title={title}
                subheader={`${numberOfChecked(items)}/${items.length} selected`}
            />
            <Divider />
            <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
                <Table stickyHeader aria-label={title}>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    onClick={handleToggleAll(items)}
                                    checked={numberOfChecked(items) === items.length && items.length !== 0}
                                    indeterminate={
                                        numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
                                    }
                                    disabled={items.length === 0}
                                    inputProps={{
                                        'aria-label': 'all items selected',
                                    }}
                                />
                            </TableCell>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>Party</strong></TableCell>
                            <TableCell><strong>View</strong></TableCell>
                            <TableCell><strong>{isRight ? 'Remove' : 'Approve'}</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item) => (
                            <TableRow key={item.id} sx={{ '&:nth-of-type(even)': { backgroundColor: '#f9f9f9' } }}>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={checked.indexOf(item.id) !== -1}
                                        onChange={handleToggle(item.id)}
                                        inputProps={{
                                            'aria-labelledby': `transfer-list-${item.id}-label`,
                                        }}
                                    />
                                </TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.party}</TableCell>
                                <TableCell>
                                    <IconButton aria-label="view" onClick={handleView(item)}>
                                        <VisibilityIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    {isRight ? (
                                        <IconButton
                                            aria-label="remove"
                                            onClick={handleRemove(item.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    ) : (
                                        <IconButton
                                            aria-label="approve"
                                            onClick={handleApprove(item.id)}
                                        >
                                            <CheckIcon />
                                        </IconButton>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );

    return (
        <Box sx={{ width: '100%', my: 2 }}>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={12} md={5}>
                    {customTable('Applied Candidates', left, false)}
                </Grid>
                <Grid item xs={12} md={2}>
                    <Grid container direction="column" alignItems="center">
                        <Button
                            sx={{ my: 0.5 }}
                            variant="contained"
                            size="large"
                            onClick={handleCheckedRight}
                            disabled={leftChecked.length === 0}
                            aria-label="move selected right"
                        >
                            &gt;
                        </Button>
                        <Button
                            sx={{ my: 0.5 }}
                            variant="contained"
                            size="large"
                            onClick={handleCheckedLeft}
                            disabled={rightChecked.length === 0}
                            aria-label="move selected left"
                        >
                            &lt;
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={5}>
                    {customTable('Running Candidates', right, true)}
                </Grid>
            </Grid>
        </Box>
    );
}
