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

// Maintain the same styling
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

// Dummy data for elections and party members
const DUMMY_ELECTIONS = [
  { id: 1, name: "Parliamentary Election 2024" },
  { id: 2, name: "Provincial Council Election 2024" },
  { id: 3, name: "Local Government Election 2024" }
];

const DUMMY_PARTY_MEMBERS = [
  { id: 1, name: "John Doe", position: "Senior Member", nic: "891234567V" },
  { id: 2, name: "Jane Smith", position: "Deputy Leader", nic: "901234567V" },
  { id: 3, name: "Mike Johnson", position: "General Secretary", nic: "851234567V" },
  { id: 4, name: "Sarah Williams", position: "Treasurer", nic: "871234567V" }
];

export const SendNomineesModal = ({open, handleClose}) => {
  const [selectedElection, setSelectedElection] = React.useState('');
  const [partyMembers, setPartyMembers] = React.useState([]);
  const [selectedNominees, setSelectedNominees] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  // Fetch party members when election is selected
  React.useEffect(() => {
    if (selectedElection) {
      // Simulating API call to fetch party members
      setLoading(true);
      setTimeout(() => {
        setPartyMembers(DUMMY_PARTY_MEMBERS);
        setLoading(false);
      }, 1000);
    }
  }, [selectedElection]);

  const handleElectionChange = (event) => {
    setSelectedElection(event.target.value);
    setSelectedNominees([]); // Reset selections when election changes
  };

  const handleNomineeToggle = (memberId) => {
    setSelectedNominees(prev => {
      if (prev.includes(memberId)) {
        return prev.filter(id => id !== memberId);
      } else {
        return [...prev, memberId];
      }
    });
  };

  const handleSubmitNominees = async () => {
    // Show confirmation dialog
    const result = await Swal.fire({
      title: 'Confirm Submission',
      text: `Are you sure you want to submit ${selectedNominees.length} nominees for this election?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, submit nominees',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        // Simulate API call to submit nominees
        await axios.post('/api/submit-nominees', {
          electionId: selectedElection,
          nomineeIds: selectedNominees
        });

        // Show success message
        await Swal.fire({
          title: 'Success!',
          text: 'Nominees have been successfully submitted',
          icon: 'success'
        });

        handleClose();
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Failed to submit nominees. Please try again.',
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
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Send Nominees for Election
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
                  {DUMMY_ELECTIONS.map((election) => (
                    <MenuItem key={election.id} value={election.id}>
                      {election.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>

              {selectedElection && (
                <Box>
                  <Typography variant="body1" gutterBottom>
                    Select Nominees
                  </Typography>
                  {loading ? (
                    <Box display="flex" justifyContent="center" p={2}>
                      <CircularProgress />
                    </Box>
                  ) : (
                    <List sx={{ maxHeight: '300px', overflow: 'auto' }}>
                      {partyMembers.map((member) => (
                        <ListItem
                          key={member.id}
                          dense
                          button
                          onClick={() => handleNomineeToggle(member.id)}
                        >
                          <Checkbox
                            edge="start"
                            checked={selectedNominees.includes(member.id)}
                            tabIndex={-1}
                            disableRipple
                          />
                          <ListItemText
                            primary={member.name}
                            secondary={`${member.position} | NIC: ${member.nic}`}
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
            onClick={handleSubmitNominees}
            color="primary"
            disabled={selectedNominees.length === 0 || loading}
          >
            {loading ? 'Submitting...' : 'Send Nominees'}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};