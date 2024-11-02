import ElectionTable from '../../Components/ElectionTable.jsx'; // Adjust the import path as needed
import {  Box } from "@mui/material"; // Adjust the import path as needed

export default function ElectionTimeline() {
    const columns = ["Name", "Start Date", "End Date", "Description"];
    const rows = [
        { Name: 'Voter Registration', 'Start Date': '2024-10-01', 'End Date': '2024-10-15', Description: 'Voter Reg details' },
        { Name: 'Nomination Call', 'Start Date': '2024-11-01', 'End Date': '2024-11-15', Description: 'Nomination details' },
        { Name: 'Marketing', 'Start Date': '2024-12-01', 'End Date': '2024-12-15', Description: 'Marketing details' },
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
                {/*<Typography variant="h3" component="h1" gutterBottom>*/}
                {/*    Election Timeline*/}
                {/*</Typography>*/}
            </Box>
            <ElectionTable rows={rows} columns={columns} />
        </div>
    );
}
