import React, { useState, useEffect } from 'react';
import {
  Calendar, Clock, FileText, HistoryIcon, MessageSquare, Send, Upload,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  CardMedia,
  Typography,
  Tabs,
  Tab,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Badge,
  Paper,
  IconButton,
  Grid,
  Chip,
  Box,
  Tooltip,
  Alert,
  Divider,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useParams } from 'react-router-dom';
import {  Image, Users, DollarSign, Landmark, FileCheck } from 'lucide-react';
import { useForm } from 'react-hook-form';
import KeycloakService from "../../services/KeycloakService";
import axios from 'axios';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const documents = [
  {
    id: 'constitution',
    title: 'Constitution',
    icon: <Landmark className="h-5 w-5" />,
    acceptedTypes: '.pdf,.doc,.docx'
  },
  {
    id: 'logo',
    title: 'Party Logo',
    icon: <Image className="h-5 w-5" />,
    acceptedTypes: 'image/*'
  },
  {
    id: 'membership',
    title: 'Membership List',
    icon: <Users className="h-5 w-5" />,
    acceptedTypes: '.pdf,.doc,.docx,.xlsx,.csv'
  },
  {
    id: 'financial',
    title: 'Financial Statement',
    icon: <DollarSign className="h-5 w-5" />,
    acceptedTypes: '.pdf,.xlsx,.csv'
  },
  {
    id: 'leadership',
    title: 'Leadership Structure',
    icon: <FileText className="h-5 w-5" />,
    acceptedTypes: '.pdf,.doc,.docx'
  }
];

