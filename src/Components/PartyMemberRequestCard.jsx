import React from 'react';
import { Card, CardContent, CardActions, Button, Typography, Avatar, Box } from '@mui/material';
import { CardActionArea } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export const PartyMemberRequestCard = ({politician, requestState}) => {
  return (
    <Card className='flex gap-4 py-3 px-4 cursor-pointer'>
        <Avatar 
            src="path-to-avatar-image.jpg" 
            sx={{ width: 40, height: 40 }} 
        />
        <Box className="flex flex-col justify-center">
            <CardContent  sx={{padding: 0 }}>
                <Typography variant="body1" >{politician.name}</Typography>
            </CardContent>
            <CardActions  sx={{padding: 0 }}>
                {
                    requestState === 'Received Request' &&
                    <div className='flex gap-1'>
                        <Button variant="contained" color="primary" sx={{height: 25 }}><Typography sx={{fontSize: 12 }}>Confirm</Typography></Button>
                        <Button variant="outlined" color="secondary" sx={{height: 25 }}><Typography sx={{fontSize: 12 }}>Delete</Typography></Button>
                    </div>
                }
                {
                    requestState === 'Sent Request' &&
                    <div className='flex gap-1'>
                        <Button variant="contained" color="primary" sx={{height: 25 }} disabled><Typography sx={{fontSize: 12 }} >Pending</Typography></Button>
                        <Button variant="outlined" color="secondary" sx={{height: 25 }}><Typography sx={{fontSize: 12 }}>Delete</Typography></Button>
                    </div>
                }
                {
                    requestState === 'New Politician' &&
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ height: 25 }}
                        className="flex items-center justify-center"
                        startIcon={<PersonAddIcon />}
                    >
                        <Typography sx={{ fontSize: 12 }}>Add Politician</Typography>
                    </Button>
                }
            </CardActions>
        </Box>
    </Card>
  );
};

