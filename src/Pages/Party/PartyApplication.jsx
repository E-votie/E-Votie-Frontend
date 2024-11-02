import React, { useState } from 'react';
import {
  Box, Stepper, Step, StepLabel, Paper, Typography, Grid,
  TextField, Button, Chip, IconButton, Dialog, DialogTitle,
  DialogContent, DialogActions, List, ListItem, ListItemText,
  Card, CardContent, Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import HistoryIcon from '@mui/icons-material/History';
import UploadIcon from '@mui/icons-material/Upload';
import {ApplicationChat} from "../../Components/ApplicationChat";

const steps = ['Submitted', 'Under Review', 'Verified'];

const initialApplicationDetails = {
  partyName: 'Green Party',
  leader: 'John Doe',
  submittedDate: '2024-07-31',
  partySymbol: '/path/to/party-symbol.png',
  addressLine1: '123 Green Street',
  addressLine2: 'Eco City',
  postalCode: '12345',
  contactNumber: '+1 234 567 8900',
  email: 'contact@greenparty.com',
  attachments: [
    { type: 'Constitution', name: 'Constitution.pdf', link: '/path/to/constitution.pdf' },
    { type: 'Logo', name: 'Logo.png', link: '/path/to/logo.png' },
    { type: 'Membership List', name: 'Members.xlsx', link: '/path/to/members.xlsx' },
    { type: 'Financial Statement', name: 'Finances.pdf', link: '/path/to/finances.pdf' },
    { type: 'Leadership Structure', name: 'Leadership.pdf', link: '/path/to/leadership.pdf' }
  ]
};


const initialUpdateHistory = [
  { field: 'Party Name', oldValue: 'Eco Party', newValue: 'Green Party', date: '2024-07-29' },
  { field: 'Leader', oldValue: 'Jane Smith', newValue: 'John Doe', date: '2024-07-30' }
];

const CustomStepper = styled(Stepper)(({ theme }) => ({
  padding: theme.spacing(3, 0, 5),
}));

const FormSection = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));


export const PartyApplication = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [applicationDetails, setApplicationDetails] = useState(initialApplicationDetails);
  const [updateHistory, setUpdateHistory] = useState(initialUpdateHistory);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editField, setEditField] = useState({ name: '', value: '' });

  const handleEdit = (field, value) => {
    setEditField({ name: field, value: value });
    setEditDialogOpen(true);
  };

  const handleEditSave = () => {
    setApplicationDetails({ ...applicationDetails, [editField.name]: editField.value });
    setUpdateHistory([
      { 
        field: editField.name, 
        oldValue: applicationDetails[editField.name], 
        newValue: editField.value, 
        date: new Date().toISOString().split('T')[0] 
      },
      ...updateHistory
    ]);
    setEditDialogOpen(false);
  };

  const handleFileUpload = (attachmentType) => {
    // Implement file upload logic here
    console.log(`Uploading file for ${attachmentType}`);
  };


  const renderApplicationDetails = () => (
    <FormSection elevation={3}>
      <CardContent>
        <Grid container spacing={3}>
          {Object.entries(applicationDetails).map(([key, value]) => {
            if (key !== 'attachments' && key !== 'partySymbol') {
              return (
                <Grid item xs={12} sm={6} key={key}>
                  <TextField
                    fullWidth
                    label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                    value={value}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <IconButton size="small" onClick={() => handleEdit(key, value)}>
                          <EditIcon />
                        </IconButton>
                      ),
                    }}
                    variant="outlined"
                  />
                </Grid>
              );
            }
            return null;
          })}
        </Grid>
      </CardContent>
    </FormSection>
  );

  const renderAttachments = () => (
    <FormSection elevation={3}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Attachments</Typography>
        <Grid container spacing={2}>
          {applicationDetails.attachments.map((attachment, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>{attachment.type}</Typography>
                  <Box display="flex" alignItems="center" mb={1}>
                    <AttachFileIcon fontSize="small" />
                    <Typography variant="body2" noWrap sx={{ ml: 1 }}>{attachment.name}</Typography>
                  </Box>
                  <Button
                    variant="contained"
                    startIcon={<UploadIcon />}
                    onClick={() => handleFileUpload(attachment.type)}
                    fullWidth
                  >
                    Update
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </FormSection>
  );


  const renderHistory = () => (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Update History</Typography>
        <List>
          {updateHistory.map((update, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={
                  <Typography variant="subtitle1">
                    <HistoryIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                    {update.field} updated on {update.date}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant="body2" component="span">Old value: {update.oldValue}</Typography>
                    <br />
                    <Typography variant="body2" component="span">New value: {update.newValue}</Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );

  return (
    <Box className="min-h-[600px] flex flex-col bg-base-100 rounded-xl shadow-lg px-6 pb-6 gap-6" sx={{ maxWidth: 1200, margin: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>Application ID #12345</Typography>
      <CustomStepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </CustomStepper>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {renderApplicationDetails()}
          {renderAttachments()}
          {renderHistory()}
        </Grid>
        <Grid item xs={12} md={4}>
          <ApplicationChat />
        </Grid>
      </Grid>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit {editField.name}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            value={editField.value}
            onChange={(e) => setEditField({ ...editField, value: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}