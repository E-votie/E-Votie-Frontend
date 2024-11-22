import React, { useState } from "react";
import {
  Tabs,
  Tab,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Button,
  Paper,
  Grid,
  Box,
  Typography,
  Divider,
  Alert,
} from "@mui/material";
import axios from "axios";
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const PartyApplication = () => {
  const [activeTab, setActiveTab] = useState("details");
  const [showInquiryDialog, setShowInquiryDialog] = useState(false);
  const [inquiryText, setInquiryText] = useState("");

  const [detailsForm, setDetailsForm] = useState({
    id: "APP-12345",
    partyName: "Green Party",
    leader: "John Doe",
    submittedDate: "2024-07-31",
    status: "Under Review",
    addressLine1: "123 Green Street",
    addressLine2: "Eco City",
    postalCode: "12345",
    contactNumber: "+1 234 567 8900",
    email: "contact@greenparty.com",
  });

  const [attachmentsForm, setAttachmentsForm] = useState([
    { type: "Constitution", name: "Constitution.pdf", status: "verified" },
    { type: "Logo", name: "Logo.png", status: "pending" },
    { type: "Membership List", name: "Members.xlsx", status: "rejected" },
    { type: "Financial Statement", name: "Finances.pdf", status: "pending" },
    { type: "Leadership Structure", name: "Leadership.pdf", status: "verified" },
  ]);

  const [editableForms, setEditableForms] = useState({
    details: false,
    attachments: false,
  });

  const handleFieldChange = (key, value) => {
    setDetailsForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveDetails = async () => {
    try {
      await axios.post("/api/update-details", detailsForm);
      alert("Details updated successfully!");
    } catch (error) {
      alert("Failed to update details.");
    }
    setEditableForms((prev) => ({ ...prev, details: false }));
  };

  const handleSaveAttachments = async () => {
    try {
      await axios.post("/api/update-attachments", attachmentsForm);
      alert("Attachments updated successfully!");
    } catch (error) {
      alert("Failed to update attachments.");
    }
    setEditableForms((prev) => ({ ...prev, attachments: false }));
  };

  const handleAttachmentStatusChange = (index, newStatus) => {
    setAttachmentsForm((prev) =>
      prev.map((attachment, i) =>
        i === index ? { ...attachment, status: newStatus } : attachment
      )
    );
  };

  const getStatusBadge = (status) => {
    const colorMap = {
      verified: "success",
      pending: "warning",
      rejected: "error",
      "under-review": "info",
      banned: "secondary",
    };
    return (
      <Chip
        label={status.charAt(0).toUpperCase() + status.slice(1)}
        color={colorMap[status.toLowerCase()]}
        variant="outlined"
      />
    );
  };

  return (
    <div className="min-h-[600px] flex flex-col bg-base-100 shadow-md rounded-xl px-4 pb-4 gap-6">
      {/* Header */}
      <div className='header my-8 flex justify-between items-center'>
          {/* Topic */}
          <div className="text-3xl font-semibold text-gray-900 flex justify-between">
              Party Registration
          </div>
      </div>  

      <Tabs
        value={activeTab}
        onChange={(e, newValue) => setActiveTab(newValue)}
        aria-label="application tabs"
      >
        <Tab label="Details" value="details" />
        <Tab label="Inquiries" value="inquiries" />
        <Tab label="History" value="history" />
      </Tabs>

      {activeTab === "details" && (
        <Paper sx={{ p: 2 }}>
          <Grid container spacing={2}>
            {Object.entries(detailsForm).map(([key, value]) => (
              <Grid item xs={6} key={key}>
                <TextField
                  label={key.replace(/([A-Z])/g, " $1").trim()}
                  value={value}
                  fullWidth
                  onChange={(e) => handleFieldChange(key, e.target.value)}
                  InputProps={{
                    readOnly: !editableForms.details,
                  }}
                />
              </Grid>
            ))}
          </Grid>
          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" gutterBottom>
            Required Documents
          </Typography>
          <Grid container spacing={2}>
            {attachmentsForm.map((doc, index) => (
              <Grid item xs={12} key={index}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 2,
                    border: "1px solid",
                    borderColor: "grey.300",
                    borderRadius: 1,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography>{doc.type}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    {getStatusBadge(doc.status)}
                    {editableForms.attachments && (
                      <Button
                        variant="outlined"
                        onClick={() =>
                          handleAttachmentStatusChange(index, "verified")
                        }
                      >
                        Verify
                      </Button>
                    )}
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              onClick={handleSaveDetails}
              disabled={!editableForms.details}
            >
              Save Details
            </Button>
            <Button
              variant="contained"
              onClick={handleSaveAttachments}
              disabled={!editableForms.attachments}
            >
              Save Attachments
            </Button>
            <Button
              variant="outlined"
              onClick={() =>
                setEditableForms((prev) => ({
                  ...prev,
                  details: !prev.details,
                }))
              }
            >
              {editableForms.details ? "Cancel Editing" : "Edit Details"}
            </Button>
            <Button
              variant="outlined"
              onClick={() =>
                setEditableForms((prev) => ({
                  ...prev,
                  attachments: !prev.attachments,
                }))
              }
            >
              {editableForms.attachments ? "Cancel Editing" : "Edit Attachments"}
            </Button>
          </Box>
        </Paper>
      )}

      {activeTab === "inquiries" && <Typography>Inquiries Section</Typography>}
      {activeTab === "history" && <Typography>History Section</Typography>}
    </div>
  );
};


// import React, { useState } from 'react';
// import {
//   Calendar, Clock, FileText, HistoryIcon, MessageSquare, Send, Upload,
// } from 'lucide-react';
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardActions,
//   CardMedia,
//   Typography,
//   Tabs,
//   Tab,
//   TextField,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Badge,
//   Paper,
//   IconButton,
//   Grid,
//   Chip,
//   Box,
//   Tooltip,
//   Alert,
//   Divider
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import { useTheme } from '@mui/material/styles';
// import Button from '@mui/material/Button';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// const VisuallyHiddenInput = styled('input')({
//   clip: 'rect(0 0 0 0)',
//   clipPath: 'inset(50%)',
//   height: 1,
//   overflow: 'hidden',
//   position: 'absolute',
//   bottom: 0,
//   left: 0,
//   whiteSpace: 'nowrap',
//   width: 1,
// });

// export const PartyApplication = () => {
//   const [activeTab, setActiveTab] = useState("details");
//   const [showInquiryDialog, setShowInquiryDialog] = useState(false);
//   const [inquiryText, setInquiryText] = useState("");
//   const [editable, setEditable] = useState(false);  // Added state for editability
//   const theme = useTheme();

//   const applicationStatus = "under-review"; // Can be: submitted, under-review, verified, rejected, banned
  
//   const [applicationDetails, setApplicationDetails] = useState({
//     id: "APP-12345",
//     partyName: "Green Party",
//     leader: "John Doe",
//     submittedDate: "2024-07-31",
//     status: "Under Review",
//     addressLine1: "123 Green Street",
//     addressLine2: "Eco City",
//     postalCode: "12345",
//     contactNumber: "+1 234 567 8900",
//     email: "contact@greenparty.com"
//   });

//   const attachments = [
//     { type: "Constitution", name: "Constitution.pdf", status: "verified" },
//     { type: "Logo", name: "Logo.png", status: "pending" },
//     { type: "Membership List", name: "Members.xlsx", status: "rejected" },
//     { type: "Financial Statement", name: "Finances.pdf", status: "pending" },
//     { type: "Leadership Structure", name: "Leadership.pdf", status: "verified" }
//   ];

//   const inquiries = [
//     {
//       id: 1,
//       type: "name_change",
//       status: "pending",
//       date: "2024-08-01",
//       request: "Request to change party name from 'Eco Party' to 'Green Party'",
//       submittedBy: "John Doe"
//     },
//     {
//       id: 2,
//       type: "document_update",
//       status: "resolved",
//       date: "2024-07-29",
//       request: "Updated constitution document requested",
//       submittedBy: "Verification Officer"
//     }
//   ];

//   const history = [
//     {
//       date: "2024-07-31",
//       action: "Application submitted",
//       user: "John Doe"
//     },
//     {
//       date: "2024-07-29",
//       action: "Party name updated from 'Eco Party' to 'Green Party'",
//       user: "John Doe"
//     }
//   ];

//   const getStatusBadge = (status) => {
//     const colorMap = {
//       verified: "success",
//       pending: "warning",
//       rejected: "error",
//       "under-review": "info",
//       banned: "secondary",
//     };

//     return (
//       <Chip
//         label={status.charAt(0).toUpperCase() + status.slice(1)}
//         color={colorMap[status.toLowerCase()]}
//         variant="outlined"
//       />
//     );
//   };

//   const handleSubmitInquiry = () => {
//     setShowInquiryDialog(false);
//     setInquiryText("");
//   };

//   const handleFieldChange = (key, value) => {
//     setApplicationDetails(prevDetails => ({
//       ...prevDetails,
//       [key]: value,
//     }));
//   };

//   return (
//     <Box className="min-h-[600px] flex flex-col bg-base-100 rounded-xl shadow-lg px-6 pb-6 gap-6" sx={{ maxWidth: 1200, margin: 'auto', p: 3 }}>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
//         <div className='header flex justify-between items-center'>
//           <div className="text-3xl font-semibold text-gray-900 flex justify-between">
//             Application ID: #{applicationDetails.id}
//           </div>
//         </div>   
//         {getStatusBadge(applicationStatus)}
//       </Box>

//       <Button variant="outlined" onClick={() => setEditable(!editable)}>
//         {editable ? "Save Changes" : "Edit"}
//       </Button>

//       <Tabs
//         value={activeTab}
//         onChange={(e, newValue) => setActiveTab(newValue)}
//         aria-label="application tabs"
//       >
//         <Tab label="Details" value="details" />
//         <Tab label="Inquiries" value="inquiries" />
//         <Tab label="History" value="history" />
//       </Tabs>

//       {activeTab === 'details' && (
//         <Paper sx={{ p: 4, mt: 4 }}>
//           <Grid container spacing={2}>
//             {Object.entries(applicationDetails).map(([key, value]) => (
//               key !== 'id' && key !== 'status' && (
//                 <Grid item xs={6} key={key}>
//                   <TextField
//                     label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}
//                     value={value}
//                     variant="filled"
//                     fullWidth
//                     onChange={(e) => handleFieldChange(key, e.target.value)}
//                     InputProps={{
//                       readOnly: !editable,
//                     }}
//                   />
//                 </Grid>
//               )
//             ))}
//           </Grid>

//           <Divider sx={{ my: 4 }} />

//           <Typography variant="h6" gutterBottom>Required Documents</Typography>
//           <Grid container spacing={2}>
//             {attachments.map((doc, index) => (
//               <Grid item xs={12} key={index}>
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'space-between',
//                     p: 1,
//                     border: '1px solid',
//                     borderColor: 'grey.300',
//                     borderRadius: 1,
//                   }}
//                 >
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                     <FileText />
//                     <Typography>{doc.type}</Typography>
//                   </Box>
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                     {getStatusBadge(doc.status)}
//                     <Button
//                       variant="contained" 
//                       color="primary"
//                       sx={{
//                         px: 2,
//                         fontWeight: 'bold', 
//                         borderRadius: '8px', 
//                         transition: '0.3s', 
//                         '&:hover': {
//                           backgroundColor: 'primary.dark', 
//                           transform: 'scale(1.05)', 
//                         },
//                       }}
//                       startIcon={<Upload />}
//                     >
//                       Update
//                     </Button>
//                   </Box>
//                 </Box>
//               </Grid>
//             ))}
//           </Grid>
//         </Paper>
//       )}

//       {/* Other sections for inquiries and history */}
//       {activeTab === 'inquiries' && (
//         <Paper sx={{ p: 4, mt: 4 }}>
//           {/* <Typography variant="h6" gutterBottom>Inquiries and Requests</Typography> */}
//           {inquiries.map((inquiry) => (
//             <Alert key={inquiry.id} severity={inquiry.status === "resolved" ? "success" : "warning"} sx={{ mb: 2 }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                 <Typography variant="subtitle1">{inquiry.type.replace('_', ' ').toUpperCase()}</Typography>
//                 {getStatusBadge(inquiry.status)}
//               </Box>
//               <Typography>{inquiry.request}</Typography>
//               <Typography variant="caption" color="text.secondary">
//                 {inquiry.date} • {inquiry.submittedBy}
//               </Typography>
//             </Alert>
//           ))}
//         </Paper>
//       )}

//       {activeTab === 'history' && (
//         <Paper sx={{ p: 4, mt: 4, bgcolor: 'background.default' }}>
//           {/* <Typography variant="h6" gutterBottom>Application History</Typography> */}
//           <Box sx={{ position: 'relative', pl: 3 }}>
//             {history.map((item, index) => (
//               <Box key={index} sx={{ position: 'relative', mb: 3 }}>
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     pl: 4,
//                     py: 2,
//                     bgcolor: 'background.paper',
//                     boxShadow: 1,
//                     borderRadius: 2,
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       position: 'absolute',
//                       left: 0,
//                       width: 24,
//                       height: 24,
//                       bgcolor: 'primary.main',
//                       borderRadius: '50%',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       color: 'white',
//                     }}
//                   >
//                     <HistoryIcon fontSize="small" />
//                   </Box>
//                   <Box ml={3}>
//                     <Typography variant="subtitle1">{item.action}</Typography>
//                     <Typography variant="caption" color="text.secondary">
//                       {item.date} • {item.user}
//                     </Typography>
//                   </Box>
//                 </Box>
//               </Box>
//             ))}
//           </Box>
//         </Paper>
//       )}

//       {/* Inquiry Dialog */}
//       <Dialog open={showInquiryDialog} onClose={() => setShowInquiryDialog(false)} maxWidth="md">
//         <DialogTitle>Submit Inquiry</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Inquiry Details"
//             variant="outlined"
//             fullWidth
//             multiline
//             rows={4}
//             value={inquiryText}
//             onChange={(e) => setInquiryText(e.target.value)}
//             sx={{ mt: 2 }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setShowInquiryDialog(false)}>Cancel</Button>
//           <Button onClick={handleSubmitInquiry} variant="contained">Submit Inquiry</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };



// import React, { useState } from 'react';
// import {
//   Box, Stepper, Step, StepLabel, Paper, Typography, Grid,
//   TextField, Button, Chip, IconButton, Dialog, DialogTitle,
//   DialogContent, DialogActions, List, ListItem, ListItemText,
//   Card, CardContent, Divider
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import EditIcon from '@mui/icons-material/Edit';
// import SendIcon from '@mui/icons-material/Send';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import HistoryIcon from '@mui/icons-material/History';
// import UploadIcon from '@mui/icons-material/Upload';
// import {ApplicationChat} from "../../Components/ApplicationChat";

// const steps = ['Submitted', 'Under Review', 'Verified'];

// const initialApplicationDetails = {
//   partyName: 'Green Party',
//   leader: 'John Doe',
//   submittedDate: '2024-07-31',
//   partySymbol: '/path/to/party-symbol.png',
//   addressLine1: '123 Green Street',
//   addressLine2: 'Eco City',
//   postalCode: '12345',
//   contactNumber: '+1 234 567 8900',
//   email: 'contact@greenparty.com',
//   attachments: [
//     { type: 'Constitution', name: 'Constitution.pdf', link: '/path/to/constitution.pdf' },
//     { type: 'Logo', name: 'Logo.png', link: '/path/to/logo.png' },
//     { type: 'Membership List', name: 'Members.xlsx', link: '/path/to/members.xlsx' },
//     { type: 'Financial Statement', name: 'Finances.pdf', link: '/path/to/finances.pdf' },
//     { type: 'Leadership Structure', name: 'Leadership.pdf', link: '/path/to/leadership.pdf' }
//   ]
// };


// const initialUpdateHistory = [
//   { field: 'Party Name', oldValue: 'Eco Party', newValue: 'Green Party', date: '2024-07-29' },
//   { field: 'Leader', oldValue: 'Jane Smith', newValue: 'John Doe', date: '2024-07-30' }
// ];

// const CustomStepper = styled(Stepper)(({ theme }) => ({
//   padding: theme.spacing(3, 0, 5),
// }));

// const FormSection = styled(Card)(({ theme }) => ({
//   marginBottom: theme.spacing(3),
// }));


// export const PartyApplication = () => {
//   const [activeStep, setActiveStep] = useState(1);
//   const [applicationDetails, setApplicationDetails] = useState(initialApplicationDetails);
//   const [updateHistory, setUpdateHistory] = useState(initialUpdateHistory);
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [editField, setEditField] = useState({ name: '', value: '' });

//   const handleEdit = (field, value) => {
//     setEditField({ name: field, value: value });
//     setEditDialogOpen(true);
//   };

//   const handleEditSave = () => {
//     setApplicationDetails({ ...applicationDetails, [editField.name]: editField.value });
//     setUpdateHistory([
//       { 
//         field: editField.name, 
//         oldValue: applicationDetails[editField.name], 
//         newValue: editField.value, 
//         date: new Date().toISOString().split('T')[0] 
//       },
//       ...updateHistory
//     ]);
//     setEditDialogOpen(false);
//   };

//   const handleFileUpload = (attachmentType) => {
//     // Implement file upload logic here
//     console.log(`Uploading file for ${attachmentType}`);
//   };


//   const renderApplicationDetails = () => (
//     <FormSection elevation={3}>
//       <CardContent>
//         <Grid container spacing={3}>
//           {Object.entries(applicationDetails).map(([key, value]) => {
//             if (key !== 'attachments' && key !== 'partySymbol') {
//               return (
//                 <Grid item xs={12} sm={6} key={key}>
//                   <TextField
//                     fullWidth
//                     label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}
//                     value={value}
//                     InputProps={{
//                       readOnly: true,
//                       endAdornment: (
//                         <IconButton size="small" onClick={() => handleEdit(key, value)}>
//                           <EditIcon />
//                         </IconButton>
//                       ),
//                     }}
//                     variant="outlined"
//                   />
//                 </Grid>
//               );
//             }
//             return null;
//           })}
//         </Grid>
//       </CardContent>
//     </FormSection>
//   );

//   const renderAttachments = () => (
//     <FormSection elevation={3}>
//       <CardContent>
//         <Typography variant="h6" gutterBottom>Attachments</Typography>
//         <Grid container spacing={2}>
//           {applicationDetails.attachments.map((attachment, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <Card variant="outlined">
//                 <CardContent>
//                   <Typography variant="subtitle1" gutterBottom>{attachment.type}</Typography>
//                   <Box display="flex" alignItems="center" mb={1}>
//                     <AttachFileIcon fontSize="small" />
//                     <Typography variant="body2" noWrap sx={{ ml: 1 }}>{attachment.name}</Typography>
//                   </Box>
//                   <Button
//                     variant="contained"
//                     startIcon={<UploadIcon />}
//                     onClick={() => handleFileUpload(attachment.type)}
//                     fullWidth
//                   >
//                     Update
//                   </Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </CardContent>
//     </FormSection>
//   );


//   const renderHistory = () => (
//     <Card elevation={3}>
//       <CardContent>
//         <Typography variant="h6" gutterBottom>Update History</Typography>
//         <List>
//           {updateHistory.map((update, index) => (
//             <ListItem key={index}>
//               <ListItemText
//                 primary={
//                   <Typography variant="subtitle1">
//                     <HistoryIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
//                     {update.field} updated on {update.date}
//                   </Typography>
//                 }
//                 secondary={
//                   <>
//                     <Typography variant="body2" component="span">Old value: {update.oldValue}</Typography>
//                     <br />
//                     <Typography variant="body2" component="span">New value: {update.newValue}</Typography>
//                   </>
//                 }
//               />
//             </ListItem>
//           ))}
//         </List>
//       </CardContent>
//     </Card>
//   );

//   return (
//     <Box className="min-h-[600px] flex flex-col bg-base-100 rounded-xl shadow-lg px-6 pb-6 gap-6" sx={{ maxWidth: 1200, margin: 'auto', p: 3 }}>
//       <Typography variant="h4" gutterBottom>Application ID #12345</Typography>
//       <CustomStepper activeStep={activeStep} alternativeLabel>
//         {steps.map((label) => (
//           <Step key={label}>
//             <StepLabel>{label}</StepLabel>
//           </Step>
//         ))}
//       </CustomStepper>
      
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={8}>
//           {renderApplicationDetails()}
//           {renderAttachments()}
//           {renderHistory()}
//         </Grid>
//       </Grid>

//       <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
//         <DialogTitle>Edit {editField.name}</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             fullWidth
//             value={editField.value}
//             onChange={(e) => setEditField({ ...editField, value: e.target.value })}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
//           <Button onClick={handleEditSave} variant="contained">Save</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }


{/* 
      {activeTab === 'details' && (
        <Paper sx={{ p: 4, mt: 4 }}>
          <Typography variant="h6" gutterBottom>Application Details</Typography>
          <Grid container spacing={2}>
            {Object.entries(applicationDetails).map(([key, value]) => (
              key !== 'id' && key !== 'status' && (
                <Grid item xs={6} key={key}>
                  <TextField
                    label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                    value={value}
                    variant="filled"
                    fullWidth
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              )
            ))}
          </Grid>
          <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
            <Button variant="contained" color="success" onClick={() => console.log("Accept")}>Accept Application</Button>
            <Button variant="outlined" color="error" onClick={() => console.log("Reject")}>Reject</Button>
            <Button variant="contained" color="error" onClick={() => console.log("Ban")}>Ban Application</Button>
            <Button variant="outlined" onClick={() => setShowInquiryDialog(true)}>Submit Inquiry</Button>
          </Box>
        </Paper>
      )}

      {activeTab === 'documents' && (
        <Paper sx={{ p: 4, mt: 4 }}>
          <Typography variant="h6" gutterBottom>Required Documents</Typography>
          <Grid container spacing={2}>
            {attachments.map((doc, index) => (
              <Grid item xs={12} key={index}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <FileText />
                    <Typography>{doc.type}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {getStatusBadge(doc.status)}
                    <Button variant="outlined" startIcon={<Upload />}>Update</Button>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )} */}