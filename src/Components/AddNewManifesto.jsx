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

export const AddNewManifesto= ({open, handleClose}) => {

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Create New Manifesto
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
                        Topic
                        </Typography>
                        <TextField
                            variant="outlined"
                            fullWidth
                        />
                    </Box>
                    <Box mb={2}>
                        <Typography variant="body1" gutterBottom>
                        Election
                        </Typography>
                        <FormControl fullWidth variant="outlined">
                        <Select
                            label="Election"
                        >
                            <MenuItem value="">
                            <em>None</em>
                            </MenuItem>
                            <MenuItem value={"Election 1"}>Election 1</MenuItem>
                            <MenuItem value={"Election 2"}>Election 2</MenuItem>
                            <MenuItem value={"Election 3"}>Election 3</MenuItem>
                        </Select>
                        </FormControl>
                    </Box>
                </Stack>
            </FormControl>

        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Continue
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
