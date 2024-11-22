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
import axios from 'axios';
import {authGet} from "../Auth/authFetch.jsx";  // You can use axios or fetch

// Utility functions
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
    const [left, setLeft] = React.useState([]);  // Empty initially
    const [right, setRight] = React.useState([]); // Empty initially
    const [loading, setLoading] = React.useState(true); // To track the loading state
    const [error, setError] = React.useState(null); // To handle any errors
    const electionId = window.location.pathname.split("/").pop();

    // Fetch data from the backend
    React.useEffect(() => {
        // Replace with your actual API endpoints
        const fetchData = async () => {
            try {
                const responseLeft = await authGet(`/election/get_candidates/${electionId}/Pending`); // Example API for left candidates
                const responseRight = await authGet(`/election/get_candidates/${electionId}/Accepted`); // Example API for right candidates

                // Set the state with the fetched data
                setLeft(responseLeft.data);
                setRight(responseRight.data);
                console.log(responseLeft.data, responseRight.data);
            } catch (err) {
                setError('Failed to fetch data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);  // Empty dependency array ensures this runs only once when the component is mounted

    const leftChecked = intersection(checked, left.map(item => item.id));
    const rightChecked = intersection(checked, right.map(item => item.id));

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
        const selectedCandidates = left.filter(item => leftChecked.includes(item.id));
        console.log(selectedCandidates[0].id);
        const responseLeft = authGet(`/election/set_status_candidates/${electionId}/${selectedCandidates[0].id}/Accepted`);
        setRight(right.concat(selectedCandidates));
        setLeft(left.filter(item => !leftChecked.includes(item.id)));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = async () => {
        const selectedCandidates = right.filter(item => rightChecked.includes(item.id));

        // Make an API call to update candidate status to 'Pending'
        try {
            await authGet(`/election/set_status_candidates/${electionId}/${selectedCandidates[0].id}/Pending`);

            // Update the local state
            setLeft(left.concat(selectedCandidates));
            setRight(right.filter(item => !rightChecked.includes(item.id)));
            setChecked(not(checked, rightChecked));
        } catch (error) {
            console.error("Error updating candidate status:", error);
            setError('Failed to update candidate status.');
        }
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
                            <TableCell><strong>{isRight ? 'Remove' : 'Verified'}</strong></TableCell>
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
                                    <IconButton aria-label="view">
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
                                            aria-label="verified"
                                            onClick={handleApprove(item.id)}
                                        >
                                            <CheckIcon  sx={{ color: 'green' }} />
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

    // If data is still loading, show a loading state
    if (loading) {
        return <Box sx={{ textAlign: 'center', mt: 4 }}>Loading...</Box>;
    }

    // If an error occurred, display an error message
    if (error) {
        return <Box sx={{ textAlign: 'center', mt: 4, color: 'red' }}>Error: {error}</Box>;
    }

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
