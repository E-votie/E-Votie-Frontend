import React from 'react'
import Divider from '@mui/material/Divider';
import { Box, Grid, Typography} from '@mui/material';
import { EditPartyMemberContactInfo } from './EditPartyMemberContactInfo';
import IconButton from '@mui/material/IconButton';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Tooltip from '@mui/material/Tooltip';

export const PartyMemberContactInfo = ({contactDetails}) => {
    const [openEditContactInfoModal, setOpenEditContactInfoModal] = React.useState(false);

    const handleOpentContactInfoModal = () => {
        setOpenEditContactInfoModal(true);
    };

    const handleCloseEditContactInfoModal = () => {
        setOpenEditContactInfoModal(false);
    };

    return (
    <div className="pb-2 mb-8">
        <Box className="flex justify-between items-center">
            <Typography variant="h6" color="textSecondary" gutterBottom>
            Contact
            </Typography> 
            <Tooltip title="Update Contact Information" arrow>
                <IconButton onClick={handleOpentContactInfoModal} color="primary">
                    <EditNoteIcon />
                </IconButton>
            </Tooltip>
        </Box>

        {/* Edit Contact Info Modal */}
        {
            <EditPartyMemberContactInfo open={openEditContactInfoModal} handleClose={handleCloseEditContactInfoModal}/>
        }
        <Divider />

        <Box p={2}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ backgroundColor: '#e0e0e0', p: 1, fontWeight: 'bold' }}>
                    Address
                </Typography>
                <Box sx={{ p: 1 }}>
                    <Typography>Residence: {contactDetails.address.residence}</Typography>
                    <Typography>Office: {contactDetails.address.office}</Typography>
                </Box>
                </Grid>
                <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ backgroundColor: '#e0e0e0', p: 1, fontWeight: 'bold' }}>
                    Email
                </Typography>
                <Box sx={{ p: 1 }}>
                    <Typography>Personal: {contactDetails.email.personal}</Typography>
                    <Typography>Office: {contactDetails.email.office}</Typography>
                </Box>
                </Grid>
                <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ backgroundColor: '#e0e0e0', p: 1, fontWeight: 'bold' }}>
                    Mobile
                </Typography>
                <Box sx={{ p: 1 }}>
                    <Typography>Residence: {contactDetails.mobile.residence}</Typography>
                    <Typography>Office: {contactDetails.mobile.office}</Typography>
                </Box>
                </Grid>
                <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ backgroundColor: '#e0e0e0', p: 1, fontWeight: 'bold' }}>
                    Contact Details of the Secretary
                </Typography>
                <Box sx={{ p: 1 }}>
                    <Typography>Name: {contactDetails.secretary.name}</Typography>
                    <Typography>Email: {contactDetails.secretary.email}</Typography>
                    <Typography>Mobile: {contactDetails.secretary.mobile}</Typography>
                    <Typography>Telephone: {contactDetails.secretary.telephone}</Typography>
                </Box>
                </Grid>
            </Grid>
        </Box>
    </div>  
    )
}


