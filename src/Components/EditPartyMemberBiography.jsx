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
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useForm, Controller } from "react-hook-form";

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
    maxWidth: '600px',
  },
}));

export const EditPartyMemberBiography = ({ open, handleClose, partyMember }) => {
    const { control, handleSubmit, register } = useForm();
  const [profilePhoto, setProfilePhoto] = React.useState(null);
  const [coverPhoto, setCoverPhoto] = React.useState(null);
  const [attachments, setAttachments] = React.useState([]);

  const handleProfilePhotoChange = (event) => {
    setProfilePhoto(event.target.files[0]);
  };

  const handleCoverPhotoChange = (event) => {
    setCoverPhoto(event.target.files[0]);
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Update Biography
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
        </DialogTitle>
        <DialogContent dividers>
          <FormControl fullWidth variant="outlined">
            {/* Personal Info */}
            {/* <Typography variant="h6" gutterBottom>
              Personal Info
            </Typography> */}
            <Box mb={2}>
              <TextField
                variant="outlined"
                label="Full Name"
                required
                fullWidth
                value={partyMember.name}
              />
            </Box>
            <Box mb={2}>
              <TextField
                variant="outlined"
                label="Current Position"
                required
                fullWidth
                value={partyMember.position}
              />
            </Box>
            <Box mb={2} display="flex" gap={2}>
              <TextField
                variant="outlined"
                label="Date of Birth"
                required
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={partyMember.biography.dob}
              />
              <FormControl fullWidth required>
                <InputLabel id="born-label">Born</InputLabel>
                <Select
                  labelId="born-label"
                  label="Born"
                  variant="outlined"
                  value={partyMember.biography.born}
                >
                  {cities.map((city, index) => (
                    <MenuItem key={index} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth required>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  label="Gender"
                  variant="outlined"
                  value={partyMember.biography.gender}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {/* Education */}
            {/* <Typography variant="h6" gutterBottom>
              Education
            </Typography> */}
            <Box mb={2}>
              <TextField
                variant="outlined"
                label="School 1"
                fullWidth
                value={partyMember.biography.schoolEducation[0].school}
              />
            </Box>
            <Box mb={2}>
              <TextField
                variant="outlined"
                label="School 2"
                fullWidth
                value={partyMember.biography.schoolEducation[1].school}
              />
            </Box>
            <Box mb={2}>
              <TextField
                variant="outlined"
                label="Undergraduate"
                fullWidth
                value={partyMember.biography.undergraduateEducation[0].university}
              />
            </Box>
            <Box mb={2}>
              <TextField
                variant="outlined"
                label="Postgraduate"
                fullWidth
                value={partyMember.undergraduate}
              />
            </Box>
            {/* Photos */}
            {/* <Typography variant="h6" gutterBottom>
              Photos
            </Typography> */}
            <Box mb={2}>
                <Typography variant="body1">
                    Profile Photo
                </Typography>
                <Button
                    component="label"
                    variant="outlined"
                    startIcon={<CloudUploadIcon />}
                    sx={{ mt: 1 }}
                >
                    Upload file(s)
                    <VisuallyHiddenInput 
                        type="file" 
                        multiple 
                        onChange={(e) => {
                            console.log("File input change event triggered");
                            handleFileChange(e);
                        }}                                    
                        accept=".jpg,.jpeg,.png,.pdf,.doc,.docx" 
                        {...register("attachments")}
                    />
                </Button>
                {attachments.length > 0 && (
                    <Box mt={2}>
                        <Typography variant="body2">Attachments:</Typography>
                        <ul>
                            {attachments.map((file, index) => (
                                <li key={index}>{file.name}</li>
                            ))}
                        </ul>
                    </Box>
                )}
            </Box>
            <Box mb={2}>
                <Typography variant="body1">
                    Cover Photo
                </Typography>
                <Button
                    component="label"
                    variant="outlined"
                    startIcon={<CloudUploadIcon />}
                    sx={{ mt: 1 }}
                >
                    Upload file(s)
                    <VisuallyHiddenInput 
                        type="file" 
                        multiple 
                        onChange={(e) => {
                            console.log("File input change event triggered");
                            handleFileChange(e);
                        }}                                    
                        accept=".jpg,.jpeg,.png,.pdf,.doc,.docx" 
                        {...register("attachments")}
                    />
                </Button>
                {attachments.length > 0 && (
                    <Box mt={2}>
                        <Typography variant="body2">Attachments:</Typography>
                        <ul>
                            {attachments.map((file, index) => (
                                <li key={index}>{file.name}</li>
                            ))}
                        </ul>
                    </Box>
                )}
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
};
