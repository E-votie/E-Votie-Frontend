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
import { SubmitInquiry } from '../../Components/SubmitInquiry';
import DeleteIcon from '@mui/icons-material/Delete';

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
  const [applicationHistory, setApplicationHistory] = useState([]);
  const [inquiryList, setInquiryList] = useState([]);
  //register files
  const[constitution, setConstitution] = useState(null);
  const[logo, setLogo] = useState(null);
  const[membership, setMembership] = useState(null);
  const[financial, setFinancial] = useState(null);
  const[leadership, setLeadership] = useState(null);
  const navigate = useNavigate();
  
  //update initial file names
  const setFileNames = useCallback(async () => {
    if (party?.documents) {
      party.documents.forEach((document) => {
        const { documentType, documentName } = document;
  
        switch (documentType) {
          case "constitution":
            setConstitution(documentName);
            break;
          case "logo":
            setLogo(documentName);
            break;
          case "membership":
            setMembership(documentName);
            break;
          case "financial":
            setFinancial(documentName);
            break;
          case "leadership":
            setLeadership(documentName);
            break;
          default:
            console.warn(`Unexpected fileType: ${documentType}`);
        }
      });
    }
  }, [party]);

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

        await setFileNames();

        const historyResponse = await axios.get(`http://localhost:5003/api/history/party/${partyId}`, {
          headers: {
              Authorization: `Bearer ${token}`
          }
        });
        console.log(historyResponse);
        setApplicationHistory(historyResponse.data);

        const inquiryResponse = await axios.get(`http://localhost:5003/api/inquiry/party/${partyId}`, {
          headers: {
              Authorization: `Bearer ${token}`
          }
        });
        console.log(inquiryResponse);
        setInquiryList(inquiryResponse.data);
        
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

  const handleClose = () => {
    setShowInquiryDialog(false);
  }

  //===========Methods for update fields============================

  const submitPartyName = async (data) => {
    const { isConfirmed } = await MySwal.fire({
        title: 'Are you sure?',
        text: 'Do you want to update the party name?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'Cancel',
    });

    if (isConfirmed) {
        try {
            MySwal.fire({
              title: 'Updating...',
              text: 'Please wait while we update the party name.',
              icon: 'info',
              showCancelButton: false,
              showConfirmButton: false,
              willOpen: () => {
                  MySwal.showLoading();
              }
            });

            const token = KeycloakService.getToken();
            const response = await axios.put(
                `http://localhost:5003/api/application/update/party/${party.registrationId}/name`,
                data, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            MySwal.close();
            console.log('Party name updated:', response.data);
            MySwal.fire({
                title: 'Updated!',
                text: 'Party name has been successfully updated.',
                icon: 'success',
                confirmButtonText: 'OK',
            }).then(() => {
              handleClose?.();
              window.location.href = `/party/registration/application/${partyId}`;
          });
        } catch (error) {
            MySwal.fire({
                title: 'Error!',
                text: 'Something went wrong while updating the party name.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            console.error('Update failed:', error);
        }
    }
  };

  const submitAbbreviation = async (data) => {
    const { isConfirmed } = await MySwal.fire({
        title: 'Are you sure?',
        text: 'Do you want to update the abbreviation?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'Cancel',
    });

    if (isConfirmed) {
        try {
            MySwal.fire({
              title: 'Updating...',
              text: 'Please wait while we update the party abbreviation.',
              icon: 'info',
              showCancelButton: false,
              showConfirmButton: false,
              willOpen: () => {
                  MySwal.showLoading();
              }
            });

            const token = KeycloakService.getToken();
            const response = await axios.put(
                `http://localhost:5003/api/application/update/party/${party.registrationId}/abbreviation`,
                { abbreviation: data.abbreviation }, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            MySwal.close();
            MySwal.fire({
                title: 'Updated!',
                text: 'Abbreviation has been successfully updated.',
                icon: 'success',
                confirmButtonText: 'OK',
            }).then(() => {
              handleClose?.();
              window.location.href = `/party/registration/application/${partyId}`;
          });
        } catch (error) {
            MySwal.fire({
                title: 'Error!',
                text: 'Something went wrong while updating the abbreviation.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            console.error('Update failed:', error);
        }
    }
  };

  const submitFoundedDate = async (data) => {
    const { isConfirmed } = await MySwal.fire({
        title: 'Are you sure?',
        text: 'Do you want to update the founded date?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'Cancel',
    });

    if (isConfirmed) {
        try {
            MySwal.fire({
              title: 'Updating...',
              text: 'Please wait while we update the founded date.',
              icon: 'info',
              showCancelButton: false,
              showConfirmButton: false,
              willOpen: () => {
                  MySwal.showLoading();
              }
          });

          const token = KeycloakService.getToken();
          const response = await axios.put(
              `http://localhost:5003/api/application/update/party/${party.registrationId}/date`, 
              { foundedDate: data.foundedDate }, 
              {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              }
          );

          MySwal.close();

          MySwal.fire({
              title: 'Updated!',
              text: 'Founded date has been successfully updated.',
              icon: 'success',
              confirmButtonText: 'OK',
          }).then(() => {
            handleClose?.();
            window.location.href = `/party/registration/application/${partyId}`;
        });
        } catch (error) {
            MySwal.fire({
                title: 'Error!',
                text: 'Something went wrong while updating the founded date.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            console.error('Update failed:', error);
        }
    }
  };

  const submitAddressLine1 = async (data) => {
    const { isConfirmed } = await MySwal.fire({
        title: 'Are you sure?',
        text: 'Do you want to update the address line 1?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'Cancel',
    });

    if (isConfirmed) {
        try {
            MySwal.fire({
              title: 'Updating...',
              text: 'Please wait while we update the address line 1.',
              icon: 'info',
              showCancelButton: false,
              showConfirmButton: false,
              willOpen: () => {
                  MySwal.showLoading();
              }
          });

          const token = KeycloakService.getToken();
          const response = await axios.put(
              `http://localhost:5003/api/application/update/party/${party.registrationId}/address/line1`,
              { address: { addressLine_1: data.addressLine_1} },  
              {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              }
          );

          MySwal.close();
          MySwal.fire({
              title: 'Updated!',
              text: 'Address Line 1 has been successfully updated.',
              icon: 'success',
              confirmButtonText: 'OK',
          }).then(() => {
            handleClose?.();
            window.location.href = `/party/registration/application/${partyId}`;
        });
        } catch (error) {
            MySwal.fire({
                title: 'Error!',
                text: 'Something went wrong while updating Address Line 1.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            console.error('Update failed:', error);
        }
    }
  };

  const submitAddressLine2 = async (data) => {
    const { isConfirmed } = await MySwal.fire({
        title: 'Are you sure?',
        text: 'Do you want to update Address Line 2?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'Cancel',
    });

    if (isConfirmed) {
        try {
            MySwal.fire({
              title: 'Updating...',
              text: 'Please wait while we update the address line 2.',
              icon: 'info',
              showCancelButton: false,
              showConfirmButton: false,
              willOpen: () => {
                  MySwal.showLoading();
              }
          });

          const token = KeycloakService.getToken();
          const response = await axios.put(
              `http://localhost:5003/api/application/update/party/${party.registrationId}/address/line2`,
              { address: { addressLine_2: data.addressLine_2} },  
              {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              }
          );

          MySwal.close();
          MySwal.fire({
              title: 'Updated!',
              text: 'Address Line 2 has been successfully updated.',
              icon: 'success',
              confirmButtonText: 'OK',
          }).then(() => {
            handleClose?.();
            window.location.href = `/party/registration/application/${partyId}`;
        });
        } catch (error) {
            MySwal.fire({
                title: 'Error!',
                text: 'Failed to update Address Line 2.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            console.error(error);
        }
    }
  };

  const submitCity = async (data) => {
    const { isConfirmed } = await MySwal.fire({
        title: 'Are you sure?',
        text: 'Do you want to update the city?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'Cancel',
    });

    if (isConfirmed) {
        try {
            MySwal.fire({
              title: 'Updating...',
              text: 'Please wait while we update the city.',
              icon: 'info',
              showCancelButton: false,
              showConfirmButton: false,
              willOpen: () => {
                  MySwal.showLoading();
              }
          });

          const token = KeycloakService.getToken();
          const response = await axios.put(
              `http://localhost:5003/api/application/update/party/${party.registrationId}/city`,
              { address: { city: data.city } }, // Assuming the API expects an address object with a city field
              {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              }
          );

          MySwal.close();
          MySwal.fire({
            title: 'Updated!',
            text: 'City has been successfully updated.',
            icon: 'success',
            confirmButtonText: 'OK',
        }).then(() => {
          handleClose?.();
          window.location.href = `/party/registration/application/${partyId}`;
      });
        } catch (error) {
            MySwal.fire({
                title: 'Error!',
                text: 'Failed to update the city.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            console.error(error);
        }
    }
  };

  const submitPostalCode = async (data) => {
    const { isConfirmed } = await MySwal.fire({
        title: 'Are you sure?',
        text: 'Do you want to update the postal code?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'Cancel',
    });

    if (isConfirmed) {
        try {
            MySwal.fire({
              title: 'Updating...',
              text: 'Please wait while we update the postal code.',
              icon: 'info',
              showCancelButton: false,
              showConfirmButton: false,
              willOpen: () => {
                  MySwal.showLoading();
              }
          });

          const token = KeycloakService.getToken();
          const response = await axios.put(
              `http://localhost:5003/api/application/update/party/${party.registrationId}/postal`,
              { address: { postalCode: data.postalCode } }, // Assuming API expects postal code inside an address object
              {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              }
          );

          MySwal.close();
          MySwal.fire({
              title: 'Updated!',
              text: 'Postal Code has been successfully updated.',
              icon: 'success',
              confirmButtonText: 'OK',
          }).then(() => {
            handleClose?.();
            window.location.href = `/party/registration/application/${partyId}`;
        });
        } catch (error) {
            MySwal.fire({
                title: 'Error!',
                text: 'Failed to update the postal code.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            console.error(error);
        }
    }
  };

  const handleFileChange = (documentId) => (event) => {
    const file = event.target.files[0];
    if (file) {
      MySwal.fire({
        title: "Are you sure?",
        text: `You are about to upload the file: ${file.name}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, upload it!",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(`File uploaded for ${documentId}:`, file.name);
    
          const originalFileName = file.name.split('.').slice(0, -1).join('.'); 
          const fileExtension = file.name.split('.').pop(); 
          const renamedFileName = `${originalFileName}_${documentId}.${fileExtension}`;
  
          const renamedFile = new File([file], renamedFileName, { type: file.type });

          if (documentId === "constitution") {
            setValue("constitution", renamedFile);
            setConstitution(renamedFileName);
          } else if (documentId === "logo") {
            setValue("logo", renamedFile);
            setLogo(renamedFileName);
            const reader = new FileReader();
            reader.onloadend = () => {
              setValue("partySymbol", reader.result.split(",")[1]);
            };
            reader.readAsDataURL(file);
          } else if (documentId === "membership") {
            setValue("membership", renamedFile);
            setMembership(renamedFileName);
          } else if (documentId === "financial") {
            setValue("financial", renamedFile);
            setFinancial(renamedFileName);
          } else if (documentId === "leadership") {
            setValue("leadership", renamedFile);
            setLeadership(renamedFileName);
          } else {
            alert("Invalid File Type");
          }

          MySwal.fire({
            title: "Success!",
            text: `${file.name} has been uploaded successfully.`,
            icon: "success",
          });
        } else {
          MySwal.fire({
            title: "Cancelled",
            text: "Your upload was cancelled.",
            icon: "error",
          });
        }
      });
    }
  };

  const handleUpload = async (documentId, partyId) => {
    const file =
      documentId === "constitution"
        ? getValues("constitution")
        : documentId === "logo"
        ? getValues("logo")
        : documentId === "membership"
        ? getValues("membership")
        : documentId === "financial"
        ? getValues("financial")
        : getValues("leadership");
  
    if (!file) {
      MySwal.fire({
        title: "Error!",
        text: "No file selected to upload.",
        icon: "error",
      });
      return;
    }
  
    // Prepare FormData
    const formData = new FormData();
    formData.append("file", file);
    formData.append("documentType", documentId);
    formData.append("partyId", party.registrationId); // Pass party ID
  
    try {
      MySwal.fire({
        title: "Uploading...",
        text: "Please wait while your file is being uploaded.",
        icon: "info",
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          MySwal.showLoading();
        },
      });
      const token = KeycloakService.getToken();
      const response = await axios.post("http://localhost:5003/api/application/document/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        },
      });
  
      MySwal.fire({
        title: "Uploaded Successfully!",
        text: `${file.name} has been uploaded.`,
        icon: "success",
      });
    } catch (error) {
      MySwal.fire({
        title: "Error!",
        text: `An error occurred while uploading ${file.name}: ${error.response?.data?.message || error.message}`,
        icon: "error",
      });
    }
  };

  const handleDownload = async (documentId) => {
    try {
      // Show loading alert
      MySwal.fire({
        title: "Preparing Download...",
        text: "Fetching the file from the server.",
        icon: "info",
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          MySwal.showLoading();
        },
      });
  
      const token = KeycloakService.getToken();

      var documentName = "";
      party.documents.forEach((document) => {
        if (document.documentType === documentId){
          documentName = document.documentName
        }
      });

      const response = await axios.post(
        `http://localhost:5003/api/document/url/${documentName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("File download");
      console.log(response);
      
      const fileUrl = response.data;
  
      const link = document.createElement("a");
      link.href = fileUrl;
      link.setAttribute("download", ""); 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      // Show success alert
      MySwal.fire({
        title: "Download Started!",
        text: "Your file is being downloaded.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error fetching download URL:", error);
      MySwal.fire({
        title: "Download Failed",
        text:
          error.response?.data?.message ||
          "An error occurred while fetching the file. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  //state update of the application
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
          null, 
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
        const leader = await axios.get(`http://localhost:5003/api/voter/${nic}`, {
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
        const partyMember = await axios.get(`http://localhost:5003/api/party/member/by/nic/${nic}`, {
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

  // Delete handler function
  const handleDeleteInquiry = async (inquiryId) => {
    const confirmDeletion = await MySwal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this inquiry? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel',
    });

    if (!confirmDeletion.isConfirmed) {
      return;
    }

    // Show loading while deleting
    MySwal.fire({
      title: 'Deleting Inquiry...',
      text: 'Please wait while we delete your inquiry',
      didOpen: () => {
        MySwal.showLoading();
      },
    });

    try {
      const token = KeycloakService.getToken();
      await axios.delete(`http://localhost:5003/api/inquiry/${inquiryId}`,{
        headers: {
            Authorization: `Bearer ${token}`                
        }
    });

      // Show success message
      MySwal.fire({
        icon: 'success',
        title: 'Deleted Successfully!',
        text: 'Your inquiry has been deleted.',
      });

      // Refresh the inquiry list after deletion
      setInquiryList((prevList) => prevList.filter((inquiry) => inquiry.id !== inquiryId));
    } catch (error) {
      // Show error message
      MySwal.fire({
        icon: 'error',
        title: 'Deletion Failed',
        text: error.response?.data?.message || 'An error occurred while deleting the inquiry.',
      });
    }
  };

  // State for managing edit modals
  const [openPartyNameModal, setOpenPartyNameModal] = useState(false);
  const [openAbbreviationModal, setOpenAbbreviationModal] = useState(false);
  const [openFoundedDateModal, setOpenFoundedDateModal] = useState(false);
  const [openAddressLine1Modal, setOpenAddressLine1Modal] = useState(false);
  const [openAddressLine2Modal, setOpenAddressLine2Modal] = useState(false);
  const [openCityModal, setOpenCityModal] = useState(false);
  const [openPostalCodeModal, setOpenPostalCodeModal] = useState(false);
  const [openLeaderNicModal, setOpenLeaderNicModal] = useState(false);

  // Custom input with edit icon
  const EditableInput = ({ 
    children, 
    onEditClick, 
    className = '',
    editClassName = ''
  }) => (
    <div className={`relative w-full ${className}`}>
      {children}
      <IconButton 
        size="small"
        onClick={onEditClick}
        className={`absolute right-2 top-1/2 -translate-y-1/2 ${editClassName}`}
        sx={{
          position: 'absolute',
          right: 8,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
        }}
      >
        <EditIcon fontSize="small" />
      </IconButton>
    </div>
  );
  
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
            <Button type="submit" onClick={handleSubmit(onSubmit)}>Update</Button>
        </DialogActions>
    </FieldEditDialog>
  );
  const isVerificationOfficer = KeycloakService.hasRole("VerificationOfficer");
  const renderPartyInformationForm = () => (
    <Box className="w-full mb-1.5" >
      {/* First Row: Party Details */}
      <Grid container alignItems="center" spacing={2} mb={2}>
        <Grid item xs={12} md={4}>
          <EditableInput 
            onEditClick={() => setOpenPartyNameModal(true)}
          >
            <TextField
              fullWidth
              label="Party Name"
              variant="outlined"
              defaultValue={party.partyName}
              {...register("partyName", { required: true })}
              InputProps={{
                endAdornment: null, // Remove default end adornment
                readOnly: isVerificationOfficer, // Disable input if the role is verificationofficer
              }}
              disabled={isVerificationOfficer} 
            />
          </EditableInput>
        </Grid>
        <Grid item xs={12} md={4}>
          <EditableInput 
            onEditClick={() => setOpenAbbreviationModal(true)}
          >
            <TextField
              fullWidth
              label="Abbreviation"
              variant="outlined"
              defaultValue={party.abbreviation}
              {...register("abbreviation", { required: true })}
              InputProps={{
                endAdornment: null
              }}
              disabled={isVerificationOfficer} 
            />
          </EditableInput>
        </Grid>

        <Grid item xs={12} md={4}>
          <EditableInput 
            onEditClick={() => setOpenFoundedDateModal(true)}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="foundedDate"
                control={control}
                defaultValue={party.foundedDate} // Use null as the initial value
                rules={{ required: "Founded Date is required" }}
                render={({ field, fieldState }) => (
                <DatePicker
                    {...field}
                    label="Established Date"
                    value={field.value ? dayjs(field.value) : null} // Ensure compatibility
                    disabled={isVerificationOfficer} 
                    slotProps={{ 
                      textField: { 
                        fullWidth: true,
                        variant: 'outlined',
                        error: !!fieldState.error,
                        helperText: fieldState.error?.message,
                        InputProps: {
                          endAdornment: null
                        }
                      } 
                    }}
                    renderInput={(params) => (
                    <TextField 
                        {...params} 
                        error={!!fieldState.error} 
                        helperText={fieldState.error?.message} 
                    />
                    )}
                    // onChange={(newValue) => {
                    // field.onChange(newValue ? newValue.toISOString() : null); // Convert to ISO
                    // }}
                />
                )}
              />
            </LocalizationProvider>
          </EditableInput>
        </Grid>
      </Grid>

      {/* Second Row: Address Details */}
      <Grid container alignItems="center" spacing={2} mb={2}>
        <Grid item xs={12} md={3}>
          <EditableInput 
            onEditClick={() => setOpenAddressLine1Modal(true)}
          >
            <TextField
              fullWidth
              label="Address Line 1"
              variant="outlined"
              defaultValue={party.address.addressLine_1}
              {...register("addressLine_1", { required: true })}
              InputProps={{
                endAdornment: null
              }}
              disabled={isVerificationOfficer} 
            />
          </EditableInput>
        </Grid>

        <Grid item xs={12} md={3}>
          <EditableInput 
            onEditClick={() => setOpenAddressLine2Modal(true)}
          >
            <TextField
              fullWidth
              label="Address Line 2"
              variant="outlined"
              defaultValue={party.address.addressLine_2}
              {...register("addressLine_2")}
              InputProps={{
                endAdornment: null
              }}
              disabled={isVerificationOfficer} 
            />
          </EditableInput>
        </Grid>

        <Grid item xs={12} md={3}>
          <EditableInput 
            onEditClick={() => setOpenCityModal(true)}
          >
            <FormControl fullWidth variant="outlined">
              <InputLabel id="city-label">City</InputLabel>
              <Select
                labelId="city-label"
                label="City"
                defaultValue={party.address.city}
                {...register("city")}
                disabled={isVerificationOfficer} 
              >
                {cities.map((city, index) => (
                  <MenuItem key={index} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </EditableInput>
        </Grid>

        <Grid item xs={12} md={3}>
          <EditableInput 
            onEditClick={() => setOpenPostalCodeModal(true)}
          >
            <TextField
              fullWidth
              label="Postal Code"
              variant="outlined"
              defaultValue={party.address.postalCode}
              {...register("postalCode", { required: true })}
              InputProps={{
                endAdornment: null
              }}
              disabled={isVerificationOfficer} 
            />
          </EditableInput>
        </Grid>
      </Grid>

      {/* Third Row: Leader Details */}
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={12} md={6}>
          <EditableInput 
            onEditClick={() => setOpenLeaderNicModal(true)}
          >
            <TextField
              fullWidth
              label="Leader NIC"
              variant="outlined"
              defaultValue={party.leaderId}
              {...register("leaderNic", { required: true })}
              InputProps={{
                endAdornment: null
              }}
              disabled={isVerificationOfficer} 
            />
          </EditableInput>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Leader Name"
            defaultValue={party.leaderName}
            variant="outlined"
            InputProps={{
              endAdornment: null
            }}
            disabled={isVerificationOfficer} 
          />
        </Grid>
      </Grid>

      {/* Modals for each field */}
      {/* Party Name Modal */}
      <EditFieldModal
          open={openPartyNameModal}
          handleClose={() => setOpenPartyNameModal(false)}
          title="Edit Party Name"
          onSubmit={(data) => {
              submitPartyName(data);
              console.log('Party Name Updated:', data.partyName);
              setOpenPartyNameModal(false);
          }}
      >
          <TextField
              fullWidth
              label="Party Name"
              variant="outlined"
              {...register("partyName", { required: true })}
              disabled={isVerificationOfficer} 
          />
      </EditFieldModal>

      {/* Abbreviation Modal */}
      <EditFieldModal
          open={openAbbreviationModal}
          handleClose={() => setOpenAbbreviationModal(false)}
          title="Edit Abbreviation"
          onSubmit={(data) => {
              submitAbbreviation(data);
              console.log('Abbreviation Updated:', data.abbreviation);
              setOpenAbbreviationModal(false);
          }}
      >
          <TextField
              fullWidth
              label="Abbreviation"
              variant="outlined"
              {...register("abbreviation", { required: true })}
              disabled={isVerificationOfficer} 
          />
      </EditFieldModal>

      {/* Founded Date Modal */}
      <EditFieldModal
          open={openFoundedDateModal}
          handleClose={() => setOpenFoundedDateModal(false)}
          title="Edit Founded Date"
          onSubmit={(data) => {
              submitFoundedDate(data);
              console.log('Founded Date Updated:', data.foundedDate);
              setOpenFoundedDateModal(false);
          }}
      >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                  name="foundedDate"
                  control={control}
                  defaultValue={party.foundedDate}
                  render={({ field, fieldState }) => (
                      <DatePicker
                          {...field}
                          label="Established Date"
                          disabled={isVerificationOfficer} 
                          value={field.value ? dayjs(field.value) : null}
                          onChange={(newValue) => {
                              field.onChange(newValue ? newValue.toISOString() : null); // Convert to ISO format
                          }}
                          slotProps={{
                              textField: {
                                  fullWidth: true,
                                  variant: 'outlined',
                                  error: !!fieldState.error,
                                  helperText: fieldState.error?.message,
                              },
                          }}
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
              submitAddressLine1(data);
              console.log('Address Line 1 Updated:', data.addressLine1);
              setOpenAddressLine1Modal(false);
          }}
      >
          <TextField
              fullWidth
              label="Address Line 1"
              variant="outlined"
              {...register("addressLine_1", { required: true })}
              disabled={isVerificationOfficer} 
          />
      </EditFieldModal>

      {/* Address Line 2 Modal */}
      <EditFieldModal
          open={openAddressLine2Modal}
          handleClose={() => setOpenAddressLine2Modal(false)}
          title="Edit Address Line 2"
          onSubmit={(data) => {
              submitAddressLine2(data);
              console.log('Address Line 2 Updated:', data.addressLine2);
              setOpenAddressLine2Modal(false);
          }}
      >
          <TextField
              fullWidth
              label="Address Line 2"
              variant="outlined"
              {...register("addressLine_2")}
              disabled={isVerificationOfficer} 
          />
      </EditFieldModal>

      {/* City Modal */}
      <EditFieldModal
          open={openCityModal}
          handleClose={() => setOpenCityModal(false)}
          title="Edit City"
          onSubmit={(data) => {
              submitCity(data);
              console.log('City Updated:', data.city);
              setOpenCityModal(false);
          }}
      >
          <FormControl fullWidth>
              <InputLabel id="city-label">City</InputLabel>
              <Select
                  labelId="city-label"
                  label="City"
                  disabled={isVerificationOfficer} 
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
              submitPostalCode(data);
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
              disabled={isVerificationOfficer} 
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
          <Box spacing={2}>
            {renderPartyInformationForm()}
          </Box>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" gutterBottom>Update Documents</Typography>
          <Box className="w-full">
            <div className="flex flex-col gap-2">
              {documents.map(({ id, title, icon, acceptedTypes }) => (
                <div
                  key={id}
                  className="p-2 border rounded-lg hover:border-blue-500 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
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

                    <div className='flex'>
                      {
                        KeycloakService.hasRole("VerificationOfficer") && 
                        <div>
                          <Button
                            variant="outline"
                            color="primary"
                            onClick={() => handleDownload(id)}
                          >
                            Download
                          </Button>
                        </div>
                      }
                      {
                        !KeycloakService.hasRole("VerificationOfficer") && 
                        <>
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
                        <div><Divider orientation='vertical'/></div>
                        <div>
                          <Button
                            variant="outline"
                            color="primary"
                            onClick={() => handleUpload(id)}
                          >
                            Upload
                          </Button>
                        </div>
                        </>
                      }
                    </div>
                  </div>
                  <div className="flex justify-between items-center mr-4">
                    <div className="truncate max-w-[400px]">
                      <span>File: </span>
                      {id === "constitution"
                        ? constitution
                        : id === "logo"
                        ? logo
                        : id === "membership"
                        ? membership
                        : id === "financial"
                        ? financial
                        : id === "leadership"
                        ? leadership
                        : null}
                    </div>

                    <div className="text-sm text-gray-500 flex items-center">
                      <FileCheck className="h-4 w-4 inline mr-1" />
                      <span>{acceptedTypes.replace(/\./g, "").replace(/,/g, ", ")}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Box>
          <Box sx={{ mt: 4, display: 'flex', gap: 2 }} className="flex justify-end">
            {
              KeycloakService.hasRole("VerificationOfficer") && 
              <>
                <Button variant="contained" color="success" onClick={() => handleStateUpdate("verified")}>Accept</Button>
                <Button variant="outlined" color="error" onClick={() => handleStateUpdate("rejected")}>Reject</Button>
              </>
            }
            <Button variant="outlined" onClick={() => setShowInquiryDialog(true)}>Submit Inquiry</Button>
          </Box>
        </Paper>
      )}

      {activeTab === 'inquiries' && (
        <Paper sx={{ p: 1, mt: 2 }} className='w-full'>
          {inquiryList.map((inquiry) => (
            <Alert
              key={inquiry.id}
              severity={(KeycloakService.getUserName() === inquiry.createdBy) ? "success" : "warning"}
              sx={{ mb: 2, position: 'relative' }}
              className="flex items-center w-full"
            >
              <div className='flex justify-between w-full'>
                <div>
                  <Box className="flex justify-between items-center w-full">
                    <Typography variant="subtitle1">{inquiry.subject.replace('_', ' ').toUpperCase()}</Typography>
                  </Box>
                  <Typography>{inquiry.description}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {inquiry.createdAt} • {inquiry.createdBy}
                  </Typography>
                </div>
              </div>
              {KeycloakService.getUserName() === inquiry.createdBy && (
                <IconButton
                  color="error"
                  onClick={() => handleDeleteInquiry(inquiry.id)}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Alert>
          ))}
        </Paper>
      )}

      {activeTab === 'history' && (
        <Paper sx={{ p: 1, mt: 2 }}>
          <Box>
            {applicationHistory.map((item, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    pl: 4,
                    py: 1,
                    bgcolor: 'background.paper',
                    boxShadow: 1,
                    borderRadius: 2,
                    gap: 1
                  }}
                >
                  <Box
                    sx={{
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
                    <Typography variant="subtitle1"><b>{item.changedField}</b> was changed from <b>{item.oldValue}</b> to <b>{item.newValue}</b></Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.dateTime}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>
      )}

      {/* Inquiry Dialog */}
      {
        showInquiryDialog && <SubmitInquiry open={showInquiryDialog} handleClose={handleClose} partyId={party.registrationId}/>
      }
    </Box>
  );
};



