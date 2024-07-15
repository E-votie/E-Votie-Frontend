import React from 'react';
import { LinearProgress } from '@mui/material';
import { Box, Typography, Container, Paper, Grid, Avatar } from '@mui/material';

export const PromiseCard = ({ date, title, description, progress, score }) => (
    <Paper elevation={3} className="p-4 mb-4">
        <Grid container spacing={2}>
            <Grid item xs={2}>
                <Typography variant="h6">{date}</Typography>
            </Grid>
            <Grid item xs={10}>
                <Typography variant="h6" gutterBottom>{title}</Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>{description}</Typography>
                <Box display="flex" alignItems="center" mt={2}>
                    <LinearProgress variant="determinate" value={progress} style={{ width: '100%', marginRight: 10 }} />
                    <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
                </Box>
                <Typography variant="body2" color="textSecondary">Score: {score}</Typography>
            </Grid>
        </Grid>
    </Paper>
);