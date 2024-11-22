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
    const { register, handleSubmit, formState: { errors }, setValue, getValues, reset } = useForm();
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
                console.log(response);
                
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

    // const onSubmit = async (data) => {
    //     const confirmSubmission = async () => {
    //         return MySwal.fire({
    //             title: 'Are you sure?',
    //             text: 'Do you want to continue with submitting the application?',
    //             icon: 'warning',
    //             showCancelButton: true,
    //             confirmButtonText: 'Yes, Submit',
    //             cancelButtonText: 'No, Cancel',
    //         });
    //     };
    
    //     const submitPartyData = async (partyData) => {
    //         const formData = new FormData();
    
    //         const partyDetails = {
    //             partyName: getValues("partyName"),
    //             abbreviation: getValues("abbreviation"),
    //             foundedDate: getValues("foundedDate"),
    //             address: {
    //                 addressLine_1: getValues("addressLine1"),
    //                 addressLine_2: getValues("addressLine2"),
    //                 city: getValues("city"),
    //                 postalCode: getValues("postalCode"),
    //             },
    //             leaderId: getValues("leaderNic"),
    //             state: "verified",
    //         };
    
    //         formData.append("party", JSON.stringify(partyDetails));
    
    //         if (constitution) formData.append("files", getValues("constitution"));
    //         if (logo) formData.append("files", getValues("logo"));
    //         if (membership) formData.append("files", getValues("membership"));
    //         if (financial) formData.append("files", getValues("financial"));
    //         if (leadership) formData.append("files", getValues("leadership"));
    
    //         try {
    //             const token = KeycloakService.getToken();
    
    //             // Show loading SweetAlert2 modal
    //             MySwal.fire({
    //                 title: 'Submitting your application...',
    //                 html: '<div class="spinner"></div>',
    //                 allowOutsideClick: false,
    //                 showConfirmButton: false,
    //                 didOpen: () => {
    //                     MySwal.showLoading(); // Display the SweetAlert2 spinner
    //                 },
    //             });
    
    //             const response = await axios.post('http://localhost:5003/api/party', formData, {
    //                 headers: {
    //                     'Authorization': `Bearer ${token}`,
    //                     'Content-Type': 'multipart/form-data',
    //                 },
    //             });
    
    //             if ([200, 201].includes(response.status)) {
    //                 MySwal.fire({
    //                     title: 'Application Submitted Successfully!',
    //                     icon: 'success',
    //                     confirmButtonText: 'OK',
    //                 });
    //                 reset(); // Reset the form
    //                 handleBack(); // Go to the previous step
    //                 setIsLeaderVerified(false); // Reset leader verification
    //             } else {
    //                 MySwal.fire({
    //                     title: 'Error!',
    //                     text: response.data || 'An error occurred while submitting the application.',
    //                     icon: 'error',
    //                     confirmButtonText: 'OK',
    //                 });
    //             }
    //         } catch (error) {
    //             MySwal.fire({
    //                 title: 'Error!',
    //                 text: error.response ? error.response.data : 'An error occurred.',
    //                 icon: 'error',
    //                 confirmButtonText: 'OK',
    //             });
    //         }
    //     };
    
    //     const result = await confirmSubmission();
    //     if (result.isConfirmed) {
    //         handleClose(); // Close the form modal immediately
    //         await submitPartyData(data);
    //     } else {
    //         console.log('Submission canceled by the user.');
    //     }
    // };

    const onSubmit = async (partyData) => {
        const formData = new FormData();
    
        const partyDetails = {
            partyName: getValues("partyName"),
            abbreviation: getValues("abbreviation"),
            foundedDate: getValues("foundedDate"),
            address: {
                addressLine_1: getValues("addressLine1"),
                addressLine_2: getValues("addressLine2"),
                city: getValues("city"),
                postalCode: getValues("postalCode"),
            },
            leaderId: getValues("leaderNic"),
            state: "pending verification",
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
    
            const response = await axios.post('http://localhost:5003/api/party', formData, {
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
                });
    
                reset(); // Reset the form
                handleBack(); // Go to the previous step
                setIsLeaderVerified(false); // Reset leader verification
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
    };
    
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
                    <TextField
                        fullWidth
                        label="City"
                        variant="outlined"
                        {...register("city", { required: true })}
                        margin="normal"
                        padding="normal"
                        sx={{ fontSize: '1rem', fontWeight: 'bold' }}
                        required
                    />
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
                        onBlur={handleLeaderNicBlur}
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
