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
import { Stack, FormControl, TextField, InputLabel, Select, MenuItem, Box } from '@mui/material';

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

export const AddNewPartyMemberWithNic = ({open, handleClose}) => {
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add New Politician to Party
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
            <Stack spacing={2} mb={2}>
              <Box>
                <Typography variant="body1" gutterBottom>
                  NIC (National Identity Card)
                </Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Enter NIC number"
                />
              </Box>
              <Box>
                <Typography variant="body1" gutterBottom>
                  Full Name
                </Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Enter full name"
                  disabled
                />
              </Box>
            </Stack>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button autoFocus onClick={handleClose} color="primary">
            Add Politician
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}