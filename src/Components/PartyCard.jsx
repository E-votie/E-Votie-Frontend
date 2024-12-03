import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardMedia, Stack, Box  } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import VerifiedIcon from '@mui/icons-material/Verified';
import { keyframes } from '@mui/material';
import unpImage from '../assets/pending.jpg';
const partyUrl = import.meta.env.VITE_API_PARTY_URL;
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

const PartyCard = ({ party, state, viewMode }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [partyImageUrl, setPartyImageUrl] = useState(null);

  useEffect(() => {
    const fetchPartyImage = async () => {
      try {
        const imageUrl = `${partyUrl}/api/document/url/${party.documents[1].documentName}`;
        const response = await axios.post(imageUrl);
        setPartyImageUrl(response.data);
      } catch (error) {
        console.error('Error fetching party image:', error);
        // Fallback to default image if fetch fails
        setPartyImageUrl(unpImage);
      }
    };

    // Only fetch if there's a document URL and we're not in pending verification state
    if (party.documents && party.documents[1] && party.documents[1].documentUrl && state !== "pending verification") {
      fetchPartyImage();
    }
  }, [party, state]);

  const openParty = () => {
    if(viewMode === 'application') {
      navigate(`/party/registration/application/${party.registrationId}`);
    }else{
      navigate(`/party/${party.registrationId}`);
    }
  };

  return (
    <StyledCard className='w-full' sx={{width: "100%"}}>
      <CardActionArea className="flex-grow w-full" onClick={openParty}>
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }}>
          {state !== "pending verification" && (
            <CardMedia
              component="img"
              sx={{ 
                width: { xs: '100%', sm: 120 }, 
                height: { xs: 200, sm: 120 },
              }}
              src={partyImageUrl || unpImage}
              alt={party.name}
              className='object-cover'
            />
          )}
          {state === "pending verification" && (
            <CardMedia
              component="img"
              sx={{ 
                width: { xs: '100%', sm: 120 }, 
                height: { xs: 200, sm: 120 },
              }}
              src={partyImageUrl || unpImage}
              alt={party.name}
              className='object-cover'
            />
          )}
          <CardContent className="flex border-b-2">
            <Box>
              <Typography gutterBottom variant="h6" component="div" sx={{ color: "black" }} className="font-semibold text-gray-900 flex justify-between">
                {party.partyName}-{party.abbreviation}
                {state === "verified" && (
                  <Stack spacing={1} className='flex flex-col items-center justify-center'>
                    <Tooltip title="Verified">
                      <IconButton size="small" color="primary">
                        <VerifiedIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                )}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Party Leader: {party.leader}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Party Secretary: {party.secretary}
              </Typography>
            </Box>
          </CardContent>
        </Box>
      </CardActionArea>
    </StyledCard>
  );
};

export default PartyCard;