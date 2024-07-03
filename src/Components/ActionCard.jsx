import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import AnnouncementIcon from '@mui/icons-material/Announcement';

const getIcon = (icon) => {
  switch (icon) {
    case "party":
      return <AccountBalanceIcon sx={{ fontSize: 40 }} />;
    case "candidate":
      return <PersonIcon sx={{ fontSize: 40 }} />;
    case "manifesto":
      return <DescriptionIcon sx={{ fontSize: 40 }} />;
    case "election":
      return <HowToVoteIcon sx={{ fontSize: 40 }} />;
    case "inquiry":
      return <ContactSupportIcon sx={{ fontSize: 40 }} />;
    case "announcement":
      return <AnnouncementIcon sx={{ fontSize: 40 }} />;
    default:
      return <AnnouncementIcon sx={{ fontSize: 40 }} />; // Default icon
  }
};

const ActionCard = ({ icon, action, description }) => {
  return (
    <Card sx={{ width: 200 }}>
      <CardActionArea>
        <div className="flex justify-center items-center my-2">
          {getIcon(icon)}
        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" className='flex justify-center items-center'>
            {action}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ActionCard;
