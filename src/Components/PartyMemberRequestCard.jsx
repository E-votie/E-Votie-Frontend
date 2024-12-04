import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardActions, Button, Typography, Avatar, Box } from '@mui/material';
const partyUrl = import.meta.env.VITE_API_PARTY_URL;
import KeycloakService from "../services/KeycloakService";

export const PartyMemberRequestCard = ({ partyId, request, ownership, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    // Show confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this party request?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Replace with your actual API endpoint
          const token = KeycloakService.getToken();
          await axios.delete(`${partyUrl}/api/request/${request.requestId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          // Show success message
          Swal.fire({
            title: 'Deleted!',
            text: 'Party request has been successfully removed.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            // Call onDelete callback to update parent component's state
            if (onDelete) {
              onDelete(request.requestId);
            }
            
            // Navigate back to party page
            window.location.href = `/party/${partyId}`;
          });
        } catch (error) {
          // Show error message
          Swal.fire({
            title: 'Error!',
            text: 'Failed to delete party request.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          console.error('Error deleting party request:', error);
        }
      }
    });
  };

  return (
    <Card className='flex gap-4 py-3 px-4 cursor-pointer'>
      <Avatar 
        src="path-to-avatar-image.jpg"
        sx={{ width: 40, height: 40 }}
      />
      <Box className="flex flex-col justify-center">
        <CardContent sx={{padding: 0 }}>
          <Typography variant="body1">{request.receiverName}</Typography>
        </CardContent>
        {ownership === 'party' && (
          <CardActions sx={{padding: 0 }}>
            {request.requestState === 'accepted' && (
              <div className='flex gap-1'>
                <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{height: 25 }}
                >
                  <Typography sx={{fontSize: 12 }}>Remove</Typography>
                </Button>
              </div>
            )}
            {request.requestState === 'pending' && (
              <div className='flex gap-1'>
                <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{height: 25 }} 
                  disabled
                >
                  <Typography sx={{fontSize: 12 }}>Pending</Typography>
                </Button>
                <Button 
                  variant="outlined" 
                  color="secondary" 
                  sx={{height: 25 }}
                  onClick={handleDelete}
                >
                  <Typography sx={{fontSize: 12 }}>Delete</Typography>
                </Button>
              </div>
            )}
          </CardActions>
        )}
        {ownership === 'voter' && (
          <CardActions sx={{padding: 0 }}>
            {request.requestState === 'pending' && (
              <div className='flex gap-1'>
                <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{height: 25 }}
                >
                  <Typography sx={{fontSize: 12 }}>Confirm</Typography>
                </Button>
                <Button 
                  variant="outlined" 
                  color="secondary" 
                  sx={{height: 25 }}
                  onClick={handleDelete}
                >
                  <Typography sx={{fontSize: 12 }}>Delete</Typography>
                </Button>
              </div>
            )}
            {request.requestState === 'accepted' && (
              <div className='flex gap-1'>
                <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{height: 25 }} 
                  disabled
                >
                  <Typography sx={{fontSize: 12 }}>Leave</Typography>
                </Button>
              </div>
            )}
          </CardActions>
        )}
      </Box>
    </Card>
  );
};