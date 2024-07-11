import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ConfirmationModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="filled" onClick={handleOpen} >Cancel</Button>
      <Button onClick={handleOpen} variant="contained">Publish</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <div>
            Are you sure want to continue?
          </div>
          <Stack>
            <Button onClick={handleClose} variant="contained" color="error">No</Button>
            <Button onClick={handleClose} variant="contained" color="success">Yes</Button>
          </Stack>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export const PublishAnnouncementModal = ({open}) => {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <div className='announcementType'>
            <div>
              Announcement Type
            </div>
            <div>

            </div>
          </div>
          <div className='announcement'>
            <div>
              Announcement
            </div>
            <div>
              
            </div>
          </div>
          <ConfirmationModal />
        </Box>
      </Modal>
    </div>
  );
}
