import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TransferList from './../../Components/TransferList.jsx';

export default function AddCandidates() {
    return (
        <Box className="max-w-full h-full mx-auto mt-12 px-4">
            {/* Card Container */}
            <Card className="shadow-lg rounded-lg overflow-hidden">
                <CardContent className="p-8">
                    {/* Title */}
                    <Typography
                        variant="h4"
                        component="h2"
                        className="text-3xl font-semibold text-center mb-8"
                        style={{ color: '#EC4899' }} // Directly applying the color
                    >
                        Add Candidates
                    </Typography>

                    {/* Content Section */}
                    <Box className="flex flex-col min-h-[500px] m-8">
                        <TransferList />

                        {/* Submit Button Section */}
                        <Box className="mt-8 flex justify-end">
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                aria-label="submit"
                                className="py-3 px-8 text-lg font-semibold"
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

//new line