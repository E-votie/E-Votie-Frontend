import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardMedia, Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import VerifiedIcon from '@mui/icons-material/Verified';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import PageviewIcon from '@mui/icons-material/Pageview';

const PartyCard = ({ party, state }) => {
  const navigate = useNavigate();

  const openParty = () => {
    navigate(`/party/${party.id}`);
  };

  return (
  //   <Card sx={{ maxWidth: 300 }} className='p-2 text-center'>
  //   <CardActionArea>
  //     <div className='partySymbol flex justify-center items-center p-4'>
  //       <CardMedia
  //         component="img"
  //         sx={{ width: 120, height: 120, margin: 'auto 0', cursor: 'pointer' }}
  //         image={party.image}
  //         alt="green iguana"
  //         className='rounded-full object-cover'
  //       />
  //     </div>
  //     <Divider />
  //     <CardContent>
  //       <Typography gutterBottom variant="h5" component="div">
  //         {party.name}
  //       </Typography>
  //       <Typography gutterBottom variant="h5" component="div">
  //         {party.abbreviation}
  //       </Typography>
  //       <Typography variant="body2" color="text.secondary">
  //         <Typography variant="body2" color="text.secondary">
  //           Party Leader: {party.leader}
  //         </Typography>
  //         <Typography variant="body2" color="text.secondary">
  //             Party Secretary: {party.secretary}
  //         </Typography>
  //       </Typography>
  //     </CardContent>
  //   </CardActionArea>
  // </Card>
    <Card className="flex w-full">
      <CardActionArea className="flex" onClick={openParty}>
        <div className='flex'>
          {
            state === "verified" && 
            <CardMedia
              component="img"
              sx={{ width: 120, height: 120, margin: 'auto 0', cursor: 'pointer' }}
              image={party.image}
              alt={party.name}
              className='object-cover'
            />
          }

          {
            state === "pending verification" && 
            <CardMedia
              component="img"
              sx={{ width: 120, height: 120, margin: 'auto 0', cursor: 'pointer' }}
              image={party.image}
              alt={party.name}
              className='object-cover'
            />
          }

          <CardContent className="flex-grow">
            <Typography gutterBottom variant="h6" component="div">
              {party.partyName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Party Leader: {party.leader}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Party Secretary: {party.secretary}
            </Typography>
          </CardContent>
          <div className="flex flex-col justify-center items-center px-4">
            {/* <Typography variant="h6" color="text.primary" className='text-center p-1 w-[48px] h-[48px] border-4 border-black rounded-full object-cover'>
              {party.noOfMPs}
            </Typography> */}
            {
              state === "verified" &&  
              <Stack spacing={1}>
                <Button
                startIcon={<VerifiedIcon />}
                sx={{ backgroundColor: '#1976d2', color: '#fff', '&:hover': { backgroundColor: '#115293' } }}
                >
                Verified
                </Button>
                <Button 
                startIcon={<PersonAddIcon />}
                sx={{ backgroundColor: '#1976d2', color: '#fff', '&:hover': { backgroundColor: '#115293' } }}
                color='success'
                >Join
                </Button>
              </Stack>
            }
            {
              state === "pending verification" &&  
              <Stack spacing={1}>
                <Button
                startIcon={<PendingActionsIcon />}
                sx={{ backgroundColor: 'black', color: '#fff', '&:hover': { backgroundColor: '#115293' } }}
                >
                Pending Verification
                </Button>
                <Button 
                startIcon={<PageviewIcon />}
                sx={{ backgroundColor: 'rgb(236 72 153)', color: '#fff', '&:hover': { backgroundColor: '#115293' } }}
                color='success'
                >View Application
                </Button>
              </Stack>
            }
            {/* <Typography variant="body2" color="text.secondary">
              No of MPs
            </Typography> */}
          </div>
        </div>
      </CardActionArea>
    </Card>
  );
};

export default PartyCard;

