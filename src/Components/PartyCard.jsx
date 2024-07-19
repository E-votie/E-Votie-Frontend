import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardMedia } from '@mui/material';
import Divider from '@mui/material/Divider';

const PartyCard = ({ party }) => {
  const navigate = useNavigate();

  const openParty = () => {
    navigate(`/party/${party.id}`);
  };

  return (
    <Card sx={{ maxWidth: 300 }} className='p-2 text-center'>
    <CardActionArea>
      <div className='partySymbol flex justify-center items-center p-4'>
        <CardMedia
          component="img"
          sx={{ width: 120, height: 120, margin: 'auto 0', cursor: 'pointer' }}
          image={party.image}
          alt="green iguana"
          className='rounded-full object-cover'
        />
      </div>
      <Divider />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {party.name}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {party.abbreviation}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <Typography variant="body2" color="text.secondary">
            Party Leader: {party.leader}
          </Typography>
          <Typography variant="body2" color="text.secondary">
              Party Secretary: {party.secretary}
          </Typography>
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
    // <Card className="flex w-full my-2">
    //   <CardActionArea className="flex" onClick={openParty}>
    //     <div className='flex'>
    //       <CardMedia
    //         component="img"
    //         sx={{ width: 120, height: 120, margin: 'auto 0', cursor: 'pointer' }}
    //         image={party.image}
    //         alt={party.name}
    //         className='object-cover'
    //       />
    //       <CardContent className="flex-grow">
    //         <Typography gutterBottom variant="h6" component="div">
    //           {party.name}
    //         </Typography>
    //         <Typography variant="body2" color="text.secondary">
    //           Party Leader: {party.leader}
    //         </Typography>
    //         <Typography variant="body2" color="text.secondary">
    //           Party Secretary: {party.secretary}
    //         </Typography>
    //       </CardContent>
    //       <div className="flex flex-col justify-center items-center px-4">
    //         <Typography variant="h6" color="text.primary" className='text-center p-1 w-[48px] h-[48px] border-4 border-black rounded-full object-cover'>
    //           {party.noOfMPs}
    //         </Typography>
    //         <Typography variant="body2" color="text.secondary">
    //           No of MPs
    //         </Typography>
    //       </div>
    //     </div>
    //   </CardActionArea>
    // </Card>
  );
};

export default PartyCard;

