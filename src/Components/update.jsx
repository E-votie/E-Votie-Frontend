// import React, { useState, useCallback } from 'react';
// import {
//     Button,
//     Box,
//     Dialog,
//     DialogContent,
//     DialogActions,
//     TextField,
//     Typography,
//     IconButton,
//     DialogTitle,
//     Stepper,
//     Step,
//     StepLabel,
//     Divider,
//     Card,
//     CardContent,
//     Grid,
//     Stack,
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import UploadIcon from '@mui/icons-material/Upload';
// import { styled } from '@mui/material/styles';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import KeycloakService from "../services/KeycloakService";

// const MySwal = withReactContent(Swal);

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     '& .MuiDialogContent-root': {
//         padding: theme.spacing(2),
//     },
//     '& .MuiDialogActions-root': {
//         padding: theme.spacing(1),
//     },
//     '& .MuiPaper-root': {
//         width: '100%',
//     },
// }));

// const initialApplicationDetails = {
//     partyName: 'Green Party',
//     leader: 'John Doe',
//     submittedDate: '2024-07-31',
//     partySymbol: '/path/to/party-symbol.png',
//     addressLine1: '123 Green Street',
//     addressLine2: 'Eco City',
//     postalCode: '12345',
//     contactNumber: '+1 234 567 8900',
//     email: 'contact@greenparty.com',
//     attachments: [
//       { type: 'Constitution', name: 'Constitution.pdf', link: '/path/to/constitution.pdf' },
//       { type: 'Logo', name: 'Logo.png', link: '/path/to/logo.png' },
//       { type: 'Membership List', name: 'Members.xlsx', link: '/path/to/members.xlsx' },
//       { type: 'Financial Statement', name: 'Finances.pdf', link: '/path/to/finances.pdf' },
//       { type: 'Leadership Structure', name: 'Leadership.pdf', link: '/path/to/leadership.pdf' }
//     ]
//   };

// export const PartyRegistrationApplication = ({ open, handleClose }) => {
//     const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
//     const [activeStep, setActiveStep] = useState(0);
//     const [isLeaderVerified, setIsLeaderVerified] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
//     const [leaderName, setLeaderName] = useState("");
//     const steps = ['Party Information', 'Documents'];

//     const validateLeaderNic = useCallback(async (nic) => {
//         if (!nic) return;
//         const updatedToken = KeycloakService.getToken();
//         setIsLoading(true);
//         try {
//             const response = await axios.get(`http://localhost:5003/api/voter/${nic}`, {
//                 headers: {
//                     Authorization: `Bearer ${updatedToken}`
//                 }
//             });
//             if ([200, 201].includes(response.status)) {
//                 setLeaderName(response.data.Name);
//                 setIsLeaderVerified(true);
//                 setIsSubmitDisabled(false);
//             } else {
//                 setLeaderName("");
//                 setIsLeaderVerified(false);
//                 setIsSubmitDisabled(true);
//             }
//         } catch (error) {
//             console.log(error);
//             setLeaderName("");
//             setIsLeaderVerified(false);
//             setIsSubmitDisabled(true);
//         } finally {
//             setIsLoading(false);
//         }
//     }, []);

//     const handleLeaderNicBlur = (e) => {
//         validateLeaderNic(e.target.value);
//     };

//     const handleNext = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     };

//     const handleBack = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     };

//     const onSubmit = (data) => {
//         console.log("onSubmit function called");
//         console.log(data);
        
//     }

//     const renderPartyInformationForm = () => (
//         <Box sx={{ padding: 2 }}>
//             <Stack spacing={2}>
//                 {/* <Typography variant="h6" color="textSecondary" gutterBottom>
//                     Party Information
//                 </Typography> */}
//                 <Divider />
//                 <TextField
//                     fullWidth
//                     label="Party Name"
//                     variant="outlined"
//                     {...register("partyName", { required: true })}
//                 />
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Abbreviation"
//                         variant="outlined"
//                         {...register("abbreviation", { required: true })}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Established Date"
//                         variant="outlined"
//                         type="date"
//                         InputLabelProps={{ shrink: true }}
//                         {...register("date", { required: true })}
//                     />
//                 </Stack>
//                 <TextField
//                     fullWidth
//                     label="Address line 1"
//                     variant="outlined"
//                     {...register("addressLine1", { required: true })}
//                 />
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Address line 2"
//                         variant="outlined"
//                         {...register("addressLine2")}
//                     />
//                     <TextField
//                         fullWidth
//                         label="City"
//                         variant="outlined"
//                         {...register("city", { required: true })}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Postal Code"
//                         variant="outlined"
//                         {...register("postalCode", { required: true })}
//                     />
//                 </Stack>
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Leader NIC"
//                         variant="outlined"
//                         {...register("leaderNic", { required: true })}
//                         error={!!errors.leaderNic}
//                         helperText={errors.leaderNic && 'Leader NIC is required'}
//                         onBlur={handleLeaderNicBlur}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Leader Name"
//                         variant="outlined"
//                         {...register("leaderName", { required: true })}
//                         disabled
//                         value={leaderName}
//                     />
//                 </Stack>
//                 {isLoading && <Typography>Verifying leader NIC...</Typography>} 
//                 {!isLoading && isLeaderVerified && <Typography color='success.main'>Leader identified successfully!</Typography>}
//                 {!isLoading && !isLeaderVerified && <Typography className='text-error'>Leader identification failed!</Typography>}
//             </Stack>
//         </Box>
//     );

//     const renderDocumentUploadForm = () => (
//         <CardContent>
//             {/* <Typography variant="h6" color="textSecondary" gutterBottom>
//                 Documents
//             </Typography> */}
//             <Divider sx={{ mb: 2 }} />
//             <Grid container spacing={2}>
//                 {initialApplicationDetails.attachments.map((attachment, index) => (
//                     <Grid item xs={12} sm={6} md={4} key={index}>
//                         <Card variant="outlined">
//                             <CardContent>
//                                 <Typography variant="subtitle1" gutterBottom>
//                                     {attachment.type}
//                                 </Typography>
//                                 <Box display="flex" alignItems="center" mb={1}>
//                                     <AttachFileIcon fontSize="small" />
//                                     <Typography variant="body2" noWrap sx={{ ml: 1 }}>
//                                         {attachment.name}
//                                     </Typography>
//                                 </Box>
//                                 <Button
//                                     variant="contained"
//                                     startIcon={<UploadIcon />}
//                                     fullWidth
//                                 >
//                                     Update
//                                 </Button>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </CardContent>
//     );

//     return (
//         <BootstrapDialog onClose={handleClose} open={open}>
//             <DialogTitle sx={{ m: 0, p: 2 }}>Update Party Information</DialogTitle>
//             <IconButton
//                 aria-label="close"
//                 onClick={handleClose}
//                 sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
//             >
//                 <CloseIcon />
//             </IconButton>
//             <DialogContent dividers>
//                 <Stepper activeStep={activeStep} alternativeLabel>
//                     {steps.map((label) => (
//                         <Step key={label}>
//                             <StepLabel>{label}</StepLabel>
//                         </Step>
//                     ))}
//                 </Stepper>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     {activeStep === 0 ? renderPartyInformationForm() : renderDocumentUploadForm()}
//                 </form>
//             </DialogContent>
//             <DialogActions>
//                 {activeStep > 0 && (
//                     <Button onClick={handleBack}>
//                         Back
//                     </Button>
//                 )}
//                 {activeStep < steps.length - 1 ? (
//                     <Button onClick={handleNext} variant="contained">
//                         Next
//                     </Button>
//                 ) : (
//                     <Button
//                         onClick={() => {
//                             console.log(getValues());
//                             handleClose();
//                         }}
//                         variant="contained"
//                         color="primary"
//                         disabled={isSubmitDisabled}
//                     >
//                         Submit
//                     </Button>
//                 )}
//             </DialogActions>
//         </BootstrapDialog>
//     );
// };

// import React, { useState, useCallback } from 'react';
// import {
//     Button,
//     Box,
//     Dialog,
//     DialogContent,
//     DialogActions,
//     TextField,
//     Typography,
//     IconButton,
//     DialogTitle,
//     Stepper,
//     Step,
//     StepLabel,
//     Divider,
//     Card,
//     CardContent,
//     Grid,
//     Stack,
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import UploadIcon from '@mui/icons-material/Upload';
// import { styled } from '@mui/material/styles';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import KeycloakService from "../services/KeycloakService";

// const MySwal = withReactContent(Swal);

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     '& .MuiDialogContent-root': {
//         padding: theme.spacing(2),
//     },
//     '& .MuiDialogActions-root': {
//         padding: theme.spacing(1),
//     },
//     '& .MuiPaper-root': {
//         width: '100%',
//     },
// }));

// const initialApplicationDetails = {
//     partyName: 'Green Party',
//     leader: 'John Doe',
//     submittedDate: '2024-07-31',
//     partySymbol: '/path/to/party-symbol.png',
//     addressLine1: '123 Green Street',
//     addressLine2: 'Eco City',
//     postalCode: '12345',
//     contactNumber: '+1 234 567 8900',
//     email: 'contact@greenparty.com',
//     attachments: [
//       { type: 'Constitution', name: 'Constitution.pdf', link: '/path/to/constitution.pdf' },
//       { type: 'Logo', name: 'Logo.png', link: '/path/to/logo.png' },
//       { type: 'Membership List', name: 'Members.xlsx', link: '/path/to/members.xlsx' },
//       { type: 'Financial Statement', name: 'Finances.pdf', link: '/path/to/finances.pdf' },
//       { type: 'Leadership Structure', name: 'Leadership.pdf', link: '/path/to/leadership.pdf' }
//     ]
//   };

// export const PartyRegistrationApplication = ({ open, handleClose }) => {
//     const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
//     const [activeStep, setActiveStep] = useState(0);
//     const [isLeaderVerified, setIsLeaderVerified] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
//     const [leaderName, setLeaderName] = useState("");
//     const steps = ['Party Information', 'Documents'];

//     const validateLeaderNic = useCallback(async (nic) => {
//         if (!nic) return;
//         const updatedToken = KeycloakService.getToken();
//         setIsLoading(true);
//         try {
//             const response = await axios.get(`http://localhost:5003/api/voter/${nic}`, {
//                 headers: {
//                     Authorization: `Bearer ${updatedToken}`
//                 }
//             });
//             if ([200, 201].includes(response.status)) {
//                 setLeaderName(response.data.Name);
//                 setIsLeaderVerified(true);
//                 setIsSubmitDisabled(false);
//             } else {
//                 setLeaderName("");
//                 setIsLeaderVerified(false);
//                 setIsSubmitDisabled(true);
//             }
//         } catch (error) {
//             console.log(error);
//             setLeaderName("");
//             setIsLeaderVerified(false);
//             setIsSubmitDisabled(true);
//         } finally {
//             setIsLoading(false);
//         }
//     }, []);

//     const handleLeaderNicBlur = (e) => {
//         validateLeaderNic(e.target.value);
//     };

//     const handleNext = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     };

//     const handleBack = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     };

//     const onSubmit = (data) => {
//         console.log("onSubmit function called");
//         console.log(data);
        
//     }

//     const renderPartyInformationForm = () => (
//         <Box sx={{ padding: 2 }}>
//             <Stack spacing={2}>
//                 {/* <Typography variant="h6" color="textSecondary" gutterBottom>
//                     Party Information
//                 </Typography> */}
//                 <Divider />
//                 <TextField
//                     fullWidth
//                     label="Party Name"
//                     variant="outlined"
//                     {...register("partyName", { required: true })}
//                 />
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Abbreviation"
//                         variant="outlined"
//                         {...register("abbreviation", { required: true })}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Established Date"
//                         variant="outlined"
//                         type="date"
//                         InputLabelProps={{ shrink: true }}
//                         {...register("date", { required: true })}
//                     />
//                 </Stack>
//                 <TextField
//                     fullWidth
//                     label="Address line 1"
//                     variant="outlined"
//                     {...register("addressLine1", { required: true })}
//                 />
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Address line 2"
//                         variant="outlined"
//                         {...register("addressLine2")}
//                     />
//                     <TextField
//                         fullWidth
//                         label="City"
//                         variant="outlined"
//                         {...register("city", { required: true })}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Postal Code"
//                         variant="outlined"
//                         {...register("postalCode", { required: true })}
//                     />
//                 </Stack>
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Leader NIC"
//                         variant="outlined"
//                         {...register("leaderNic", { required: true })}
//                         error={!!errors.leaderNic}
//                         helperText={errors.leaderNic && 'Leader NIC is required'}
//                         onBlur={handleLeaderNicBlur}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Leader Name"
//                         variant="outlined"
//                         {...register("leaderName", { required: true })}
//                         disabled
//                         value={leaderName}
//                     />
//                 </Stack>
//                 {isLoading && <Typography>Verifying leader NIC...</Typography>} 
//                 {!isLoading && isLeaderVerified && <Typography color='success.main'>Leader identified successfully!</Typography>}
//                 {!isLoading && !isLeaderVerified && <Typography className='text-error'>Leader identification failed!</Typography>}
//             </Stack>
//         </Box>
//     );

//     const renderDocumentUploadForm = () => (
//         <CardContent>
//             {/* <Typography variant="h6" color="textSecondary" gutterBottom>
//                 Documents
//             </Typography> */}
//             <Divider sx={{ mb: 2 }} />
//             <Grid container spacing={2}>
//                 {initialApplicationDetails.attachments.map((attachment, index) => (
//                     <Grid item xs={12} sm={6} md={4} key={index}>
//                         <Card variant="outlined">
//                             <CardContent>
//                                 <Typography variant="subtitle1" gutterBottom>
//                                     {attachment.type}
//                                 </Typography>
//                                 <Box display="flex" alignItems="center" mb={1}>
//                                     <AttachFileIcon fontSize="small" />
//                                     <Typography variant="body2" noWrap sx={{ ml: 1 }}>
//                                         {attachment.name}
//                                     </Typography>
//                                 </Box>
//                                 <Button
//                                     variant="contained"
//                                     startIcon={<UploadIcon />}
//                                     fullWidth
//                                 >
//                                     Update
//                                 </Button>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </CardContent>
//     );

//     return (
//         <BootstrapDialog onClose={handleClose} open={open}>
//             <DialogTitle sx={{ m: 0, p: 2 }}>Update Party Information</DialogTitle>
//             <IconButton
//                 aria-label="close"
//                 onClick={handleClose}
//                 sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
//             >
//                 <CloseIcon />
//             </IconButton>
//             <DialogContent dividers>
//                 <Stepper activeStep={activeStep} alternativeLabel>
//                     {steps.map((label) => (
//                         <Step key={label}>
//                             <StepLabel>{label}</StepLabel>
//                         </Step>
//                     ))}
//                 </Stepper>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     {activeStep === 0 ? renderPartyInformationForm() : renderDocumentUploadForm()}
//                 </form>
//             </DialogContent>
//             <DialogActions>
//                 {activeStep > 0 && (
//                     <Button onClick={handleBack}>
//                         Back
//                     </Button>
//                 )}
//                 {activeStep < steps.length - 1 ? (
//                     <Button onClick={handleNext} variant="contained">
//                         Next
//                     </Button>
//                 ) : (
//                     <Button
//                         onClick={() => {
//                             console.log(getValues());
//                             handleClose();
//                         }}
//                         variant="contained"
//                         color="primary"
//                         disabled={isSubmitDisabled}
//                     >
//                         Submit
//                     </Button>
//                 )}
//             </DialogActions>
//         </BootstrapDialog>
//     );
// };

// import React, { useState, useCallback } from 'react';
// import {
//     Button,
//     Box,
//     Dialog,
//     DialogContent,
//     DialogActions,
//     TextField,
//     Typography,
//     IconButton,
//     DialogTitle,
//     Stepper,
//     Step,
//     StepLabel,
//     Divider,
//     Card,
//     CardContent,
//     Grid,
//     Stack,
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import UploadIcon from '@mui/icons-material/Upload';
// import { styled } from '@mui/material/styles';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import KeycloakService from "../services/KeycloakService";

// const MySwal = withReactContent(Swal);

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     '& .MuiDialogContent-root': {
//         padding: theme.spacing(2),
//     },
//     '& .MuiDialogActions-root': {
//         padding: theme.spacing(1),
//     },
//     '& .MuiPaper-root': {
//         width: '100%',
//     },
// }));

// const initialApplicationDetails = {
//     partyName: 'Green Party',
//     leader: 'John Doe',
//     submittedDate: '2024-07-31',
//     partySymbol: '/path/to/party-symbol.png',
//     addressLine1: '123 Green Street',
//     addressLine2: 'Eco City',
//     postalCode: '12345',
//     contactNumber: '+1 234 567 8900',
//     email: 'contact@greenparty.com',
//     attachments: [
//       { type: 'Constitution', name: 'Constitution.pdf', link: '/path/to/constitution.pdf' },
//       { type: 'Logo', name: 'Logo.png', link: '/path/to/logo.png' },
//       { type: 'Membership List', name: 'Members.xlsx', link: '/path/to/members.xlsx' },
//       { type: 'Financial Statement', name: 'Finances.pdf', link: '/path/to/finances.pdf' },
//       { type: 'Leadership Structure', name: 'Leadership.pdf', link: '/path/to/leadership.pdf' }
//     ]
//   };

// export const PartyRegistrationApplication = ({ open, handleClose }) => {
//     const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
//     const [activeStep, setActiveStep] = useState(0);
//     const [isLeaderVerified, setIsLeaderVerified] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
//     const [leaderName, setLeaderName] = useState("");
//     const steps = ['Party Information', 'Documents'];

//     const validateLeaderNic = useCallback(async (nic) => {
//         if (!nic) return;
//         const updatedToken = KeycloakService.getToken();
//         setIsLoading(true);
//         try {
//             const response = await axios.get(`http://localhost:5003/api/voter/${nic}`, {
//                 headers: {
//                     Authorization: `Bearer ${updatedToken}`
//                 }
//             });
//             if ([200, 201].includes(response.status)) {
//                 setLeaderName(response.data.Name);
//                 setIsLeaderVerified(true);
//                 setIsSubmitDisabled(false);
//             } else {
//                 setLeaderName("");
//                 setIsLeaderVerified(false);
//                 setIsSubmitDisabled(true);
//             }
//         } catch (error) {
//             console.log(error);
//             setLeaderName("");
//             setIsLeaderVerified(false);
//             setIsSubmitDisabled(true);
//         } finally {
//             setIsLoading(false);
//         }
//     }, []);

//     const handleLeaderNicBlur = (e) => {
//         validateLeaderNic(e.target.value);
//     };

//     const handleNext = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     };

//     const handleBack = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     };

//     const onSubmit = (data) => {
//         console.log("onSubmit function called");
//         console.log(data);
        
//     }

//     const renderPartyInformationForm = () => (
//         <Box sx={{ padding: 2 }}>
//             <Stack spacing={2}>
//                 {/* <Typography variant="h6" color="textSecondary" gutterBottom>
//                     Party Information
//                 </Typography> */}
//                 <Divider />
//                 <TextField
//                     fullWidth
//                     label="Party Name"
//                     variant="outlined"
//                     {...register("partyName", { required: true })}
//                 />
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Abbreviation"
//                         variant="outlined"
//                         {...register("abbreviation", { required: true })}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Established Date"
//                         variant="outlined"
//                         type="date"
//                         InputLabelProps={{ shrink: true }}
//                         {...register("date", { required: true })}
//                     />
//                 </Stack>
//                 <TextField
//                     fullWidth
//                     label="Address line 1"
//                     variant="outlined"
//                     {...register("addressLine1", { required: true })}
//                 />
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Address line 2"
//                         variant="outlined"
//                         {...register("addressLine2")}
//                     />
//                     <TextField
//                         fullWidth
//                         label="City"
//                         variant="outlined"
//                         {...register("city", { required: true })}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Postal Code"
//                         variant="outlined"
//                         {...register("postalCode", { required: true })}
//                     />
//                 </Stack>
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Leader NIC"
//                         variant="outlined"
//                         {...register("leaderNic", { required: true })}
//                         error={!!errors.leaderNic}
//                         helperText={errors.leaderNic && 'Leader NIC is required'}
//                         onBlur={handleLeaderNicBlur}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Leader Name"
//                         variant="outlined"
//                         {...register("leaderName", { required: true })}
//                         disabled
//                         value={leaderName}
//                     />
//                 </Stack>
//                 {isLoading && <Typography>Verifying leader NIC...</Typography>} 
//                 {!isLoading && isLeaderVerified && <Typography color='success.main'>Leader identified successfully!</Typography>}
//                 {!isLoading && !isLeaderVerified && <Typography className='text-error'>Leader identification failed!</Typography>}
//             </Stack>
//         </Box>
//     );

//     const renderDocumentUploadForm = () => (
//         <CardContent>
//             {/* <Typography variant="h6" color="textSecondary" gutterBottom>
//                 Documents
//             </Typography> */}
//             <Divider sx={{ mb: 2 }} />
//             <Grid container spacing={2}>
//                 {initialApplicationDetails.attachments.map((attachment, index) => (
//                     <Grid item xs={12} sm={6} md={4} key={index}>
//                         <Card variant="outlined">
//                             <CardContent>
//                                 <Typography variant="subtitle1" gutterBottom>
//                                     {attachment.type}
//                                 </Typography>
//                                 <Box display="flex" alignItems="center" mb={1}>
//                                     <AttachFileIcon fontSize="small" />
//                                     <Typography variant="body2" noWrap sx={{ ml: 1 }}>
//                                         {attachment.name}
//                                     </Typography>
//                                 </Box>
//                                 <Button
//                                     variant="contained"
//                                     startIcon={<UploadIcon />}
//                                     fullWidth
//                                 >
//                                     Update
//                                 </Button>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </CardContent>
//     );

//     return (
//         <BootstrapDialog onClose={handleClose} open={open}>
//             <DialogTitle sx={{ m: 0, p: 2 }}>Update Party Information</DialogTitle>
//             <IconButton
//                 aria-label="close"
//                 onClick={handleClose}
//                 sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
//             >
//                 <CloseIcon />
//             </IconButton>
//             <DialogContent dividers>
//                 <Stepper activeStep={activeStep} alternativeLabel>
//                     {steps.map((label) => (
//                         <Step key={label}>
//                             <StepLabel>{label}</StepLabel>
//                         </Step>
//                     ))}
//                 </Stepper>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     {activeStep === 0 ? renderPartyInformationForm() : renderDocumentUploadForm()}
//                 </form>
//             </DialogContent>
//             <DialogActions>
//                 {activeStep > 0 && (
//                     <Button onClick={handleBack}>
//                         Back
//                     </Button>
//                 )}
//                 {activeStep < steps.length - 1 ? (
//                     <Button onClick={handleNext} variant="contained">
//                         Next
//                     </Button>
//                 ) : (
//                     <Button
//                         onClick={() => {
//                             console.log(getValues());
//                             handleClose();
//                         }}
//                         variant="contained"
//                         color="primary"
//                         disabled={isSubmitDisabled}
//                     >
//                         Submit
//                     </Button>
//                 )}
//             </DialogActions>
//         </BootstrapDialog>
//     );
// };

// import React, { useState, useCallback } from 'react';
// import {
//     Button,
//     Box,
//     Dialog,
//     DialogContent,
//     DialogActions,
//     TextField,
//     Typography,
//     IconButton,
//     DialogTitle,
//     Stepper,
//     Step,
//     StepLabel,
//     Divider,
//     Card,
//     CardContent,
//     Grid,
//     Stack,
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import UploadIcon from '@mui/icons-material/Upload';
// import { styled } from '@mui/material/styles';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import KeycloakService from "../services/KeycloakService";

// const MySwal = withReactContent(Swal);

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     '& .MuiDialogContent-root': {
//         padding: theme.spacing(2),
//     },
//     '& .MuiDialogActions-root': {
//         padding: theme.spacing(1),
//     },
//     '& .MuiPaper-root': {
//         width: '100%',
//     },
// }));

// const initialApplicationDetails = {
//     partyName: 'Green Party',
//     leader: 'John Doe',
//     submittedDate: '2024-07-31',
//     partySymbol: '/path/to/party-symbol.png',
//     addressLine1: '123 Green Street',
//     addressLine2: 'Eco City',
//     postalCode: '12345',
//     contactNumber: '+1 234 567 8900',
//     email: 'contact@greenparty.com',
//     attachments: [
//       { type: 'Constitution', name: 'Constitution.pdf', link: '/path/to/constitution.pdf' },
//       { type: 'Logo', name: 'Logo.png', link: '/path/to/logo.png' },
//       { type: 'Membership List', name: 'Members.xlsx', link: '/path/to/members.xlsx' },
//       { type: 'Financial Statement', name: 'Finances.pdf', link: '/path/to/finances.pdf' },
//       { type: 'Leadership Structure', name: 'Leadership.pdf', link: '/path/to/leadership.pdf' }
//     ]
//   };

// export const PartyRegistrationApplication = ({ open, handleClose }) => {
//     const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
//     const [activeStep, setActiveStep] = useState(0);
//     const [isLeaderVerified, setIsLeaderVerified] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
//     const [leaderName, setLeaderName] = useState("");
//     const steps = ['Party Information', 'Documents'];

//     const validateLeaderNic = useCallback(async (nic) => {
//         if (!nic) return;
//         const updatedToken = KeycloakService.getToken();
//         setIsLoading(true);
//         try {
//             const response = await axios.get(`http://localhost:5003/api/voter/${nic}`, {
//                 headers: {
//                     Authorization: `Bearer ${updatedToken}`
//                 }
//             });
//             if ([200, 201].includes(response.status)) {
//                 setLeaderName(response.data.Name);
//                 setIsLeaderVerified(true);
//                 setIsSubmitDisabled(false);
//             } else {
//                 setLeaderName("");
//                 setIsLeaderVerified(false);
//                 setIsSubmitDisabled(true);
//             }
//         } catch (error) {
//             console.log(error);
//             setLeaderName("");
//             setIsLeaderVerified(false);
//             setIsSubmitDisabled(true);
//         } finally {
//             setIsLoading(false);
//         }
//     }, []);

//     const handleLeaderNicBlur = (e) => {
//         validateLeaderNic(e.target.value);
//     };

//     const handleNext = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     };

//     const handleBack = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     };

//     const onSubmit = (data) => {
//         console.log("onSubmit function called");
//         console.log(data);
        
//     }

//     const renderPartyInformationForm = () => (
//         <Box sx={{ padding: 2 }}>
//             <Stack spacing={2}>
//                 {/* <Typography variant="h6" color="textSecondary" gutterBottom>
//                     Party Information
//                 </Typography> */}
//                 <Divider />
//                 <TextField
//                     fullWidth
//                     label="Party Name"
//                     variant="outlined"
//                     {...register("partyName", { required: true })}
//                 />
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Abbreviation"
//                         variant="outlined"
//                         {...register("abbreviation", { required: true })}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Established Date"
//                         variant="outlined"
//                         type="date"
//                         InputLabelProps={{ shrink: true }}
//                         {...register("date", { required: true })}
//                     />
//                 </Stack>
//                 <TextField
//                     fullWidth
//                     label="Address line 1"
//                     variant="outlined"
//                     {...register("addressLine1", { required: true })}
//                 />
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Address line 2"
//                         variant="outlined"
//                         {...register("addressLine2")}
//                     />
//                     <TextField
//                         fullWidth
//                         label="City"
//                         variant="outlined"
//                         {...register("city", { required: true })}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Postal Code"
//                         variant="outlined"
//                         {...register("postalCode", { required: true })}
//                     />
//                 </Stack>
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Leader NIC"
//                         variant="outlined"
//                         {...register("leaderNic", { required: true })}
//                         error={!!errors.leaderNic}
//                         helperText={errors.leaderNic && 'Leader NIC is required'}
//                         onBlur={handleLeaderNicBlur}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Leader Name"
//                         variant="outlined"
//                         {...register("leaderName", { required: true })}
//                         disabled
//                         value={leaderName}
//                     />
//                 </Stack>
//                 {isLoading && <Typography>Verifying leader NIC...</Typography>} 
//                 {!isLoading && isLeaderVerified && <Typography color='success.main'>Leader identified successfully!</Typography>}
//                 {!isLoading && !isLeaderVerified && <Typography className='text-error'>Leader identification failed!</Typography>}
//             </Stack>
//         </Box>
//     );

//     const renderDocumentUploadForm = () => (
//         <CardContent>
//             {/* <Typography variant="h6" color="textSecondary" gutterBottom>
//                 Documents
//             </Typography> */}
//             <Divider sx={{ mb: 2 }} />
//             <Grid container spacing={2}>
//                 {initialApplicationDetails.attachments.map((attachment, index) => (
//                     <Grid item xs={12} sm={6} md={4} key={index}>
//                         <Card variant="outlined">
//                             <CardContent>
//                                 <Typography variant="subtitle1" gutterBottom>
//                                     {attachment.type}
//                                 </Typography>
//                                 <Box display="flex" alignItems="center" mb={1}>
//                                     <AttachFileIcon fontSize="small" />
//                                     <Typography variant="body2" noWrap sx={{ ml: 1 }}>
//                                         {attachment.name}
//                                     </Typography>
//                                 </Box>
//                                 <Button
//                                     variant="contained"
//                                     startIcon={<UploadIcon />}
//                                     fullWidth
//                                 >
//                                     Update
//                                 </Button>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </CardContent>
//     );

//     return (
//         <BootstrapDialog onClose={handleClose} open={open}>
//             <DialogTitle sx={{ m: 0, p: 2 }}>Update Party Information</DialogTitle>
//             <IconButton
//                 aria-label="close"
//                 onClick={handleClose}
//                 sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
//             >
//                 <CloseIcon />
//             </IconButton>
//             <DialogContent dividers>
//                 <Stepper activeStep={activeStep} alternativeLabel>
//                     {steps.map((label) => (
//                         <Step key={label}>
//                             <StepLabel>{label}</StepLabel>
//                         </Step>
//                     ))}
//                 </Stepper>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     {activeStep === 0 ? renderPartyInformationForm() : renderDocumentUploadForm()}
//                 </form>
//             </DialogContent>
//             <DialogActions>
//                 {activeStep > 0 && (
//                     <Button onClick={handleBack}>
//                         Back
//                     </Button>
//                 )}
//                 {activeStep < steps.length - 1 ? (
//                     <Button onClick={handleNext} variant="contained">
//                         Next
//                     </Button>
//                 ) : (
//                     <Button
//                         onClick={() => {
//                             console.log(getValues());
//                             handleClose();
//                         }}
//                         variant="contained"
//                         color="primary"
//                         disabled={isSubmitDisabled}
//                     >
//                         Submit
//                     </Button>
//                 )}
//             </DialogActions>
//         </BootstrapDialog>
//     );
// };

// import React, { useState, useCallback } from 'react';
// import {
//     Button,
//     Box,
//     Dialog,
//     DialogContent,
//     DialogActions,
//     TextField,
//     Typography,
//     IconButton,
//     DialogTitle,
//     Stepper,
//     Step,
//     StepLabel,
//     Divider,
//     Card,
//     CardContent,
//     Grid,
//     Stack,
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import UploadIcon from '@mui/icons-material/Upload';
// import { styled } from '@mui/material/styles';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import KeycloakService from "../services/KeycloakService";

// const MySwal = withReactContent(Swal);

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     '& .MuiDialogContent-root': {
//         padding: theme.spacing(2),
//     },
//     '& .MuiDialogActions-root': {
//         padding: theme.spacing(1),
//     },
//     '& .MuiPaper-root': {
//         width: '100%',
//     },
// }));

// const initialApplicationDetails = {
//     partyName: 'Green Party',
//     leader: 'John Doe',
//     submittedDate: '2024-07-31',
//     partySymbol: '/path/to/party-symbol.png',
//     addressLine1: '123 Green Street',
//     addressLine2: 'Eco City',
//     postalCode: '12345',
//     contactNumber: '+1 234 567 8900',
//     email: 'contact@greenparty.com',
//     attachments: [
//       { type: 'Constitution', name: 'Constitution.pdf', link: '/path/to/constitution.pdf' },
//       { type: 'Logo', name: 'Logo.png', link: '/path/to/logo.png' },
//       { type: 'Membership List', name: 'Members.xlsx', link: '/path/to/members.xlsx' },
//       { type: 'Financial Statement', name: 'Finances.pdf', link: '/path/to/finances.pdf' },
//       { type: 'Leadership Structure', name: 'Leadership.pdf', link: '/path/to/leadership.pdf' }
//     ]
//   };

// export const PartyRegistrationApplication = ({ open, handleClose }) => {
//     const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
//     const [activeStep, setActiveStep] = useState(0);
//     const [isLeaderVerified, setIsLeaderVerified] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
//     const [leaderName, setLeaderName] = useState("");
//     const steps = ['Party Information', 'Documents'];

//     const validateLeaderNic = useCallback(async (nic) => {
//         if (!nic) return;
//         const updatedToken = KeycloakService.getToken();
//         setIsLoading(true);
//         try {
//             const response = await axios.get(`http://localhost:5003/api/voter/${nic}`, {
//                 headers: {
//                     Authorization: `Bearer ${updatedToken}`
//                 }
//             });
//             if ([200, 201].includes(response.status)) {
//                 setLeaderName(response.data.Name);
//                 setIsLeaderVerified(true);
//                 setIsSubmitDisabled(false);
//             } else {
//                 setLeaderName("");
//                 setIsLeaderVerified(false);
//                 setIsSubmitDisabled(true);
//             }
//         } catch (error) {
//             console.log(error);
//             setLeaderName("");
//             setIsLeaderVerified(false);
//             setIsSubmitDisabled(true);
//         } finally {
//             setIsLoading(false);
//         }
//     }, []);

//     const handleLeaderNicBlur = (e) => {
//         validateLeaderNic(e.target.value);
//     };

//     const handleNext = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     };

//     const handleBack = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     };

//     const onSubmit = (data) => {
//         console.log("onSubmit function called");
//         console.log(data);
        
//     }

//     const renderPartyInformationForm = () => (
//         <Box sx={{ padding: 2 }}>
//             <Stack spacing={2}>
//                 {/* <Typography variant="h6" color="textSecondary" gutterBottom>
//                     Party Information
//                 </Typography> */}
//                 <Divider />
//                 <TextField
//                     fullWidth
//                     label="Party Name"
//                     variant="outlined"
//                     {...register("partyName", { required: true })}
//                 />
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Abbreviation"
//                         variant="outlined"
//                         {...register("abbreviation", { required: true })}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Established Date"
//                         variant="outlined"
//                         type="date"
//                         InputLabelProps={{ shrink: true }}
//                         {...register("date", { required: true })}
//                     />
//                 </Stack>
//                 <TextField
//                     fullWidth
//                     label="Address line 1"
//                     variant="outlined"
//                     {...register("addressLine1", { required: true })}
//                 />
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Address line 2"
//                         variant="outlined"
//                         {...register("addressLine2")}
//                     />
//                     <TextField
//                         fullWidth
//                         label="City"
//                         variant="outlined"
//                         {...register("city", { required: true })}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Postal Code"
//                         variant="outlined"
//                         {...register("postalCode", { required: true })}
//                     />
//                 </Stack>
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Leader NIC"
//                         variant="outlined"
//                         {...register("leaderNic", { required: true })}
//                         error={!!errors.leaderNic}
//                         helperText={errors.leaderNic && 'Leader NIC is required'}
//                         onBlur={handleLeaderNicBlur}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Leader Name"
//                         variant="outlined"
//                         {...register("leaderName", { required: true })}
//                         disabled
//                         value={leaderName}
//                     />
//                 </Stack>
//                 {isLoading && <Typography>Verifying leader NIC...</Typography>} 
//                 {!isLoading && isLeaderVerified && <Typography color='success.main'>Leader identified successfully!</Typography>}
//                 {!isLoading && !isLeaderVerified && <Typography className='text-error'>Leader identification failed!</Typography>}
//             </Stack>
//         </Box>
//     );

//     const renderDocumentUploadForm = () => (
//         <CardContent>
//             {/* <Typography variant="h6" color="textSecondary" gutterBottom>
//                 Documents
//             </Typography> */}
//             <Divider sx={{ mb: 2 }} />
//             <Grid container spacing={2}>
//                 {initialApplicationDetails.attachments.map((attachment, index) => (
//                     <Grid item xs={12} sm={6} md={4} key={index}>
//                         <Card variant="outlined">
//                             <CardContent>
//                                 <Typography variant="subtitle1" gutterBottom>
//                                     {attachment.type}
//                                 </Typography>
//                                 <Box display="flex" alignItems="center" mb={1}>
//                                     <AttachFileIcon fontSize="small" />
//                                     <Typography variant="body2" noWrap sx={{ ml: 1 }}>
//                                         {attachment.name}
//                                     </Typography>
//                                 </Box>
//                                 <Button
//                                     variant="contained"
//                                     startIcon={<UploadIcon />}
//                                     fullWidth
//                                 >
//                                     Update
//                                 </Button>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </CardContent>
//     );

//     return (
//         <BootstrapDialog onClose={handleClose} open={open}>
//             <DialogTitle sx={{ m: 0, p: 2 }}>Update Party Information</DialogTitle>
//             <IconButton
//                 aria-label="close"
//                 onClick={handleClose}
//                 sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
//             >
//                 <CloseIcon />
//             </IconButton>
//             <DialogContent dividers>
//                 <Stepper activeStep={activeStep} alternativeLabel>
//                     {steps.map((label) => (
//                         <Step key={label}>
//                             <StepLabel>{label}</StepLabel>
//                         </Step>
//                     ))}
//                 </Stepper>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     {activeStep === 0 ? renderPartyInformationForm() : renderDocumentUploadForm()}
//                 </form>
//             </DialogContent>
//             <DialogActions>
//                 {activeStep > 0 && (
//                     <Button onClick={handleBack}>
//                         Back
//                     </Button>
//                 )}
//                 {activeStep < steps.length - 1 ? (
//                     <Button onClick={handleNext} variant="contained">
//                         Next
//                     </Button>
//                 ) : (
//                     <Button
//                         onClick={() => {
//                             console.log(getValues());
//                             handleClose();
//                         }}
//                         variant="contained"
//                         color="primary"
//                         disabled={isSubmitDisabled}
//                     >
//                         Submit
//                     </Button>
//                 )}
//             </DialogActions>
//         </BootstrapDialog>
//     );
// };
// import React, { useState, useCallback } from 'react';
// import {
//     Button,
//     Box,
//     Dialog,
//     DialogContent,
//     DialogActions,
//     TextField,
//     Typography,
//     IconButton,
//     DialogTitle,
//     Stepper,
//     Step,
//     StepLabel,
//     Divider,
//     Card,
//     CardContent,
//     Grid,
//     Stack,
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import UploadIcon from '@mui/icons-material/Upload';
// import { styled } from '@mui/material/styles';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import KeycloakService from "../services/KeycloakService";

// const MySwal = withReactContent(Swal);

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     '& .MuiDialogContent-root': {
//         padding: theme.spacing(2),
//     },
//     '& .MuiDialogActions-root': {
//         padding: theme.spacing(1),
//     },
//     '& .MuiPaper-root': {
//         width: '100%',
//     },
// }));

// const initialApplicationDetails = {
//     partyName: 'Green Party',
//     leader: 'John Doe',
//     submittedDate: '2024-07-31',
//     partySymbol: '/path/to/party-symbol.png',
//     addressLine1: '123 Green Street',
//     addressLine2: 'Eco City',
//     postalCode: '12345',
//     contactNumber: '+1 234 567 8900',
//     email: 'contact@greenparty.com',
//     attachments: [
//       { type: 'Constitution', name: 'Constitution.pdf', link: '/path/to/constitution.pdf' },
//       { type: 'Logo', name: 'Logo.png', link: '/path/to/logo.png' },
//       { type: 'Membership List', name: 'Members.xlsx', link: '/path/to/members.xlsx' },
//       { type: 'Financial Statement', name: 'Finances.pdf', link: '/path/to/finances.pdf' },
//       { type: 'Leadership Structure', name: 'Leadership.pdf', link: '/path/to/leadership.pdf' }
//     ]
//   };

// export const PartyRegistrationApplication = ({ open, handleClose }) => {
//     const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
//     const [activeStep, setActiveStep] = useState(0);
//     const [isLeaderVerified, setIsLeaderVerified] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
//     const [leaderName, setLeaderName] = useState("");
//     const steps = ['Party Information', 'Documents'];

//     const validateLeaderNic = useCallback(async (nic) => {
//         if (!nic) return;
//         const updatedToken = KeycloakService.getToken();
//         setIsLoading(true);
//         try {
//             const response = await axios.get(`http://localhost:5003/api/voter/${nic}`, {
//                 headers: {
//                     Authorization: `Bearer ${updatedToken}`
//                 }
//             });
//             if ([200, 201].includes(response.status)) {
//                 setLeaderName(response.data.Name);
//                 setIsLeaderVerified(true);
//                 setIsSubmitDisabled(false);
//             } else {
//                 setLeaderName("");
//                 setIsLeaderVerified(false);
//                 setIsSubmitDisabled(true);
//             }
//         } catch (error) {
//             console.log(error);
//             setLeaderName("");
//             setIsLeaderVerified(false);
//             setIsSubmitDisabled(true);
//         } finally {
//             setIsLoading(false);
//         }
//     }, []);

//     const handleLeaderNicBlur = (e) => {
//         validateLeaderNic(e.target.value);
//     };

//     const handleNext = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     };

//     const handleBack = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     };

//     const onSubmit = (data) => {
//         console.log("onSubmit function called");
//         console.log(data);
        
//     }

//     const renderPartyInformationForm = () => (
//         <Box sx={{ padding: 2 }}>
//             <Stack spacing={2}>
//                 {/* <Typography variant="h6" color="textSecondary" gutterBottom>
//                     Party Information
//                 </Typography> */}
//                 <Divider />
//                 <TextField
//                     fullWidth
//                     label="Party Name"
//                     variant="outlined"
//                     {...register("partyName", { required: true })}
//                 />
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Abbreviation"
//                         variant="outlined"
//                         {...register("abbreviation", { required: true })}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Established Date"
//                         variant="outlined"
//                         type="date"
//                         InputLabelProps={{ shrink: true }}
//                         {...register("date", { required: true })}
//                     />
//                 </Stack>
//                 <TextField
//                     fullWidth
//                     label="Address line 1"
//                     variant="outlined"
//                     {...register("addressLine1", { required: true })}
//                 />
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Address line 2"
//                         variant="outlined"
//                         {...register("addressLine2")}
//                     />
//                     <TextField
//                         fullWidth
//                         label="City"
//                         variant="outlined"
//                         {...register("city", { required: true })}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Postal Code"
//                         variant="outlined"
//                         {...register("postalCode", { required: true })}
//                     />
//                 </Stack>
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Leader NIC"
//                         variant="outlined"
//                         {...register("leaderNic", { required: true })}
//                         error={!!errors.leaderNic}
//                         helperText={errors.leaderNic && 'Leader NIC is required'}
//                         onBlur={handleLeaderNicBlur}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Leader Name"
//                         variant="outlined"
//                         {...register("leaderName", { required: true })}
//                         disabled
//                         value={leaderName}
//                     />
//                 </Stack>
//                 {isLoading && <Typography>Verifying leader NIC...</Typography>} 
//                 {!isLoading && isLeaderVerified && <Typography color='success.main'>Leader identified successfully!</Typography>}
//                 {!isLoading && !isLeaderVerified && <Typography className='text-error'>Leader identification failed!</Typography>}
//             </Stack>
//         </Box>
//     );

//     const renderDocumentUploadForm = () => (
//         <CardContent>
//             {/* <Typography variant="h6" color="textSecondary" gutterBottom>
//                 Documents
//             </Typography> */}
//             <Divider sx={{ mb: 2 }} />
//             <Grid container spacing={2}>
//                 {initialApplicationDetails.attachments.map((attachment, index) => (
//                     <Grid item xs={12} sm={6} md={4} key={index}>
//                         <Card variant="outlined">
//                             <CardContent>
//                                 <Typography variant="subtitle1" gutterBottom>
//                                     {attachment.type}
//                                 </Typography>
//                                 <Box display="flex" alignItems="center" mb={1}>
//                                     <AttachFileIcon fontSize="small" />
//                                     <Typography variant="body2" noWrap sx={{ ml: 1 }}>
//                                         {attachment.name}
//                                     </Typography>
//                                 </Box>
//                                 <Button
//                                     variant="contained"
//                                     startIcon={<UploadIcon />}
//                                     fullWidth
//                                 >
//                                     Update
//                                 </Button>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </CardContent>
//     );

//     return (
//         <BootstrapDialog onClose={handleClose} open={open}>
//             <DialogTitle sx={{ m: 0, p: 2 }}>Update Party Information</DialogTitle>
//             <IconButton
//                 aria-label="close"
//                 onClick={handleClose}
//                 sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
//             >
//                 <CloseIcon />
//             </IconButton>
//             <DialogContent dividers>
//                 <Stepper activeStep={activeStep} alternativeLabel>
//                     {steps.map((label) => (
//                         <Step key={label}>
//                             <StepLabel>{label}</StepLabel>
//                         </Step>
//                     ))}
//                 </Stepper>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     {activeStep === 0 ? renderPartyInformationForm() : renderDocumentUploadForm()}
//                 </form>
//             </DialogContent>
//             <DialogActions>
//                 {activeStep > 0 && (
//                     <Button onClick={handleBack}>
//                         Back
//                     </Button>
//                 )}
//                 {activeStep < steps.length - 1 ? (
//                     <Button onClick={handleNext} variant="contained">
//                         Next
//                     </Button>
//                 ) : (
//                     <Button
//                         onClick={() => {
//                             console.log(getValues());
//                             handleClose();
//                         }}
//                         variant="contained"
//                         color="primary"
//                         disabled={isSubmitDisabled}
//                     >
//                         Submit
//                     </Button>
//                 )}
//             </DialogActions>
//         </BootstrapDialog>
//     );
// };

// import React, { useState, useCallback } from 'react';
// import {
//     Button,
//     Box,
//     Dialog,
//     DialogContent,
//     DialogActions,
//     TextField,
//     Typography,
//     IconButton,
//     DialogTitle,
//     Stepper,
//     Step,
//     StepLabel,
//     Divider,
//     Card,
//     CardContent,
//     Grid,
//     Stack,
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import UploadIcon from '@mui/icons-material/Upload';
// import { styled } from '@mui/material/styles';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import KeycloakService from "../services/KeycloakService";

// const MySwal = withReactContent(Swal);

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     '& .MuiDialogContent-root': {
//         padding: theme.spacing(2),
//     },
//     '& .MuiDialogActions-root': {
//         padding: theme.spacing(1),
//     },
//     '& .MuiPaper-root': {
//         width: '100%',
//     },
// }));

// const initialApplicationDetails = {
//     partyName: 'Green Party',
//     leader: 'John Doe',
//     submittedDate: '2024-07-31',
//     partySymbol: '/path/to/party-symbol.png',
//     addressLine1: '123 Green Street',
//     addressLine2: 'Eco City',
//     postalCode: '12345',
//     contactNumber: '+1 234 567 8900',
//     email: 'contact@greenparty.com',
//     attachments: [
//       { type: 'Constitution', name: 'Constitution.pdf', link: '/path/to/constitution.pdf' },
//       { type: 'Logo', name: 'Logo.png', link: '/path/to/logo.png' },
//       { type: 'Membership List', name: 'Members.xlsx', link: '/path/to/members.xlsx' },
//       { type: 'Financial Statement', name: 'Finances.pdf', link: '/path/to/finances.pdf' },
//       { type: 'Leadership Structure', name: 'Leadership.pdf', link: '/path/to/leadership.pdf' }
//     ]
//   };

// export const PartyRegistrationApplication = ({ open, handleClose }) => {
//     const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
//     const [activeStep, setActiveStep] = useState(0);
//     const [isLeaderVerified, setIsLeaderVerified] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
//     const [leaderName, setLeaderName] = useState("");
//     const steps = ['Party Information', 'Documents'];

//     const validateLeaderNic = useCallback(async (nic) => {
//         if (!nic) return;
//         const updatedToken = KeycloakService.getToken();
//         setIsLoading(true);
//         try {
//             const response = await axios.get(`http://localhost:5003/api/voter/${nic}`, {
//                 headers: {
//                     Authorization: `Bearer ${updatedToken}`
//                 }
//             });
//             if ([200, 201].includes(response.status)) {
//                 setLeaderName(response.data.Name);
//                 setIsLeaderVerified(true);
//                 setIsSubmitDisabled(false);
//             } else {
//                 setLeaderName("");
//                 setIsLeaderVerified(false);
//                 setIsSubmitDisabled(true);
//             }
//         } catch (error) {
//             console.log(error);
//             setLeaderName("");
//             setIsLeaderVerified(false);
//             setIsSubmitDisabled(true);
//         } finally {
//             setIsLoading(false);
//         }
//     }, []);

//     const handleLeaderNicBlur = (e) => {
//         validateLeaderNic(e.target.value);
//     };

//     const handleNext = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     };

//     const handleBack = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     };

//     const onSubmit = (data) => {
//         console.log("onSubmit function called");
//         console.log(data);
        
//     }

//     const renderPartyInformationForm = () => (
//         <Box sx={{ padding: 2 }}>
//             <Stack spacing={2}>
//                 {/* <Typography variant="h6" color="textSecondary" gutterBottom>
//                     Party Information
//                 </Typography> */}
//                 <Divider />
//                 <TextField
//                     fullWidth
//                     label="Party Name"
//                     variant="outlined"
//                     {...register("partyName", { required: true })}
//                 />
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Abbreviation"
//                         variant="outlined"
//                         {...register("abbreviation", { required: true })}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Established Date"
//                         variant="outlined"
//                         type="date"
//                         InputLabelProps={{ shrink: true }}
//                         {...register("date", { required: true })}
//                     />
//                 </Stack>
//                 <TextField
//                     fullWidth
//                     label="Address line 1"
//                     variant="outlined"
//                     {...register("addressLine1", { required: true })}
//                 />
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Address line 2"
//                         variant="outlined"
//                         {...register("addressLine2")}
//                     />
//                     <TextField
//                         fullWidth
//                         label="City"
//                         variant="outlined"
//                         {...register("city", { required: true })}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Postal Code"
//                         variant="outlined"
//                         {...register("postalCode", { required: true })}
//                     />
//                 </Stack>
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Leader NIC"
//                         variant="outlined"
//                         {...register("leaderNic", { required: true })}
//                         error={!!errors.leaderNic}
//                         helperText={errors.leaderNic && 'Leader NIC is required'}
//                         onBlur={handleLeaderNicBlur}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Leader Name"
//                         variant="outlined"
//                         {...register("leaderName", { required: true })}
//                         disabled
//                         value={leaderName}
//                     />
//                 </Stack>
//                 {isLoading && <Typography>Verifying leader NIC...</Typography>} 
//                 {!isLoading && isLeaderVerified && <Typography color='success.main'>Leader identified successfully!</Typography>}
//                 {!isLoading && !isLeaderVerified && <Typography className='text-error'>Leader identification failed!</Typography>}
//             </Stack>
//         </Box>
//     );

//     const renderDocumentUploadForm = () => (
//         <CardContent>
//             {/* <Typography variant="h6" color="textSecondary" gutterBottom>
//                 Documents
//             </Typography> */}
//             <Divider sx={{ mb: 2 }} />
//             <Grid container spacing={2}>
//                 {initialApplicationDetails.attachments.map((attachment, index) => (
//                     <Grid item xs={12} sm={6} md={4} key={index}>
//                         <Card variant="outlined">
//                             <CardContent>
//                                 <Typography variant="subtitle1" gutterBottom>
//                                     {attachment.type}
//                                 </Typography>
//                                 <Box display="flex" alignItems="center" mb={1}>
//                                     <AttachFileIcon fontSize="small" />
//                                     <Typography variant="body2" noWrap sx={{ ml: 1 }}>
//                                         {attachment.name}
//                                     </Typography>
//                                 </Box>
//                                 <Button
//                                     variant="contained"
//                                     startIcon={<UploadIcon />}
//                                     fullWidth
//                                 >
//                                     Update
//                                 </Button>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </CardContent>
//     );

//     return (
//         <BootstrapDialog onClose={handleClose} open={open}>
//             <DialogTitle sx={{ m: 0, p: 2 }}>Update Party Information</DialogTitle>
//             <IconButton
//                 aria-label="close"
//                 onClick={handleClose}
//                 sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
//             >
//                 <CloseIcon />
//             </IconButton>
//             <DialogContent dividers>
//                 <Stepper activeStep={activeStep} alternativeLabel>
//                     {steps.map((label) => (
//                         <Step key={label}>
//                             <StepLabel>{label}</StepLabel>
//                         </Step>
//                     ))}
//                 </Stepper>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     {activeStep === 0 ? renderPartyInformationForm() : renderDocumentUploadForm()}
//                 </form>
//             </DialogContent>
//             <DialogActions>
//                 {activeStep > 0 && (
//                     <Button onClick={handleBack}>
//                         Back
//                     </Button>
//                 )}
//                 {activeStep < steps.length - 1 ? (
//                     <Button onClick={handleNext} variant="contained">
//                         Next
//                     </Button>
//                 ) : (
//                     <Button
//                         onClick={() => {
//                             console.log(getValues());
//                             handleClose();
//                         }}
//                         variant="contained"
//                         color="primary"
//                         disabled={isSubmitDisabled}
//                     >
//                         Submit
//                     </Button>
//                 )}
//             </DialogActions>
//         </BootstrapDialog>
//     );
// };

// import React, { useState, useCallback } from 'react';
// import {
//     Button,
//     Box,
//     Dialog,
//     DialogContent,
//     DialogActions,
//     TextField,
//     Typography,
//     IconButton,
//     DialogTitle,
//     Stepper,
//     Step,
//     StepLabel,
//     Divider,
//     Card,
//     CardContent,
//     Grid,
//     Stack,
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import UploadIcon from '@mui/icons-material/Upload';
// import { styled } from '@mui/material/styles';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import KeycloakService from "../services/KeycloakService";

// const MySwal = withReactContent(Swal);

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     '& .MuiDialogContent-root': {
//         padding: theme.spacing(2),
//     },
//     '& .MuiDialogActions-root': {
//         padding: theme.spacing(1),
//     },
//     '& .MuiPaper-root': {
//         width: '100%',
//     },
// }));

// const initialApplicationDetails = {
//     partyName: 'Green Party',
//     leader: 'John Doe',
//     submittedDate: '2024-07-31',
//     partySymbol: '/path/to/party-symbol.png',
//     addressLine1: '123 Green Street',
//     addressLine2: 'Eco City',
//     postalCode: '12345',
//     contactNumber: '+1 234 567 8900',
//     email: 'contact@greenparty.com',
//     attachments: [
//       { type: 'Constitution', name: 'Constitution.pdf', link: '/path/to/constitution.pdf' },
//       { type: 'Logo', name: 'Logo.png', link: '/path/to/logo.png' },
//       { type: 'Membership List', name: 'Members.xlsx', link: '/path/to/members.xlsx' },
//       { type: 'Financial Statement', name: 'Finances.pdf', link: '/path/to/finances.pdf' },
//       { type: 'Leadership Structure', name: 'Leadership.pdf', link: '/path/to/leadership.pdf' }
//     ]
//   };

// export const PartyRegistrationApplication = ({ open, handleClose }) => {
//     const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
//     const [activeStep, setActiveStep] = useState(0);
//     const [isLeaderVerified, setIsLeaderVerified] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
//     const [leaderName, setLeaderName] = useState("");
//     const steps = ['Party Information', 'Documents'];

//     const validateLeaderNic = useCallback(async (nic) => {
//         if (!nic) return;
//         const updatedToken = KeycloakService.getToken();
//         setIsLoading(true);
//         try {
//             const response = await axios.get(`http://localhost:5003/api/voter/${nic}`, {
//                 headers: {
//                     Authorization: `Bearer ${updatedToken}`
//                 }
//             });
//             if ([200, 201].includes(response.status)) {
//                 setLeaderName(response.data.Name);
//                 setIsLeaderVerified(true);
//                 setIsSubmitDisabled(false);
//             } else {
//                 setLeaderName("");
//                 setIsLeaderVerified(false);
//                 setIsSubmitDisabled(true);
//             }
//         } catch (error) {
//             console.log(error);
//             setLeaderName("");
//             setIsLeaderVerified(false);
//             setIsSubmitDisabled(true);
//         } finally {
//             setIsLoading(false);
//         }
//     }, []);

//     const handleLeaderNicBlur = (e) => {
//         validateLeaderNic(e.target.value);
//     };

//     const handleNext = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     };

//     const handleBack = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     };

//     const onSubmit = (data) => {
//         console.log("onSubmit function called");
//         console.log(data);
        
//     }

//     const renderPartyInformationForm = () => (
//         <Box sx={{ padding: 2 }}>
//             <Stack spacing={2}>
//                 {/* <Typography variant="h6" color="textSecondary" gutterBottom>
//                     Party Information
//                 </Typography> */}
//                 <Divider />
//                 <TextField
//                     fullWidth
//                     label="Party Name"
//                     variant="outlined"
//                     {...register("partyName", { required: true })}
//                 />
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Abbreviation"
//                         variant="outlined"
//                         {...register("abbreviation", { required: true })}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Established Date"
//                         variant="outlined"
//                         type="date"
//                         InputLabelProps={{ shrink: true }}
//                         {...register("date", { required: true })}
//                     />
//                 </Stack>
//                 <TextField
//                     fullWidth
//                     label="Address line 1"
//                     variant="outlined"
//                     {...register("addressLine1", { required: true })}
//                 />
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Address line 2"
//                         variant="outlined"
//                         {...register("addressLine2")}
//                     />
//                     <TextField
//                         fullWidth
//                         label="City"
//                         variant="outlined"
//                         {...register("city", { required: true })}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Postal Code"
//                         variant="outlined"
//                         {...register("postalCode", { required: true })}
//                     />
//                 </Stack>
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Leader NIC"
//                         variant="outlined"
//                         {...register("leaderNic", { required: true })}
//                         error={!!errors.leaderNic}
//                         helperText={errors.leaderNic && 'Leader NIC is required'}
//                         onBlur={handleLeaderNicBlur}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Leader Name"
//                         variant="outlined"
//                         {...register("leaderName", { required: true })}
//                         disabled
//                         value={leaderName}
//                     />
//                 </Stack>
//                 {isLoading && <Typography>Verifying leader NIC...</Typography>} 
//                 {!isLoading && isLeaderVerified && <Typography color='success.main'>Leader identified successfully!</Typography>}
//                 {!isLoading && !isLeaderVerified && <Typography className='text-error'>Leader identification failed!</Typography>}
//             </Stack>
//         </Box>
//     );

//     const renderDocumentUploadForm = () => (
//         <CardContent>
//             {/* <Typography variant="h6" color="textSecondary" gutterBottom>
//                 Documents
//             </Typography> */}
//             <Divider sx={{ mb: 2 }} />
//             <Grid container spacing={2}>
//                 {initialApplicationDetails.attachments.map((attachment, index) => (
//                     <Grid item xs={12} sm={6} md={4} key={index}>
//                         <Card variant="outlined">
//                             <CardContent>
//                                 <Typography variant="subtitle1" gutterBottom>
//                                     {attachment.type}
//                                 </Typography>
//                                 <Box display="flex" alignItems="center" mb={1}>
//                                     <AttachFileIcon fontSize="small" />
//                                     <Typography variant="body2" noWrap sx={{ ml: 1 }}>
//                                         {attachment.name}
//                                     </Typography>
//                                 </Box>
//                                 <Button
//                                     variant="contained"
//                                     startIcon={<UploadIcon />}
//                                     fullWidth
//                                 >
//                                     Update
//                                 </Button>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </CardContent>
//     );

//     return (
//         <BootstrapDialog onClose={handleClose} open={open}>
//             <DialogTitle sx={{ m: 0, p: 2 }}>Update Party Information</DialogTitle>
//             <IconButton
//                 aria-label="close"
//                 onClick={handleClose}
//                 sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
//             >
//                 <CloseIcon />
//             </IconButton>
//             <DialogContent dividers>
//                 <Stepper activeStep={activeStep} alternativeLabel>
//                     {steps.map((label) => (
//                         <Step key={label}>
//                             <StepLabel>{label}</StepLabel>
//                         </Step>
//                     ))}
//                 </Stepper>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     {activeStep === 0 ? renderPartyInformationForm() : renderDocumentUploadForm()}
//                 </form>
//             </DialogContent>
//             <DialogActions>
//                 {activeStep > 0 && (
//                     <Button onClick={handleBack}>
//                         Back
//                     </Button>
//                 )}
//                 {activeStep < steps.length - 1 ? (
//                     <Button onClick={handleNext} variant="contained">
//                         Next
//                     </Button>
//                 ) : (
//                     <Button
//                         onClick={() => {
//                             console.log(getValues());
//                             handleClose();
//                         }}
//                         variant="contained"
//                         color="primary"
//                         disabled={isSubmitDisabled}
//                     >
//                         Submit
//                     </Button>
//                 )}
//             </DialogActions>
//         </BootstrapDialog>
//     );
// };

// import React, { useState, useCallback } from 'react';
// import {
//     Button,
//     Box,
//     Dialog,
//     DialogContent,
//     DialogActions,
//     TextField,
//     Typography,
//     IconButton,
//     DialogTitle,
//     Stepper,
//     Step,
//     StepLabel,
//     Divider,
//     Card,
//     CardContent,
//     Grid,
//     Stack,
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import UploadIcon from '@mui/icons-material/Upload';
// import { styled } from '@mui/material/styles';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import KeycloakService from "../services/KeycloakService";

// const MySwal = withReactContent(Swal);

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     '& .MuiDialogContent-root': {
//         padding: theme.spacing(2),
//     },
//     '& .MuiDialogActions-root': {
//         padding: theme.spacing(1),
//     },
//     '& .MuiPaper-root': {
//         width: '100%',
//     },
// }));

// const initialApplicationDetails = {
//     partyName: 'Green Party',
//     leader: 'John Doe',
//     submittedDate: '2024-07-31',
//     partySymbol: '/path/to/party-symbol.png',
//     addressLine1: '123 Green Street',
//     addressLine2: 'Eco City',
//     postalCode: '12345',
//     contactNumber: '+1 234 567 8900',
//     email: 'contact@greenparty.com',
//     attachments: [
//       { type: 'Constitution', name: 'Constitution.pdf', link: '/path/to/constitution.pdf' },
//       { type: 'Logo', name: 'Logo.png', link: '/path/to/logo.png' },
//       { type: 'Membership List', name: 'Members.xlsx', link: '/path/to/members.xlsx' },
//       { type: 'Financial Statement', name: 'Finances.pdf', link: '/path/to/finances.pdf' },
//       { type: 'Leadership Structure', name: 'Leadership.pdf', link: '/path/to/leadership.pdf' }
//     ]
//   };

// export const PartyRegistrationApplication = ({ open, handleClose }) => {
//     const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
//     const [activeStep, setActiveStep] = useState(0);
//     const [isLeaderVerified, setIsLeaderVerified] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
//     const [leaderName, setLeaderName] = useState("");
//     const steps = ['Party Information', 'Documents'];

//     const validateLeaderNic = useCallback(async (nic) => {
//         if (!nic) return;
//         const updatedToken = KeycloakService.getToken();
//         setIsLoading(true);
//         try {
//             const response = await axios.get(`http://localhost:5003/api/voter/${nic}`, {
//                 headers: {
//                     Authorization: `Bearer ${updatedToken}`
//                 }
//             });
//             if ([200, 201].includes(response.status)) {
//                 setLeaderName(response.data.Name);
//                 setIsLeaderVerified(true);
//                 setIsSubmitDisabled(false);
//             } else {
//                 setLeaderName("");
//                 setIsLeaderVerified(false);
//                 setIsSubmitDisabled(true);
//             }
//         } catch (error) {
//             console.log(error);
//             setLeaderName("");
//             setIsLeaderVerified(false);
//             setIsSubmitDisabled(true);
//         } finally {
//             setIsLoading(false);
//         }
//     }, []);

//     const handleLeaderNicBlur = (e) => {
//         validateLeaderNic(e.target.value);
//     };

//     const handleNext = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     };

//     const handleBack = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     };

//     const onSubmit = (data) => {
//         console.log("onSubmit function called");
//         console.log(data);
        
//     }

//     const renderPartyInformationForm = () => (
//         <Box sx={{ padding: 2 }}>
//             <Stack spacing={2}>
//                 {/* <Typography variant="h6" color="textSecondary" gutterBottom>
//                     Party Information
//                 </Typography> */}
//                 <Divider />
//                 <TextField
//                     fullWidth
//                     label="Party Name"
//                     variant="outlined"
//                     {...register("partyName", { required: true })}
//                 />
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Abbreviation"
//                         variant="outlined"
//                         {...register("abbreviation", { required: true })}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Established Date"
//                         variant="outlined"
//                         type="date"
//                         InputLabelProps={{ shrink: true }}
//                         {...register("date", { required: true })}
//                     />
//                 </Stack>
//                 <TextField
//                     fullWidth
//                     label="Address line 1"
//                     variant="outlined"
//                     {...register("addressLine1", { required: true })}
//                 />
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Address line 2"
//                         variant="outlined"
//                         {...register("addressLine2")}
//                     />
//                     <TextField
//                         fullWidth
//                         label="City"
//                         variant="outlined"
//                         {...register("city", { required: true })}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Postal Code"
//                         variant="outlined"
//                         {...register("postalCode", { required: true })}
//                     />
//                 </Stack>
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Leader NIC"
//                         variant="outlined"
//                         {...register("leaderNic", { required: true })}
//                         error={!!errors.leaderNic}
//                         helperText={errors.leaderNic && 'Leader NIC is required'}
//                         onBlur={handleLeaderNicBlur}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Leader Name"
//                         variant="outlined"
//                         {...register("leaderName", { required: true })}
//                         disabled
//                         value={leaderName}
//                     />
//                 </Stack>
//                 {isLoading && <Typography>Verifying leader NIC...</Typography>} 
//                 {!isLoading && isLeaderVerified && <Typography color='success.main'>Leader identified successfully!</Typography>}
//                 {!isLoading && !isLeaderVerified && <Typography className='text-error'>Leader identification failed!</Typography>}
//             </Stack>
//         </Box>
//     );

//     const renderDocumentUploadForm = () => (
//         <CardContent>
//             {/* <Typography variant="h6" color="textSecondary" gutterBottom>
//                 Documents
//             </Typography> */}
//             <Divider sx={{ mb: 2 }} />
//             <Grid container spacing={2}>
//                 {initialApplicationDetails.attachments.map((attachment, index) => (
//                     <Grid item xs={12} sm={6} md={4} key={index}>
//                         <Card variant="outlined">
//                             <CardContent>
//                                 <Typography variant="subtitle1" gutterBottom>
//                                     {attachment.type}
//                                 </Typography>
//                                 <Box display="flex" alignItems="center" mb={1}>
//                                     <AttachFileIcon fontSize="small" />
//                                     <Typography variant="body2" noWrap sx={{ ml: 1 }}>
//                                         {attachment.name}
//                                     </Typography>
//                                 </Box>
//                                 <Button
//                                     variant="contained"
//                                     startIcon={<UploadIcon />}
//                                     fullWidth
//                                 >
//                                     Update
//                                 </Button>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </CardContent>
//     );

//     return (
//         <BootstrapDialog onClose={handleClose} open={open}>
//             <DialogTitle sx={{ m: 0, p: 2 }}>Update Party Information</DialogTitle>
//             <IconButton
//                 aria-label="close"
//                 onClick={handleClose}
//                 sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
//             >
//                 <CloseIcon />
//             </IconButton>
//             <DialogContent dividers>
//                 <Stepper activeStep={activeStep} alternativeLabel>
//                     {steps.map((label) => (
//                         <Step key={label}>
//                             <StepLabel>{label}</StepLabel>
//                         </Step>
//                     ))}
//                 </Stepper>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     {activeStep === 0 ? renderPartyInformationForm() : renderDocumentUploadForm()}
//                 </form>
//             </DialogContent>
//             <DialogActions>
//                 {activeStep > 0 && (
//                     <Button onClick={handleBack}>
//                         Back
//                     </Button>
//                 )}
//                 {activeStep < steps.length - 1 ? (
//                     <Button onClick={handleNext} variant="contained">
//                         Next
//                     </Button>
//                 ) : (
//                     <Button
//                         onClick={() => {
//                             console.log(getValues());
//                             handleClose();
//                         }}
//                         variant="contained"
//                         color="primary"
//                         disabled={isSubmitDisabled}
//                     >
//                         Submit
//                     </Button>
//                 )}
//             </DialogActions>
//         </BootstrapDialog>
//     );
// };

// import React, { useState, useCallback } from 'react';
// import {
//     Button,
//     Box,
//     Dialog,
//     DialogContent,
//     DialogActions,
//     TextField,
//     Typography,
//     IconButton,
//     DialogTitle,
//     Stepper,
//     Step,
//     StepLabel,
//     Divider,
//     Card,
//     CardContent,
//     Grid,
//     Stack,
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import UploadIcon from '@mui/icons-material/Upload';
// import { styled } from '@mui/material/styles';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import KeycloakService from "../services/KeycloakService";

// const MySwal = withReactContent(Swal);

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     '& .MuiDialogContent-root': {
//         padding: theme.spacing(2),
//     },
//     '& .MuiDialogActions-root': {
//         padding: theme.spacing(1),
//     },
//     '& .MuiPaper-root': {
//         width: '100%',
//     },
// }));

// const initialApplicationDetails = {
//     partyName: 'Green Party',
//     leader: 'John Doe',
//     submittedDate: '2024-07-31',
//     partySymbol: '/path/to/party-symbol.png',
//     addressLine1: '123 Green Street',
//     addressLine2: 'Eco City',
//     postalCode: '12345',
//     contactNumber: '+1 234 567 8900',
//     email: 'contact@greenparty.com',
//     attachments: [
//       { type: 'Constitution', name: 'Constitution.pdf', link: '/path/to/constitution.pdf' },
//       { type: 'Logo', name: 'Logo.png', link: '/path/to/logo.png' },
//       { type: 'Membership List', name: 'Members.xlsx', link: '/path/to/members.xlsx' },
//       { type: 'Financial Statement', name: 'Finances.pdf', link: '/path/to/finances.pdf' },
//       { type: 'Leadership Structure', name: 'Leadership.pdf', link: '/path/to/leadership.pdf' }
//     ]
//   };

// export const PartyRegistrationApplication = ({ open, handleClose }) => {
//     const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
//     const [activeStep, setActiveStep] = useState(0);
//     const [isLeaderVerified, setIsLeaderVerified] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
//     const [leaderName, setLeaderName] = useState("");
//     const steps = ['Party Information', 'Documents'];

//     const validateLeaderNic = useCallback(async (nic) => {
//         if (!nic) return;
//         const updatedToken = KeycloakService.getToken();
//         setIsLoading(true);
//         try {
//             const response = await axios.get(`http://localhost:5003/api/voter/${nic}`, {
//                 headers: {
//                     Authorization: `Bearer ${updatedToken}`
//                 }
//             });
//             if ([200, 201].includes(response.status)) {
//                 setLeaderName(response.data.Name);
//                 setIsLeaderVerified(true);
//                 setIsSubmitDisabled(false);
//             } else {
//                 setLeaderName("");
//                 setIsLeaderVerified(false);
//                 setIsSubmitDisabled(true);
//             }
//         } catch (error) {
//             console.log(error);
//             setLeaderName("");
//             setIsLeaderVerified(false);
//             setIsSubmitDisabled(true);
//         } finally {
//             setIsLoading(false);
//         }
//     }, []);

//     const handleLeaderNicBlur = (e) => {
//         validateLeaderNic(e.target.value);
//     };

//     const handleNext = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     };

//     const handleBack = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     };

//     const onSubmit = (data) => {
//         console.log("onSubmit function called");
//         console.log(data);
        
//     }

//     const renderPartyInformationForm = () => (
//         <Box sx={{ padding: 2 }}>
//             <Stack spacing={2}>
//                 {/* <Typography variant="h6" color="textSecondary" gutterBottom>
//                     Party Information
//                 </Typography> */}
//                 <Divider />
//                 <TextField
//                     fullWidth
//                     label="Party Name"
//                     variant="outlined"
//                     {...register("partyName", { required: true })}
//                 />
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Abbreviation"
//                         variant="outlined"
//                         {...register("abbreviation", { required: true })}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Established Date"
//                         variant="outlined"
//                         type="date"
//                         InputLabelProps={{ shrink: true }}
//                         {...register("date", { required: true })}
//                     />
//                 </Stack>
//                 <TextField
//                     fullWidth
//                     label="Address line 1"
//                     variant="outlined"
//                     {...register("addressLine1", { required: true })}
//                 />
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Address line 2"
//                         variant="outlined"
//                         {...register("addressLine2")}
//                     />
//                     <TextField
//                         fullWidth
//                         label="City"
//                         variant="outlined"
//                         {...register("city", { required: true })}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Postal Code"
//                         variant="outlined"
//                         {...register("postalCode", { required: true })}
//                     />
//                 </Stack>
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Leader NIC"
//                         variant="outlined"
//                         {...register("leaderNic", { required: true })}
//                         error={!!errors.leaderNic}
//                         helperText={errors.leaderNic && 'Leader NIC is required'}
//                         onBlur={handleLeaderNicBlur}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Leader Name"
//                         variant="outlined"
//                         {...register("leaderName", { required: true })}
//                         disabled
//                         value={leaderName}
//                     />
//                 </Stack>
//                 {isLoading && <Typography>Verifying leader NIC...</Typography>} 
//                 {!isLoading && isLeaderVerified && <Typography color='success.main'>Leader identified successfully!</Typography>}
//                 {!isLoading && !isLeaderVerified && <Typography className='text-error'>Leader identification failed!</Typography>}
//             </Stack>
//         </Box>
//     );

//     const renderDocumentUploadForm = () => (
//         <CardContent>
//             {/* <Typography variant="h6" color="textSecondary" gutterBottom>
//                 Documents
//             </Typography> */}
//             <Divider sx={{ mb: 2 }} />
//             <Grid container spacing={2}>
//                 {initialApplicationDetails.attachments.map((attachment, index) => (
//                     <Grid item xs={12} sm={6} md={4} key={index}>
//                         <Card variant="outlined">
//                             <CardContent>
//                                 <Typography variant="subtitle1" gutterBottom>
//                                     {attachment.type}
//                                 </Typography>
//                                 <Box display="flex" alignItems="center" mb={1}>
//                                     <AttachFileIcon fontSize="small" />
//                                     <Typography variant="body2" noWrap sx={{ ml: 1 }}>
//                                         {attachment.name}
//                                     </Typography>
//                                 </Box>
//                                 <Button
//                                     variant="contained"
//                                     startIcon={<UploadIcon />}
//                                     fullWidth
//                                 >
//                                     Update
//                                 </Button>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </CardContent>
//     );

//     return (
//         <BootstrapDialog onClose={handleClose} open={open}>
//             <DialogTitle sx={{ m: 0, p: 2 }}>Update Party Information</DialogTitle>
//             <IconButton
//                 aria-label="close"
//                 onClick={handleClose}
//                 sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
//             >
//                 <CloseIcon />
//             </IconButton>
//             <DialogContent dividers>
//                 <Stepper activeStep={activeStep} alternativeLabel>
//                     {steps.map((label) => (
//                         <Step key={label}>
//                             <StepLabel>{label}</StepLabel>
//                         </Step>
//                     ))}
//                 </Stepper>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     {activeStep === 0 ? renderPartyInformationForm() : renderDocumentUploadForm()}
//                 </form>
//             </DialogContent>
//             <DialogActions>
//                 {activeStep > 0 && (
//                     <Button onClick={handleBack}>
//                         Back
//                     </Button>
//                 )}
//                 {activeStep < steps.length - 1 ? (
//                     <Button onClick={handleNext} variant="contained">
//                         Next
//                     </Button>
//                 ) : (
//                     <Button
//                         onClick={() => {
//                             console.log(getValues());
//                             handleClose();
//                         }}
//                         variant="contained"
//                         color="primary"
//                         disabled={isSubmitDisabled}
//                     >
//                         Submit
//                     </Button>
//                 )}
//             </DialogActions>
//         </BootstrapDialog>
//     );
// };
// import React, { useState, useCallback } from 'react';
// import {
//     Button,
//     Box,
//     Dialog,
//     DialogContent,
//     DialogActions,
//     TextField,
//     Typography,
//     IconButton,
//     DialogTitle,
//     Stepper,
//     Step,
//     StepLabel,
//     Divider,
//     Card,
//     CardContent,
//     Grid,
//     Stack,
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import UploadIcon from '@mui/icons-material/Upload';
// import { styled } from '@mui/material/styles';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import KeycloakService from "../services/KeycloakService";

// const MySwal = withReactContent(Swal);

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     '& .MuiDialogContent-root': {
//         padding: theme.spacing(2),
//     },
//     '& .MuiDialogActions-root': {
//         padding: theme.spacing(1),
//     },
//     '& .MuiPaper-root': {
//         width: '100%',
//     },
// }));

// const initialApplicationDetails = {
//     partyName: 'Green Party',
//     leader: 'John Doe',
//     submittedDate: '2024-07-31',
//     partySymbol: '/path/to/party-symbol.png',
//     addressLine1: '123 Green Street',
//     addressLine2: 'Eco City',
//     postalCode: '12345',
//     contactNumber: '+1 234 567 8900',
//     email: 'contact@greenparty.com',
//     attachments: [
//       { type: 'Constitution', name: 'Constitution.pdf', link: '/path/to/constitution.pdf' },
//       { type: 'Logo', name: 'Logo.png', link: '/path/to/logo.png' },
//       { type: 'Membership List', name: 'Members.xlsx', link: '/path/to/members.xlsx' },
//       { type: 'Financial Statement', name: 'Finances.pdf', link: '/path/to/finances.pdf' },
//       { type: 'Leadership Structure', name: 'Leadership.pdf', link: '/path/to/leadership.pdf' }
//     ]
//   };

// export const PartyRegistrationApplication = ({ open, handleClose }) => {
//     const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
//     const [activeStep, setActiveStep] = useState(0);
//     const [isLeaderVerified, setIsLeaderVerified] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
//     const [leaderName, setLeaderName] = useState("");
//     const steps = ['Party Information', 'Documents'];

//     const validateLeaderNic = useCallback(async (nic) => {
//         if (!nic) return;
//         const updatedToken = KeycloakService.getToken();
//         setIsLoading(true);
//         try {
//             const response = await axios.get(`http://localhost:5003/api/voter/${nic}`, {
//                 headers: {
//                     Authorization: `Bearer ${updatedToken}`
//                 }
//             });
//             if ([200, 201].includes(response.status)) {
//                 setLeaderName(response.data.Name);
//                 setIsLeaderVerified(true);
//                 setIsSubmitDisabled(false);
//             } else {
//                 setLeaderName("");
//                 setIsLeaderVerified(false);
//                 setIsSubmitDisabled(true);
//             }
//         } catch (error) {
//             console.log(error);
//             setLeaderName("");
//             setIsLeaderVerified(false);
//             setIsSubmitDisabled(true);
//         } finally {
//             setIsLoading(false);
//         }
//     }, []);

//     const handleLeaderNicBlur = (e) => {
//         validateLeaderNic(e.target.value);
//     };

//     const handleNext = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     };

//     const handleBack = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     };

//     const onSubmit = (data) => {
//         console.log("onSubmit function called");
//         console.log(data);
        
//     }

//     const renderPartyInformationForm = () => (
//         <Box sx={{ padding: 2 }}>
//             <Stack spacing={2}>
//                 {/* <Typography variant="h6" color="textSecondary" gutterBottom>
//                     Party Information
//                 </Typography> */}
//                 <Divider />
//                 <TextField
//                     fullWidth
//                     label="Party Name"
//                     variant="outlined"
//                     {...register("partyName", { required: true })}
//                 />
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Abbreviation"
//                         variant="outlined"
//                         {...register("abbreviation", { required: true })}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Established Date"
//                         variant="outlined"
//                         type="date"
//                         InputLabelProps={{ shrink: true }}
//                         {...register("date", { required: true })}
//                     />
//                 </Stack>
//                 <TextField
//                     fullWidth
//                     label="Address line 1"
//                     variant="outlined"
//                     {...register("addressLine1", { required: true })}
//                 />
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Address line 2"
//                         variant="outlined"
//                         {...register("addressLine2")}
//                     />
//                     <TextField
//                         fullWidth
//                         label="City"
//                         variant="outlined"
//                         {...register("city", { required: true })}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Postal Code"
//                         variant="outlined"
//                         {...register("postalCode", { required: true })}
//                     />
//                 </Stack>
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Leader NIC"
//                         variant="outlined"
//                         {...register("leaderNic", { required: true })}
//                         error={!!errors.leaderNic}
//                         helperText={errors.leaderNic && 'Leader NIC is required'}
//                         onBlur={handleLeaderNicBlur}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Leader Name"
//                         variant="outlined"
//                         {...register("leaderName", { required: true })}
//                         disabled
//                         value={leaderName}
//                     />
//                 </Stack>
//                 {isLoading && <Typography>Verifying leader NIC...</Typography>} 
//                 {!isLoading && isLeaderVerified && <Typography color='success.main'>Leader identified successfully!</Typography>}
//                 {!isLoading && !isLeaderVerified && <Typography className='text-error'>Leader identification failed!</Typography>}
//             </Stack>
//         </Box>
//     );

//     const renderDocumentUploadForm = () => (
//         <CardContent>
//             {/* <Typography variant="h6" color="textSecondary" gutterBottom>
//                 Documents
//             </Typography> */}
//             <Divider sx={{ mb: 2 }} />
//             <Grid container spacing={2}>
//                 {initialApplicationDetails.attachments.map((attachment, index) => (
//                     <Grid item xs={12} sm={6} md={4} key={index}>
//                         <Card variant="outlined">
//                             <CardContent>
//                                 <Typography variant="subtitle1" gutterBottom>
//                                     {attachment.type}
//                                 </Typography>
//                                 <Box display="flex" alignItems="center" mb={1}>
//                                     <AttachFileIcon fontSize="small" />
//                                     <Typography variant="body2" noWrap sx={{ ml: 1 }}>
//                                         {attachment.name}
//                                     </Typography>
//                                 </Box>
//                                 <Button
//                                     variant="contained"
//                                     startIcon={<UploadIcon />}
//                                     fullWidth
//                                 >
//                                     Update
//                                 </Button>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </CardContent>
//     );

//     return (
//         <BootstrapDialog onClose={handleClose} open={open}>
//             <DialogTitle sx={{ m: 0, p: 2 }}>Update Party Information</DialogTitle>
//             <IconButton
//                 aria-label="close"
//                 onClick={handleClose}
//                 sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
//             >
//                 <CloseIcon />
//             </IconButton>
//             <DialogContent dividers>
//                 <Stepper activeStep={activeStep} alternativeLabel>
//                     {steps.map((label) => (
//                         <Step key={label}>
//                             <StepLabel>{label}</StepLabel>
//                         </Step>
//                     ))}
//                 </Stepper>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     {activeStep === 0 ? renderPartyInformationForm() : renderDocumentUploadForm()}
//                 </form>
//             </DialogContent>
//             <DialogActions>
//                 {activeStep > 0 && (
//                     <Button onClick={handleBack}>
//                         Back
//                     </Button>
//                 )}
//                 {activeStep < steps.length - 1 ? (
//                     <Button onClick={handleNext} variant="contained">
//                         Next
//                     </Button>
//                 ) : (
//                     <Button
//                         onClick={() => {
//                             console.log(getValues());
//                             handleClose();
//                         }}
//                         variant="contained"
//                         color="primary"
//                         disabled={isSubmitDisabled}
//                     >
//                         Submit
//                     </Button>
//                 )}
//             </DialogActions>
//         </BootstrapDialog>
//     );
// };

// import React, { useState, useCallback } from 'react';
// import {
//     Button,
//     Box,
//     Dialog,
//     DialogContent,
//     DialogActions,
//     TextField,
//     Typography,
//     IconButton,
//     DialogTitle,
//     Stepper,
//     Step,
//     StepLabel,
//     Divider,
//     Card,
//     CardContent,
//     Grid,
//     Stack,
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import UploadIcon from '@mui/icons-material/Upload';
// import { styled } from '@mui/material/styles';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import KeycloakService from "../services/KeycloakService";

// const MySwal = withReactContent(Swal);

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     '& .MuiDialogContent-root': {
//         padding: theme.spacing(2),
//     },
//     '& .MuiDialogActions-root': {
//         padding: theme.spacing(1),
//     },
//     '& .MuiPaper-root': {
//         width: '100%',
//     },
// }));

// const initialApplicationDetails = {
//     partyName: 'Green Party',
//     leader: 'John Doe',
//     submittedDate: '2024-07-31',
//     partySymbol: '/path/to/party-symbol.png',
//     addressLine1: '123 Green Street',
//     addressLine2: 'Eco City',
//     postalCode: '12345',
//     contactNumber: '+1 234 567 8900',
//     email: 'contact@greenparty.com',
//     attachments: [
//       { type: 'Constitution', name: 'Constitution.pdf', link: '/path/to/constitution.pdf' },
//       { type: 'Logo', name: 'Logo.png', link: '/path/to/logo.png' },
//       { type: 'Membership List', name: 'Members.xlsx', link: '/path/to/members.xlsx' },
//       { type: 'Financial Statement', name: 'Finances.pdf', link: '/path/to/finances.pdf' },
//       { type: 'Leadership Structure', name: 'Leadership.pdf', link: '/path/to/leadership.pdf' }
//     ]
//   };

// export const PartyRegistrationApplication = ({ open, handleClose }) => {
//     const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
//     const [activeStep, setActiveStep] = useState(0);
//     const [isLeaderVerified, setIsLeaderVerified] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
//     const [leaderName, setLeaderName] = useState("");
//     const steps = ['Party Information', 'Documents'];

//     const validateLeaderNic = useCallback(async (nic) => {
//         if (!nic) return;
//         const updatedToken = KeycloakService.getToken();
//         setIsLoading(true);
//         try {
//             const response = await axios.get(`http://localhost:5003/api/voter/${nic}`, {
//                 headers: {
//                     Authorization: `Bearer ${updatedToken}`
//                 }
//             });
//             if ([200, 201].includes(response.status)) {
//                 setLeaderName(response.data.Name);
//                 setIsLeaderVerified(true);
//                 setIsSubmitDisabled(false);
//             } else {
//                 setLeaderName("");
//                 setIsLeaderVerified(false);
//                 setIsSubmitDisabled(true);
//             }
//         } catch (error) {
//             console.log(error);
//             setLeaderName("");
//             setIsLeaderVerified(false);
//             setIsSubmitDisabled(true);
//         } finally {
//             setIsLoading(false);
//         }
//     }, []);

//     const handleLeaderNicBlur = (e) => {
//         validateLeaderNic(e.target.value);
//     };

//     const handleNext = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     };

//     const handleBack = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     };

//     const onSubmit = (data) => {
//         console.log("onSubmit function called");
//         console.log(data);
        
//     }

//     const renderPartyInformationForm = () => (
//         <Box sx={{ padding: 2 }}>
//             <Stack spacing={2}>
//                 {/* <Typography variant="h6" color="textSecondary" gutterBottom>
//                     Party Information
//                 </Typography> */}
//                 <Divider />
//                 <TextField
//                     fullWidth
//                     label="Party Name"
//                     variant="outlined"
//                     {...register("partyName", { required: true })}
//                 />
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Abbreviation"
//                         variant="outlined"
//                         {...register("abbreviation", { required: true })}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Established Date"
//                         variant="outlined"
//                         type="date"
//                         InputLabelProps={{ shrink: true }}
//                         {...register("date", { required: true })}
//                     />
//                 </Stack>
//                 <TextField
//                     fullWidth
//                     label="Address line 1"
//                     variant="outlined"
//                     {...register("addressLine1", { required: true })}
//                 />
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Address line 2"
//                         variant="outlined"
//                         {...register("addressLine2")}
//                     />
//                     <TextField
//                         fullWidth
//                         label="City"
//                         variant="outlined"
//                         {...register("city", { required: true })}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Postal Code"
//                         variant="outlined"
//                         {...register("postalCode", { required: true })}
//                     />
//                 </Stack>
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Leader NIC"
//                         variant="outlined"
//                         {...register("leaderNic", { required: true })}
//                         error={!!errors.leaderNic}
//                         helperText={errors.leaderNic && 'Leader NIC is required'}
//                         onBlur={handleLeaderNicBlur}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Leader Name"
//                         variant="outlined"
//                         {...register("leaderName", { required: true })}
//                         disabled
//                         value={leaderName}
//                     />
//                 </Stack>
//                 {isLoading && <Typography>Verifying leader NIC...</Typography>} 
//                 {!isLoading && isLeaderVerified && <Typography color='success.main'>Leader identified successfully!</Typography>}
//                 {!isLoading && !isLeaderVerified && <Typography className='text-error'>Leader identification failed!</Typography>}
//             </Stack>
//         </Box>
//     );

//     const renderDocumentUploadForm = () => (
//         <CardContent>
//             {/* <Typography variant="h6" color="textSecondary" gutterBottom>
//                 Documents
//             </Typography> */}
//             <Divider sx={{ mb: 2 }} />
//             <Grid container spacing={2}>
//                 {initialApplicationDetails.attachments.map((attachment, index) => (
//                     <Grid item xs={12} sm={6} md={4} key={index}>
//                         <Card variant="outlined">
//                             <CardContent>
//                                 <Typography variant="subtitle1" gutterBottom>
//                                     {attachment.type}
//                                 </Typography>
//                                 <Box display="flex" alignItems="center" mb={1}>
//                                     <AttachFileIcon fontSize="small" />
//                                     <Typography variant="body2" noWrap sx={{ ml: 1 }}>
//                                         {attachment.name}
//                                     </Typography>
//                                 </Box>
//                                 <Button
//                                     variant="contained"
//                                     startIcon={<UploadIcon />}
//                                     fullWidth
//                                 >
//                                     Update
//                                 </Button>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </CardContent>
//     );

//     return (
//         <BootstrapDialog onClose={handleClose} open={open}>
//             <DialogTitle sx={{ m: 0, p: 2 }}>Update Party Information</DialogTitle>
//             <IconButton
//                 aria-label="close"
//                 onClick={handleClose}
//                 sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
//             >
//                 <CloseIcon />
//             </IconButton>
//             <DialogContent dividers>
//                 <Stepper activeStep={activeStep} alternativeLabel>
//                     {steps.map((label) => (
//                         <Step key={label}>
//                             <StepLabel>{label}</StepLabel>
//                         </Step>
//                     ))}
//                 </Stepper>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     {activeStep === 0 ? renderPartyInformationForm() : renderDocumentUploadForm()}
//                 </form>
//             </DialogContent>
//             <DialogActions>
//                 {activeStep > 0 && (
//                     <Button onClick={handleBack}>
//                         Back
//                     </Button>
//                 )}
//                 {activeStep < steps.length - 1 ? (
//                     <Button onClick={handleNext} variant="contained">
//                         Next
//                     </Button>
//                 ) : (
//                     <Button
//                         onClick={() => {
//                             console.log(getValues());
//                             handleClose();
//                         }}
//                         variant="contained"
//                         color="primary"
//                         disabled={isSubmitDisabled}
//                     >
//                         Submit
//                     </Button>
//                 )}
//             </DialogActions>
//         </BootstrapDialog>
//     );
// };

// import React, { useState, useCallback } from 'react';
// import {
//     Button,
//     Box,
//     Dialog,
//     DialogContent,
//     DialogActions,
//     TextField,
//     Typography,
//     IconButton,
//     DialogTitle,
//     Stepper,
//     Step,
//     StepLabel,
//     Divider,
//     Card,
//     CardContent,
//     Grid,
//     Stack,
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import UploadIcon from '@mui/icons-material/Upload';
// import { styled } from '@mui/material/styles';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import KeycloakService from "../services/KeycloakService";

// const MySwal = withReactContent(Swal);

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     '& .MuiDialogContent-root': {
//         padding: theme.spacing(2),
//     },
//     '& .MuiDialogActions-root': {
//         padding: theme.spacing(1),
//     },
//     '& .MuiPaper-root': {
//         width: '100%',
//     },
// }));

// const initialApplicationDetails = {
//     partyName: 'Green Party',
//     leader: 'John Doe',
//     submittedDate: '2024-07-31',
//     partySymbol: '/path/to/party-symbol.png',
//     addressLine1: '123 Green Street',
//     addressLine2: 'Eco City',
//     postalCode: '12345',
//     contactNumber: '+1 234 567 8900',
//     email: 'contact@greenparty.com',
//     attachments: [
//       { type: 'Constitution', name: 'Constitution.pdf', link: '/path/to/constitution.pdf' },
//       { type: 'Logo', name: 'Logo.png', link: '/path/to/logo.png' },
//       { type: 'Membership List', name: 'Members.xlsx', link: '/path/to/members.xlsx' },
//       { type: 'Financial Statement', name: 'Finances.pdf', link: '/path/to/finances.pdf' },
//       { type: 'Leadership Structure', name: 'Leadership.pdf', link: '/path/to/leadership.pdf' }
//     ]
//   };

// export const PartyRegistrationApplication = ({ open, handleClose }) => {
//     const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
//     const [activeStep, setActiveStep] = useState(0);
//     const [isLeaderVerified, setIsLeaderVerified] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
//     const [leaderName, setLeaderName] = useState("");
//     const steps = ['Party Information', 'Documents'];

//     const validateLeaderNic = useCallback(async (nic) => {
//         if (!nic) return;
//         const updatedToken = KeycloakService.getToken();
//         setIsLoading(true);
//         try {
//             const response = await axios.get(`http://localhost:5003/api/voter/${nic}`, {
//                 headers: {
//                     Authorization: `Bearer ${updatedToken}`
//                 }
//             });
//             if ([200, 201].includes(response.status)) {
//                 setLeaderName(response.data.Name);
//                 setIsLeaderVerified(true);
//                 setIsSubmitDisabled(false);
//             } else {
//                 setLeaderName("");
//                 setIsLeaderVerified(false);
//                 setIsSubmitDisabled(true);
//             }
//         } catch (error) {
//             console.log(error);
//             setLeaderName("");
//             setIsLeaderVerified(false);
//             setIsSubmitDisabled(true);
//         } finally {
//             setIsLoading(false);
//         }
//     }, []);

//     const handleLeaderNicBlur = (e) => {
//         validateLeaderNic(e.target.value);
//     };

//     const handleNext = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     };

//     const handleBack = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     };

//     const onSubmit = (data) => {
//         console.log("onSubmit function called");
//         console.log(data);
        
//     }

//     const renderPartyInformationForm = () => (
//         <Box sx={{ padding: 2 }}>
//             <Stack spacing={2}>
//                 {/* <Typography variant="h6" color="textSecondary" gutterBottom>
//                     Party Information
//                 </Typography> */}
//                 <Divider />
//                 <TextField
//                     fullWidth
//                     label="Party Name"
//                     variant="outlined"
//                     {...register("partyName", { required: true })}
//                 />
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Abbreviation"
//                         variant="outlined"
//                         {...register("abbreviation", { required: true })}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Established Date"
//                         variant="outlined"
//                         type="date"
//                         InputLabelProps={{ shrink: true }}
//                         {...register("date", { required: true })}
//                     />
//                 </Stack>
//                 <TextField
//                     fullWidth
//                     label="Address line 1"
//                     variant="outlined"
//                     {...register("addressLine1", { required: true })}
//                 />
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Address line 2"
//                         variant="outlined"
//                         {...register("addressLine2")}
//                     />
//                     <TextField
//                         fullWidth
//                         label="City"
//                         variant="outlined"
//                         {...register("city", { required: true })}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Postal Code"
//                         variant="outlined"
//                         {...register("postalCode", { required: true })}
//                     />
//                 </Stack>
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Leader NIC"
//                         variant="outlined"
//                         {...register("leaderNic", { required: true })}
//                         error={!!errors.leaderNic}
//                         helperText={errors.leaderNic && 'Leader NIC is required'}
//                         onBlur={handleLeaderNicBlur}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Leader Name"
//                         variant="outlined"
//                         {...register("leaderName", { required: true })}
//                         disabled
//                         value={leaderName}
//                     />
//                 </Stack>
//                 {isLoading && <Typography>Verifying leader NIC...</Typography>} 
//                 {!isLoading && isLeaderVerified && <Typography color='success.main'>Leader identified successfully!</Typography>}
//                 {!isLoading && !isLeaderVerified && <Typography className='text-error'>Leader identification failed!</Typography>}
//             </Stack>
//         </Box>
//     );

//     const renderDocumentUploadForm = () => (
//         <CardContent>
//             {/* <Typography variant="h6" color="textSecondary" gutterBottom>
//                 Documents
//             </Typography> */}
//             <Divider sx={{ mb: 2 }} />
//             <Grid container spacing={2}>
//                 {initialApplicationDetails.attachments.map((attachment, index) => (
//                     <Grid item xs={12} sm={6} md={4} key={index}>
//                         <Card variant="outlined">
//                             <CardContent>
//                                 <Typography variant="subtitle1" gutterBottom>
//                                     {attachment.type}
//                                 </Typography>
//                                 <Box display="flex" alignItems="center" mb={1}>
//                                     <AttachFileIcon fontSize="small" />
//                                     <Typography variant="body2" noWrap sx={{ ml: 1 }}>
//                                         {attachment.name}
//                                     </Typography>
//                                 </Box>
//                                 <Button
//                                     variant="contained"
//                                     startIcon={<UploadIcon />}
//                                     fullWidth
//                                 >
//                                     Update
//                                 </Button>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </CardContent>
//     );

//     return (
//         <BootstrapDialog onClose={handleClose} open={open}>
//             <DialogTitle sx={{ m: 0, p: 2 }}>Update Party Information</DialogTitle>
//             <IconButton
//                 aria-label="close"
//                 onClick={handleClose}
//                 sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
//             >
//                 <CloseIcon />
//             </IconButton>
//             <DialogContent dividers>
//                 <Stepper activeStep={activeStep} alternativeLabel>
//                     {steps.map((label) => (
//                         <Step key={label}>
//                             <StepLabel>{label}</StepLabel>
//                         </Step>
//                     ))}
//                 </Stepper>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     {activeStep === 0 ? renderPartyInformationForm() : renderDocumentUploadForm()}
//                 </form>
//             </DialogContent>
//             <DialogActions>
//                 {activeStep > 0 && (
//                     <Button onClick={handleBack}>
//                         Back
//                     </Button>
//                 )}
//                 {activeStep < steps.length - 1 ? (
//                     <Button onClick={handleNext} variant="contained">
//                         Next
//                     </Button>
//                 ) : (
//                     <Button
//                         onClick={() => {
//                             console.log(getValues());
//                             handleClose();
//                         }}
//                         variant="contained"
//                         color="primary"
//                         disabled={isSubmitDisabled}
//                     >
//                         Submit
//                     </Button>
//                 )}
//             </DialogActions>
//         </BootstrapDialog>
//     );
// };

// import React, { useState, useCallback } from 'react';
// import {
//     Button,
//     Box,
//     Dialog,
//     DialogContent,
//     DialogActions,
//     TextField,
//     Typography,
//     IconButton,
//     DialogTitle,
//     Stepper,
//     Step,
//     StepLabel,
//     Divider,
//     Card,
//     CardContent,
//     Grid,
//     Stack,
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import UploadIcon from '@mui/icons-material/Upload';
// import { styled } from '@mui/material/styles';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import KeycloakService from "../services/KeycloakService";

// const MySwal = withReactContent(Swal);

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     '& .MuiDialogContent-root': {
//         padding: theme.spacing(2),
//     },
//     '& .MuiDialogActions-root': {
//         padding: theme.spacing(1),
//     },
//     '& .MuiPaper-root': {
//         width: '100%',
//     },
// }));

// const initialApplicationDetails = {
//     partyName: 'Green Party',
//     leader: 'John Doe',
//     submittedDate: '2024-07-31',
//     partySymbol: '/path/to/party-symbol.png',
//     addressLine1: '123 Green Street',
//     addressLine2: 'Eco City',
//     postalCode: '12345',
//     contactNumber: '+1 234 567 8900',
//     email: 'contact@greenparty.com',
//     attachments: [
//       { type: 'Constitution', name: 'Constitution.pdf', link: '/path/to/constitution.pdf' },
//       { type: 'Logo', name: 'Logo.png', link: '/path/to/logo.png' },
//       { type: 'Membership List', name: 'Members.xlsx', link: '/path/to/members.xlsx' },
//       { type: 'Financial Statement', name: 'Finances.pdf', link: '/path/to/finances.pdf' },
//       { type: 'Leadership Structure', name: 'Leadership.pdf', link: '/path/to/leadership.pdf' }
//     ]
//   };

// export const PartyRegistrationApplication = ({ open, handleClose }) => {
//     const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
//     const [activeStep, setActiveStep] = useState(0);
//     const [isLeaderVerified, setIsLeaderVerified] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
//     const [leaderName, setLeaderName] = useState("");
//     const steps = ['Party Information', 'Documents'];

//     const validateLeaderNic = useCallback(async (nic) => {
//         if (!nic) return;
//         const updatedToken = KeycloakService.getToken();
//         setIsLoading(true);
//         try {
//             const response = await axios.get(`http://localhost:5003/api/voter/${nic}`, {
//                 headers: {
//                     Authorization: `Bearer ${updatedToken}`
//                 }
//             });
//             if ([200, 201].includes(response.status)) {
//                 setLeaderName(response.data.Name);
//                 setIsLeaderVerified(true);
//                 setIsSubmitDisabled(false);
//             } else {
//                 setLeaderName("");
//                 setIsLeaderVerified(false);
//                 setIsSubmitDisabled(true);
//             }
//         } catch (error) {
//             console.log(error);
//             setLeaderName("");
//             setIsLeaderVerified(false);
//             setIsSubmitDisabled(true);
//         } finally {
//             setIsLoading(false);
//         }
//     }, []);

//     const handleLeaderNicBlur = (e) => {
//         validateLeaderNic(e.target.value);
//     };

//     const handleNext = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     };

//     const handleBack = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     };

//     const onSubmit = (data) => {
//         console.log("onSubmit function called");
//         console.log(data);
        
//     }

//     const renderPartyInformationForm = () => (
//         <Box sx={{ padding: 2 }}>
//             <Stack spacing={2}>
//                 {/* <Typography variant="h6" color="textSecondary" gutterBottom>
//                     Party Information
//                 </Typography> */}
//                 <Divider />
//                 <TextField
//                     fullWidth
//                     label="Party Name"
//                     variant="outlined"
//                     {...register("partyName", { required: true })}
//                 />
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Abbreviation"
//                         variant="outlined"
//                         {...register("abbreviation", { required: true })}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Established Date"
//                         variant="outlined"
//                         type="date"
//                         InputLabelProps={{ shrink: true }}
//                         {...register("date", { required: true })}
//                     />
//                 </Stack>
//                 <TextField
//                     fullWidth
//                     label="Address line 1"
//                     variant="outlined"
//                     {...register("addressLine1", { required: true })}
//                 />
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Address line 2"
//                         variant="outlined"
//                         {...register("addressLine2")}
//                     />
//                     <TextField
//                         fullWidth
//                         label="City"
//                         variant="outlined"
//                         {...register("city", { required: true })}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Postal Code"
//                         variant="outlined"
//                         {...register("postalCode", { required: true })}
//                     />
//                 </Stack>
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Leader NIC"
//                         variant="outlined"
//                         {...register("leaderNic", { required: true })}
//                         error={!!errors.leaderNic}
//                         helperText={errors.leaderNic && 'Leader NIC is required'}
//                         onBlur={handleLeaderNicBlur}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Leader Name"
//                         variant="outlined"
//                         {...register("leaderName", { required: true })}
//                         disabled
//                         value={leaderName}
//                     />
//                 </Stack>
//                 {isLoading && <Typography>Verifying leader NIC...</Typography>} 
//                 {!isLoading && isLeaderVerified && <Typography color='success.main'>Leader identified successfully!</Typography>}
//                 {!isLoading && !isLeaderVerified && <Typography className='text-error'>Leader identification failed!</Typography>}
//             </Stack>
//         </Box>
//     );

//     const renderDocumentUploadForm = () => (
//         <CardContent>
//             {/* <Typography variant="h6" color="textSecondary" gutterBottom>
//                 Documents
//             </Typography> */}
//             <Divider sx={{ mb: 2 }} />
//             <Grid container spacing={2}>
//                 {initialApplicationDetails.attachments.map((attachment, index) => (
//                     <Grid item xs={12} sm={6} md={4} key={index}>
//                         <Card variant="outlined">
//                             <CardContent>
//                                 <Typography variant="subtitle1" gutterBottom>
//                                     {attachment.type}
//                                 </Typography>
//                                 <Box display="flex" alignItems="center" mb={1}>
//                                     <AttachFileIcon fontSize="small" />
//                                     <Typography variant="body2" noWrap sx={{ ml: 1 }}>
//                                         {attachment.name}
//                                     </Typography>
//                                 </Box>
//                                 <Button
//                                     variant="contained"
//                                     startIcon={<UploadIcon />}
//                                     fullWidth
//                                 >
//                                     Update
//                                 </Button>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </CardContent>
//     );

//     return (
//         <BootstrapDialog onClose={handleClose} open={open}>
//             <DialogTitle sx={{ m: 0, p: 2 }}>Update Party Information</DialogTitle>
//             <IconButton
//                 aria-label="close"
//                 onClick={handleClose}
//                 sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
//             >
//                 <CloseIcon />
//             </IconButton>
//             <DialogContent dividers>
//                 <Stepper activeStep={activeStep} alternativeLabel>
//                     {steps.map((label) => (
//                         <Step key={label}>
//                             <StepLabel>{label}</StepLabel>
//                         </Step>
//                     ))}
//                 </Stepper>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     {activeStep === 0 ? renderPartyInformationForm() : renderDocumentUploadForm()}
//                 </form>
//             </DialogContent>
//             <DialogActions>
//                 {activeStep > 0 && (
//                     <Button onClick={handleBack}>
//                         Back
//                     </Button>
//                 )}
//                 {activeStep < steps.length - 1 ? (
//                     <Button onClick={handleNext} variant="contained">
//                         Next
//                     </Button>
//                 ) : (
//                     <Button
//                         onClick={() => {
//                             console.log(getValues());
//                             handleClose();
//                         }}
//                         variant="contained"
//                         color="primary"
//                         disabled={isSubmitDisabled}
//                     >
//                         Submit
//                     </Button>
//                 )}
//             </DialogActions>
//         </BootstrapDialog>
//     );
// };

// import React, { useState, useCallback } from 'react';
// import {
//     Button,
//     Box,
//     Dialog,
//     DialogContent,
//     DialogActions,
//     TextField,
//     Typography,
//     IconButton,
//     DialogTitle,
//     Stepper,
//     Step,
//     StepLabel,
//     Divider,
//     Card,
//     CardContent,
//     Grid,
//     Stack,
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import UploadIcon from '@mui/icons-material/Upload';
// import { styled } from '@mui/material/styles';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import KeycloakService from "../services/KeycloakService";

// const MySwal = withReactContent(Swal);

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     '& .MuiDialogContent-root': {
//         padding: theme.spacing(2),
//     },
//     '& .MuiDialogActions-root': {
//         padding: theme.spacing(1),
//     },
//     '& .MuiPaper-root': {
//         width: '100%',
//     },
// }));

// const initialApplicationDetails = {
//     partyName: 'Green Party',
//     leader: 'John Doe',
//     submittedDate: '2024-07-31',
//     partySymbol: '/path/to/party-symbol.png',
//     addressLine1: '123 Green Street',
//     addressLine2: 'Eco City',
//     postalCode: '12345',
//     contactNumber: '+1 234 567 8900',
//     email: 'contact@greenparty.com',
//     attachments: [
//       { type: 'Constitution', name: 'Constitution.pdf', link: '/path/to/constitution.pdf' },
//       { type: 'Logo', name: 'Logo.png', link: '/path/to/logo.png' },
//       { type: 'Membership List', name: 'Members.xlsx', link: '/path/to/members.xlsx' },
//       { type: 'Financial Statement', name: 'Finances.pdf', link: '/path/to/finances.pdf' },
//       { type: 'Leadership Structure', name: 'Leadership.pdf', link: '/path/to/leadership.pdf' }
//     ]
//   };

// export const PartyRegistrationApplication = ({ open, handleClose }) => {
//     const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
//     const [activeStep, setActiveStep] = useState(0);
//     const [isLeaderVerified, setIsLeaderVerified] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
//     const [leaderName, setLeaderName] = useState("");
//     const steps = ['Party Information', 'Documents'];

//     const validateLeaderNic = useCallback(async (nic) => {
//         if (!nic) return;
//         const updatedToken = KeycloakService.getToken();
//         setIsLoading(true);
//         try {
//             const response = await axios.get(`http://localhost:5003/api/voter/${nic}`, {
//                 headers: {
//                     Authorization: `Bearer ${updatedToken}`
//                 }
//             });
//             if ([200, 201].includes(response.status)) {
//                 setLeaderName(response.data.Name);
//                 setIsLeaderVerified(true);
//                 setIsSubmitDisabled(false);
//             } else {
//                 setLeaderName("");
//                 setIsLeaderVerified(false);
//                 setIsSubmitDisabled(true);
//             }
//         } catch (error) {
//             console.log(error);
//             setLeaderName("");
//             setIsLeaderVerified(false);
//             setIsSubmitDisabled(true);
//         } finally {
//             setIsLoading(false);
//         }
//     }, []);

//     const handleLeaderNicBlur = (e) => {
//         validateLeaderNic(e.target.value);
//     };

//     const handleNext = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     };

//     const handleBack = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     };

//     const onSubmit = (data) => {
//         console.log("onSubmit function called");
//         console.log(data);
        
//     }

//     const renderPartyInformationForm = () => (
//         <Box sx={{ padding: 2 }}>
//             <Stack spacing={2}>
//                 {/* <Typography variant="h6" color="textSecondary" gutterBottom>
//                     Party Information
//                 </Typography> */}
//                 <Divider />
//                 <TextField
//                     fullWidth
//                     label="Party Name"
//                     variant="outlined"
//                     {...register("partyName", { required: true })}
//                 />
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Abbreviation"
//                         variant="outlined"
//                         {...register("abbreviation", { required: true })}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Established Date"
//                         variant="outlined"
//                         type="date"
//                         InputLabelProps={{ shrink: true }}
//                         {...register("date", { required: true })}
//                     />
//                 </Stack>
//                 <TextField
//                     fullWidth
//                     label="Address line 1"
//                     variant="outlined"
//                     {...register("addressLine1", { required: true })}
//                 />
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Address line 2"
//                         variant="outlined"
//                         {...register("addressLine2")}
//                     />
//                     <TextField
//                         fullWidth
//                         label="City"
//                         variant="outlined"
//                         {...register("city", { required: true })}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Postal Code"
//                         variant="outlined"
//                         {...register("postalCode", { required: true })}
//                     />
//                 </Stack>
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Leader NIC"
//                         variant="outlined"
//                         {...register("leaderNic", { required: true })}
//                         error={!!errors.leaderNic}
//                         helperText={errors.leaderNic && 'Leader NIC is required'}
//                         onBlur={handleLeaderNicBlur}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Leader Name"
//                         variant="outlined"
//                         {...register("leaderName", { required: true })}
//                         disabled
//                         value={leaderName}
//                     />
//                 </Stack>
//                 {isLoading && <Typography>Verifying leader NIC...</Typography>} 
//                 {!isLoading && isLeaderVerified && <Typography color='success.main'>Leader identified successfully!</Typography>}
//                 {!isLoading && !isLeaderVerified && <Typography className='text-error'>Leader identification failed!</Typography>}
//             </Stack>
//         </Box>
//     );

//     const renderDocumentUploadForm = () => (
//         <CardContent>
//             {/* <Typography variant="h6" color="textSecondary" gutterBottom>
//                 Documents
//             </Typography> */}
//             <Divider sx={{ mb: 2 }} />
//             <Grid container spacing={2}>
//                 {initialApplicationDetails.attachments.map((attachment, index) => (
//                     <Grid item xs={12} sm={6} md={4} key={index}>
//                         <Card variant="outlined">
//                             <CardContent>
//                                 <Typography variant="subtitle1" gutterBottom>
//                                     {attachment.type}
//                                 </Typography>
//                                 <Box display="flex" alignItems="center" mb={1}>
//                                     <AttachFileIcon fontSize="small" />
//                                     <Typography variant="body2" noWrap sx={{ ml: 1 }}>
//                                         {attachment.name}
//                                     </Typography>
//                                 </Box>
//                                 <Button
//                                     variant="contained"
//                                     startIcon={<UploadIcon />}
//                                     fullWidth
//                                 >
//                                     Update
//                                 </Button>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </CardContent>
//     );

//     return (
//         <BootstrapDialog onClose={handleClose} open={open}>
//             <DialogTitle sx={{ m: 0, p: 2 }}>Update Party Information</DialogTitle>
//             <IconButton
//                 aria-label="close"
//                 onClick={handleClose}
//                 sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
//             >
//                 <CloseIcon />
//             </IconButton>
//             <DialogContent dividers>
//                 <Stepper activeStep={activeStep} alternativeLabel>
//                     {steps.map((label) => (
//                         <Step key={label}>
//                             <StepLabel>{label}</StepLabel>
//                         </Step>
//                     ))}
//                 </Stepper>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     {activeStep === 0 ? renderPartyInformationForm() : renderDocumentUploadForm()}
//                 </form>
//             </DialogContent>
//             <DialogActions>
//                 {activeStep > 0 && (
//                     <Button onClick={handleBack}>
//                         Back
//                     </Button>
//                 )}
//                 {activeStep < steps.length - 1 ? (
//                     <Button onClick={handleNext} variant="contained">
//                         Next
//                     </Button>
//                 ) : (
//                     <Button
//                         onClick={() => {
//                             console.log(getValues());
//                             handleClose();
//                         }}
//                         variant="contained"
//                         color="primary"
//                         disabled={isSubmitDisabled}
//                     >
//                         Submit
//                     </Button>
//                 )}
//             </DialogActions>
//         </BootstrapDialog>
//     );
// };
//     const renderPartyInformationForm = () => (
//         <Box sx={{ padding: 2 }}>
//             <Stack spacing={2}>
//                 {/* <Typography variant="h6" color="textSecondary" gutterBottom>
//                     Party Information
//                 </Typography> */}
//                 <Divider />
//                 <TextField
//                     fullWidth
//                     label="Party Name"
//                     variant="outlined"
//                     {...register("partyName", { required: true })}
//                 />
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Abbreviation"
//                         variant="outlined"
//                         {...register("abbreviation", { required: true })}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Established Date"
//                         variant="outlined"
//                         type="date"
//                         InputLabelProps={{ shrink: true }}
//                         {...register("date", { required: true })}
//                     />
//                 </Stack>
//                 <TextField
//                     fullWidth
//                     label="Address line 1"
//                     variant="outlined"
//                     {...register("addressLine1", { required: true })}
//                 />
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Address line 2"
//                         variant="outlined"
//                         {...register("addressLine2")}
//                     />
//                     <TextField
//                         fullWidth
//                         label="City"
//                         variant="outlined"
//                         {...register("city", { required: true })}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Postal Code"
//                         variant="outlined"
//                         {...register("postalCode", { required: true })}
//                     />
//                 </Stack>
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Leader NIC"
//                         variant="outlined"
//                         {...register("leaderNic", { required: true })}
//                         error={!!errors.leaderNic}
//                         helperText={errors.leaderNic && 'Leader NIC is required'}
//                         onBlur={handleLeaderNicBlur}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Leader Name"
//                         variant="outlined"
//                         {...register("leaderName", { required: true })}
//                         disabled
//                         value={leaderName}
//                     />
//                 </Stack>
//                 {isLoading && <Typography>Verifying leader NIC...</Typography>} 
//                 {!isLoading && isLeaderVerified && <Typography color='success.main'>Leader identified successfully!</Typography>}
//                 {!isLoading && !isLeaderVerified && <Typography className='text-error'>Leader identification failed!</Typography>}
//             </Stack>
//         </Box>
//     );

//     const renderDocumentUploadForm = () => (
//         <CardContent>
//             {/* <Typography variant="h6" color="textSecondary" gutterBottom>
//                 Documents
//             </Typography> */}
//             <Divider sx={{ mb: 2 }} />
//             <Grid container spacing={2}>
//                 {initialApplicationDetails.attachments.map((attachment, index) => (
//                     <Grid item xs={12} sm={6} md={4} key={index}>
//                         <Card variant="outlined">
//                             <CardContent>
//                                 <Typography variant="subtitle1" gutterBottom>
//                                     {attachment.type}
//                                 </Typography>
//                                 <Box display="flex" alignItems="center" mb={1}>
//                                     <AttachFileIcon fontSize="small" />
//                                     <Typography variant="body2" noWrap sx={{ ml: 1 }}>
//                                         {attachment.name}
//                                     </Typography>
//                                 </Box>
//                                 <Button
//                                     variant="contained"
//                                     startIcon={<UploadIcon />}
//                                     fullWidth
//                                 >
//                                     Update
//                                 </Button>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </CardContent>
//     );

//     return (
//         <BootstrapDialog onClose={handleClose} open={open}>
//             <DialogTitle sx={{ m: 0, p: 2 }}>Update Party Information</DialogTitle>
//             <IconButton
//                 aria-label="close"
//                 onClick={handleClose}
//                 sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
//             >
//                 <CloseIcon />
//             </IconButton>
//             <DialogContent dividers>
//                 <Stepper activeStep={activeStep} alternativeLabel>
//                     {steps.map((label) => (
//                         <Step key={label}>
//                             <StepLabel>{label}</StepLabel>
//                         </Step>
//                     ))}
//                 </Stepper>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     {activeStep === 0 ? renderPartyInformationForm() : renderDocumentUploadForm()}
//                 </form>
//             </DialogContent>
//             <DialogActions>
//                 {activeStep > 0 && (
//                     <Button onClick={handleBack}>
//                         Back
//                     </Button>
//                 )}
//                 {activeStep < steps.length - 1 ? (
//                     <Button onClick={handleNext} variant="contained">
//                         Next
//                     </Button>
//                 ) : (
//                     <Button
//                         onClick={() => {
//                             console.log(getValues());
//                             handleClose();
//                         }}
//                         variant="contained"
//                         color="primary"
//                         disabled={isSubmitDisabled}
//                     >
//                         Submit
//                     </Button>
//                 )}
//             </DialogActions>
//         </BootstrapDialog>
//     );
// };
// import React, { useState, useCallback } from 'react';
// import {
//     Button,
//     Box,
//     Dialog,
//     DialogContent,
//     DialogActions,
//     TextField,
//     Typography,
//     IconButton,
//     DialogTitle,
//     Stepper,
//     Step,
//     StepLabel,
//     Divider,
//     Card,
//     CardContent,
//     Grid,
//     Stack,
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import UploadIcon from '@mui/icons-material/Upload';
// import { styled } from '@mui/material/styles';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import KeycloakService from "../services/KeycloakService";

// const MySwal = withReactContent(Swal);

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     '& .MuiDialogContent-root': {
//         padding: theme.spacing(2),
//     },
//     '& .MuiDialogActions-root': {
//         padding: theme.spacing(1),
//     },
//     '& .MuiPaper-root': {
//         width: '100%',
//     },
// }));

// const initialApplicationDetails = {
//     partyName: 'Green Party',
//     leader: 'John Doe',
//     submittedDate: '2024-07-31',
//     partySymbol: '/path/to/party-symbol.png',
//     addressLine1: '123 Green Street',
//     addressLine2: 'Eco City',
//     postalCode: '12345',
//     contactNumber: '+1 234 567 8900',
//     email: 'contact@greenparty.com',
//     attachments: [
//       { type: 'Constitution', name: 'Constitution.pdf', link: '/path/to/constitution.pdf' },
//       { type: 'Logo', name: 'Logo.png', link: '/path/to/logo.png' },
//       { type: 'Membership List', name: 'Members.xlsx', link: '/path/to/members.xlsx' },
//       { type: 'Financial Statement', name: 'Finances.pdf', link: '/path/to/finances.pdf' },
//       { type: 'Leadership Structure', name: 'Leadership.pdf', link: '/path/to/leadership.pdf' }
//     ]
//   };

// export const PartyRegistrationApplication = ({ open, handleClose }) => {
//     const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
//     const [activeStep, setActiveStep] = useState(0);
//     const [isLeaderVerified, setIsLeaderVerified] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
//     const [leaderName, setLeaderName] = useState("");
//     const steps = ['Party Information', 'Documents'];

//     const validateLeaderNic = useCallback(async (nic) => {
//         if (!nic) return;
//         const updatedToken = KeycloakService.getToken();
//         setIsLoading(true);
//         try {
//             const response = await axios.get(`http://localhost:5003/api/voter/${nic}`, {
//                 headers: {
//                     Authorization: `Bearer ${updatedToken}`
//                 }
//             });
//             if ([200, 201].includes(response.status)) {
//                 setLeaderName(response.data.Name);
//                 setIsLeaderVerified(true);
//                 setIsSubmitDisabled(false);
//             } else {
//                 setLeaderName("");
//                 setIsLeaderVerified(false);
//                 setIsSubmitDisabled(true);
//             }
//         } catch (error) {
//             console.log(error);
//             setLeaderName("");
//             setIsLeaderVerified(false);
//             setIsSubmitDisabled(true);
//         } finally {
//             setIsLoading(false);
//         }
//     }, []);

//     const handleLeaderNicBlur = (e) => {
//         validateLeaderNic(e.target.value);
//     };

//     const handleNext = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     };

//     const handleBack = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     };

//     const onSubmit = (data) => {
//         console.log("onSubmit function called");
//         console.log(data);
        
//     }

//     const renderPartyInformationForm = () => (
//         <Box sx={{ padding: 2 }}>
//             <Stack spacing={2}>
//                 {/* <Typography variant="h6" color="textSecondary" gutterBottom>
//                     Party Information
//                 </Typography> */}
//                 <Divider />
//                 <TextField
//                     fullWidth
//                     label="Party Name"
//                     variant="outlined"
//                     {...register("partyName", { required: true })}
//                 />
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Abbreviation"
//                         variant="outlined"
//                         {...register("abbreviation", { required: true })}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Established Date"
//                         variant="outlined"
//                         type="date"
//                         InputLabelProps={{ shrink: true }}
//                         {...register("date", { required: true })}
//                     />
//                 </Stack>
//                 <TextField
//                     fullWidth
//                     label="Address line 1"
//                     variant="outlined"
//                     {...register("addressLine1", { required: true })}
//                 />
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Address line 2"
//                         variant="outlined"
//                         {...register("addressLine2")}
//                     />
//                     <TextField
//                         fullWidth
//                         label="City"
//                         variant="outlined"
//                         {...register("city", { required: true })}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Postal Code"
//                         variant="outlined"
//                         {...register("postalCode", { required: true })}
//                     />
//                 </Stack>
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Leader NIC"
//                         variant="outlined"
//                         {...register("leaderNic", { required: true })}
//                         error={!!errors.leaderNic}
//                         helperText={errors.leaderNic && 'Leader NIC is required'}
//                         onBlur={handleLeaderNicBlur}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Leader Name"
//                         variant="outlined"
//                         {...register("leaderName", { required: true })}
//                         disabled
//                         value={leaderName}
//                     />
//                 </Stack>
//                 {isLoading && <Typography>Verifying leader NIC...</Typography>} 
//                 {!isLoading && isLeaderVerified && <Typography color='success.main'>Leader identified successfully!</Typography>}
//                 {!isLoading && !isLeaderVerified && <Typography className='text-error'>Leader identification failed!</Typography>}
//             </Stack>
//         </Box>
//     );

//     const renderDocumentUploadForm = () => (
//         <CardContent>
//             {/* <Typography variant="h6" color="textSecondary" gutterBottom>
//                 Documents
//             </Typography> */}
//             <Divider sx={{ mb: 2 }} />
//             <Grid container spacing={2}>
//                 {initialApplicationDetails.attachments.map((attachment, index) => (
//                     <Grid item xs={12} sm={6} md={4} key={index}>
//                         <Card variant="outlined">
//                             <CardContent>
//                                 <Typography variant="subtitle1" gutterBottom>
//                                     {attachment.type}
//                                 </Typography>
//                                 <Box display="flex" alignItems="center" mb={1}>
//                                     <AttachFileIcon fontSize="small" />
//                                     <Typography variant="body2" noWrap sx={{ ml: 1 }}>
//                                         {attachment.name}
//                                     </Typography>
//                                 </Box>
//                                 <Button
//                                     variant="contained"
//                                     startIcon={<UploadIcon />}
//                                     fullWidth
//                                 >
//                                     Update
//                                 </Button>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </CardContent>
//     );

//     return (
//         <BootstrapDialog onClose={handleClose} open={open}>
//             <DialogTitle sx={{ m: 0, p: 2 }}>Update Party Information</DialogTitle>
//             <IconButton
//                 aria-label="close"
//                 onClick={handleClose}
//                 sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
//             >
//                 <CloseIcon />
//             </IconButton>
//             <DialogContent dividers>
//                 <Stepper activeStep={activeStep} alternativeLabel>
//                     {steps.map((label) => (
//                         <Step key={label}>
//                             <StepLabel>{label}</StepLabel>
//                         </Step>
//                     ))}
//                 </Stepper>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     {activeStep === 0 ? renderPartyInformationForm() : renderDocumentUploadForm()}
//                 </form>
//             </DialogContent>
//             <DialogActions>
//                 {activeStep > 0 && (
//                     <Button onClick={handleBack}>
//                         Back
//                     </Button>
//                 )}
//                 {activeStep < steps.length - 1 ? (
//                     <Button onClick={handleNext} variant="contained">
//                         Next
//                     </Button>
//                 ) : (
//                     <Button
//                         onClick={() => {
//                             console.log(getValues());
//                             handleClose();
//                         }}
//                         variant="contained"
//                         color="primary"
//                         disabled={isSubmitDisabled}
//                     >
//                         Submit
//                     </Button>
//                 )}
//             </DialogActions>
//         </BootstrapDialog>
//     );
// };

// import React, { useState, useCallback } from 'react';
// import {
//     Button,
//     Box,
//     Dialog,
//     DialogContent,
//     DialogActions,
//     TextField,
//     Typography,
//     IconButton,
//     DialogTitle,
//     Stepper,
//     Step,
//     StepLabel,
//     Divider,
//     Card,
//     CardContent,
//     Grid,
//     Stack,
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import UploadIcon from '@mui/icons-material/Upload';
// import { styled } from '@mui/material/styles';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import KeycloakService from "../services/KeycloakService";

// const MySwal = withReactContent(Swal);

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     '& .MuiDialogContent-root': {
//         padding: theme.spacing(2),
//     },
//     '& .MuiDialogActions-root': {
//         padding: theme.spacing(1),
//     },
//     '& .MuiPaper-root': {
//         width: '100%',
//     },
// }));

// const initialApplicationDetails = {
//     partyName: 'Green Party',
//     leader: 'John Doe',
//     submittedDate: '2024-07-31',
//     partySymbol: '/path/to/party-symbol.png',
//     addressLine1: '123 Green Street',
//     addressLine2: 'Eco City',
//     postalCode: '12345',
//     contactNumber: '+1 234 567 8900',
//     email: 'contact@greenparty.com',
//     attachments: [
//       { type: 'Constitution', name: 'Constitution.pdf', link: '/path/to/constitution.pdf' },
//       { type: 'Logo', name: 'Logo.png', link: '/path/to/logo.png' },
//       { type: 'Membership List', name: 'Members.xlsx', link: '/path/to/members.xlsx' },
//       { type: 'Financial Statement', name: 'Finances.pdf', link: '/path/to/finances.pdf' },
//       { type: 'Leadership Structure', name: 'Leadership.pdf', link: '/path/to/leadership.pdf' }
//     ]
//   };

// export const PartyRegistrationApplication = ({ open, handleClose }) => {
//     const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
//     const [activeStep, setActiveStep] = useState(0);
//     const [isLeaderVerified, setIsLeaderVerified] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
//     const [leaderName, setLeaderName] = useState("");
//     const steps = ['Party Information', 'Documents'];

//     const validateLeaderNic = useCallback(async (nic) => {
//         if (!nic) return;
//         const updatedToken = KeycloakService.getToken();
//         setIsLoading(true);
//         try {
//             const response = await axios.get(`http://localhost:5003/api/voter/${nic}`, {
//                 headers: {
//                     Authorization: `Bearer ${updatedToken}`
//                 }
//             });
//             if ([200, 201].includes(response.status)) {
//                 setLeaderName(response.data.Name);
//                 setIsLeaderVerified(true);
//                 setIsSubmitDisabled(false);
//             } else {
//                 setLeaderName("");
//                 setIsLeaderVerified(false);
//                 setIsSubmitDisabled(true);
//             }
//         } catch (error) {
//             console.log(error);
//             setLeaderName("");
//             setIsLeaderVerified(false);
//             setIsSubmitDisabled(true);
//         } finally {
//             setIsLoading(false);
//         }
//     }, []);

//     const handleLeaderNicBlur = (e) => {
//         validateLeaderNic(e.target.value);
//     };

//     const handleNext = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     };

//     const handleBack = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     };

//     const onSubmit = (data) => {
//         console.log("onSubmit function called");
//         console.log(data);
        
//     }

//     const renderPartyInformationForm = () => (
//         <Box sx={{ padding: 2 }}>
//             <Stack spacing={2}>
//                 {/* <Typography variant="h6" color="textSecondary" gutterBottom>
//                     Party Information
//                 </Typography> */}
//                 <Divider />
//                 <TextField
//                     fullWidth
//                     label="Party Name"
//                     variant="outlined"
//                     {...register("partyName", { required: true })}
//                 />
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Abbreviation"
//                         variant="outlined"
//                         {...register("abbreviation", { required: true })}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Established Date"
//                         variant="outlined"
//                         type="date"
//                         InputLabelProps={{ shrink: true }}
//                         {...register("date", { required: true })}
//                     />
//                 </Stack>
//                 <TextField
//                     fullWidth
//                     label="Address line 1"
//                     variant="outlined"
//                     {...register("addressLine1", { required: true })}
//                 />
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Address line 2"
//                         variant="outlined"
//                         {...register("addressLine2")}
//                     />
//                     <TextField
//                         fullWidth
//                         label="City"
//                         variant="outlined"
//                         {...register("city", { required: true })}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Postal Code"
//                         variant="outlined"
//                         {...register("postalCode", { required: true })}
//                     />
//                 </Stack>
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Leader NIC"
//                         variant="outlined"
//                         {...register("leaderNic", { required: true })}
//                         error={!!errors.leaderNic}
//                         helperText={errors.leaderNic && 'Leader NIC is required'}
//                         onBlur={handleLeaderNicBlur}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Leader Name"
//                         variant="outlined"
//                         {...register("leaderName", { required: true })}
//                         disabled
//                         value={leaderName}
//                     />
//                 </Stack>
//                 {isLoading && <Typography>Verifying leader NIC...</Typography>} 
//                 {!isLoading && isLeaderVerified && <Typography color='success.main'>Leader identified successfully!</Typography>}
//                 {!isLoading && !isLeaderVerified && <Typography className='text-error'>Leader identification failed!</Typography>}
//             </Stack>
//         </Box>
//     );

//     const renderDocumentUploadForm = () => (
//         <CardContent>
//             {/* <Typography variant="h6" color="textSecondary" gutterBottom>
//                 Documents
//             </Typography> */}
//             <Divider sx={{ mb: 2 }} />
//             <Grid container spacing={2}>
//                 {initialApplicationDetails.attachments.map((attachment, index) => (
//                     <Grid item xs={12} sm={6} md={4} key={index}>
//                         <Card variant="outlined">
//                             <CardContent>
//                                 <Typography variant="subtitle1" gutterBottom>
//                                     {attachment.type}
//                                 </Typography>
//                                 <Box display="flex" alignItems="center" mb={1}>
//                                     <AttachFileIcon fontSize="small" />
//                                     <Typography variant="body2" noWrap sx={{ ml: 1 }}>
//                                         {attachment.name}
//                                     </Typography>
//                                 </Box>
//                                 <Button
//                                     variant="contained"
//                                     startIcon={<UploadIcon />}
//                                     fullWidth
//                                 >
//                                     Update
//                                 </Button>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </CardContent>
//     );

//     return (
//         <BootstrapDialog onClose={handleClose} open={open}>
//             <DialogTitle sx={{ m: 0, p: 2 }}>Update Party Information</DialogTitle>
//             <IconButton
//                 aria-label="close"
//                 onClick={handleClose}
//                 sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
//             >
//                 <CloseIcon />
//             </IconButton>
//             <DialogContent dividers>
//                 <Stepper activeStep={activeStep} alternativeLabel>
//                     {steps.map((label) => (
//                         <Step key={label}>
//                             <StepLabel>{label}</StepLabel>
//                         </Step>
//                     ))}
//                 </Stepper>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     {activeStep === 0 ? renderPartyInformationForm() : renderDocumentUploadForm()}
//                 </form>
//             </DialogContent>
//             <DialogActions>
//                 {activeStep > 0 && (
//                     <Button onClick={handleBack}>
//                         Back
//                     </Button>
//                 )}
//                 {activeStep < steps.length - 1 ? (
//                     <Button onClick={handleNext} variant="contained">
//                         Next
//                     </Button>
//                 ) : (
//                     <Button
//                         onClick={() => {
//                             console.log(getValues());
//                             handleClose();
//                         }}
//                         variant="contained"
//                         color="primary"
//                         disabled={isSubmitDisabled}
//                     >
//                         Submit
//                     </Button>
//                 )}
//             </DialogActions>
//         </BootstrapDialog>
//     );
// };

// import React, { useState, useCallback } from 'react';
// import {
//     Button,
//     Box,
//     Dialog,
//     DialogContent,
//     DialogActions,
//     TextField,
//     Typography,
//     IconButton,
//     DialogTitle,
//     Stepper,
//     Step,
//     StepLabel,
//     Divider,
//     Card,
//     CardContent,
//     Grid,
//     Stack,
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import UploadIcon from '@mui/icons-material/Upload';
// import { styled } from '@mui/material/styles';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import KeycloakService from "../services/KeycloakService";

// const MySwal = withReactContent(Swal);

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     '& .MuiDialogContent-root': {
//         padding: theme.spacing(2),
//     },
//     '& .MuiDialogActions-root': {
//         padding: theme.spacing(1),
//     },
//     '& .MuiPaper-root': {
//         width: '100%',
//     },
// }));

// const initialApplicationDetails = {
//     partyName: 'Green Party',
//     leader: 'John Doe',
//     submittedDate: '2024-07-31',
//     partySymbol: '/path/to/party-symbol.png',
//     addressLine1: '123 Green Street',
//     addressLine2: 'Eco City',
//     postalCode: '12345',
//     contactNumber: '+1 234 567 8900',
//     email: 'contact@greenparty.com',
//     attachments: [
//       { type: 'Constitution', name: 'Constitution.pdf', link: '/path/to/constitution.pdf' },
//       { type: 'Logo', name: 'Logo.png', link: '/path/to/logo.png' },
//       { type: 'Membership List', name: 'Members.xlsx', link: '/path/to/members.xlsx' },
//       { type: 'Financial Statement', name: 'Finances.pdf', link: '/path/to/finances.pdf' },
//       { type: 'Leadership Structure', name: 'Leadership.pdf', link: '/path/to/leadership.pdf' }
//     ]
//   };

// export const PartyRegistrationApplication = ({ open, handleClose }) => {
//     const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
//     const [activeStep, setActiveStep] = useState(0);
//     const [isLeaderVerified, setIsLeaderVerified] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
//     const [leaderName, setLeaderName] = useState("");
//     const steps = ['Party Information', 'Documents'];

//     const validateLeaderNic = useCallback(async (nic) => {
//         if (!nic) return;
//         const updatedToken = KeycloakService.getToken();
//         setIsLoading(true);
//         try {
//             const response = await axios.get(`http://localhost:5003/api/voter/${nic}`, {
//                 headers: {
//                     Authorization: `Bearer ${updatedToken}`
//                 }
//             });
//             if ([200, 201].includes(response.status)) {
//                 setLeaderName(response.data.Name);
//                 setIsLeaderVerified(true);
//                 setIsSubmitDisabled(false);
//             } else {
//                 setLeaderName("");
//                 setIsLeaderVerified(false);
//                 setIsSubmitDisabled(true);
//             }
//         } catch (error) {
//             console.log(error);
//             setLeaderName("");
//             setIsLeaderVerified(false);
//             setIsSubmitDisabled(true);
//         } finally {
//             setIsLoading(false);
//         }
//     }, []);

//     const handleLeaderNicBlur = (e) => {
//         validateLeaderNic(e.target.value);
//     };

//     const handleNext = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     };

//     const handleBack = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     };

//     const onSubmit = (data) => {
//         console.log("onSubmit function called");
//         console.log(data);
        
//     }

//     const renderPartyInformationForm = () => (
//         <Box sx={{ padding: 2 }}>
//             <Stack spacing={2}>
//                 {/* <Typography variant="h6" color="textSecondary" gutterBottom>
//                     Party Information
//                 </Typography> */}
//                 <Divider />
//                 <TextField
//                     fullWidth
//                     label="Party Name"
//                     variant="outlined"
//                     {...register("partyName", { required: true })}
//                 />
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Abbreviation"
//                         variant="outlined"
//                         {...register("abbreviation", { required: true })}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Established Date"
//                         variant="outlined"
//                         type="date"
//                         InputLabelProps={{ shrink: true }}
//                         {...register("date", { required: true })}
//                     />
//                 </Stack>
//                 <TextField
//                     fullWidth
//                     label="Address line 1"
//                     variant="outlined"
//                     {...register("addressLine1", { required: true })}
//                 />
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Address line 2"
//                         variant="outlined"
//                         {...register("addressLine2")}
//                     />
//                     <TextField
//                         fullWidth
//                         label="City"
//                         variant="outlined"
//                         {...register("city", { required: true })}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Postal Code"
//                         variant="outlined"
//                         {...register("postalCode", { required: true })}
//                     />
//                 </Stack>
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Leader NIC"
//                         variant="outlined"
//                         {...register("leaderNic", { required: true })}
//                         error={!!errors.leaderNic}
//                         helperText={errors.leaderNic && 'Leader NIC is required'}
//                         onBlur={handleLeaderNicBlur}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Leader Name"
//                         variant="outlined"
//                         {...register("leaderName", { required: true })}
//                         disabled
//                         value={leaderName}
//                     />
//                 </Stack>
//                 {isLoading && <Typography>Verifying leader NIC...</Typography>} 
//                 {!isLoading && isLeaderVerified && <Typography color='success.main'>Leader identified successfully!</Typography>}
//                 {!isLoading && !isLeaderVerified && <Typography className='text-error'>Leader identification failed!</Typography>}
//             </Stack>
//         </Box>
//     );

//     const renderDocumentUploadForm = () => (
//         <CardContent>
//             {/* <Typography variant="h6" color="textSecondary" gutterBottom>
//                 Documents
//             </Typography> */}
//             <Divider sx={{ mb: 2 }} />
//             <Grid container spacing={2}>
//                 {initialApplicationDetails.attachments.map((attachment, index) => (
//                     <Grid item xs={12} sm={6} md={4} key={index}>
//                         <Card variant="outlined">
//                             <CardContent>
//                                 <Typography variant="subtitle1" gutterBottom>
//                                     {attachment.type}
//                                 </Typography>
//                                 <Box display="flex" alignItems="center" mb={1}>
//                                     <AttachFileIcon fontSize="small" />
//                                     <Typography variant="body2" noWrap sx={{ ml: 1 }}>
//                                         {attachment.name}
//                                     </Typography>
//                                 </Box>
//                                 <Button
//                                     variant="contained"
//                                     startIcon={<UploadIcon />}
//                                     fullWidth
//                                 >
//                                     Update
//                                 </Button>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </CardContent>
//     );

//     return (
//         <BootstrapDialog onClose={handleClose} open={open}>
//             <DialogTitle sx={{ m: 0, p: 2 }}>Update Party Information</DialogTitle>
//             <IconButton
//                 aria-label="close"
//                 onClick={handleClose}
//                 sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
//             >
//                 <CloseIcon />
//             </IconButton>
//             <DialogContent dividers>
//                 <Stepper activeStep={activeStep} alternativeLabel>
//                     {steps.map((label) => (
//                         <Step key={label}>
//                             <StepLabel>{label}</StepLabel>
//                         </Step>
//                     ))}
//                 </Stepper>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     {activeStep === 0 ? renderPartyInformationForm() : renderDocumentUploadForm()}
//                 </form>
//             </DialogContent>
//             <DialogActions>
//                 {activeStep > 0 && (
//                     <Button onClick={handleBack}>
//                         Back
//                     </Button>
//                 )}
//                 {activeStep < steps.length - 1 ? (
//                     <Button onClick={handleNext} variant="contained">
//                         Next
//                     </Button>
//                 ) : (
//                     <Button
//                         onClick={() => {
//                             console.log(getValues());
//                             handleClose();
//                         }}
//                         variant="contained"
//                         color="primary"
//                         disabled={isSubmitDisabled}
//                     >
//                         Submit
//                     </Button>
//                 )}
//             </DialogActions>
//         </BootstrapDialog>
//     );
// };

// import React, { useState, useCallback } from 'react';
// import {
//     Button,
//     Box,
//     Dialog,
//     DialogContent,
//     DialogActions,
//     TextField,
//     Typography,
//     IconButton,
//     DialogTitle,
//     Stepper,
//     Step,
//     StepLabel,
//     Divider,
//     Card,
//     CardContent,
//     Grid,
//     Stack,
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import UploadIcon from '@mui/icons-material/Upload';
// import { styled } from '@mui/material/styles';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import KeycloakService from "../services/KeycloakService";

// const MySwal = withReactContent(Swal);

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     '& .MuiDialogContent-root': {
//         padding: theme.spacing(2),
//     },
//     '& .MuiDialogActions-root': {
//         padding: theme.spacing(1),
//     },
//     '& .MuiPaper-root': {
//         width: '100%',
//     },
// }));

// const initialApplicationDetails = {
//     partyName: 'Green Party',
//     leader: 'John Doe',
//     submittedDate: '2024-07-31',
//     partySymbol: '/path/to/party-symbol.png',
//     addressLine1: '123 Green Street',
//     addressLine2: 'Eco City',
//     postalCode: '12345',
//     contactNumber: '+1 234 567 8900',
//     email: 'contact@greenparty.com',
//     attachments: [
//       { type: 'Constitution', name: 'Constitution.pdf', link: '/path/to/constitution.pdf' },
//       { type: 'Logo', name: 'Logo.png', link: '/path/to/logo.png' },
//       { type: 'Membership List', name: 'Members.xlsx', link: '/path/to/members.xlsx' },
//       { type: 'Financial Statement', name: 'Finances.pdf', link: '/path/to/finances.pdf' },
//       { type: 'Leadership Structure', name: 'Leadership.pdf', link: '/path/to/leadership.pdf' }
//     ]
//   };

// export const PartyRegistrationApplication = ({ open, handleClose }) => {
//     const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
//     const [activeStep, setActiveStep] = useState(0);
//     const [isLeaderVerified, setIsLeaderVerified] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
//     const [leaderName, setLeaderName] = useState("");
//     const steps = ['Party Information', 'Documents'];

//     const validateLeaderNic = useCallback(async (nic) => {
//         if (!nic) return;
//         const updatedToken = KeycloakService.getToken();
//         setIsLoading(true);
//         try {
//             const response = await axios.get(`http://localhost:5003/api/voter/${nic}`, {
//                 headers: {
//                     Authorization: `Bearer ${updatedToken}`
//                 }
//             });
//             if ([200, 201].includes(response.status)) {
//                 setLeaderName(response.data.Name);
//                 setIsLeaderVerified(true);
//                 setIsSubmitDisabled(false);
//             } else {
//                 setLeaderName("");
//                 setIsLeaderVerified(false);
//                 setIsSubmitDisabled(true);
//             }
//         } catch (error) {
//             console.log(error);
//             setLeaderName("");
//             setIsLeaderVerified(false);
//             setIsSubmitDisabled(true);
//         } finally {
//             setIsLoading(false);
//         }
//     }, []);

//     const handleLeaderNicBlur = (e) => {
//         validateLeaderNic(e.target.value);
//     };

//     const handleNext = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     };

//     const handleBack = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     };

//     const onSubmit = (data) => {
//         console.log("onSubmit function called");
//         console.log(data);
        
//     }

//     const renderPartyInformationForm = () => (
//         <Box sx={{ padding: 2 }}>
//             <Stack spacing={2}>
//                 {/* <Typography variant="h6" color="textSecondary" gutterBottom>
//                     Party Information
//                 </Typography> */}
//                 <Divider />
//                 <TextField
//                     fullWidth
//                     label="Party Name"
//                     variant="outlined"
//                     {...register("partyName", { required: true })}
//                 />
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Abbreviation"
//                         variant="outlined"
//                         {...register("abbreviation", { required: true })}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Established Date"
//                         variant="outlined"
//                         type="date"
//                         InputLabelProps={{ shrink: true }}
//                         {...register("date", { required: true })}
//                     />
//                 </Stack>
//                 <TextField
//                     fullWidth
//                     label="Address line 1"
//                     variant="outlined"
//                     {...register("addressLine1", { required: true })}
//                 />
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Address line 2"
//                         variant="outlined"
//                         {...register("addressLine2")}
//                     />
//                     <TextField
//                         fullWidth
//                         label="City"
//                         variant="outlined"
//                         {...register("city", { required: true })}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Postal Code"
//                         variant="outlined"
//                         {...register("postalCode", { required: true })}
//                     />
//                 </Stack>
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Leader NIC"
//                         variant="outlined"
//                         {...register("leaderNic", { required: true })}
//                         error={!!errors.leaderNic}
//                         helperText={errors.leaderNic && 'Leader NIC is required'}
//                         onBlur={handleLeaderNicBlur}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Leader Name"
//                         variant="outlined"
//                         {...register("leaderName", { required: true })}
//                         disabled
//                         value={leaderName}
//                     />
//                 </Stack>
//                 {isLoading && <Typography>Verifying leader NIC...</Typography>} 
//                 {!isLoading && isLeaderVerified && <Typography color='success.main'>Leader identified successfully!</Typography>}
//                 {!isLoading && !isLeaderVerified && <Typography className='text-error'>Leader identification failed!</Typography>}
//             </Stack>
//         </Box>
//     );

//     const renderDocumentUploadForm = () => (
//         <CardContent>
//             {/* <Typography variant="h6" color="textSecondary" gutterBottom>
//                 Documents
//             </Typography> */}
//             <Divider sx={{ mb: 2 }} />
//             <Grid container spacing={2}>
//                 {initialApplicationDetails.attachments.map((attachment, index) => (
//                     <Grid item xs={12} sm={6} md={4} key={index}>
//                         <Card variant="outlined">
//                             <CardContent>
//                                 <Typography variant="subtitle1" gutterBottom>
//                                     {attachment.type}
//                                 </Typography>
//                                 <Box display="flex" alignItems="center" mb={1}>
//                                     <AttachFileIcon fontSize="small" />
//                                     <Typography variant="body2" noWrap sx={{ ml: 1 }}>
//                                         {attachment.name}
//                                     </Typography>
//                                 </Box>
//                                 <Button
//                                     variant="contained"
//                                     startIcon={<UploadIcon />}
//                                     fullWidth
//                                 >
//                                     Update
//                                 </Button>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </CardContent>
//     );

//     return (
//         <BootstrapDialog onClose={handleClose} open={open}>
//             <DialogTitle sx={{ m: 0, p: 2 }}>Update Party Information</DialogTitle>
//             <IconButton
//                 aria-label="close"
//                 onClick={handleClose}
//                 sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
//             >
//                 <CloseIcon />
//             </IconButton>
//             <DialogContent dividers>
//                 <Stepper activeStep={activeStep} alternativeLabel>
//                     {steps.map((label) => (
//                         <Step key={label}>
//                             <StepLabel>{label}</StepLabel>
//                         </Step>
//                     ))}
//                 </Stepper>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     {activeStep === 0 ? renderPartyInformationForm() : renderDocumentUploadForm()}
//                 </form>
//             </DialogContent>
//             <DialogActions>
//                 {activeStep > 0 && (
//                     <Button onClick={handleBack}>
//                         Back
//                     </Button>
//                 )}
//                 {activeStep < steps.length - 1 ? (
//                     <Button onClick={handleNext} variant="contained">
//                         Next
//                     </Button>
//                 ) : (
//                     <Button
//                         onClick={() => {
//                             console.log(getValues());
//                             handleClose();
//                         }}
//                         variant="contained"
//                         color="primary"
//                         disabled={isSubmitDisabled}
//                     >
//                         Submit
//                     </Button>
//                 )}
//             </DialogActions>
//         </BootstrapDialog>
//     );
// };

// import React, { useState, useCallback } from 'react';
// import {
//     Button,
//     Box,
//     Dialog,
//     DialogContent,
//     DialogActions,
//     TextField,
//     Typography,
//     IconButton,
//     DialogTitle,
//     Stepper,
//     Step,
//     StepLabel,
//     Divider,
//     Card,
//     CardContent,
//     Grid,
//     Stack,
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import UploadIcon from '@mui/icons-material/Upload';
// import { styled } from '@mui/material/styles';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import KeycloakService from "../services/KeycloakService";

// const MySwal = withReactContent(Swal);

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     '& .MuiDialogContent-root': {
//         padding: theme.spacing(2),
//     },
//     '& .MuiDialogActions-root': {
//         padding: theme.spacing(1),
//     },
//     '& .MuiPaper-root': {
//         width: '100%',
//     },
// }));

// const initialApplicationDetails = {
//     partyName: 'Green Party',
//     leader: 'John Doe',
//     submittedDate: '2024-07-31',
//     partySymbol: '/path/to/party-symbol.png',
//     addressLine1: '123 Green Street',
//     addressLine2: 'Eco City',
//     postalCode: '12345',
//     contactNumber: '+1 234 567 8900',
//     email: 'contact@greenparty.com',
//     attachments: [
//       { type: 'Constitution', name: 'Constitution.pdf', link: '/path/to/constitution.pdf' },
//       { type: 'Logo', name: 'Logo.png', link: '/path/to/logo.png' },
//       { type: 'Membership List', name: 'Members.xlsx', link: '/path/to/members.xlsx' },
//       { type: 'Financial Statement', name: 'Finances.pdf', link: '/path/to/finances.pdf' },
//       { type: 'Leadership Structure', name: 'Leadership.pdf', link: '/path/to/leadership.pdf' }
//     ]
//   };

// export const PartyRegistrationApplication = ({ open, handleClose }) => {
//     const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
//     const [activeStep, setActiveStep] = useState(0);
//     const [isLeaderVerified, setIsLeaderVerified] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
//     const [leaderName, setLeaderName] = useState("");
//     const steps = ['Party Information', 'Documents'];

//     const validateLeaderNic = useCallback(async (nic) => {
//         if (!nic) return;
//         const updatedToken = KeycloakService.getToken();
//         setIsLoading(true);
//         try {
//             const response = await axios.get(`http://localhost:5003/api/voter/${nic}`, {
//                 headers: {
//                     Authorization: `Bearer ${updatedToken}`
//                 }
//             });
//             if ([200, 201].includes(response.status)) {
//                 setLeaderName(response.data.Name);
//                 setIsLeaderVerified(true);
//                 setIsSubmitDisabled(false);
//             } else {
//                 setLeaderName("");
//                 setIsLeaderVerified(false);
//                 setIsSubmitDisabled(true);
//             }
//         } catch (error) {
//             console.log(error);
//             setLeaderName("");
//             setIsLeaderVerified(false);
//             setIsSubmitDisabled(true);
//         } finally {
//             setIsLoading(false);
//         }
//     }, []);

//     const handleLeaderNicBlur = (e) => {
//         validateLeaderNic(e.target.value);
//     };

//     const handleNext = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     };

//     const handleBack = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     };

//     const onSubmit = (data) => {
//         console.log("onSubmit function called");
//         console.log(data);
        
//     }

//     const renderPartyInformationForm = () => (
//         <Box sx={{ padding: 2 }}>
//             <Stack spacing={2}>
//                 {/* <Typography variant="h6" color="textSecondary" gutterBottom>
//                     Party Information
//                 </Typography> */}
//                 <Divider />
//                 <TextField
//                     fullWidth
//                     label="Party Name"
//                     variant="outlined"
//                     {...register("partyName", { required: true })}
//                 />
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Abbreviation"
//                         variant="outlined"
//                         {...register("abbreviation", { required: true })}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Established Date"
//                         variant="outlined"
//                         type="date"
//                         InputLabelProps={{ shrink: true }}
//                         {...register("date", { required: true })}
//                     />
//                 </Stack>
//                 <TextField
//                     fullWidth
//                     label="Address line 1"
//                     variant="outlined"
//                     {...register("addressLine1", { required: true })}
//                 />
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Address line 2"
//                         variant="outlined"
//                         {...register("addressLine2")}
//                     />
//                     <TextField
//                         fullWidth
//                         label="City"
//                         variant="outlined"
//                         {...register("city", { required: true })}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Postal Code"
//                         variant="outlined"
//                         {...register("postalCode", { required: true })}
//                     />
//                 </Stack>
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         fullWidth
//                         label="Leader NIC"
//                         variant="outlined"
//                         {...register("leaderNic", { required: true })}
//                         error={!!errors.leaderNic}
//                         helperText={errors.leaderNic && 'Leader NIC is required'}
//                         onBlur={handleLeaderNicBlur}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Leader Name"
//                         variant="outlined"
//                         {...register("leaderName", { required: true })}
//                         disabled
//                         value={leaderName}
//                     />
//                 </Stack>
//                 {isLoading && <Typography>Verifying leader NIC...</Typography>} 
//                 {!isLoading && isLeaderVerified && <Typography color='success.main'>Leader identified successfully!</Typography>}
//                 {!isLoading && !isLeaderVerified && <Typography className='text-error'>Leader identification failed!</Typography>}
//             </Stack>
//         </Box>
//     );

//     const renderDocumentUploadForm = () => (
//         <CardContent>
//             {/* <Typography variant="h6" color="textSecondary" gutterBottom>
//                 Documents
//             </Typography> */}
//             <Divider sx={{ mb: 2 }} />
//             <Grid container spacing={2}>
//                 {initialApplicationDetails.attachments.map((attachment, index) => (
//                     <Grid item xs={12} sm={6} md={4} key={index}>
//                         <Card variant="outlined">
//                             <CardContent>
//                                 <Typography variant="subtitle1" gutterBottom>
//                                     {attachment.type}
//                                 </Typography>
//                                 <Box display="flex" alignItems="center" mb={1}>
//                                     <AttachFileIcon fontSize="small" />
//                                     <Typography variant="body2" noWrap sx={{ ml: 1 }}>
//                                         {attachment.name}
//                                     </Typography>
//                                 </Box>
//                                 <Button
//                                     variant="contained"
//                                     startIcon={<UploadIcon />}
//                                     fullWidth
//                                 >
//                                     Update
//                                 </Button>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </CardContent>
//     );

//     return (
//         <BootstrapDialog onClose={handleClose} open={open}>
//             <DialogTitle sx={{ m: 0, p: 2 }}>Update Party Information</DialogTitle>
//             <IconButton
//                 aria-label="close"
//                 onClick={handleClose}
//                 sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
//             >
//                 <CloseIcon />
//             </IconButton>
//             <DialogContent dividers>
//                 <Stepper activeStep={activeStep} alternativeLabel>
//                     {steps.map((label) => (
//                         <Step key={label}>
//                             <StepLabel>{label}</StepLabel>
//                         </Step>
//                     ))}
//                 </Stepper>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     {activeStep === 0 ? renderPartyInformationForm() : renderDocumentUploadForm()}
//                 </form>
//             </DialogContent>
//             <DialogActions>
//                 {activeStep > 0 && (
//                     <Button onClick={handleBack}>
//                         Back
//                     </Button>
//                 )}
//                 {activeStep < steps.length - 1 ? (
//                     <Button onClick={handleNext} variant="contained">
//                         Next
//                     </Button>
//                 ) : (
//                     <Button
//                         onClick={() => {
//                             console.log(getValues());
//                             handleClose();
//                         }}
//                         variant="contained"
//                         color="primary"
//                         disabled={isSubmitDisabled}
//                     >
//                         Submit
//                     </Button>
//                 )}
//             </DialogActions>
//         </BootstrapDialog>
//     );
// };