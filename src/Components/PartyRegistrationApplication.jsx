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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import UploadIcon from '@mui/icons-material/Upload';
import { styled } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
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
    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
    const [activeStep, setActiveStep] = useState(0);
    const [isLeaderVerified, setIsLeaderVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [leaderName, setLeaderName] = useState("");
    const steps = ['Party Information', 'Documents'];

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

    const handleLeaderNicBlur = (e) => {
        validateLeaderNic(e.target.value);
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const onSubmit = async (data) => {
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

        // Function to submit party data
        const submitPartyData = async (partyData) => {
            console.log(partyData);
            const data = {
                "partyName": "Example Party",
                "abbreviation": "EP",
                "foundedDate": "2020-01-01",
                "leader": "John Doe",
                "addressLine1": "123 Main St",
                "addressLine2": "Suite 400",
                "city": "Colombo",
                "postalCode": "00100",
                "contactNumber": "0123456789",
                "symbol": "example-symbol.png",
                "partyColors": [],
                "constitution": "example-constitution.pdf",
                "financialStatements": "example-financial-statements.pdf",
                "declaration": "We declare that...",
                "status": "pending verification"
            }
            const formData = new FormData();
            
            for (let key in partyData) {
                formData.append(key, partyData[key]);
            }

            try {
                const token = KeycloakService.getToken();
                console.log(token);
                const response = await axios.post('http://localhost:5003/api/party', data, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });                
                if ([200, 201].includes(response.status)) {
                    showSuccessModal('Application Submitted Successfully!', '/party/list');
                } else {
                    showErrorModal(response.data, '/party/list');
                }
            } catch (error) {
                console.error('Error submitting the application:', error);
                showErrorModal(error.response ? error.response.data : 'An error occurred', '/');
            }
        };

        await submitPartyData(data);
    };

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
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DatePicker label="Established Date" />
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
                    />
                    <TextField
                        fullWidth
                        label="City"
                        variant="outlined"
                        {...register("city", { required: true })}
                        margin="normal"
                        padding="normal"
                        sx={{ fontSize: '1rem', fontWeight: 'bold' }}
                    />
                    <TextField
                        fullWidth
                        label="Postal Code"
                        variant="outlined"
                        {...register("postalCode", { required: true })}
                        margin="normal"
                        padding="normal"
                        sx={{ fontSize: '1rem', fontWeight: 'bold' }}
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
                        onBlur={handleLeaderNicBlur}
                        margin="normal"
                        padding="normal"
                        sx={{ fontSize: '1rem', fontWeight: 'bold' }}
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
            {isLoading && <p>Verifying leader NIC...</p>} 
            {!isLoading && isLeaderVerified && <Typography color='success.main'>Leader identified successfully!</Typography>}
            {!isLoading && !isLeaderVerified && <Typography className='text-error'>Leader identification failed!</Typography>}
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
        <BootstrapDialog onClose={handleClose} open={open}>
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
            <form onSubmit={handleSubmit(onSubmit)}>
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
                        <Button onClick={handleNext}>
                            Next
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            disabled={isSubmitDisabled}
                        >
                            Submit
                        </Button>
                    )}
                </DialogActions>
            </form>
        </BootstrapDialog>
    );
};


// {initialApplicationDetails.attachments.map((attachment, index) => (
//     <Grid item xs={12} sm={6} md={4} key={index}>
//         <Card variant="outlined">
//             <CardContent>
//                 <Typography variant="body2" color="textSecondary" gutterBottom>
//                     {attachment.type}
//                 </Typography>
//                 <Box display="flex" alignItems="center" mb={1}>
//                     <AttachFileIcon fontSize="small" />
//                     <Typography variant="body2" sx={{ ml: 1 }} noWrap>
//                         {attachment.name}
//                     </Typography>
//                 </Box>
//                 <Button
//                     variant="contained"
//                     startIcon={<UploadIcon />}
//                     fullWidth
//                 >
//                     Update
//                 </Button>
//                 <Box>
//                     <input
//                         accept="image/*"
//                         id="partySymbolInput"
//                         type="file"
//                         style={{ display: "none" }}
//                         onChange={handleFileChange}
//                     />
//                     <label htmlFor="partySymbolInput">
//                         <Button
//                         component="span"
//                         role={undefined}
//                         variant="outlined"
//                         tabIndex={-1}
//                         startIcon={<CloudUploadIcon />}
//                         >
//                         Upload Party Symbol
//                         </Button>
//                     </label>
//                     {<div>
//                         <p>Uploaded File: {uploadedFileName}</p>
//                     </div>
//                     }
//                 </Box>
//             </CardContent>
//         </Card>
//     </Grid>
// ))}