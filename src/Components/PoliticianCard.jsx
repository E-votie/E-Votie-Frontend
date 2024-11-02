import React from 'react';
import { Card, CardActionArea, CardContent, Typography, Box, Avatar, Chip, useTheme } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  backgroundColor: "#fff",
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  border: `4px solid ${theme.palette.background.paper || '#fff'}`, // Fallback to white if undefined
  marginTop: -30,
  marginLeft: theme.spacing(2),
  boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
}));

export const Politician = ({ politician }) => {
  const navigate = useNavigate();
  const theme = useTheme(); // Access the theme

  const handleClick = () => {
    navigate('/party/member');
  };

  return (
    <StyledCard onClick={handleClick} className="w-[calc(50%-0.5rem)]">
      <CardActionArea>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {/* <Box sx={{ height: 80, bgcolor: 'primary.main' }} /> */}
          <CardContent sx={{ display: 'flex', alignItems: "center", justifyContent: "space-between", pt: 4 }}>
            <StyledAvatar src={politician.profilePicture} alt={politician.name} />
            <Box sx={{ ml: 3, flex: 1 }}>
              <Typography variant="h5" component="div" gutterBottom>
                {politician.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {politician.description}
              </Typography>
              <Chip 
                label={politician.party} 
                color="primary" 
                size="small" 
                sx={{ mr: 1 }}
              />
              <Chip 
                label={politician.position} 
                color="secondary" 
                size="small" 
              />
            </Box>
          </CardContent>
        </Box>
      </CardActionArea>
    </StyledCard>
  );
};
