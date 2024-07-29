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
    Stack,
    Divider,
    IconButton,
    DialogTitle
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

export const EditPartyMemberContactInfo = ({ open, handleClose }) => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        // Handle form submission here
        console.log(data);
        handleClose();
    };

    return (
        <React.Fragment>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Edit Contact Information
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
                            {/* Contact Information */}
                            <Box>
                                <Stack spacing={2}>
                                    <Box>
                                        <TextField
                                            label="Residence Address"
                                            variant="outlined"
                                            fullWidth
                                            defaultValue="No. 117, Wijerama Road, Colombo 07."
                                            {...register("residenceAddress")}
                                        />
                                    </Box>
                                    <Box>
                                        <TextField
                                            label="Office Address"
                                            variant="outlined"
                                            fullWidth
                                            defaultValue="No. 117, Wijerama Mawatha, Colombo 07."
                                            {...register("officeAddress")}
                                        />
                                    </Box>
                                </Stack>
                            </Box>

                            <Box my={4} />
                            <Divider />
                            <Box my={4} />

                            <Box>
                                <Stack spacing={2}>
                                    <Box>
                                        <TextField
                                            label="Personal Email"
                                            variant="outlined"
                                            fullWidth
                                            defaultValue="rajapaksa_m@parliament.lk"
                                            {...register("personalEmail")}
                                        />
                                    </Box>
                                    <Box>
                                        <TextField
                                            label="Office Email"
                                            variant="outlined"
                                            fullWidth
                                            {...register("officeEmail")}
                                        />
                                    </Box>
                                </Stack>
                            </Box>

                            <Box my={4} />
                            <Divider />
                            <Box my={4} />

                            <Stack>
                                <Stack spacing={2}>
                                    <Box>
                                        <TextField
                                            label="Residence Mobile"
                                            variant="outlined"
                                            fullWidth
                                            defaultValue="011 4354754 / 011 2333066"
                                            {...register("residenceMobile")}
                                        />
                                    </Box>
                                    <Box>
                                        <TextField
                                            label="Office Mobile"
                                            variant="outlined"
                                            fullWidth
                                            {...register("officeMobile")}
                                        />
                                    </Box>
                                </Stack>
                            </Stack>

                            <Box my={4} />
                            <Divider />
                            <Box my={4} />

                            {/* Secretary Contact Details */}
                            <Stack spacing={2} mb={3}>
                                <Box>
                                    <TextField
                                        label="Secretary Name"
                                        variant="outlined"
                                        fullWidth
                                        defaultValue="Mr. A.M. Rathnayake/Mr. Upul Dissanayake"
                                        {...register("secretaryName")}
                                    />
                                </Box>
                                <Box>
                                    <TextField
                                        label="Secretary Email"
                                        variant="outlined"
                                        fullWidth
                                        defaultValue="am.rathnayake5@gmail.com, upuldissanayakasr@gmail.com"
                                        {...register("secretaryEmail")}
                                    />
                                </Box>
                                <Box>
                                    <TextField
                                        label="Secretary Mobile"
                                        variant="outlined"
                                        fullWidth
                                        defaultValue="071 4397076"
                                        {...register("secretaryMobile")}
                                    />
                                </Box>
                                <Box>
                                    <TextField
                                        label="Secretary Telephone"
                                        variant="outlined"
                                        fullWidth
                                        defaultValue="011 2303279 / 011 2860770"
                                        {...register("secretaryTelephone")}
                                    />
                                </Box>
                            </Stack>
                        </Box>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleSubmit(onSubmit)}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
};
