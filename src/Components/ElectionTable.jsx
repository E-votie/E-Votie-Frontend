import React, { useState, useEffect, useRef } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import ImageTool from '@editorjs/image';
import Checklist from '@editorjs/checklist';
import SimpleImage from "@editorjs/simple-image";
import NestedList from '@editorjs/nested-list';
import LinkTool from '@editorjs/link';
import Embed from '@editorjs/embed';
import Tablepopup from '@editorjs/table';
import Delimiter from '@editorjs/delimiter';
import AttachesTool from '@editorjs/attaches';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ElectionTable({ rows, columns }) {
    const [open, setOpen] = useState(false);
    const [selectedDescription, setSelectedDescription] = useState('');
    const editorInstance = useRef(null);
    const editorRef = useRef(null);

    useEffect(() => {
        if (editorRef.current) {
            editorInstance.current = new EditorJS({
                    holder: editorRef.current,
                    tools: {
                        header: Header,
                        image1: SimpleImage,
                        table: Tablepopup,
                        image: {
                            class: ImageTool,
                            config: {
                                endpoints: {
                                    byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
                                    byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
                                }
                            }
                        },
                        checklist: {
                            class: Checklist,
                            inlineToolbar: true,
                        },

                        list: {
                            class: NestedList,
                            inlineToolbar: true,
                            config: {
                                defaultStyle: 'unordered'
                            },
                        },
                        linkTool: {
                            class: LinkTool,
                            config: {
                                endpoint: 'http://localhost:8008/fetchUrl', // Your backend endpoint for url data fetching,
                            }
                        },
                        embed: {
                            class: Embed,
                            config: {
                                services: {
                                    youtube: true,
                                    coub: true
                                }
                            }
                        },
                        delimiter: Delimiter,
                        attaches: {
                            class: AttachesTool,
                            config: {
                                endpoint: 'http://localhost:8008/uploadFile'
                            }
                        },
                    },
                },
            );


            // Clean up when the component unmounts
            return () => {
                if (editorInstance.current) {
                    editorInstance.current.destroy();
                    editorInstance.current = null;
                }
            };
        }
    }, [open]); // Re-initialize the editor when the dialog opens

    const handleClickOpen = (description) => {
        setSelectedDescription(description);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Card sx={{ minWidth: 650, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    Election Information
                </Typography>
                <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
                    <Table aria-label="election table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column, index) => (
                                    <TableCell
                                        key={index}
                                        align={index === 0 ? 'left' : 'right'}
                                        sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}
                                    >
                                        {column}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {columns.map((column, colIndex) => (
                                        <TableCell
                                            key={colIndex}
                                            align={colIndex === 0 ? 'left' : 'right'}
                                            onClick={() => {
                                                if (column === 'Description') {
                                                    handleClickOpen(row[column]);
                                                }
                                            }}
                                            sx={column === 'Description' ? { cursor: 'pointer' } : {}}
                                        >
                                            {row[column]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        mt: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            borderRadius: '20px',
                            textTransform: 'none',
                            padding: '8px 24px',
                        }}
                    >
                        Next
                    </Button>
                </Box>
            </CardContent>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="sm"
                fullWidth
                sx={{
                    '& .MuiDialog-paper': {
                        borderRadius: '12px',
                        padding: '20px',
                    },
                }}
            >
                <DialogTitle
                    id="alert-dialog-title"
                    sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}
                >
                    Add Description
                </DialogTitle>
                <DialogContent>
                    <div id="editorjs" ref={editorRef} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '4px' }} />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        variant="contained"
                        color="primary"
                        sx={{
                            borderRadius: '20px',
                            textTransform: 'none',
                            padding: '8px 24px',
                        }}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}
