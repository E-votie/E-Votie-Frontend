import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const ActionCard = ({action}) => {
  return (
    <Card sx={{ width: 200 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" className='flex justify-center items-center'>
            {action}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ActionCard;
