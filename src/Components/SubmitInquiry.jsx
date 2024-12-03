import React, { useState } from 'react';
import axios from 'axios';
import { useForm, Controller } from "react-hook-form";
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill';
import {
    Button,
    Box,
    Dialog,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    Typography,
    IconButton,
    DialogTitle,
    Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import KeycloakService from '../services/KeycloakService';
import { useNavigate } from 'react-router-dom';

export const SubmitInquiry = ({ open, handleClose, partyId }) => {
    const { control, handleSubmit, register, reset } = useForm();
    const [attachments, setAttachments] = useState([]);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const confirmSubmission = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to submit this inquiry? This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Submit',
            cancelButtonText: 'Cancel',
        });
    
        if (!confirmSubmission.isConfirmed) {
            return;
        }
    
        Swal.fire({
            title: 'Submitting Inquiry...',
            text: 'Please wait while we process your request',
            didOpen: () => {
                Swal.showLoading();
            }
        });
    
        try {
            const requestBody = {
                subject: data.subject,
                description: data.inquiryDescription,
                partyId: partyId,
            };
    
            const token = KeycloakService.getToken();
            const response = await axios.post('http://localhost:5003/api/inquiry/submit', requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`                
                }
            });
    
            reset();
            setAttachments([]);
    
            Swal.fire({
                icon: 'success',
                title: 'Inquiry Submitted Successfully!',
                text: response.data.message || 'Your inquiry has been received.',
                confirmButtonText: 'OK'
            }).then(() => {
                handleClose?.();
                window.location.href = `/party/registration/application/${partyId}`;
            });
    
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: error.response?.data?.message || 'An error occurred while submitting your inquiry. Please try again.',
                confirmButtonText: 'Try Again'
            });
        }
    };
    
    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            style={{ zIndex: 1000 }}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Inquiry Submission
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
                    <FormControl fullWidth variant="outlined">
                        <Stack spacing={3}>
                            <Box>
                                <Typography variant="body1">Subject</Typography>
                                <TextField
                                    {...register('subject', { required: 'Subject is required' })}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Box>
                            <Box mb={3}>
                                <Typography variant="body1">Description</Typography>
                                <Controller
                                    name="inquiryDescription"
                                    control={control}
                                    rules={{ required: 'Description is required' }}
                                    render={({ field }) => (
                                        <ReactQuill
                                            value={field.value}
                                            onChange={field.onChange}
                                            modules={modules}
                                            formats={formats}
                                            style={{ height: 200, marginBottom: '2rem' }}
                                            className="custom-quill"
                                        />
                                    )}
                                />
                            </Box>
                        </Stack>
                    </FormControl>
                </form>
            </DialogContent>
            <DialogActions>
                <Button type="submit" onClick={handleSubmit(onSubmit)}>Submit</Button>
            </DialogActions>
        </BootstrapDialog>
    );
};

// Existing modules and formats for ReactQuill
const modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }],
        ['bold', 'italic', 'underline'],
        ['link'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['clean']
    ],
};

const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline',
    'list', 'bullet', 'indent',
    'link', 'image'
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