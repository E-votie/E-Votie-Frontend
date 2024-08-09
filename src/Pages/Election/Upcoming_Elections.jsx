import * as React from 'react';
import ElectionTable from '../../Components/ElectionTable1.jsx';
import { Typography, Box } from "@mui/material"; // Adjust the import path as needed

export default function UpcomingElections() {
    const columns = ["Name", "Type", "Start Date", "End Date"];
    const rows = [
        { name: 'Election 1', type: 'Presidential', startDate: '2024-10-01', endDate: '2024-10-15' },
        { name: 'Election 2', type: 'Congressional', startDate: '2024-11-01', endDate: '2024-11-15' },
        { name: 'Election 3', type: 'Local', startDate: '2024-12-01', endDate: '2024-12-15' },
    ];

    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 2
                }}
            >
                <Typography variant="h3" component="h1" gutterBottom>
                    Upcoming Elections
                </Typography>
            </Box>
            <ElectionTable rows={rows} columns={columns} enableModal={false} />
        </div>
    );
}
