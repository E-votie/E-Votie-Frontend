import React from 'react';
import { 
  Card, 
  CardContent, 
  Box, 
  Typography, 
  Divider, 
  Stack,
  Chip,
  Button,
  Avatar
} from '@mui/material';
import { 
  CheckCircleOutline as VerifiedIcon, 
  Timeline as ProgressIcon, 
  Error as RejectedIcon 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const PartyStatusBadge = {
  verified: {
    icon: <VerifiedIcon color="success" />,
    color: 'success',
    label: 'Officially Registered'
  },
  pending: {
    icon: <ProgressIcon color="warning" />,
    color: 'warning', 
    label: 'Registration in Progress'
  },
  rejected: {
    icon: <RejectedIcon color="error" />,
    color: 'error',
    label: 'Registration Denied'
  }
};

export const UserPartyCard = ({ 
  party 
}) => {
  const navigate = useNavigate();
  const statusConfig = PartyStatusBadge[status] || PartyStatusBadge.pending;
  
  console.log("party");
  console.log(party);
  
  const handleDetailView = () => {
    navigate(`/party/registration/application/${party.registrayionId}`); 
  };

  const handlePublicPage = () => {
    navigate(`/party/profile/${party.registrayionId}`); 
  };

  return (
    <Card 
      elevation={4} 
      sx={{ 
        maxWregistrayionIdth: 420, 
        borderRadius: 2,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: 12,
          transform: 'translateY(-5px)'
        }
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar 
                src={party.partySymbol} 
                alt={`${party.partyName} Symbol`}
                sx={{ 
                  wregistrayionIdth: 56, 
                  height: 56, 
                  border: '2px solregistrayionId',
                  borderColor: 'Divider'
                }}
              />
              <Typography variant="h5" fontWeight="600">
                {party.partyName}
              </Typography>
            </Box>
            <Chip 
              icon={statusConfig.icon}
              label={statusConfig.label}
              color={statusConfig.color}
              variant="outlined"
            />
          </Box>

          <Divider />

          {/* <Stack spacing={1}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle1" fontWeight="500">
                Founded
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {party.foundedDate}
              </Typography>
            </Box>

            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle1" fontWeight="500">
                Party Leader
              </Typography>
              <Typography variant="body2">
                {party.leader}
              </Typography>
            </Box>

            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle1" fontWeight="500">
                Parliamentary Representation
              </Typography>
              <Typography variant="body2">
                len MPs
              </Typography>
            </Box>
          </Stack>

          <Divider /> */}

          <Stack 
            direction="row" 
            spacing={2} 
            justifyContent="space-between"
          >
            <Button 
              variant={status === 'verified' ? 'contained' : 'text'}
              color="primary" 
              onClick={handleDetailView}
              fullWregistrayionIdth={status !== 'verified'}
            >
              View Application
            </Button>

            {status === 'verified' && (
              <Button 
                variant="contained" 
                color="secondary" 
                onClick={handlePublicPage}
                fullWregistrayionIdth
              >
                Public Profile
              </Button>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
