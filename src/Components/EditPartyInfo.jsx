import React, {useState, useCallback} from 'react';
import {
    Button,
    Box,
    Dialog,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    IconButton,
    DialogTitle,
    ButtonGroup,
    Stack,
    Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import KeycloakService from "../services/KeycloakService.jsx";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const MySwal = withReactContent(Swal);

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

export const EditPartyInfo = ({ open, handleClose, partyInfo }) => {
    const { register, handleSubmit, formState: { errors }, setValue, getValues, reset, control } = useForm();
    const [partyLogo, setPartyLogo] = useState(null);
    const [uploadedFileName, setUploadedFileName] = useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const [isLeaderVerified, setIsLeaderVerified] = useState(false);
    const [isLeaderAvaialble, setIsLeaderAvailable] = useState(false);
    const [isCheckedLeaderNIC, setIsCheckedLeaderNIC] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [leaderName, setLeaderName] = useState("");
    const [isPartyUpdated, setIsPartyUpdated] = useState(false);
    const navigate = useNavigate();

    const handlePartyLogoChange = (event) => {
        setPartyLogo(event.target.files[0]);
    };

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
        console.log(partyData);
        
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
                districtBasisSeats: getValues("districtBasisSeats"),
                nationalBasisSeats: getValues("nationalBasisSeats"),
                totalSeats: getValues("totalSeats"),
                contactNumber: getValues("contactNumber"),
                partyWebsite: getValues("partyWebsite"),
                // partySymbol: getValues("partySymbol"),
            };
        
            formData.append("party", JSON.stringify(partyDetails));
        
            if (logo) formData.append("files", getValues("logo"));

            try {
                const token = KeycloakService.getToken();
            
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
        
                const response = await axios.put(`http://localhost:5003/api/party/${partyInfo.registrationId}`, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
        
                if ([200, 201].includes(response.status)) {
                    // Application submitted successfully
                    await MySwal.fire({
                        title: 'Application Submitted Successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    })
                    reset(); 
                    navigate(`/party/${partyInfo.registrationId}`);
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
    
    //register files
    const[logo, setLogo] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log(`File uploaded for logo:`, file.name);
    
            const originalFileName = file.name.split('.').slice(0, -1).join('.'); 
            const fileExtension = file.name.split('.').pop(); 
            const renamedFileName = `${originalFileName}_logo.${fileExtension}`;
    
            const renamedFile = new File([file], renamedFileName, { type: file.type });
    
            setValue("logo", renamedFile);
            setLogo(renamedFileName);
            const reader = new FileReader();
            reader.onloadend = () => {
                setValue("partySymbol", reader.result.split(",")[1]);
            };
            reader.readAsDataURL(renamedFile);
    
            // Optionally, log the renamed file
            console.log(`Renamed file for logo:`, renamedFile.name);
        } else {
            setLogo(null);
            setValue("logo", null);
        }
    };

    return (
        <React.Fragment>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth
                maxWidth="md"
                style={{ zIndex: 1000 }}
            >
                <DialogTitle 
                    sx={{ 
                        m: 0, 
                        p: 2, 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center' 
                    }} 
                    id="customized-dialog-title"
                >
                    Update Party Information
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box>
                            <Stack spacing={2}>
                                {/* Party Name and Abbreviation */}
                                <Stack spacing={2} direction="row">
                                    <Box className='w-5/6'>
                                        <TextField
                                            variant="outlined"
                                            label="Party Name"
                                            required
                                            fullWidth
                                            defaultValue={partyInfo.partyName}
                                            {...register("partyName")}
                                        />
                                    </Box>
                                    <Box>
                                        <TextField
                                            variant="outlined"
                                            label="Abbreviation"
                                            required
                                            fullWidth
                                            defaultValue={partyInfo.abbreviation}
                                            {...register("abbreviation")}
                                        />
                                    </Box>
                                </Stack>

                                {/* Founded Date */}
                                <Box>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <Controller
                                            name="foundedDate"
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <DatePicker
                                                    {...field}
                                                    label="Established Date"
                                                    defaultValue={partyInfo.foundedDate ? dayjs(partyInfo.foundedDate) : null} // Ensure compatibility
                                                    slotProps={{
                                                        textField: {
                                                            fullWidth: true,
                                                            error: !!fieldState.error,
                                                            helperText: fieldState.error?.message
                                                        }
                                                    }}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Box>

                                {/* Seats */}
                                <Stack spacing={2} direction="row">
                                    <Box>
                                        <TextField
                                            variant="outlined"
                                            label="District Basis Seats"
                                            fullWidth
                                            type="number"
                                            inputProps={{ min: 0 }}
                                            {...register("districtBasisSeats", {
                                                value: partyInfo.districtBasisSeats || 0,
                                                validate: (value) => value >= 0 || "The value must be greater than zero",
                                            })}
                                        />
                                    </Box>
                                    <Box>
                                        <TextField
                                            variant="outlined"
                                            label="National Basis Seats"
                                            fullWidth
                                            type="number"
                                            inputProps={{ min: 0 }}
                                            {...register("nationalBasisSeats", {
                                                value: partyInfo.nationalBasisSeats || 0,
                                                validate: (value) => value >= 0 || "The value must be greater than zero",
                                            })}
                                        />
                                    </Box>
                                    <Box>
                                        <TextField
                                            variant="outlined"
                                            label="Total Seats"
                                            fullWidth
                                            type="number"
                                            {...register("totalSeats", {
                                                value: partyInfo.totalSeats || 0,
                                                validate: (value) => value >= 0 || "The value must be greater than zero",
                                            })}
                                        />
                                    </Box>
                                </Stack>

                                {/* Party Symbol Upload */}
                                <Box>
                                    <input
                                        accept="image/*"
                                        id="partySymbolInput"
                                        type="file"
                                        style={{ display: "none" }}
                                        onChange={handleFileChange}
                                    />
                                    <label htmlFor="partySymbolInput">
                                        <Button
                                            component="span"
                                            role={undefined}
                                            variant="outlined"
                                            tabIndex={-1}
                                            startIcon={<CloudUploadIcon />}
                                        >
                                            Update Party Symbol
                                        </Button>
                                    </label>
                                    {logo && (
                                        <div>
                                            <p>Uploaded File: {logo}</p>
                                        </div>
                                    )}
                                </Box>
                            </Stack>
                        </Box>

                        <Box my={2}>
                            <Divider />
                        </Box>

                        <Box>
                            <Stack spacing={2}>
                                {/* Address Line 1 */}
                                <Box>
                                    <TextField
                                        variant='outlined'
                                        label="Headquarter's Address Line 1"
                                        className='w-full'
                                        defaultValue={partyInfo.address.addressLine_1 || ''}
                                        {...register("addressLine_1")}
                                    />
                                </Box>

                                {/* Address Line 2 */}
                                <Box>
                                    <TextField
                                        variant='outlined'
                                        label="Headquarter's Address Line 2"
                                        className='w-full'
                                        required
                                        defaultValue={partyInfo.address.addressLine_2 || ''}
                                        {...register("addressLine2")}
                                    />
                                </Box>

                                {/* City and Postal Code */}
                                <Stack spacing={2} direction="row">
                                    <Box className="w-1/2">
                                        <FormControl fullWidth required>
                                            <InputLabel id="city-label">City</InputLabel>
                                            <Select
                                                labelId="city-label"
                                                label="City"
                                                variant="outlined"
                                                className='w-full'
                                                defaultValue={partyInfo.address.city || ''}
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
                                    <Box>
                                        <TextField
                                            variant='outlined'
                                            label="Postal Code"
                                            className='w-full'
                                            required
                                            defaultValue={partyInfo.address.postalCode || ''}
                                            {...register("postalCode")}
                                        />
                                    </Box>
                                </Stack>

                                {/* Contact Number */}
                                <Box>
                                    <TextField
                                        variant='outlined'
                                        label="Contact Number"
                                        className='w-full'
                                        required
                                        defaultValue={partyInfo.contactNumber || ''}
                                        {...register("contactNumber")}
                                    />
                                </Box>

                                {/* Party Website */}
                                <Box>
                                    <TextField
                                        variant='outlined'
                                        label="Website"
                                        fullWidth
                                        defaultValue={partyInfo.partyWebsite || ''}
                                        {...register("partyWebsite")}
                                    />
                                </Box>
                            </Stack>
                        </Box>

                    </form>
                </DialogContent>
                <DialogActions>
                    <Button

                        key="submit"
                        type="submit" 
                        onClick={handleSubmit(onSubmit)}
                    >
                        Save Changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
};