export const PartyApplication = () => {
  const { register, handleSubmit, formState: { errors }, setValue, getValues, reset, control } = useForm();
  const [activeTab, setActiveTab] = useState("details");
  const [showInquiryDialog, setShowInquiryDialog] = useState(false);
  const [inquiryText, setInquiryText] = useState("");
  const [editable, setEditable] = useState(false);  // Added state for editability
  const [party, setParty] = useState(null);
  const [partyState, setPartyState] = useState(null);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const { partyId } = useParams();
  
  const applicationStatus = "under-review"; // Can be: pending verification, verified, rejected, banned
  
  const [applicationDetails, setApplicationDetails] = useState({
    id: "APP-12345",
    partyName: "Green Party",
    leader: "John Doe",
    submittedDate: "2024-07-31",
    status: "Under Review",
    addressLine1: "123 Green Street",
    addressLine2: "Eco City",
    postalCode: "12345",
    contactNumber: "+1 234 567 8900",
    email: "contact@greenparty.com"
  });

  const attachments = [
    { type: "Constitution", name: "Constitution.pdf", status: "verified" },
    { type: "Logo", name: "Logo.png", status: "pending" },
    { type: "Membership List", name: "Members.xlsx", status: "rejected" },
    { type: "Financial Statement", name: "Finances.pdf", status: "pending" },
    { type: "Leadership Structure", name: "Leadership.pdf", status: "verified" }
  ];

  const inquiries = [
    {
      id: 1,
      type: "name_change",
      status: "pending",
      date: "2024-08-01",
      request: "Request to change party name from 'Eco Party' to 'Green Party'",
      submittedBy: "John Doe"
    },
    {
      id: 2,
      type: "document_update",
      status: "resolved",
      date: "2024-07-29",
      request: "Updated constitution document requested",
      submittedBy: "Verification Officer"
    }
  ];

  const history = [
    {
      date: "2024-07-31",
      action: "Application submitted",
      user: "John Doe"
    },
    {
      date: "2024-07-29",
      action: "Party name updated from 'Eco Party' to 'Green Party'",
      user: "John Doe"
    }
  ];

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {

      try {
        const token = KeycloakService.getToken();
        const partyResponse = await axios.get(`http://localhost:5003/api/party/${partyId}`, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
        setParty(partyResponse.data);
        setPartyState(partyResponse.data.state);
        console.log(partyResponse);
        
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load party data. Please try again later.');
      } 
    };

    fetchData();
  }, [partyState]);

  const getStatusBadge = (state) => {
    const colorMap = {
      verified: "success",
      pending: "warning",
      rejected: "error",
      "pending verification": "info",
      banned: "secondary",
    };

    return (
      <Chip
        label={state.charAt(0).toUpperCase() + state.slice(1)}
        color={colorMap[state.toLowerCase()]}
        variant="outlined"
      />
    );
  };

  const handleSubmitInquiry = () => {
    setShowInquiryDialog(false);
    setInquiryText("");
  };

  const handleFieldChange = (key, value) => {
    setApplicationDetails(prevDetails => ({
      ...prevDetails,
      [key]: value,
    }));
  };

  //register files
  const[constitution, setConstitution] = useState(null);
  const[logo, setLogo] = useState(null);
  const[membership, setMembership] = useState(null);
  const[financial, setFinancial] = useState(null);
  const[leadership, setLeadership] = useState(null);

  const handleFileChange = (documentId) => (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(`File uploaded for ${documentId}:`, file.name);
      if(documentId === "constitution"){
        setValue("constitution", file);
        setConstitution(file.name);
      }else if(documentId === "logo"){
        setValue("logo", file);
        setLogo(file.name);
        const reader = new FileReader();
        reader.onloadend = () => {
            setValue("partySymbol", reader.result.split(",")[1]);
        };
        reader.readAsDataURL(file);
      }else if(documentId === "membership"){
        setValue("membership", file);
        setMembership(file.name);
      }else if(documentId === "financial"){
        setValue("financial", file);
        setFinancial(file.name);
      }else if(documentId === "leadership"){
        setValue("leadership", file);
        setLeadership(file.name);
      }else{
        alert("Invalid File Type");
      }
    }
  };

  const handleStateUpdate = async (state) => {
    const confirmation = await MySwal.fire({
      title: "Are you sure?",
      text: `Do you want to update the party state to "${state}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!"
    });
  
    if (confirmation.isConfirmed) {
      try {
        const updatedToken = KeycloakService.getToken();
        const partyMember = await axios.put(
          `http://localhost:5003/api/party/state?party=${partyId}&state=${state}`,
          null, // If no request body, pass `null` here
          {
            headers: {
              Authorization: `Bearer ${updatedToken}`
            }
          }
        );
  
        setPartyState(state);
        console.log(partyMember);
  
        await MySwal.fire({
          title: "Success!",
          text: `The party state has been successfully updated!".`,
          icon: "success",
          confirmButtonText: "OK"
        });
      } catch (err) {
        console.error(err);
        MySwal.fire({
          title: "Error!",
          text: "Failed to update the party state. Please try again.",
          icon: "error",
          confirmButtonText: "OK"
        });
      }
    }
  };

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!party) {
    return (
      <Box className="min-h-[600px] flex bg-base-100 rounded-xl shadow-lg px-6 pb-6 gap-6" sx={{ maxWidth: 1200, margin: 'auto', p: 3 }}>
        Loading application.....
        {/* <CircularProgress /> */}
      </Box>
    );
  }

  return (
    <Box className="min-h-[600px] flex flex-col bg-base-100 rounded-xl shadow-lg px-6 pb-6 gap-6" sx={{ maxWidth: 1200, margin: 'auto', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <div className='header flex justify-between items-center'>
          <div className="text-3xl font-semibold text-gray-900 flex justify-between">
            Application ID: #{ partyId }
          </div>
        </div>   
        {getStatusBadge(party.state)}
      </Box>

      <Button variant="outlined" onClick={() => setEditable(!editable)}>
        {editable ? "Save Changes" : "Edit"}
      </Button>

      <Tabs
        value={activeTab}
        onChange={(e, newValue) => setActiveTab(newValue)}
        aria-label="application tabs"
      >
        <Tab label="Details" value="details" />
        <Tab label="Inquiries" value="inquiries" />
        <Tab label="History" value="history" />
      </Tabs>

      {activeTab === 'details' && (
        <Paper sx={{ p: 4, mt: 4 }}>
          <Grid container spacing={2}>
            {Object.entries(applicationDetails).map(([key, value]) => (
              key !== 'id' && key !== 'status' && (
                <Grid item xs={6} key={key}>
                  <TextField
                    label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                    value={value}
                    variant="filled"
                    fullWidth
                    onChange={(e) => handleFieldChange(key, e.target.value)}
                    InputProps={{
                      readOnly: !editable,
                    }}
                  />
                </Grid>
              )
            ))}
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" gutterBottom>Required Documents</Typography>
          <Box className="w-full">
            {/* <CardContent> */}
            <div className="flex flex-col gap-2">
                {documents.map(({ id, title, icon, acceptedTypes }) => (
                <div 
                    key={id} 
                    className="p-2 border rounded-lg hover:border-blue-500 transition-colors"
                >
                    <div className="flex items-center justify-between">
                        <div className='flex items-center'>
                            {icon}
                            <span className="font-medium">{title}</span>
                        </div>

                        <input
                            accept={acceptedTypes}
                            id={`${id}-input`}
                            type="file"
                            style={{ display: "none" }}
                            onChange={handleFileChange(id)}
                        />
                    
                        <div>
                            <label htmlFor={`${id}-input`}>
                                <Button
                                component="span"
                                role={undefined}
                                variant="outline"
                                className="w-full"
                                >
                                <Upload className="h-4 w-4 mr-2" />
                                Choose File
                                </Button>
                            </label>
                        </div>
                    </div>
                    <div className='flex justify-between mr-4'>
                        <div className="truncate max-w-[400px] ">
                            <span>File: </span> 
                            {
                                id === "constitution" ? constitution :
                                id === "logo" ? logo :
                                id === "membership" ? membership :
                                id === "financial" ? financial :
                                id === "leadership" ? leadership :
                                null 
                            }
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                            <FileCheck className="h-4 w-4 inline mr-1" />
                            <span>{acceptedTypes.replace(/\./g, '').replace(/,/g, ', ')}</span>
                        </div>
                    </div>
                </div>
                ))}
            </div>
            {/* </CardContent> */}
          </Box>
          <Box sx={{ mt: 4, display: 'flex', gap: 2 }} className="flex justify-end">
            <Button variant="contained" color="success" onClick={() => handleStateUpdate("verified")}>Accept</Button>
            <Button variant="outlined" color="error" onClick={() => handleStateUpdate("rejected")}>Reject</Button>
            <Button variant="contained" color="error" onClick={() => handleStateUpdate("banned")}>Ban</Button>
            <Button variant="outlined" onClick={() => setShowInquiryDialog(true)}>Submit Inquiry</Button>
          </Box>
        </Paper>
      )}

      {/* Other sections for inquiries and history */}
      {activeTab === 'inquiries' && (
        <Paper sx={{ p: 4, mt: 4 }}>
          {/* <Typography variant="h6" gutterBottom>Inquiries and Requests</Typography> */}
          {inquiries.map((inquiry) => (
            <Alert key={inquiry.id} severity={inquiry.status === "resolved" ? "success" : "warning"} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="subtitle1">{inquiry.type.replace('_', ' ').toUpperCase()}</Typography>
                {getStatusBadge(inquiry.status)}
              </Box>
              <Typography>{inquiry.request}</Typography>
              <Typography variant="caption" color="text.secondary">
                {inquiry.date} • {inquiry.submittedBy}
              </Typography>
            </Alert>
          ))}
        </Paper>
      )}

      {activeTab === 'history' && (
        <Paper sx={{ p: 4, mt: 4, bgcolor: 'background.default' }}>
          {/* <Typography variant="h6" gutterBottom>Application History</Typography> */}
          <Box sx={{ position: 'relative', pl: 3 }}>
            {history.map((item, index) => (
              <Box key={index} sx={{ position: 'relative', mb: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    pl: 4,
                    py: 2,
                    bgcolor: 'background.paper',
                    boxShadow: 1,
                    borderRadius: 2,
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      left: 0,
                      width: 24,
                      height: 24,
                      bgcolor: 'primary.main',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                    }}
                  >
                    <HistoryIcon fontSize="small" />
                  </Box>
                  <Box ml={3}>
                    <Typography variant="subtitle1">{item.action}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.date} • {item.user}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>
      )}

      {/* Inquiry Dialog */}
      <Dialog open={showInquiryDialog} onClose={() => setShowInquiryDialog(false)} maxWidth="md">
        <DialogTitle>Submit Inquiry</DialogTitle>
        <DialogContent>
          <TextField
            label="Inquiry Details"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={inquiryText}
            onChange={(e) => setInquiryText(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowInquiryDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmitInquiry} variant="contained">Submit Inquiry</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};



