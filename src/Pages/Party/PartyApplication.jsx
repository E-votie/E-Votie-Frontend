import React, { useState, useEffect, useCallback } from 'react';
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
  Stack,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useParams } from 'react-router-dom';
import {  Image, Users, DollarSign, Landmark, FileCheck } from 'lucide-react';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import KeycloakService from "../../services/KeycloakService";
import axios from 'axios';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const MySwal = withReactContent(Swal);
const partyUrl = import.meta.env.VITE_API_PARTY_URL;

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

const cities = [
  'Akmeemana', 'Ambalanthota', 'Alayadiwembu', 'Ambalangoda', 'Akurana', 'Ambagamuwa', 'Akuressa', 'Ampara', 'Alawwa', 
  'Arachchikattuwa PS', 'Attanagalla', 'Agalawatta', 'Ayagama', 'Ambanganga Korale', 'Akkaraipattu', 'Angunakolapelessa', 
  'Addalachchenai', 'Ambanpola', 'Baddegama', 'Bope-Poddala', 'Bandarawela', 'Beruwala', 'Beliatta', 'Bentota', 'Buttala', 
  'Badulla', 'Bandaragama', 'Balangoda', 'Biyagama', 'Bibile', 'Bulathsinhala', 'Bulathkohupitiya', 'Chilaw', 'Colombo', 
  'Delthota', 'Divulapitiya', 'Dodangoda', 'Doluwa', 'Dambulla', 'Dickwella', 'Dankotuwa', 'Devinuwara', 'Dimbulagala', 
  'Dehiattakandiya', 'Deraniyagala', 'Dompe', 'Dehiovita', 'Delft', 'Damana', 'Eravur Pattu', 'Ella', 'Elpitiya', 
  'Eravur Town', 'Embilipitiya', 'Eheliyagoda', 'Elahera', 'Galgamuwa', 'Galle', 'Ganga Ihala Korale', 'Galewela', 
  'Gampaha', 'Godakawela', 'Galigamuwa', 'Giribawa', 'Ganewatta', 'Galnewa', 'Haputale', 'Horana', 'Harispattuwa', 
  'Hildummulla', 'Hali-Ela', 'Hambantota', 'Hikkaduwa', 'Habaraduwa', 'Hatharaliyadda', 'Hingurakgoda', 'Hanguranketha', 
  'Homagama', 'Hanwella', 'Ipalogama', 'Imaduwa', 'Ingiriya', 'Ibbagamuwa', 'Island South (Velanai)', 'Imbulpe', 'Jaffna', 
  'Ja-Ela', 'Kesbewa', 'Kaduwela', 'Kelaniya', 'Kalutara', 'Kundasale', 'K.F.G. & G. Korale', 'Katunayake', 
  'Koralai Pattu (Valachchenai)', 'Kekirawa', 'Katharagama', 'Kuchchaveli', 'Kothmale', 'Kandy', 'Kotapola', 'Kuruvita', 
  'Kamburupitiya', 'Kalpitiya', 'Kegalle', 'Kurunegala', 'Kobeigane', 'Kalawana', 'Kahawatta', 'Kolonna', 'Koralai Pattu North', 
  'Kiriella', 'Kuliyapitiya West', 'Kinniya', 'Kolonnawa', 'Katuwana', 'Karandeniya', 'Karuwalagaswewa', 'Karachchi', 
  'Lunugamvehera', 'Lahugala', 'Lankapura', 'Laggala-Pallegama', 'Lunugala', 'Medadumbara', 'Mahara', 'Maharagama', 
  'Mathugama', 'Moratuwa', 'Mihinthale', 'Manmunai North', 'Minipe', 'Minuwangoda', 'Mawathagama', 'Mahiyanganaya', 
  'Manmunai South and Eruvilpattu', 'Mawanella', 'Millaniya', 'Mulatiyana', 'Matale', 'Matara Four Gravets', 'Malimbada', 
  'Mount Lavinia', 'Mannar Town', 'Mirigama', 'Madulla', 'Mahawewa', 'Moneragala', 'Mahakumbukkadawala', 'Maspotha', 
  'Maritimepattu', 'Mahawa', 'Medawachchiya', 'Mundalama', 'Mirissa', 'Madurawala', 'Medagama', 'Mallawapitiya', 
  'Meegahakivula', 'Mahaoya', 'Manthai West', 'Madampe', 'Madhu', 'Nallur', 'Nochchiyagama', 'Negombo', 'N. Palatha East', 
  'N. Palatha Central', 'Nachchadoowa', 'Nagoda', 'Nanaddan', 'Naula', 'Nivithigala', 'Nuwara Eliya', 'Ninthavur', 
  'Nikaweratiya', 'Nattandiya', 'Niyagama', 'Neluwa', 'Narammala', 'Opanayaka', 'Palugaswewa', 'Passara', 'Pathadumbara', 
  'Panvila', 'Pathahewaheta', 'Padukka', 'Pasbage Korale', 'Panadura', 'Poojapitiya', 'Pothuvil', 'Puttalam', 'Polpithigama', 
  'Pelmadulla', 'Pallepola', 'Pitabeddara', 'Palindanuwara', 'Panduwasnuwara', 'Pannala', 'Palagala', 'Polgahawela', 
  'Pachchilaipalli', 'Pallama', 'Rambukkana', 'Rambewa', 'Ratnapura', 'Rattota', 'Ruwanwella', 'Rideegama', 'Rajanganaya', 
  'Sri Jayawardanapura Kotte', 'Sevanagala', 'Sigiriya', 'Sooriyawewa', 'Siyambalanduwa', 'Sainthamarathu', 'Samanthurai', 
  'Soranathota', 'Thissamaharama - Yala', 'Thawalama', 'Tangalle', 'Thambuttegama', 'Thumpane', 'Thalawa', 'Thirappane', 
  'Thenmaradchy (Chavakachcheri)', 'Trincomalee Town and Gravets', 'Thanamalvila', 'Thihagoda', 'Thamankaduwa', 
  'Thampalakamam', 'Udapalatha', 'Udunuwara', 'Uva Paranagama', 'Ukuwela', 'Udubaddawa', 'Unawatuna', 'Udadumbara', 
  'Uhana', 'Valikamam South', 'Valikamam South-West', 'Valikamam East', 'Valikamam West', 'Vanathavilluwa', 'Vavuniya', 
  'Valikamam North', 'Vadamaradchy North', 'Vadamaradchi South-West', 'Vavuniya North', 'Walallawita', 'Welivitiya-Divithura', 
  'Welimada', 'Wattala', 'Wellawaya', 'Welikanda', 'Welipitiya', 'Walapane', 'Wennappuwa', 'Weligama', 'Wariyapola', 
  'Weeraketiya', 'Wilgamuwa', 'Warakapola', 'Weerambugedara', 'Weligepola', 'Yatinuwara', 'Yakkalamulla', 'Yatiyanthota', 
  'Yatawatta',
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
  const [activeStep, setActiveStep] = useState(0);
  const [isLeaderVerified, setIsLeaderVerified] = useState(false);
  const [isLeaderAvaialble, setIsLeaderAvailable] = useState(false);
  const [isCheckedLeaderNIC, setIsCheckedLeaderNIC] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [leaderName, setLeaderName] = useState("");
  const navigate = useNavigate();
  
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
        const partyResponse = await axios.get(`${partyUrl}/api/party/${partyId}`, {
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
          `${partyUrl}/api/party/state?party=${partyId}&state=${state}`,
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

  //validate if the leader is a voter or not
  const validateLeaderNic = useCallback(async (nic) => {
    if (!nic) return;

    const updatedToken = KeycloakService.getToken();

    setIsLoading(true);
    setIsCheckedLeaderNIC(true);

    try {
        const leader = await axios.get(`${partyUrl}/api/voter/${nic}`, {
            headers: {
                Authorization: `Bearer ${updatedToken}`
            }
        });

        return leader;
    } catch (error) {
        console.log(error);
        setIsSubmitDisabled(true);
    } finally {
        setIsLoading(false);
    }

    console.log("isLeaderAvaialble "+ isLeaderAvaialble);
    console.log("isLeaderVerified "+ isLeaderVerified);
  }, []);

  //check if the user is already a leader/secretary or not
  const getPartyMemberByNIC = async (nic) => {
    try{
        const updatedToken = KeycloakService.getToken();
        const partyMember = await axios.get(`${partyUrl}/api/party/member/by/nic/${nic}`, {
            headers: {
                Authorization: `Bearer ${updatedToken}`
            }
        });
        return partyMember;
    }catch(err){
        console.log(err);
        return null;
    }
  }

  const handleLeaderNicBlur = async (e) => {
    const nic = e.target.value;
    if (!nic) return;

    setIsLoading(true);
    setIsCheckedLeaderNIC(true);

    const updatedState = {
        isLeaderVerified: false,
        isLeaderAvailable: false,
        isSubmitDisabled: true,
    };

    const voter = await validateLeaderNic(nic);
    const partyMember = await getPartyMemberByNIC(nic);

    if (!voter) {
        console.log("inside block 1");
        updatedState.isLeaderVerified = false;
        updatedState.isLeaderAvailable = false;
        updatedState.isSubmitDisabled = true;
    } else if (voter && !partyMember) {
        console.log("inside block 2");
        updatedState.isLeaderVerified = true;
        updatedState.isLeaderAvailable = true;
        updatedState.isSubmitDisabled = false;
    } else if (voter && partyMember) {
        console.log("inside block 3");
        updatedState.isLeaderVerified = true;
        const partyMemberRole = partyMember.data.role;

        if (partyMemberRole === "Leader" || partyMemberRole === "Secretary") {
            console.log("inside block 4");
            updatedState.isLeaderAvailable = false;
            updatedState.isSubmitDisabled = true;
        } else {
            updatedState.isLeaderAvailable = true;
            updatedState.isSubmitDisabled = false;
        }
    } else {
        console.log("inside else");
        updatedState.isLeaderVerified = false;
        updatedState.isLeaderAvailable = false;
        updatedState.isSubmitDisabled = true;
    }

    setIsLeaderVerified(updatedState.isLeaderVerified);
    setIsLeaderAvailable(updatedState.isLeaderAvailable);
    setIsSubmitDisabled(updatedState.isSubmitDisabled);

    console.log("Updated State: ", updatedState);

    setIsLoading(false);
  };

  // Styled Dialog similar to the existing BootstrapDialog
  const FieldEditDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
    '& .MuiPaper-root': {
        width: '80%',
        maxWidth: '600px',
    },
  }));

  // State for managing edit modals
  const [openPartyNameModal, setOpenPartyNameModal] = useState(false);
  const [openAbbreviationModal, setOpenAbbreviationModal] = useState(false);
  const [openFoundedDateModal, setOpenFoundedDateModal] = useState(false);
  const [openAddressLine1Modal, setOpenAddressLine1Modal] = useState(false);
  const [openAddressLine2Modal, setOpenAddressLine2Modal] = useState(false);
  const [openCityModal, setOpenCityModal] = useState(false);
  const [openPostalCodeModal, setOpenPostalCodeModal] = useState(false);
  const [openLeaderNicModal, setOpenLeaderNicModal] = useState(false);

  // Generic edit modal component
  const EditFieldModal = ({ 
    open, 
    handleClose, 
    title, 
    children, 
    onSubmit 
  }) => (
    <FieldEditDialog
        open={open}
        onClose={handleClose}
    >
        <DialogTitle sx={{ m: 0, p: 2 }}>
            {title}
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
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                    {children}
                </Stack>
            </form>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" onClick={handleSubmit(onSubmit)}>Save</Button>
        </DialogActions>
    </FieldEditDialog>
  );

  const renderPartyInformationForm = () => (
    <Box className="w-full max-w-4xl mb-1.5">
      <Stack spacing={3}>
          {/* First Row: Party Name and Abbreviation */}
          <Stack direction="row" spacing={2} alignItems="center">
              <Stack direction="row" alignItems="center" flexGrow={1}>
                  <TextField
                      fullWidth
                      label="Party Name"
                      variant="outlined"
                      {...register("partyName", { required: true })}
                      margin="normal"
                      sx={{ fontSize: '1rem', fontWeight: 'bold' }}
                  />
                  <IconButton onClick={() => setOpenPartyNameModal(true)}>
                      <EditIcon />
                  </IconButton>
              </Stack>
              
              <Stack direction="row" alignItems="center" flexGrow={1}>
                  <TextField
                      fullWidth
                      label="Abbreviation"
                      variant="outlined"
                      {...register("abbreviation", { required: true })}
                      margin="normal"
                      sx={{ fontSize: '1rem', fontWeight: 'bold' }}
                  />
                  <IconButton onClick={() => setOpenAbbreviationModal(true)}>
                      <EditIcon />
                  </IconButton>
              </Stack>
          </Stack>

          {/* Second Row: Founded Date */}
          <Stack direction="row" spacing={2} alignItems="center">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                      name="foundedDate"
                      control={control}
                      render={({ field, fieldState }) => (
                          <Stack direction="row" alignItems="center" flexGrow={1}>
                              <DatePicker
                                  {...field}
                                  label="Established Date"
                                  renderInput={(params) => (
                                      <TextField 
                                          {...params} 
                                          fullWidth
                                          error={!!fieldState.error} 
                                          helperText={fieldState.error?.message} 
                                          margin="normal"
                                      />
                                  )}
                              />
                              <IconButton onClick={() => setOpenFoundedDateModal(true)}>
                                  <EditIcon />
                              </IconButton>
                          </Stack>
                      )}
                  />
              </LocalizationProvider>
          </Stack>

          {/* Third Row: Address Line 1 and Address Line 2 */}
          <Stack direction="row" spacing={2} alignItems="center">
              <Stack direction="row" alignItems="center" flexGrow={1}>
                  <TextField
                      fullWidth
                      label="Address Line 1"
                      variant="outlined"
                      {...register("addressLine1", { required: true })}
                      margin="normal"
                      sx={{ fontSize: '1rem', fontWeight: 'bold' }}
                  />
                  <IconButton onClick={() => setOpenAddressLine1Modal(true)}>
                      <EditIcon />
                  </IconButton>
              </Stack>
              
              <Stack direction="row" alignItems="center" flexGrow={1}>
                  <TextField
                      fullWidth
                      label="Address Line 2"
                      variant="outlined"
                      {...register("addressLine2")}
                      margin="normal"
                      sx={{ fontSize: '1rem', fontWeight: 'bold' }}
                  />
                  <IconButton onClick={() => setOpenAddressLine2Modal(true)}>
                      <EditIcon />
                  </IconButton>
              </Stack>
          </Stack>

          {/* Fourth Row: City and Postal Code */}
          <Stack direction="row" spacing={2} alignItems="center">
              <Stack direction="row" alignItems="center" flexGrow={1}>
                  <FormControl fullWidth margin="normal">
                      <InputLabel id="city-label">City</InputLabel>
                      <Select
                          labelId="city-label"
                          label="City"
                          variant="outlined"
                          {...register("city")}
                      >
                          {cities.map((city, index) => (
                              <MenuItem key={index} value={city}>
                                  {city}
                              </MenuItem>
                          ))}
                      </Select>
                  </FormControl>
                  <IconButton onClick={() => setOpenCityModal(true)}>
                      <EditIcon />
                  </IconButton>
              </Stack>
              
              <Stack direction="row" alignItems="center" flexGrow={1}>
                  <TextField
                      fullWidth
                      label="Postal Code"
                      variant="outlined"
                      {...register("postalCode", { required: true })}
                      margin="normal"
                      sx={{ fontSize: '1rem', fontWeight: 'bold' }}
                  />
                  <IconButton onClick={() => setOpenPostalCodeModal(true)}>
                      <EditIcon />
                  </IconButton>
              </Stack>
          </Stack>

          {/* Fifth Row: Leader NIC and Leader Name */}
          <Stack direction="row" spacing={2} alignItems="center">
              <Stack direction="row" alignItems="center" flexGrow={1}>
                  <TextField
                      fullWidth
                      label="Leader NIC"
                      variant="outlined"
                      {...register("leaderNic", { required: true })}
                      margin="normal"
                      sx={{ fontSize: '1rem', fontWeight: 'bold' }}
                  />
                  <IconButton onClick={() => setOpenLeaderNicModal(true)}>
                      <EditIcon />
                  </IconButton>
              </Stack>
              
              <TextField
                  fullWidth
                  label="Leader Name"
                  variant="outlined"
                  disabled
                  margin="normal"
                  sx={{ fontSize: '1rem', fontWeight: 'bold' }}
              />
          </Stack>
      </Stack>

      {/* Modals for each field */}
      {/* Party Name Modal */}
      <EditFieldModal
          open={openPartyNameModal}
          handleClose={() => setOpenPartyNameModal(false)}
          title="Edit Party Name"
          onSubmit={(data) => {
              console.log('Party Name Updated:', data.partyName);
              setOpenPartyNameModal(false);
          }}
      >
          <TextField
              fullWidth
              label="Party Name"
              variant="outlined"
              {...register("partyName", { required: true })}
          />
      </EditFieldModal>

      {/* Abbreviation Modal */}
      <EditFieldModal
          open={openAbbreviationModal}
          handleClose={() => setOpenAbbreviationModal(false)}
          title="Edit Abbreviation"
          onSubmit={(data) => {
              console.log('Abbreviation Updated:', data.abbreviation);
              setOpenAbbreviationModal(false);
          }}
      >
          <TextField
              fullWidth
              label="Abbreviation"
              variant="outlined"
              {...register("abbreviation", { required: true })}
          />
      </EditFieldModal>

      {/* Founded Date Modal */}
      <EditFieldModal
          open={openFoundedDateModal}
          handleClose={() => setOpenFoundedDateModal(false)}
          title="Edit Founded Date"
          onSubmit={(data) => {
              console.log('Founded Date Updated:', data.foundedDate);
              setOpenFoundedDateModal(false);
          }}
      >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                  name="foundedDate"
                  control={control}
                  render={({ field }) => (
                      <DatePicker
                          {...field}
                          label="Established Date"
                          renderInput={(params) => (
                              <TextField 
                                  {...params} 
                                  fullWidth 
                                  variant="outlined"
                              />
                          )}
                      />
                  )}
              />
          </LocalizationProvider>
      </EditFieldModal>

      {/* Address Line 1 Modal */}
      <EditFieldModal
          open={openAddressLine1Modal}
          handleClose={() => setOpenAddressLine1Modal(false)}
          title="Edit Address Line 1"
          onSubmit={(data) => {
              console.log('Address Line 1 Updated:', data.addressLine1);
              setOpenAddressLine1Modal(false);
          }}
      >
          <TextField
              fullWidth
              label="Address Line 1"
              variant="outlined"
              {...register("addressLine1", { required: true })}
          />
      </EditFieldModal>

      {/* Address Line 2 Modal */}
      <EditFieldModal
          open={openAddressLine2Modal}
          handleClose={() => setOpenAddressLine2Modal(false)}
          title="Edit Address Line 2"
          onSubmit={(data) => {
              console.log('Address Line 2 Updated:', data.addressLine2);
              setOpenAddressLine2Modal(false);
          }}
      >
          <TextField
              fullWidth
              label="Address Line 2"
              variant="outlined"
              {...register("addressLine2")}
          />
      </EditFieldModal>

      {/* City Modal */}
      <EditFieldModal
          open={openCityModal}
          handleClose={() => setOpenCityModal(false)}
          title="Edit City"
          onSubmit={(data) => {
              console.log('City Updated:', data.city);
              setOpenCityModal(false);
          }}
      >
          <FormControl fullWidth>
              <InputLabel id="city-label">City</InputLabel>
              <Select
                  labelId="city-label"
                  label="City"
                  {...register("city")}
              >
                  {cities.map((city, index) => (
                      <MenuItem key={index} value={city}>
                          {city}
                      </MenuItem>
                  ))}
              </Select>
          </FormControl>
      </EditFieldModal>

      {/* Postal Code Modal */}
      <EditFieldModal
          open={openPostalCodeModal}
          handleClose={() => setOpenPostalCodeModal(false)}
          title="Edit Postal Code"
          onSubmit={(data) => {
              console.log('Postal Code Updated:', data.postalCode);
              setOpenPostalCodeModal(false);
          }}
      >
          <TextField
              fullWidth
              label="Postal Code"
              variant="outlined"
              {...register("postalCode", { required: true })}
          />
      </EditFieldModal>

      {/* Leader NIC Modal */}
      <EditFieldModal
          open={openLeaderNicModal}
          handleClose={() => setOpenLeaderNicModal(false)}
          title="Edit Leader NIC"
          onSubmit={(data) => {
              console.log('Leader NIC Updated:', data.leaderNic);
              setOpenLeaderNicModal(false);
          }}
      >
          <TextField
              fullWidth
              label="Leader NIC"
              variant="outlined"
              {...register("leaderNic", { required: true })}
          />
      </EditFieldModal>
    </Box>
  );

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
        <Paper sx={{p: 1,mt: 2 }}>
          <Grid container spacing={2}>
            {renderPartyInformationForm()}
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
        <Paper sx={{ p: 1, mt: 2 }}>
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
        <Paper sx={{ p: 1, mt: 2, bgcolor: 'background.default' }}>
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



