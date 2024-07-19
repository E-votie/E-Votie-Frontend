import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {Navigate, useNavigate} from "react-router-dom";

export const Politician = () => {

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
            src="..\src\assets\mr.jpg"
            alt="green iguana"
            className='w-[120px] h-[120px] object-cover p-2'
            />
            <CardContent>
            <Typography gutterBottom variant="body1" component="div">
                Mahinda Rajapaksha
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Mahinda Rajapaksa, Sri Lankan politician who served as president of Sri Lanka from 2005 to 2015 and as prime minister from 2019 to 2022.
            </Typography>
            </CardContent>
        </div>
      </CardActionArea>
    </Card>
  );
}
