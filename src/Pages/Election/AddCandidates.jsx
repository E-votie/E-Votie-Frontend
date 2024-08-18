import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TransferList from './../../Components/TransferList.jsx';

export default function AddCandidates() {
    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4 }}>
            <Card sx={{ p: 5 }}>
                <CardContent>
                    <Typography variant="h4" component="div" gutterBottom>
                        Add Candidates
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', height: '300px' }}>
                        <TransferList />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <Button
                                className="btn btn-outline btn-primary"
                                aria-label="submit"
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
