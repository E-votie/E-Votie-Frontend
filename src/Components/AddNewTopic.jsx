import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
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

const topics = [
  "Agriculture, Plantations, Livestock & Fisheries",
  "Natural Resources & Environment",
  "Reconciliation & Resettlement",
  "Trade & Industry",
  "Welfare & Social Services",
  "Justice, Defence & Public Order",
  "National Heritage, Media & Sports",
  "Economy and Finance",
  "Education",
  "Labour & Employment",
  "Technology, Communications & Energy",
  "Governance, Administration and Parliamentary Affairs",
  "Health",
  "Urban Planning, Infrastructure and Transportation",
  "Rights & Representation"
];

export const AddNewTopic = ({open, handleClose, startDate, endDate, party}) => {

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add New Topic
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
                <Box mb={2}>
                    {/* <Typography variant="body1" gutterBottom>
                    Party
                    </Typography> */}
                    <FormControl fullWidth variant="outlined">
                    <InputLabel>Topic</InputLabel>
                    <Select
                        label="Topic"
                    >
                      {topics.map((topic) => (
                          <MenuItem key={topic} value={topic}>
                              {topic}
                          </MenuItem>
                      ))}
                    </Select>
                    </FormControl>
                </Box>
            </FormControl>

        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
