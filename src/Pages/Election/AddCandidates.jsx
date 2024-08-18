import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TransferList from './../../Components/TransferList.jsx'; // Import the TransferList component

export default function AddCandidates() {
    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4 }}>
            <Typography variant="h4" component="div" gutterBottom>
                Add Candidates
            </Typography>
            <TransferList />
        </Box>
    );
}
