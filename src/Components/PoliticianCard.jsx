import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {Navigate, useNavigate} from "react-router-dom";

export const Politician = ({politician}) => {

  const navigate = useNavigate();

  // const navigator = (action) => {
  //     if(action === "Party Details"){
  //         navigate(`/party/list`);
  //     }else if(action === "Candidates"){

  //     }else if(action === "Elections"){
  //         navigate(`/election/list`);
  //     }else if(action === "Inquiries"){
  //         navigate(`/inquiries`);
  //     }else if(action === "Announcements"){
  //         navigate(`/announcements`);
  //     }else if(action === "Voter Registration"){
  //         navigate(`/VoterRegistration`);
  //     }else{
  //         console.log("Invalid navigation");
  //     }
  //     console.log(action);
  // };

  const navigator = () => {
    navigate('/party/member');
  }

  return (
    <Card className='w-full ' onClick={navigator}>
      <CardActionArea>
        <div className='flex'> 
            <img
            src={politician.profilePicture}
            alt="green iguana"
            className='w-[120px] h-[120px] object-cover p-2'
            />
            <CardContent>
            <Typography gutterBottom variant="body1" component="div">
                {politician.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {politician.description}
            </Typography>
            </CardContent>
        </div>
      </CardActionArea>
    </Card>
  );
}
