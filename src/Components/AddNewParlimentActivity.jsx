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

export const AddNewParlimentActivity = ({ open, handleClose, partyInfo }) => {
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
                    <Typography variant="h6" gutterBottom>
                        Hansard Details
                    </Typography>
                    <Stack spacing={2}>
                        <TextField
                            variant="outlined"
                            label="Hansard Code"
                            fullWidth
                            {...register("hansardCode")}
                            defaultValue="311-6"
                        />
                        <TextField
                            variant="outlined"
                            label="Date"
                            fullWidth
                            type="date"
                            {...register("date")}
                            defaultValue="2024-02-22"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            variant="outlined"
                            label="Method of Contribution"
                            fullWidth
                            {...register("methodOfContribution")}
                            defaultValue="Oral Contribution"
                        />
                        <TextField
                            variant="outlined"
                            label="Topic"
                            fullWidth
                            {...register("topic")}
                            defaultValue="Governance, Administration and Parliamentary Affairs"
                        />
                        <TextField
                            variant="outlined"
                            label="Page Number"
                            fullWidth
                            {...register("pageNumber")}
                            defaultValue="Page 24"
                        />
                    </Stack>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleSubmit(onSubmit)}>
                    Save changes
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
};
