import React from 'react';
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
    const { register, formState: { errors }, setValue, getValues } = useForm();
    const [partyLogo, setPartyLogo] = React.useState(null);
    const [uploadedFileName, setUploadedFileName] = React.useState(null);

    const handlePartyLogoChange = (event) => {
        setPartyLogo(event.target.files[0]);
    };

    const handleSubmit = () => {
        // Handle form submission here
        handleClose();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedFileName(file.name);
            setValue("partySymbol", file); // Set the file object to the form value
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
                    <FormControl fullWidth variant="outlined" margin='normal'>

                        <Box>
                            <Stack>
                                <Stack direction="row" className="gap-4">
                                    {/* Party Name */}
                                    <Box mb={3} className='w-5/6'>
                                        <TextField
                                            variant="outlined"
                                            label="Party Name"
                                            required
                                            fullWidth
                                            defaultValue={partyInfo.partyName}
                                        />
                                    </Box>
                                    {/* Abbreviation */}
                                    <Box mb={3}>
                                        <TextField
                                            variant="outlined"
                                            label="Abbreviation"
                                            required
                                            fullWidth
                                            defaultValue={partyInfo.abbreviation}
                                        />
                                    </Box>
                                </Stack>
                                {/* Party Leader*/}
                                <Box mb={3} >
                                    <FormControl required className='w-full'> 
                                        <InputLabel id="leader-label">Leader</InputLabel>
                                        <Select
                                            variant="outlined"
                                            labelId="leader-label"
                                            label="Leader"
                                            id="leader"
                                            defaultValue={partyInfo.leader}
                                        >
                                            {/* Add MenuItems dynamically based on available leaders */}
                                            <MenuItem value="Mahinda Rajapaksa">Mahinda Rajapaksa</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                {/* Party Secretary */}
                                <Box mb={3}>
                                    <FormControl required className='w-full'>
                                        <InputLabel id="secretary-label">Secretary</InputLabel>
                                        <Select
                                            labelId="secretary-label"
                                            label="Secretary"
                                            id="secretary"
                                            variant="outlined"
                                            defaultValue={partyInfo.secretary}
                                        >
                                            {/* Add MenuItems dynamically based on available secretaries */}
                                            <MenuItem value="Sagara Kariyawasam">Sagara Kariyawasam</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box mb={3}>
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
                                    />
                                </Box>
                            </ Stack>

                            {/* Seats */}
                            <Stack direction="row" className="flex gap-4">
                                <Box mb={3}>
                                    <TextField
                                        variant="outlined"
                                        label="District Basis Seats"
                                        fullWidth
                                        type="number"
                                        defaultValue={partyInfo.districtBasisSeats}
                                    />
                                </Box>
                                <Box mb={3}>
                                    <TextField
                                        variant="outlined"
                                        label="National Basis Seats"
                                        fullWidth
                                        type="number"
                                        defaultValue={partyInfo.nationalBasisSeats}
                                    />
                                </Box>
                                <Box mb={3}>
                                    <TextField
                                        variant="outlined"
                                        label="Total Seats"
                                        fullWidth
                                        type="number"
                                        defaultValue={partyInfo.totalSeats}
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
                                    {...register("partySymbol")}
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
                                {uploadedFileName && (
                                    <div>
                                    <p>Uploaded File: {uploadedFileName}</p>
                                    </div>
                                )}
                            </Box>
                        </Box>

                        <Box my={2} />
                        <Divider />
                        <Box my={2} />

                        <Box>
                            {/* Headquarters Address */}
                            <Stack >
                                <Box mb={3}>
                                    <TextField
                                        helperText="Headquarter address line 1"
                                        variant='outlined'
                                        id="addressLine1"
                                        label="Address Line 1"
                                        className='w-full'
                                        required
                                        {...register("addressLine1")}
                                    />
                                </Box>
                                <Box mb={3}>
                                    <TextField
                                        helperText="Headquarter address line 2"
                                        variant='outlined'
                                        id="addressLine2"
                                        label="Address Line 2"
                                        className='w-full'
                                        required
                                        {...register("addressLine2")}
                                    />
                                </Box>
                            </ Stack>

                            <Stack direction="row" className='gap-4'>
                                <Box mb={3} className="w-1/2">
                                    <FormControl fullWidth required>
                                        <Stack>
                                            <InputLabel id="born-label">City</InputLabel>
                                            <Select
                                                helperText="Headquarter located city"
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
                                        </Stack>
                                    </FormControl>
                                </Box>
                                <Box mb={3}>
                                    <TextField
                                        helperText="Headquarter postal code"
                                        variant='outlined'
                                        id="postalCode"
                                        label="Postal Code"
                                        className='w-full'
                                        required
                                        {...register("postalCode")}
                                    />
                                </Box>
                            </Stack>

                            <Box mb={3}>
                                <TextField
                                    helperText="Enter contact number"
                                    variant='outlined'
                                    id="contactNumber"
                                    label="Contact Number"
                                    className='w-full'
                                    required
                                    {...register("contactNumber")}
                                />
                            </Box>

                            <Stack>
                                {/* Party WebSite */}
                                <Box mb={3}>
                                    <TextField
                                        helperText="Enter party website"
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


                        {/* <Box mb={2}>
                            <Typography variant="body1" gutterBottom>
                                Party Colors
                            </Typography>
                            <ButtonGroup>
                                <Button variant="contained" style={{ backgroundColor: 'red' }}>Red</Button>
                                <Button variant="contained" style={{ backgroundColor: 'blue' }}>Blue</Button>
                                <Button variant="contained" style={{ backgroundColor: 'green' }}>Green</Button>
                            </ButtonGroup>
                        </Box> */}



                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleSubmit} >
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
};
