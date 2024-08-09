import * as React from 'react';
import ElectionTable from '../../Components/ElectionTable.jsx';
import { Typography, Box } from "@mui/material"; // Adjust the import path as needed

export default function UpcomingElections() {
    const [rows, setRows] = React.useState([
        { name: 'Presidential Elections 2024', type: 'Presidential', startDate: '2024-10-01', endDate: '2024-10-15' },
        { name: 'Parliamentary Elections 2025', type: 'Congressional', startDate: '2025-11-01', endDate: '2025-11-15' },
        { name: 'Local Council Elections 2025', type: 'Local', startDate: '2025-12-01', endDate: '2025-11-15' },
    ]);

    // React.useEffect(() => {
    //     // Add a new row programmatically after component mounts
    //     const newRow = { name: 'Election 4', type: 'State', startDate: '2024-01-01', endDate: '2024-01-15' };
    //     setRows((prevRows) => [...prevRows, newRow]);
    // }, []);

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
            <ElectionTable rows={rows} />
        </div>
    );
}
