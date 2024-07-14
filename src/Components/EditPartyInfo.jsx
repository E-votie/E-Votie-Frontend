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
                    <FormControl fullWidth variant="outlined" margin="normal">

                        <Box>
                            {/* Basic Information */}
                            <Typography variant="body1" gutterBottom>
                                Basic Details
                            </Typography>

                            <Divider />
                            <Box my={2} />

                            {/* Party Name and Abbreviation */}
                            <Stack direction="row" className='flex gap-4'>
                                <Box mb={2} className='w-2/3'>
                                    <TextField
                                        variant="outlined"
                                        label="Party Name"
                                        required
                                        fullWidth
                                        defaultValue={partyInfo.partyName}
                                    />
                                </Box>
                                <Box mb={2} className='w-1/3'>
                                    <TextField
                                        variant="outlined"
                                        label="Abbreviation"
                                        required
                                        fullWidth
                                        className='w-1/2'
                                        defaultValue={partyInfo.abbreviation}
                                    />
                                </Box>
                            </Stack>

                            {/* Leader and Secretary */}
                            <Stack direction="row" className='flex gap-4'>
                                <Box mb={2} className='w-1/3'>
                                    <FormControl required className='w-full'> 
                                        <InputLabel id="leader-label">Leader</InputLabel>
                                        <Select
                                            labelId="leader-label"
                                            label="Leader"
                                            id="leader"
                                            variant="outlined"
                                            defaultValue={partyInfo.leader}
                                        >
                                            {/* Add MenuItems dynamically based on available leaders */}
                                            <MenuItem value="Mahinda Rajapaksa">Mahinda Rajapaksa</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box mb={2} className='w-1/3'>
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
                                <Box mb={2} className='w-1/3'>
                                    <TextField
                                        variant="outlined"
                                        label="Founded"
                                        required
                                        className='w-full'
                                        type="date"
                                        defaultValue={partyInfo.foundedYear}
                                    />
                                </Box>
                            </ Stack>

                            {/* Seats */}
                            <Stack direction="row" className="flex gap-4">
                                <Box mb={2}>
                                    <TextField
                                        variant="outlined"
                                        label="District Basis Seats"
                                        fullWidth
                                        type="number"
                                        defaultValue={partyInfo.districtBasisSeats}
                                    />
                                </Box>
                                <Box mb={2}>
                                    <TextField
                                        variant="outlined"
                                        label="National Basis Seats"
                                        fullWidth
                                        type="number"
                                        defaultValue={partyInfo.nationalBasisSeats}
                                    />
                                </Box>
                                <Box mb={2}>
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
                            <Box mb={2}>
                                {/* Party Symbol */}
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

                        {/* Contact Information */}
                        <Box my={1}>
                            <Typography variant="body1" gutterBottom>
                                Contact Information
                            </Typography>

                            <Divider />
                            <Box my={2} />

                            {/* Headquarters Address */}
                            <Stack direction="row" className="flex gap-4 w-full">
                                <Box mb={2} className="w-1/2">
                                    <TextField
                                        helperText="Headquarter address line 1"
                                        id="addressLine1"
                                        label="Address Line 1"
                                        className='w-full'
                                        required
                                        {...register("addressLine1")}
                                    />
                                </Box>
                                <Box mb={2}  className="w-1/2">
                                    <TextField
                                        helperText="Headquarter address line 2"
                                        id="addressLine2"
                                        label="Address Line 2"
                                        className='w-full'
                                        required
                                        {...register("addressLine2")}
                                    />
                                </Box>
                            </ Stack>

                            <Stack direction="row" className="flex gap-4">
                                <Box mb={2}  className="w-1/2">
                                    <TextField
                                        helperText="Headquarter located city"
                                        id="city"
                                        label="City"
                                        required
                                        {...register("city")}
                                    />
                                </Box>
                                <Box mb={2}  className="w-1/2">
                                    <TextField
                                        helperText="Headquarter postal code"
                                        id="postalCode"
                                        label="Postal Code"
                                        required
                                        {...register("postalCode")}
                                    />
                                </Box>
                                <Box mb={2}  className="w-1/2">
                                    <TextField
                                        helperText="Enter contact number"
                                        id="contactNumber"
                                        label="Contact Number"
                                        required
                                        {...register("contactNumber")}
                                    />
                                </Box>
                            </Stack>

                            <Stack>
                                {/* Party WebSite */}
                                <Box mb={2}>
                                    <TextField
                                        helperText="Enter party website"
                                        id="partyWebsite"
                                        variant="outlined"
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
