import React from 'react';
import { Box, Grid, Typography, Card, CardContent, IconButton, Tooltip, Chip } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import { EditPartyMemberContactInfo } from './EditPartyMemberContactInfo';

export const PartyMemberContactInfo = ({ contactDetails }) => {
    const [openEditContactInfoModal, setOpenEditContactInfoModal] = React.useState(false);

    const handleOpentContactInfoModal = () => setOpenEditContactInfoModal(true);
    const handleCloseEditContactInfoModal = () => setOpenEditContactInfoModal(false);

    const ContactItem = ({ icon, primary, secondary }) => (
        <Box display="flex" alignItems="center" mb={1}>
            {icon}
            <Box ml={2}>
                <Typography variant="body2" color="text.secondary">{primary}</Typography>
                <Typography variant="body1">{secondary}</Typography>
            </Box>
        </Box>
    );

    return (
        <Card elevation={3} sx={{ mb: 4 }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h5" component="h2">Contact Information</Typography>
                    <Tooltip title="Update Contact Information" arrow>
                        <IconButton onClick={handleOpentContactInfoModal} color="primary" size="small">
                            <EditNoteIcon />
                        </IconButton>
                    </Tooltip>
                </Box>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6" gutterBottom>Address</Typography>
                                <ContactItem 
                                    icon={<HomeIcon color="action" />}
                                    primary="Residence"
                                    secondary={contactDetails.address.residence}
                                />
                                <ContactItem 
                                    icon={<BusinessIcon color="action" />}
                                    primary="Office"
                                    secondary={contactDetails.address.office}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6" gutterBottom>Contact</Typography>
                                <ContactItem 
                                    icon={<EmailIcon color="action" />}
                                    primary="Personal Email"
                                    secondary={contactDetails.email.personal}
                                />
                                <ContactItem 
                                    icon={<EmailIcon color="action" />}
                                    primary="Office Email"
                                    secondary={contactDetails.email.office}
                                />
                                <ContactItem 
                                    icon={<PhoneIcon color="action" />}
                                    primary="Residence Phone"
                                    secondary={contactDetails.mobile.residence}
                                />
                                <ContactItem 
                                    icon={<PhoneIcon color="action" />}
                                    primary="Office Phone"
                                    secondary={contactDetails.mobile.office}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6" gutterBottom>Secretary</Typography>
                                <Box display="flex" flexWrap="wrap" gap={1}>
                                    <Chip icon={<PersonIcon />} label={`Name: ${contactDetails.secretary.name}`} variant="outlined" />
                                    <Chip icon={<EmailIcon />} label={`Email: ${contactDetails.secretary.email}`} variant="outlined" />
                                    <Chip icon={<PhoneIcon />} label={`Mobile: ${contactDetails.secretary.mobile}`} variant="outlined" />
                                    <Chip icon={<PhoneIcon />} label={`Telephone: ${contactDetails.secretary.telephone}`} variant="outlined" />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <EditPartyMemberContactInfo 
                    open={openEditContactInfoModal} 
                    handleClose={handleCloseEditContactInfoModal}
                />
            </CardContent>
        </Card>
    );
};

// import React from 'react'
// import Divider from '@mui/material/Divider';
// import { Box, Grid, Typography} from '@mui/material';
// import { EditPartyMemberContactInfo } from './EditPartyMemberContactInfo';
// import IconButton from '@mui/material/IconButton';
// import EditNoteIcon from '@mui/icons-material/EditNote';
// import Tooltip from '@mui/material/Tooltip';

// export const PartyMemberContactInfo = ({contactDetails}) => {
//     const [openEditContactInfoModal, setOpenEditContactInfoModal] = React.useState(false);

//     const handleOpentContactInfoModal = () => {
//         setOpenEditContactInfoModal(true);
//     };

//     const handleCloseEditContactInfoModal = () => {
//         setOpenEditContactInfoModal(false);
//     };

//     return (
//     <div className="pb-2 mb-8">
//         <Box className="flex justify-between items-center">
//             <Typography variant="h6" color="textSecondary" gutterBottom>
//             Contact
//             </Typography> 
//             <Tooltip title="Update Contact Information" arrow>
//                 <IconButton onClick={handleOpentContactInfoModal} color="primary">
//                     <EditNoteIcon />
//                 </IconButton>
//             </Tooltip>
//         </Box>

//         {/* Edit Contact Info Modal */}
//         {
//             <EditPartyMemberContactInfo open={openEditContactInfoModal} handleClose={handleCloseEditContactInfoModal}/>
//         }
//         <Divider />

//         <Box p={2}>
//             <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                 <Typography variant="subtitle1" sx={{ backgroundColor: '#e0e0e0', p: 1, fontWeight: 'bold' }}>
//                     Address
//                 </Typography>
//                 <Box sx={{ p: 1 }}>
//                     <Typography>Residence: {contactDetails.address.residence}</Typography>
//                     <Typography>Office: {contactDetails.address.office}</Typography>
//                 </Box>
//                 </Grid>
//                 <Grid item xs={12}>
//                 <Typography variant="subtitle1" sx={{ backgroundColor: '#e0e0e0', p: 1, fontWeight: 'bold' }}>
//                     Email
//                 </Typography>
//                 <Box sx={{ p: 1 }}>
//                     <Typography>Personal: {contactDetails.email.personal}</Typography>
//                     <Typography>Office: {contactDetails.email.office}</Typography>
//                 </Box>
//                 </Grid>
//                 <Grid item xs={12}>
//                 <Typography variant="subtitle1" sx={{ backgroundColor: '#e0e0e0', p: 1, fontWeight: 'bold' }}>
//                     Mobile
//                 </Typography>
//                 <Box sx={{ p: 1 }}>
//                     <Typography>Residence: {contactDetails.mobile.residence}</Typography>
//                     <Typography>Office: {contactDetails.mobile.office}</Typography>
//                 </Box>
//                 </Grid>
//                 <Grid item xs={12}>
//                 <Typography variant="subtitle1" sx={{ backgroundColor: '#e0e0e0', p: 1, fontWeight: 'bold' }}>
//                     Contact Details of the Secretary
//                 </Typography>
//                 <Box sx={{ p: 1 }}>
//                     <Typography>Name: {contactDetails.secretary.name}</Typography>
//                     <Typography>Email: {contactDetails.secretary.email}</Typography>
//                     <Typography>Mobile: {contactDetails.secretary.mobile}</Typography>
//                     <Typography>Telephone: {contactDetails.secretary.telephone}</Typography>
//                 </Box>
//                 </Grid>
//             </Grid>
//         </Box>
//     </div>  
//     )
// }
