import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export const Politician = () => {
  return (
    <Card className='w-full '>
      <CardActionArea>
        <div className='flex'> 
            <img
            src="..\src\assets\mr.jpg"
            alt="green iguana"
            className='w-[120px] h-[120px] object-cover p-2'
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
            </Typography>
            </CardContent>
        </div>
      </CardActionArea>
    </Card>
  );
}
