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
}));

export const AddNewTopic = ({open, handleClose, startDate, endDate, party}) => {

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Update Term
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
                <Stack direction="row" spacing={2} mb={2}>
                    <Box>
                        <Typography variant="body1" gutterBottom>
                            Start Date
                        </Typography>
                        <TextField
                            variant="outlined"
                            type="date"
                            fullWidth
                            value={startDate}
                        />
                    </Box>
                    <Box>
                        <Typography variant="body1" gutterBottom>
                            End Date
                        </Typography>
                        <TextField
                            variant="outlined"
                            type="date"
                            fullWidth
                            value={endDate}
                        />
                    </Box>
                </Stack>
                <Box mb={2}>
                    <Typography variant="body1" gutterBottom>
                    Party
                    </Typography>
                    <FormControl fullWidth variant="outlined">
                    <InputLabel>Party</InputLabel>
                    <Select
                        label="party"
                        value={party}
                    >
                        <MenuItem value="">
                        <em>None</em>
                        </MenuItem>
                        <MenuItem value={"Sri Lanka Podujana Peramuna (SLPP)"}>Sri Lanka Podujana Peramuna (SLPP)</MenuItem>
                        <MenuItem value={"United People's Freedom Alliance (UPFA)"}>United People's Freedom Alliance (UPFA)</MenuItem>
                        <MenuItem value={"Samagi Jana Balawegaya (SJB"}>Samagi Jana Balawegaya (SJB)</MenuItem>
                        <MenuItem value={"United National Party (UNP)"}>United National Party (UNP)</MenuItem>
                        <MenuItem value={"Sri Lanka Muslim Congress (SLMC)"}>Sri Lanka Muslim Congress (SLMC)</MenuItem>
                        <MenuItem value={"Sri Lanka Freedom Party (SLFP)"}>Sri Lanka Freedom Party (SLFP)</MenuItem>
                        <MenuItem value={"National People’s Power (NPP)"}>National People’s Power (NPP)</MenuItem>
                        <MenuItem value={"People's Alliance (PA)"}>People's Alliance (PA)</MenuItem>
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
