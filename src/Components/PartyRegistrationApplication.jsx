import React, { useState, useCallback } from 'react';
import {
    Button,
    Box,
    Dialog,
    DialogContent,
    DialogActions,
    TextField,
    Typography,
    IconButton,
    DialogTitle,
    Stepper,
    Step,
    StepLabel,
    Divider,
    Card,
    CardContent,
    Grid,
    Stack,
    MenuItem,
    FormControl,
    Select,
    InputLabel,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import UploadIcon from '@mui/icons-material/Upload';
import { styled } from '@mui/material/styles';
import { useForm, Controller } from 'react-hook-form';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import KeycloakService from "../services/KeycloakService.jsx";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Upload, FileText, Image, Users, DollarSign, Landmark, FileCheck } from 'lucide-react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
const partyUrl = import.meta.env.VITE_API_PARTY_URL;

const MySwal = withReactContent(Swal);

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
    '& .MuiPaper-root': {
        width: '100%',
    },
}));

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

export const PartyRegistrationApplication = ({ open, handleClose }) => {
    const { register, handleSubmit, formState: { errors }, setValue, getValues, reset, control } = useForm();
    const [activeStep, setActiveStep] = useState(0);
    const [isLeaderVerified, setIsLeaderVerified] = useState(false);
    const [isLeaderAvaialble, setIsLeaderAvailable] = useState(false);
    const [isCheckedLeaderNIC, setIsCheckedLeaderNIC] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [leaderName, setLeaderName] = useState("");
    const [secretoryName, setSecretoryName] = useState("");
    const steps = ['Party Information', 'Documents'];
    const navigate = useNavigate();
    
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

            setLeaderName(leader.data.Name);
            console.log(leader);
            
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

    //get secretory name
    const getSecretoryName = async () => {
        const updatedToken = KeycloakService.getToken();
        try {
            const secretory = await axios.get(`${partyUrl}/api/voter/${KeycloakService.getUserName()}`, {
                headers: {
                    Authorization: `Bearer ${updatedToken}`
                }
            });
            console.log("Secretory");
            console.log(secretory);
            setSecretoryName(secretory.data.Name);
        } catch (error) {
            console.log(error);
            setIsSubmitDisabled(true);
        } finally {
            setIsLoading(false);
        }
    }

    //check if the user is already a leader/secretary or not
    const getPartyMemberByNIC = useCallback(async (nic) => {
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
    }, [])

    const handleLeaderNicBlur = useCallback(async (e) => {
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
        await getSecretoryName();
    
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
    },[validateLeaderNic, getPartyMemberByNIC, setIsLoading, setIsLeaderVerified, setIsLeaderAvailable, setIsSubmitDisabled]);
    

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const formatDate = (input) => {
        if (!input || !dayjs(input).isValid()) {
            console.error("Invalid date input:", input);
            return null; // Return null or handle appropriately
        }
    
        const { $y: year, $M: month, $D: day } = dayjs(input);
        console.log("Input Dayjs object:", input);
        console.log("Raw foundedDate value:", getValues("foundedDate"));
    
        const date = new Date(year, month, day); // Create JavaScript Date object
        const formattedDate = date.toISOString(); // Format as ISO string
    
        return formattedDate;
    };
    
    //submit founction
    const onSubmit = async (partyData) => {
        const confirmSubmission = async () => {
            return MySwal.fire({
                title: 'Are you sure?',
                text: 'Do you want to continue with submitting the application?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, Submit',
                cancelButtonText: 'No, Cancel',
            });
        };

        const submitPartyData = async (partyData) => {

            const formData = new FormData();
            console.log(getValues("foundedDate"));
            
            const partyDetails = {
                partyName: getValues("partyName"),
                abbreviation: getValues("abbreviation"),
                foundedDate: formatDate(getValues("foundedDate")),
                address: {
                    addressLine_1: getValues("addressLine1"),
                    addressLine_2: getValues("addressLine2"),
                    city: getValues("city"),
                    postalCode: getValues("postalCode"),
                },
                leaderId: getValues("leaderNic"),
                state: "pending verification",
                districtBasisSeats: 0,
                nationalBasisSeats: 0,
                totalSeats: 0,
                contactNumber: "Not available",
                partyWebsite: "Not available",
                leaderName: leaderName,
                secretoryName: secretoryName,
            };
        
            formData.append("party", JSON.stringify(partyDetails));
        
            if (constitution) formData.append("files", getValues("constitution"));
            if (logo) formData.append("files", getValues("logo"));
            if (membership) formData.append("files", getValues("membership"));
            if (financial) formData.append("files", getValues("financial"));
            if (leadership) formData.append("files", getValues("leadership"));
        
            try {
                const token = KeycloakService.getToken();
        
                // Update Keycloak roles
                await updateKeycloakRoles(partyDetails.leaderId);
        
                // Show loading SweetAlert2 modal
                MySwal.fire({
                    title: 'Submitting your application...',
                    html: '<div class="spinner"></div>',
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    didOpen: () => {
                        MySwal.showLoading(); // Display the SweetAlert2 spinner
                    },
                });
        
                const response = await axios.post(`${partyUrl}/api/party`, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
        
                if ([200, 201].includes(response.status)) {
                    // Application submitted successfully
                    MySwal.fire({
                        title: 'Application Submitted Successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    }).then(() => { // Pass a function here
                        reset(); // Reset the form
                        handleBack(); // Go to the previous step
                        setIsLeaderVerified(false); // Reset leader verification
                        navigate("/party/list");
                    });
                } else {
                    MySwal.fire({
                        title: 'Error!',
                        text: response.data || 'An error occurred while submitting the application.',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                }

            } catch (error) {
                MySwal.fire({
                    title: 'Error!',
                    text: error.response ? error.response.data : 'An error occurred.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }

        }

        const result = await confirmSubmission();
        if (result.isConfirmed) {
            await submitPartyData(partyData);
            handleClose();
        } else {
            console.log('Submission canceled by the user.');
        }
    };
    
    //update keycloak roles upon a successful submission
    const updateKeycloakRoles = async (leaderNic) => {
        try {
            const adminToken = await KeycloakService.getAdminToken(); // Get admin token
    
            // Get logged-in user's ID (party secretary)
            const secretaryUserId = KeycloakService.getUserId();
    
            // Assign 'Party Secretary' role to logged-in user
            await assignRoleToUser(adminToken, secretaryUserId, 'PartySecretary');
    
            // Get leader's userId using their NIC (username)
            const leaderUserId = await KeycloakService.getUserIdByUsername('demo', leaderNic);
    
            if (!leaderUserId) {
                throw new Error(`User not found for leader NIC: ${leaderNic}`);
            }
    
            // Assign 'Party Leader' role to the leader
            await assignRoleToUser(adminToken, leaderUserId, 'PartyLeader');
        } catch (error) {
            console.error('Failed to update Keycloak roles:', error.message);
        }
    };
    
    const assignRoleToUser = async (adminToken, userId, roleName) => {
        const roleId = await getRoleIdByName(adminToken, roleName);
    
        if (!roleId) {
            throw new Error(`Role not found: ${roleName}`);
        }
    
        const payload = [
            {
                id: roleId,
                name: roleName,
            },
        ];
        console.log(payload);
        
        await fetch(`http://localhost:8086/admin/realms/demo/users/${userId}/role-mappings/clients/162f9e0e-64e2-4ae7-84fe-93d625a161bd`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${adminToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
    };
    
    const getRoleIdByName = async (adminToken, roleName) => {
        const response = await fetch(`http://localhost:8086/admin/realms/demo/clients/162f9e0e-64e2-4ae7-84fe-93d625a161bd/roles/${roleName}`, {
            headers: {
                Authorization: `Bearer ${adminToken}`,
                'Content-Type': 'application/json',
            },
        });
    
        if (response.ok) {
            const role = await response.json();
            console.log(role.id);
            return role.id;
        } else {
            console.error('Failed to fetch role ID:', await response.text());
            return null;
        }
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
    
            const originalFileName = file.name.split('.').slice(0, -1).join('.'); 
            const fileExtension = file.name.split('.').pop(); 
            const renamedFileName = `${originalFileName}_${documentId}.${fileExtension}`;
    
            const renamedFile = new File([file], renamedFileName, { type: file.type });
    
            switch (documentId) {
                case "constitution": {
                    setValue("constitution", renamedFile);
                    setConstitution(renamedFileName); 
                    break;
                }
                case "logo": {
                    setValue("logo", renamedFile);
                    setLogo(renamedFileName);
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setValue("partySymbol", reader.result.split(",")[1]);
                    };
                    reader.readAsDataURL(renamedFile);
                    break;
                }
                case "membership": {
                    setValue("membership", renamedFile);
                    setMembership(renamedFileName); 
                    break;
                }
                case "financial": {
                    setValue("financial", renamedFile);
                    setFinancial(renamedFileName); 
                    break;
                }
                case "leadership": {
                    setValue("leadership", renamedFile);
                    setLeadership(renamedFileName);
                    break;
                }
                default: {
                    alert("Invalid File Type");
                    break;
                }
            }
    
            // Optionally, log the renamed file
            console.log(`Renamed file for ${documentId}:`, renamedFile.name);
        }
    };
    
    

    const renderPartyInformationForm = () => (
        <Box className="w-full max-w-4xl mb-1.5">
            <Stack spacing={3} sx={{ height: '100%', overflowY: 'auto' }}>
                <TextField
                    fullWidth
                    label="Party Name"
                    variant="outlined"
                    {...register("partyName", { required: true })}
                    margin="normal"
                    padding="normal"
                    sx={{ fontSize: '1rem', fontWeight: 'bold' }}
                    required
                />
                <Stack direction="row" spacing={2}>
                    <TextField
                        className='w-1/2'
                        label="Abbreviation"
                        variant="outlined"
                        {...register("abbreviation", { required: true })}
                        margin="normal"
                        padding="normal"
                        sx={{ fontSize: '1rem', fontWeight: 'bold' }}
                        required
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Controller
                            name="foundedDate"
                            control={control}
                            defaultValue={null} // Use null as the initial value
                            rules={{ required: "Founded Date is required" }}
                            render={({ field, fieldState }) => (
                            <DatePicker
                                {...field}
                                label="Established Date"
                                value={field.value ? dayjs(field.value) : null} // Ensure compatibility
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
                </Stack>
                <TextField
                    fullWidth
                    label="Address line 1"
                    variant="outlined"
                    {...register("addressLine1", { required: true })}
                    margin="normal"
                    padding="normal"
                    sx={{ fontSize: '1rem', fontWeight: 'bold' }}
                    required
                />
                <Stack direction="row" spacing={2}>
                    <TextField
                        fullWidth
                        label="Address line 2"
                        variant="outlined"
                        {...register("addressLine2")}
                        margin="normal"
                        padding="normal"
                        sx={{ fontSize: '1rem', fontWeight: 'bold' }}
                        required
                    />
                    <Box className="w-1/2">
                        <FormControl fullWidth required>
                            <InputLabel id="city-label">City</InputLabel>
                            <Select
                                labelId="city-label"
                                label="City"
                                variant="outlined"
                                className='w-full'
                                defaultValue={''}
                                required                                           
                                {...register("city")}
                            >
                                {cities.map((city, index) => (
                                    <MenuItem key={index} value={city}>
                                        {city}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <TextField
                        fullWidth
                        label="Postal Code"
                        variant="outlined"
                        {...register("postalCode", { required: true })}
                        margin="normal"
                        padding="normal"
                        sx={{ fontSize: '1rem', fontWeight: 'bold' }}
                        required
                    />
                </Stack>
                <Stack direction="row" spacing={2} mb={0}>
                    <TextField
                        fullWidth
                        label="Leader NIC"
                        variant="outlined"
                        {...register("leaderNic", { required: true })}
                        error={!!errors.leaderNic}
                        helperText={errors.leaderNic && 'Leader NIC is required'}
                        onBlur={(e) => {
                            handleLeaderNicBlur(e); 
                        }}
                        margin="normal"
                        padding="normal"
                        sx={{ fontSize: '1rem', fontWeight: 'bold' }}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Leader Name"
                        variant="outlined"
                        {...register("leaderName", { required: true })}
                        disabled
                        value={leaderName}
                        margin="normal"
                        padding="normal"
                        sx={{ fontSize: '1rem', fontWeight: 'bold' }}
                    />
                </Stack>
            </Stack>
            {!isLoading && !isCheckedLeaderNIC && (
                <Typography color="success.main">Enter Leader NIC to proceed</Typography>
            )}

            {isLoading && <p>Verifying leader NIC...</p>}

            {!isLoading && isCheckedLeaderNIC && !isLeaderVerified && (
                <Typography className="text-error">Leader identification failed!</Typography>
            )}

            {!isLoading && isCheckedLeaderNIC && isLeaderVerified && !isLeaderAvaialble && (
                <Typography className="text-error">Leader is not available!</Typography>
            )}

            {!isLoading && isCheckedLeaderNIC && isLeaderVerified && isLeaderAvaialble && (
                <Typography color="success.main">Leader identified successfully!</Typography>
            )}
        </Box>
    );

    const renderDocumentUploadForm = () => (
        <Box className="w-full max-w-4xl">
            {/* <CardContent> */}
            <div className="flex flex-col gap-1">
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
    );
    

    return (
        <BootstrapDialog onClose={handleClose} open={open} style={{ zIndex: 1000 }}>
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Party Registration
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
            >
                <CloseIcon />
            </IconButton>
            <form onSubmit={handleSubmit(onSubmit)}  encType="multipart/form-data">
                <DialogContent dividers>
                    <Stepper activeStep={activeStep} alternativeLabel className='mb-2'>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                        {activeStep === 0 ? renderPartyInformationForm() : renderDocumentUploadForm()}
                </DialogContent>
                <DialogActions>
                    {activeStep > 0 && (
                        <Button onClick={handleBack}>
                            Back
                        </Button>
                    )}
                    {activeStep < steps.length - 1 ? (
                        <Button type="button" onClick={handleNext} disabled={isSubmitDisabled}>
                            Next
                        </Button>
                    ) : (
                        <Button
                            key="submit-button" 
                            type="submit"
                        >
                            Submit
                        </Button>
                    )}
                </DialogActions>
            </form>
        </BootstrapDialog>
    );
};
