import React from 'react';
import { Box, Typography, IconButton, Tooltip, Card, CardContent, Grid, Chip } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import { EditPartyMemberBiography } from './EditPartyMemberBiography';

export const PartyMemberBiography = ({ partyMember }) => {
    const [openEditBiographyModal, setOpenEditBiographyModal] = React.useState(false);

    const handleOpenEditBiographyModal = () => setOpenEditBiographyModal(true);
    const handleCloseEditBiographyModal = () => setOpenEditBiographyModal(false);

    const InfoItem = ({ label, value }) => (
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="body2" color="text.secondary">{label}:</Typography>
            <Typography variant="body2">{value}</Typography>
        </Box>
    );

    return (
        <Card elevation={3} sx={{ mb: 4 }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h5" component="h2">Biography</Typography>
                    <Tooltip title="Update Biography" arrow>
                        <IconButton onClick={handleOpenEditBiographyModal} color="primary" size="small">
                            <EditNoteIcon />
                        </IconButton>
                    </Tooltip>
                </Box>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Card variant="outlined">
                            <CardContent>
                                <Box display="flex" alignItems="center" mb={2}>
                                    <PersonIcon color="primary" sx={{ mr: 1 }} />
                                    <Typography variant="h6">Personal Information</Typography>
                                </Box>
                                <InfoItem label="Full Name" value={partyMember.name} />
                                <InfoItem label="Current Position" value={partyMember.position} />
                                <InfoItem label="Born" value={`${partyMember.biography.born}, Sri Lanka`} />
                                <InfoItem label="Date of Birth" value={partyMember.biography.dob} />
                                <InfoItem label="Age" value="79" />
                                <InfoItem label="Gender" value={partyMember.biography.gender} />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card variant="outlined">
                            <CardContent>
                                <Box display="flex" alignItems="center" mb={2}>
                                    <SchoolIcon color="primary" sx={{ mr: 1 }} />
                                    <Typography variant="h6">Education</Typography>
                                </Box>
                                {partyMember.biography.schoolEducation.map((item, index) => (
                                    <Chip
                                        key={index}
                                        label={item.school}
                                        variant="outlined"
                                        sx={{ mr: 1, mb: 1 }}
                                    />
                                ))}
                                {partyMember.biography.undergraduateEducation.map((item, index) => (
                                    <Chip
                                        key={index}
                                        label={`Undergraduate: ${item.university}`}
                                        color="primary"
                                        sx={{ mr: 1, mb: 1 }}
                                    />
                                ))}
                                {partyMember.biography.postgraduateEducation.map((item, index) => (
                                    <Chip
                                        key={index}
                                        label={`Postgraduate: ${item.university}`}
                                        color="secondary"
                                        sx={{ mr: 1, mb: 1 }}
                                    />
                                ))}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {openEditBiographyModal && (
                    <EditPartyMemberBiography
                        open={openEditBiographyModal}
                        handleClose={handleCloseEditBiographyModal}
                        partyMember={partyMember}
                    />
                )}
            </CardContent>
        </Card>
    );
};

// import React from 'react';
// import Divider from '@mui/material/Divider';
// import { Box, Typography } from '@mui/material';
// import IconButton from '@mui/material/IconButton';
// import EditNoteIcon from '@mui/icons-material/EditNote';
// import Tooltip from '@mui/material/Tooltip';
// import { EditPartyMemberBiography } from './EditPartyMemberBiography';

// export const PartyMemberBiography = ({partyMember}) => {
//     const [openEditBiographyModal, setOpenEditBiographyModal] = React.useState(false);
//     const [selectedPartyMember, setSelectedPartyMember] = React.useState(null);

//     const handleOpenEditBiographyModal = () => {
//         setSelectedPartyMember(partyMember);
//         setOpenEditBiographyModal(true);
//         console.log("Edit Biography is called");
//     };

//     const handleCloseEditBiographyModal = () => {
//         setOpenEditBiographyModal(false);
//     };


//     return (
//         <div className="pb-2 mb-8">
//             <Box className="flex justify-between">
//                 <Typography variant="h6" color="textSecondary" gutterBottom>
//                     Biography
//                 </Typography>
//                 <Tooltip title="Update Biography" arrow>
//                     <IconButton size="large" onClick={handleOpenEditBiographyModal} color="primary">
//                         <EditNoteIcon />
//                     </IconButton>
//                 </Tooltip>
//             </Box>

//             {/* Edit Biography Modal */}
//             {
//                 openEditBiographyModal && <EditPartyMemberBiography open={openEditBiographyModal} handleClose={handleCloseEditBiographyModal} partyMember={selectedPartyMember}/>
//             }

//             <Divider />

//             <div className="p-4">
//                 {/* Personal Info */}
//                 <Box spacing={2} className="flex gap-3">
//                     <Box className="w-1/2">
//                         <Typography variant="subtitle1" sx={{ backgroundColor: '#e0e0e0', p: 1, fontWeight: 'bold' }} gutterBottom>
//                         Personal
//                         </Typography>
//                         <div className="my-2 flex flex-grow justify-between items-center bg-gray-100 p-2">
//                             <Typography variant="body1">Full Name: </Typography>
//                             <Typography variant="body1">{partyMember.name}</Typography>
//                         </div>
//                         <div className="my-2 flex flex-grow justify-between items-center bg-gray-100 p-2">
//                             <Typography variant="body1">Current Position: </Typography>
//                             <Typography variant="body1">{partyMember.position}</Typography>
//                         </div>
//                         <div className="my-2 flex flex-grow justify-between items-center bg-gray-100 p-2">
//                             <Typography variant="body1">Born: </Typography>
//                             <Typography variant="body1">{partyMember.biography.born}, Sri Lanka</Typography>
//                         </div>
//                         <div className="my-2 flex flex-grow justify-between items-center bg-gray-100 p-2">
//                             <Typography variant="body1">Date Of Birth: </Typography>
//                             <Typography variant="body1">{partyMember.biography.dob}</Typography>
//                         </div>
//                         <div className="my-2 flex flex-grow justify-between items-center bg-gray-100 p-2">
//                             <Typography variant="body1">Age: </Typography>
//                             <Typography variant="body1">79</Typography>
//                         </div>
//                         <div className="my-2 flex flex-grow justify-between items-center bg-gray-100 p-2">
//                             <Typography variant="body1">Gender: </Typography>
//                             <Typography variant="body1">{partyMember.biography.gender}</Typography>
//                         </div>
//                     </Box>
//                     <Box  className="w-1/2">
//                         <Typography variant="subtitle1" sx={{ backgroundColor: '#e0e0e0', p: 1, fontWeight: 'bold' }} gutterBottom>
//                         Education
//                         </Typography>

//                         {
//                         partyMember.biography.schoolEducation.map((item, index) => 
//                             <div key={index} className="my-2 flex flex-grow justify-between items-center bg-gray-100 p-2">
//                                 <Typography variant="body1">School {index + 1}: </Typography>
//                                 <Typography variant="body1">{item.school}</Typography>
//                             </div>
//                         )
//                         }

//                         {
//                         partyMember.biography.undergraduateEducation.map((item, index) => 
//                             <div key={index} className="my-2 flex flex-grow justify-between items-center bg-gray-100 p-2">
//                                 <Typography variant="body1">Undergraduate: </Typography>
//                                 <Typography variant="body1">{item.university}</Typography>
//                             </div>
//                         )
//                         }

//                         {
//                         partyMember.biography.postgraduateEducation.map((item, index) => 
//                             <div key={index} className="my-2 flex flex-grow justify-between items-center bg-gray-100 p-2">
//                                 <Typography variant="body1">Postgraduate: </Typography>
//                                 <Typography variant="body1">{item.university}</Typography>
//                             </div>
//                         )
//                         }
//                     </Box>
//                 </Box>
//             </div>
//         </div>
//     )
// }
