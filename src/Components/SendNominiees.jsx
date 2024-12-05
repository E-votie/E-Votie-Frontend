import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import {
  Stack,
  FormControl,
  Box,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  CircularProgress
} from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import KeycloakService from "../services/KeycloakService";
const partyUrl = import.meta.env.VITE_API_PARTY_URL;
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiPaper-root': {
    width: '80%',
    maxWidth: '480px',
  },
}));

export const SendNomineesModal = ({ open, handleClose, partyId, party, partyLogo }) => {
  const [elections, setElections] = React.useState([]);
  const [partyMembers, setPartyMembers] = React.useState([]);
  const [selectedElection, setSelectedElection] = React.useState('');
  const [selectedNominee, setSelectedNominee] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  // Fetch elections and party members based on the partyId
  React.useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const token = KeycloakService.getToken();
        setLoading(true);
        const [electionsResponse, partyMembersResponse] = await Promise.all([
          axios.get(`${partyUrl}/api/nomination/elections`,{
              headers: {
                  Authorization: `Bearer ${token}`
              }
          }), 
          axios.get(`${partyUrl}/api/party/member/all?party=${partyId}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }) 
        ]);

        setElections(electionsResponse.data.body);
        setPartyMembers(partyMembersResponse.data);
        console.log("Elections");
        console.log(electionsResponse);
        
      } catch (error) {
        console.error('Error fetching initial data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (partyId) {
      fetchInitialData();
    }
  }, [partyId]);

  const handleElectionChange = (event) => {
    setSelectedElection(event.target.value);
    setSelectedNominee(null); // Reset nominee selection
  };

  const handleNomineeSelect = (memberId) => {
    setSelectedNominee(memberId);
  };

  const handleSubmitNominee = async () => {
    const result = await Swal.fire({
      title: 'Confirm Submission',
      text: `Are you sure you want to submit the selected nominee for this election?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, submit nominee',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        const token = KeycloakService.getToken();
        await axios.post(`${partyUrl}/api/nomination/new`, {
          name: selectedNominee,
          party: party.partyName,
          symbol: partyLogo,
          number: 448,
          status: 'Pending',
          electionId: selectedElection,
        },{
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });

        await Swal.fire({
          title: 'Success!',
          text: 'Nominee has been successfully submitted',
          icon: 'success'
        }).then(() => {
          handleClose?.();
          window.location.href = `/party/${partyId}`;
      });

        handleClose();
      } catch (error) {
        console.error('Error submitting nominee:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to submit nominee. Please try again.',
          icon: 'error'
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        style={{ zIndex: 1000 }}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Send Nominee for Election
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <FormControl fullWidth variant="outlined" margin="normal">
            <Stack spacing={2}>
              <Box>
                <Typography variant="body1" gutterBottom>
                  Select Election
                </Typography>
                <Select
                  fullWidth
                  value={selectedElection}
                  onChange={handleElectionChange}
                  displayEmpty
                >
                  <MenuItem value="">
                    <em>Select an election</em>
                  </MenuItem>
                  {elections.map((election) => (
                    <MenuItem key={election.id} value={election.id}>
                      {election.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>

              {selectedElection && (
                <Box>
                  <Typography variant="body1" gutterBottom>
                    Select Nominee
                  </Typography>
                  {loading ? (
                    <Box display="flex" justifyContent="center" p={2}>
                      <CircularProgress />
                    </Box>
                  ) : (
                    <List sx={{ maxHeight: '300px', overflow: 'auto' }}>
                      {partyMembers.map((member) => (
                        <ListItem
                          key={member.partyMemberId}
                          dense
                          button
                          onClick={() => handleNomineeSelect(member.partyMemberId)}
                        >
                          <Checkbox
                            edge="start"
                            checked={selectedNominee === member.partyMemberId} 
                            tabIndex={-1}
                            disableRipple
                          />
                          <ListItemText
                            primary={member.partyMemberName}
                            secondary={`${member.role} | NIC: ${member.nic}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </Box>
              )}
            </Stack>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            autoFocus
            onClick={handleSubmitNominee}
            color="primary"
            disabled={!selectedNominee || loading}
          >
            {loading ? 'Submitting...' : 'Send Nominee'}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};
