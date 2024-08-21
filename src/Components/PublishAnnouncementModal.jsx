import React, { useState } from 'react';
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
    Stack,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { useForm, Controller } from "react-hook-form";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(3),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(2),
    },
    '& .MuiPaper-root': {
        width: '80%',
        maxWidth: '600px',
    },
}));

const FormSection = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(3),
}));

const customStyle = `
    .custom-quill .ql-editor {
        font-size: 1rem;
        line-height: 1.5;
        min-height: 150px;
    }
`;

export const PublishAnnouncementModal = ({ open, handleClose }) => {
    const { control, handleSubmit, register } = useForm();
    const [attachments, setAttachments] = useState([]);

    const onSubmit = (data) => {
        console.log(data, attachments);
        handleClose();
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setAttachments(files);
    };

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Publish Announcement
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
                <Stack spacing={3}>
                    <FormSection>
                        <Typography variant="subtitle1" gutterBottom>
                            Subject
                        </Typography>
                        <Controller
                            name="subject"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />
                    </FormSection>

                    <FormSection>
                        <Typography variant="subtitle1" gutterBottom>
                            Announcement
                        </Typography>
                        <Controller
                            name="announcement"
                            control={control}
                            render={({ field }) => (
                                <ReactQuill
                                    {...field}
                                    modules={modules}
                                    formats={formats}
                                    className="custom-quill"
                                />
                            )}
                        />
                    </FormSection>

                    <FormSection>
                        <Typography variant="subtitle1" gutterBottom>
                            Attachments
                        </Typography>
                        <Button
                            component="label"
                            variant="contained"
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload file(s)
                            <VisuallyHiddenInput 
                                type="file" 
                                multiple 
                                onChange={handleFileChange}
                                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx" 
                                {...register("attachments")}
                            />
                        </Button>
                        {attachments.length > 0 && (
                            <Box mt={2}>
                                <Typography variant="body2">Attached files:</Typography>
                                <ul>
                                    {attachments.map((file, index) => (
                                        <li key={index}>{file.name}</li>
                                    ))}
                                </ul>
                            </Box>
                        )}
                    </FormSection>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={handleSubmit(onSubmit)}>Publish</Button>
            </DialogActions>
            <style>{customStyle}</style>
        </BootstrapDialog>
    );
};

// React Quill modules and formats remain the same
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