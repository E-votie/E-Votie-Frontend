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
    IconButton,
    DialogTitle,
    Stack,
    Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { useForm } from "react-hook-form";

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

export const AddNewPromise = ({ open, handleClose }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        // Handle form submission here
        console.log(data);
        handleClose();
    };

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Add New Promise
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
                    <Typography variant="h6" gutterBottom>
                        Promise Details
                    </Typography>
                    <Stack spacing={2}>
                        <TextField
                            variant="outlined"
                            label="Topic"
                            fullWidth
                            {...register("topic")}
                            defaultValue="Jan 09"
                        />
                        <TextField
                            variant="outlined"
                            label="Promise Description"
                            fullWidth
                            multiline
                            rows={4}
                            {...register("promiseDescription")}
                            defaultValue="Parliament to meet for the first time after common opposition candidate Maithripala Sirisena is elected president on 8th January 2015"
                        />
                    </Stack>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={handleSubmit(onSubmit)}>Add Promise</Button>
            </DialogActions>
        </BootstrapDialog>
    );
};
