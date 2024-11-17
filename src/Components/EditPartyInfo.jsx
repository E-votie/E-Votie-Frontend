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
    const { register, formState: { errors }, setValue, getValues, handleSubmit } = useForm();
    const [partyLogo, setPartyLogo] = useState(null);
    const [uploadedFileName, setUploadedFileName] = useState(null);
    const [isLeaderVerified, setIsLeaderVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [leaderName, setLeaderName] = useState("");

    const handlePartyLogoChange = (event) => {
        setPartyLogo(event.target.files[0]);
    };

    const handleLeaderNicBlur = (e) => {
        validateLeaderNic(e.target.value);
    };

    const validateLeaderNic = useCallback(async (nic) => {
        if (!nic) return;
        const updatedToken = KeycloakService.getToken();
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:5003/api/voter/${nic}`, {
                headers: {
                    Authorization: `Bearer ${updatedToken}`
                }
            });
            if ([200, 201].includes(response.status)) {
                setLeaderName(response.data.Name);
                setIsLeaderVerified(true);
                setIsSubmitDisabled(false);
            } else {
                setLeaderName("");
                setIsLeaderVerified(false);
                setIsSubmitDisabled(true);
            }
        } catch (error) {
            console.log(error);
            setLeaderName("");
            setIsLeaderVerified(false);
            setIsSubmitDisabled(true);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const updateParty = async (data) => {

        const showErrorModal = (message, redirectPath) => {
            handleClose();
            MySwal.fire({
                title: `<p>${message}</p>`,
                icon: 'error',
                showConfirmButton: true,
                confirmButtonText: 'OK',
            }).then((result) => {
                if (result.isConfirmed && redirectPath) {
                    // navigate(redirectPath);
                }
            });
        };

        const showSuccessModal = (message, redirectPath) => {
            handleClose();
            MySwal.fire({
                title: `<p>${message}</p>`,
                icon: 'success',
                showConfirmButton: true,
                confirmButtonText: 'OK',
            }).then((result) => {
                if (result.isConfirmed && redirectPath) {
                    // navigate(redirectPath);
                }
            });
        };
        // Handle form submission here
        console.log(data);
        try{
            const response = await axios.post();
        }catch(err){
            console.log(err.message);
        }
        handleClose();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        alert("File changed");
        console.log("file");
        if (file) {
            setUploadedFileName(file.name);
            setValue("partySymbol", file); 
        }
    };

    return (
        <React.Fragment>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Update Party Information
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
                    <form onSubmit={handleSubmit(updateParty)}>
                        <Box>
                            <Stack spacing={2}>
                                <Stack spacing={2} direction="row">
                                    {/* Party Name */}
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
                                    {/* Abbreviation */}
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
                                <Box>
                                    <TextField
                                        labelId="founded-date-label"
                                        variant="outlined"
                                        label="Founded"
                                        required
                                        className='w-full'
                                        type="date"
                                        InputLabelProps={{
                                            shrink: true,
                                          }}
                                        defaultValue={partyInfo.foundedYear}
                                        {...register("foundedDate")}
                                    />
                                </Box>
                                {/* Seats */}
                                <Stack spacing={2} direction="row">
                                    <Box >
                                        <TextField
                                            variant="outlined"
                                            label="District Basis Seats"
                                            fullWidth
                                            type="number"
                                            defaultValue={partyInfo.districtBasisSeats}
                                            {...register("districtBasisSeats")}
                                        />
                                    </Box>
                                    <Box >
                                        <TextField
                                            variant="outlined"
                                            label="National Basis Seats"
                                            fullWidth
                                            type="number"
                                            defaultValue={partyInfo.nationalBasisSeats}
                                            {...register("nationalBasisSeats")}
                                        />
                                    </Box>
                                    <Box >
                                        <TextField
                                            variant="outlined"
                                            label="Total Seats"
                                            fullWidth
                                            type="number"
                                            defaultValue={partyInfo.totalSeats}
                                            {...register("totalSeats")}
                                        />
                                    </Box>
                                </Stack>
                                {/* Party Symbol */}
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
                                        Upload Party Symbol
                                        </Button>
                                    </label>
                                    {<div>
                                        <p>Uploaded File: {uploadedFileName}</p>
                                    </div>
                                    }
                                </Box>
                            </Stack>
                        </Box>

                        <Box my={2} />
                        <Divider />
                        <Box my={2} />

                        <Box>
                            {/* Headquarters Address */}
                            <Stack spacing={2}>
                                {/* address line 1 */}
                                <Box>
                                    <TextField
                                        variant='outlined'
                                        id="addressLine1"
                                        label="Headquarter's Address Line 1"
                                        className='w-full'
                                        required
                                        {...register("addressLine1")}
                                    />
                                </Box>
                                {/* address line 2 */}
                                <Box>
                                    <TextField
                                        variant='outlined'
                                        id="addressLine2"
                                        label="Headquarter's Address Line 2"
                                        className='w-full'
                                        required
                                        {...register("addressLine2")}
                                    />
                                </Box>
                                <Stack spacing={2} direction="row">
                                    {/* City */}
                                    <Box className="w-1/2">
                                        <FormControl fullWidth required>
                                                <InputLabel id="born-label">City</InputLabel>
                                                <Select
                                                    labelId="born-label"
                                                    label="City"
                                                    id="city"
                                                    variant="outlined"
                                                    className='w-full'
                                                    required                                            {...register("city")}
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
                                    {/* Postal Code */}
                                    <Box>
                                        <TextField
                                            variant='outlined'
                                            id="postalCode"
                                            label="Postal Code"
                                            className='w-full'
                                            required
                                            {...register("postalCode")}
                                        />
                                    </Box>
                                </Stack>
                                {/* Contact Number */}
                                <Box>
                                    <TextField
                                        variant='outlined'
                                        id="contactNumber"
                                        label="Contact Number"
                                        className='w-full'
                                        required
                                        {...register("contactNumber")}
                                    />
                                </Box>
                                {/* Party WebSite */}
                                <Box>
                                    <TextField
                                        id="partyWebsite"
                                        variant='outlined'
                                        label="Website"
                                        fullWidth
                                        defaultValue={partyInfo.website}
                                        {...register("partyWebsite")}
                                    />
                                </Box>
                            </Stack>
                        </Box>

                        <DialogActions>
                            <Button type="submit" color="primary">
                                Save Changes
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </BootstrapDialog>
        </React.Fragment>
    );
};


// <FormControl required className='w-full'> 
// <InputLabel id="leader-label">Leader</InputLabel>
// <Select
//     variant="outlined"
//     labelId="leader-label"
//     label="Leader"
//     id="leader"
//     defaultValue={partyInfo.leader}
//     {...register("leader")}
// >
//     {/* Add MenuItems dynamically based on available leaders */}
//     <MenuItem value="Mahinda Rajapaksa">Mahinda Rajapaksa</MenuItem>
// </Select>
// </FormControl>

// <FormControl required className='w-full'>
// <InputLabel id="secretary-label">Secretary</InputLabel>
// <Select
//     labelId="secretary-label"
//     label="Secretary"
//     id="secretary"
//     variant="outlined"
//     defaultValue={partyInfo.secretary}
//     {...register("secretary")}
// >
//     {/* Add MenuItems dynamically based on available secretaries */}
//     <MenuItem value="Sagara Kariyawasam">Sagara Kariyawasam</MenuItem>
// </Select>
// </FormControl>

// <Box my={2} />
// <Divider />
// <Box my={2} />

// <Box>
//     <Stack spacing={2}>
//         {/* Party Leader*/}
//         <Box>
//             <Stack spacing={2} direction="row">
//                 <TextField
//                     className='w-1/3'
//                     label="Leader NIC"
//                     variant="outlined"
//                     {...register("leaderNic", { required: true })}
//                     error={!!errors.leaderNic}
//                     helperText={errors.leaderNic && 'Leader NIC is required'}
//                     onBlur={handleLeaderNicBlur}
//                     padding="normal"
//                     sx={{ fontSize: '1rem', fontWeight: 'bold' }}
//                 />
//                 <TextField
//                     className='w-2/3'
//                     label="Leader Name"
//                     variant="outlined"
//                     {...register("leaderName", { required: true })}
//                     disabled
//                     value={leaderName}
//                     padding="normal"
//                     sx={{ fontSize: '1rem', fontWeight: 'bold' }}
//                 />
//             </Stack>
//             {isLoading && <p>Verifying leader NIC...</p>} 
//             {!isLoading && isLeaderVerified && <Typography color='success.main'>Leader identified successfully!</Typography>}
//             {!isLoading && !isLeaderVerified && <Typography className='text-error'>Leader identification failed!</Typography>}
//         </Box>
//         {/* Party Secretary */}
//         <Box>
//             <Stack spacing={2} direction="row">
//                 <TextField
//                     className='w-1/3'
//                     label="Leader NIC"
//                     variant="outlined"
//                     {...register("leaderNic", { required: true })}
//                     error={!!errors.leaderNic}
//                     helperText={errors.leaderNic && 'Leader NIC is required'}
//                     onBlur={handleLeaderNicBlur}
//                     padding="normal"
//                     sx={{ fontSize: '1rem', fontWeight: 'bold' }}
//                 />
//                 <TextField
//                     className='w-2/3'
//                     label="Leader Name"
//                     variant="outlined"
//                     {...register("leaderName", { required: true })}
//                     disabled
//                     value={leaderName}
//                     padding="normal"
//                     sx={{ fontSize: '1rem', fontWeight: 'bold' }}
//                 />
//             </Stack>
//             {isLoading && <p>Verifying leader NIC...</p>} 
//             {!isLoading && isLeaderVerified && <Typography color='success.main'>Leader identified successfully!</Typography>}
//             {!isLoading && !isLeaderVerified && <Typography className='text-error'>Leader identification failed!</Typography>}
//         </Box>
//     </Stack>
// </Box>