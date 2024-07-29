import React, { useState } from 'react';
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
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { useForm, Controller } from "react-hook-form";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill's CSS

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

const customStyle = `
    .custom-quill .ql-editor {
        font-size: 1rem; /* Adjust this value to match the body1 font size */
        line-height: 1.5;
    }
`;

export const SubmitInquiry = ({ open, handleClose }) => {
    const { control, handleSubmit, register } = useForm();
    const [attachments, setAttachments] = useState([]);

    const onSubmit = (data) => {
        // Handle form submission here
        console.log(data, attachments);
        handleClose();
    };

    const handleFileChange = (event) => {
        console.log("handleFileChange called");
        try {
            const files = Array.from(event.target.files);
            console.log("Files selected:", files);
            setAttachments(files);
            console.log("Attachments updated:", files);
        } catch (error) {
            console.error("Error in handleFileChange:", error);
        }
    };

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
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
                <FormControl fullWidth variant="outlined" margin='normal'>
                    <Stack spacing={3}>
                        <Box>
                            <Typography variant="body1" gutterBottom>
                            Subject
                            </Typography>
                            <TextField
                                variant="outlined"
                                fullWidth
                            />
                        </Box>
                        <Box>
                            <Typography variant="body1" gutterBottom>
                            Description
                            </Typography>
                            <Controller
                                name="inquiryDescription"
                                control={control}
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

                        <Box>                        
                            <Typography variant="body1" gutterBottom>
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
                    </Stack>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button  onClick={handleSubmit(onSubmit)}>Submit</Button>
            </DialogActions>
            <style>
                {customStyle}
            </style>
        </BootstrapDialog>
    );
};

// React Quill modules and formats
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
