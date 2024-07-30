import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const DeleteModal = ({open, handleClose, message, action, termId, topicId, userId}) => {

    switch (action) {
        case "delete term":
            console.log("Term is deleted");
        case "delete topic":
            console.log("Topic is deleted");
    }

    return (
    <React.Fragment>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {message}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {termId}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleClose} autoFocus>
                Agree
                </Button>
            </DialogActions>
        </Dialog>
    </React.Fragment>
    );
}
