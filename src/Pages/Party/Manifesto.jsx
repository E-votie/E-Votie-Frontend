import React from 'react'
import { PromiseCard } from '../../Components/PromiseCard'
import { Box, Typography, Container, Paper, Grid, Avatar } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 32,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

const promises = [
    {
        date: 'Jan 09',
        title: 'Parliament to meet for the first time',
        description: 'Parliament to meet for the first time after common opposition candidate Maithripala Sirisena is elected president on 8th January 2015',
        progress: 100,
        score: '0.0 / 0.0'
    },
    {
        date: 'Jan 10',
        title: 'Other initiative',
        description: 'Description of other initiative',
        progress: 0,
        score: '0.0 / 0.0'
    }
];

export const Manifesto = ({ overallProgress, items }) => {
  return (
    <div className="min-h-[600px] flex flex-col bg-base-100 shadow-2xl px-4 pb-4 gap-6">
        <div maxWidth="md" className="mt-8">
            <Paper elevation={3} className="p-6 mb-4">
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Avatar src="path/to/image.png" alt="Profile" sx={{ width: 80, height: 80 }} />
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant="h5" gutterBottom>Manifesto: Tracking progress, 100 days and beyond</Typography>
                        <Typography variant="body1" color="textSecondary" gutterBottom>{`Overall Progress: ${overallProgress}%`}</Typography>
                        <BorderLinearProgress variant="determinate" value={50} />
                    </Grid>
                </Grid>
                <Box display="flex" justifyContent="space-around" mt={4}>
                    <Typography variant="body2" color="primary">All</Typography>
                    <Typography variant="body2" color="primary">Strengthening Institutions</Typography>
                    <Typography variant="body2" color="primary">Raising Standards</Typography>
                    <Typography variant="body2" color="primary">Relief for the People</Typography>
                    <Typography variant="body2" color="primary">Reforming Elections & the Presidency</Typography>
                    <Typography variant="body2" color="primary">Procedural Steps</Typography>
                </Box>
            </Paper>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Box display="flex" alignItems="center">
                    <Box display="flex" alignItems="center" mr={2}>
                        <Box bgcolor="green" width={16} height={16} borderRadius="50%" />
                        <Typography variant="body2" color="textSecondary" ml={1}>Pledge Completed</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mr={2}>
                        <Box bgcolor="yellow" width={16} height={16} borderRadius="50%" />
                        <Typography variant="body2" color="textSecondary" ml={1}>Partially Completed</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mr={2}>
                        <Box bgcolor="red" width={16} height={16} borderRadius="50%" />
                        <Typography variant="body2" color="textSecondary" ml={1}>Not Done</Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                        <Box bgcolor="gray" width={16} height={16} borderRadius="50%" />
                        <Typography variant="body2" color="textSecondary" ml={1}>Pending</Typography>
                    </Box>
                </Box>
                <Typography variant="body2" color="textSecondary" className="cursor-pointer">How it works</Typography>
            </Box>
            {/* promises */}
            <div className="mt-8 flex justify-center">
                <div className="bg-white rounded-lg py-8 px-4 w-[90%]">
                    {promises.map((promise, index) => (
                        <PromiseCard key={index} {...promise} />
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}
