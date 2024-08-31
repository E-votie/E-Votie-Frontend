import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearDeterminate({ value = 80, height = 4, width = '100%', color='#00ff00'}) {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress >= value) {
                    clearInterval(timer);
                    return value;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, value);
            });
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, [value]);

    return (
        <Box sx={{ width: width }}>
            <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                    height: height,
                    backgroundColor: '#e0e0e0',
                    borderRadius: 5, // This adds rounded corners to the outer container
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: color,
                        borderRadius: 5, // This adds rounded corners to the progress bar itself
                    }
                }}
            />
        </Box>
    );
}