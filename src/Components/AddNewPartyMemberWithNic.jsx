import React, { useState, useCallback } from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  IconButton, Typography, Stack, FormControl, 
  TextField, Box, Button 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import KeycloakService from '../services/KeycloakService';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
const MySwal = withReactContent(Swal);
const partyUrl = import.meta.env.VITE_API_PARTY_URL;

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': { padding: theme.spacing(2) },
  '& .MuiDialogActions-root': { padding: theme.spacing(1) },
  '& .MuiPaper-root': { 
    width: '80%', 
    maxWidth: '480px' 
  },
}));

const INITIAL_STATE = {
  isLoading: false,
  isSubmitDisabled: true,
  isCheckedPartyMemberNIC: false,
  isPartyMemberVerified: false,
  isPartyMemberAvailable: false,
  isRequestAlreadySent: false,
  partyMemberName: null
};

export const AddNewPartyMemberWithNic = ({ open, handleClose, handleCloseSideBar, partyInfo }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, getValues, setValue, reset } = useForm();
  const [state, setState] = useState(INITIAL_STATE);

  //to check if the user is registered as a voter
  const validatePartyMemberNIC = useCallback(async (nic) => {
    if (!nic) return null;

    try {
      const token = KeycloakService.getToken();
      const response = await axios.get(`${partyUrl}/api/voter/${nic}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setState((prevState) => ({
        ...prevState,
        partyMemberName: response.data.Name,
      }));
      return response;
    } catch (err) {
      if(err.response?.status === 404) {
        console.log('Party member not found');
        return null;
      }
      console.error('NIC Validation Error:', err);
      throw err;
    }
  }, []);

  //to check if the user is avaialable at the moment
  const getPartyMemberByNIC = async (nic) => {
    try {
      const token = KeycloakService.getToken();
      const response = await axios.get(`${partyUrl}/api/party/member/by/nic/${nic}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response);
      return response;
    } catch (err) {
      if (err.response?.status === 404) {
        console.log('Party member not found');
        return null;
      }
      console.error('Verification Error:', err);
      throw err;
    }
  };

  //to check if a send reqest is already in progress
  const getRequest = async (nic) => {
    try {
      const token = KeycloakService.getToken();
      const response = await axios.get(`${partyUrl}/api/request/party/${partyInfo.registrationId}/receiver/${nic}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Request handling");
      console.log(response);
      return response.data;
    } catch (err) {
      if (err.response?.status === 404) {
        console.log('Request');
        return null;
      }
      console.error('Verification Error:', err);
      throw err;
    }
  }

  const handleLeaderNicBlur = async (e) => {
    const nic = e.target.value;
    if (!nic) return;

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const voter = await validatePartyMemberNIC(nic);
      const requestAlreadySent = await getRequest(nic);
      const partyMember = await getPartyMemberByNIC(nic);

      const newState = determineNicStatus(voter, partyMember, requestAlreadySent);
      setState(prev => ({
        ...prev, 
        ...newState,
        isLoading: false,
        isCheckedPartyMemberNIC: true
      }));
    } catch (error) {
      setState(prev => ({
        ...prev, 
        isLoading: false,
        isSubmitDisabled: true
      }));
    }
  };

  const determineNicStatus = (voter, partyMember, requestAlreadySent) => {
    // Scenario 1: No voter found
    console.log("Voter");
    console.log(voter);
        
    if (voter === null) {
      console.log("Scenario 1: No voter found");
      return {
        isPartyMemberVerified: false,
        isPartyMemberAvailable: false,
        isRequestAlreadySent: false,
        isSubmitDisabled: true
      };
    }
  
    // Scenario 2: Voter exists, but already in another party
    if (voter && partyMember) {
      const partyId = partyMember.data.party.registrationId;
      if (partyId !== 2000) {
        return {
          isPartyMemberVerified: true,
          isPartyMemberAvailable: false,
          isRequestAlreadySent: false,
          isSubmitDisabled: true
        };
      }
    }
  
    // Scenario 3: Request already sent
    if (requestAlreadySent.length != 0) {
      return {
        isPartyMemberVerified: true,
        isPartyMemberAvailable: true,
        isRequestAlreadySent: true,
        isSubmitDisabled: true
      };
    }
  
    // Scenario 4: Voter exists and no existing request or party membership
    return {
      isPartyMemberVerified: true,
      isPartyMemberAvailable: true,
      isRequestAlreadySent: false,
      isSubmitDisabled: false
    };
  };

  //submit founction
  const onSubmit = async (partyData) => {

    const confirmSubmission = async () => {
        handleCloseSideBar(false);
        return MySwal.fire({
            title: 'Are you sure?',
            text: 'Do you want to continue with sending the request?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Send',
            cancelButtonText: 'No, Cancel',
        });
    };

    const submitPartyData = async (partyData) => {
        
        const politicianDetails = {
          "receiverNIC": getValues("politicianNIC"),
          "requestState": "pending",
          "receiverName": state.partyMemberName,
          "partyName": partyInfo.partyName,
          "party": {
            "registrationId": partyInfo.registrationId
          }
        };
    
        try {
            const token = KeycloakService.getToken();    
            // Show loading SweetAlert2 modal
            MySwal.fire({
                title: 'Sending your request...',
                html: '<div class="spinner"></div>',
                allowOutsideClick: false,
                showConfirmButton: false,
                didOpen: () => {
                    MySwal.showLoading(); // Display the SweetAlert2 spinner
                },
            });
    
            const response = await axios.post(`${partyUrl}/api/request/new`, politicianDetails, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            if ([200, 201].includes(response.status)) {
                // Application submitted successfully
                MySwal.fire({
                    title: 'Request sent successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => { // Pass a function here
                    reset(); // Reset the form
                    state.isPartyMemberVerified(false); // Reset leader verification
                    setState((prevState) => ({
                      ...prevState,
                      isLoading: false,
                      isSubmitDisabled: true,
                      isCheckedPartyMemberNIC: false,
                      isPartyMemberVerified: false,
                      isPartyMemberAvailable: false,
                      isRequestAlreadySent: false,
                      partyMemberName: null
                    }));
                    navigate("/party/list");
                });
            } else {
                MySwal.fire({
                    title: 'Error!',
                    text: response.data || 'An error occurred while sending the request.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }

        } catch (error) {
            MySwal.fire({
                title: 'Error!',
                text: error.response ? error.response.data : 'An error occurred.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }

    }

    const result = await confirmSubmission();
    if (result.isConfirmed) {
        await submitPartyData(partyData);
        handleClose();
    } else {
        console.log('Submission canceled by the user.');
    }
  };

  return (
    <BootstrapDialog onClose={handleClose} open={open}>
      <DialogTitle>
        Add New Politician to Party
        <IconButton 
          onClick={handleClose} 
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} mb={2}>
            <Box>
              <Typography variant="body1">NIC (National Identity Card)</Typography>
              <TextField
                fullWidth
                variant="outlined"
                {...register("politicianNIC", { required: true })}
                error={!!errors.leaderNic}
                helperText={errors.leaderNic && 'Leader NIC is required'}
                onBlur={handleLeaderNicBlur}
                placeholder="Enter NIC number"
                required
              />
              {renderNicVerificationMessage(state)}
            </Box>
            <Box>
              <Typography variant="body1">Full Name</Typography>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Full name"
                value={state.partyMemberName}
                disabled
              />
            </Box>
          </Stack>
          <DialogActions>
            <Button onClick={handleClose} color="primary">Cancel</Button>
            <Button 
              autoFocus 
              onClick={handleClose} 
              color="primary" 
              type="submit"
              disabled={state.isSubmitDisabled}
            >
              Add Politician
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </BootstrapDialog>
  );
};

const renderNicVerificationMessage = (state) => {
  const { isLoading, isCheckedPartyMemberNIC, isPartyMemberVerified, isPartyMemberAvailable, isRequestAlreadySent } = state;

  if (isLoading) return <Typography>Verifying leader NIC...</Typography>;
  if (!isCheckedPartyMemberNIC) return <Typography color="success.main">Enter NIC to proceed</Typography>;
  if (!isPartyMemberVerified) return <Typography color="error">User identification failed!</Typography>;
  if (!isPartyMemberAvailable) return <Typography color="error">Party member is not available!</Typography>;
  if (isRequestAlreadySent) return <Typography color="error">Request is already sent!</Typography>;
  if (isPartyMemberVerified && isPartyMemberAvailable) return <Typography color="success.main">User identified successfully!</Typography>;
};

