import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TransferList from './../../Components/TransferList.jsx';

export default function AddCandidates() {
    return (
        <Box sx={{ maxWidth: 1400, mx: 'auto', mt: 4, px: 2 }}>
            <Card sx={{ p: { xs: 2, md: 4 } }}>
                <CardContent>
                    <Typography variant="h4" component="div" gutterBottom sx={{ mb: 4 }}>
                        Add Candidates
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '500px' }}>
                        <TransferList />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
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