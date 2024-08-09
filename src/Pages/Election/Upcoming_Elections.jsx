import * as React from 'react';
import ElectionTable from '../../Components/ElectionTable.jsx';
import { Typography, Box } from "@mui/material"; // Adjust the import path as needed

export default function UpcomingElections() {
    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 2 // Adds margin-bottom to space out the heading from the table
                }}
            >
                <Typography variant="h3" component="h1" gutterBottom>
                    Upcoming Elections
                </Typography>
            </Box>
            <ElectionTable />
        </div>
    );
}
