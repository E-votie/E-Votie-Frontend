import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardMedia, Stack, Box, Chip, LinearProgress  } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import VerifiedIcon from '@mui/icons-material/Verified';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import PageviewIcon from '@mui/icons-material/Pageview';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { keyframes } from '@mui/material';

import unpImage from '../assets/pending.jpg';

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const StampContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: 60,
  height: 60,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
}));

const StampBorder = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  border: `4px dashed rgb(236 72 153)`,
  borderRadius: '50%',
  animation: `${rotate} 10s linear infinite`,
}));

const StampInner = styled(Box)(({ theme }) => ({
  width: '80%',
  height: '80%',
  backgroundColor: 'rgb(236 72 153)',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  animation: `${pulse} 2s ease-in-out infinite`,
}));

const StampText = styled(Typography)(({ theme }) => ({
  color: theme.palette.warning.contrastText,
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: '0.4rem',
  lineHeight: 1.2,
}));

const PendingVerificationStamp = () => {
  return (
    <StampContainer>
      <StampBorder />
      <StampInner>
        <StampText>
          PENDING
          <br />
          VERIFICATION
        </StampText>
      </StampInner>
    </StampContainer>
  );
};

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: theme.shadows[8],
  },
}));

const MemberCountChip = styled(Chip)(({ theme, count }) => ({
  backgroundColor: count > 50 ? theme.palette.success.main : theme.palette.warning.main,
  color: theme.palette.common.white,
  fontWeight: 'bold',
}));

const PartyCard = ({ party, state }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const openParty = () => {
    navigate(`/party/${party.id}`);
  };

  const handleMenuOpen = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getPartyColor = () => {
    // This is a simplified example. You'd need to define your own color scheme.
    const colorMap = {
      'Republican': '#ff0000',
      'Democrat': '#0000ff',
      'Independent': '#006400',
    };
    return colorMap[party.affiliation] || '#808080';
  };

  const handleChipClick = (event) => {

  };

  const getPartyImage = () => {
    if (state === "pending verification") {
      return unpImage;
    }
    return party.image || unpImage; 
  };

  return (
    <StyledCard className='w-full' sx={{width: "100%"}}>
      <CardActionArea className="flex-grow w-full" onClick={openParty}>
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }}>
          {state != "pending verification" && 
          <CardMedia
            component="img"
            sx={{ 
              width: { xs: '100%', sm: 120 }, 
              height: { xs: 200, sm: 120 },
              margin: 'auto'
            }}
            image={party.image}
            alt={party.name}
            className='object-cover'
          />
          }
          {state === "pending verification" && <CardMedia
            component="img"
            sx={{ 
              width: { xs: '100%', sm: 120 }, 
              height: { xs: 200, sm: 120 },
              margin: 'auto'
            }}
            image={unpImage}
            alt={party.name}
            className='object-cover'
          />
          }
          <CardContent className="flex-grow">
            <Typography gutterBottom variant="h6" component="div" sx={{ color: getPartyColor() }}>
              {party.partyName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Party Leader: {party.leader}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Party Secretary: {party.secretary}
            </Typography>
            {/* <Box mt={1}>
              <MemberCountChip 
                label={`${party.memberCount} Members`} 
                count={party.memberCount}
              />
            </Box> */}
          </CardContent>
        </Box>
      </CardActionArea>
      <Box className="flex flex-col justify-between items-center p-2">
        {state === "verified" && (
          <Stack spacing={1} className='flex flex-col items-center justify-center'>
            <Tooltip title="Verified">
              <IconButton size="small" color="primary">
                <VerifiedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Join">
              <IconButton size="small" color="primary">
                <PersonAddIcon />
              </IconButton>
            </Tooltip>
            {/* <Button 
              variant="contained"
              startIcon={<PersonAddIcon />}
              size="small"
              color="primary"
            >
            </Button> */}
          </Stack>

        )}

        {state === "pending verification" && (
          <Stack spacing={1} width="100%" className='flex items-center justify-center h-full'>
            <i>
              <Chip
                  label="Click Here to View Application >>>"
                  clickable
                  onClick={handleChipClick}
                  sx={{ mt: 2, fontSize: '0.8rem', padding: '0.5rem 1rem' }}
              />
            </i>

          </Stack>
        )}
      </Box>
    </StyledCard>
  );
};

export default PartyCard;