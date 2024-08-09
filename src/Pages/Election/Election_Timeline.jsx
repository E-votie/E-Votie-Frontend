import * as React from 'react';
import ElectionTable from '../../Components/ElectionTable.jsx';
import { Typography, Box } from "@mui/material"; // Adjust the import path as needed

export default function ElectionTimeline() {
    const columns = ["Name", "Start Date", "End Date", "Description"];
    const rows = [
        { name: 'Election 1', startDate: '2024-10-01', endDate: '2024-10-15', description: 'Presidential election' },
        { name: 'Election 2', startDate: '2024-11-01', endDate: '2024-11-15', description: 'Congressional election' },
        { name: 'Election 3', startDate: '2024-12-01', endDate: '2024-12-15', description: 'Local election' },
    ];

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
                    Election Timeline
                </Typography>
            </Box>
            <ElectionTable rows={rows} columns={columns} />
        </div>
    );
}
