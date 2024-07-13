import React from 'react';
import Divider from '@mui/material/Divider';
import { Box, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Tooltip from '@mui/material/Tooltip';
import { EditPartyMemberBiography } from './EditPartyMemberBiography';

export const PartyMemberBiography = ({partyMember}) => {
    const [editBiography, setEditBiography] = React.useState(false);
    const [selectedPartyMember, setSelectedPartyMember] = React.useState(null);

    const handleOpenEditBiographyModal = () => {
        setSelectedPartyMember(partyMember);
        setEditBiography(true);
        console.log("Edit Biography is called");
    };

    const handleCloseEditBiographyModal = () => {
        setEditBiography(false);
    };


    return (
        <div className="pb-2 mb-8">
            <Box className="flex justify-between">
                <Typography variant="h6" color="textSecondary" gutterBottom>
                    Biography
                </Typography>
                <Tooltip title="Update Biography" arrow>
                    <IconButton onClick={handleOpenEditBiographyModal} color="primary">
                        <EditNoteIcon />
                    </IconButton>
                </Tooltip>
            </Box>

            {/* Edit Biography Modal */}
            {
                editBiography && <EditPartyMemberBiography open={editBiography} handleClose={handleCloseEditBiographyModal} partyMember={selectedPartyMember}/>
            }

            <Divider />

            <div className="p-4">
                {/* Personal Info */}
                <Box spacing={2} className="flex gap-3">
                    <Box className="w-1/2">
                        <Typography variant="subtitle1" sx={{ backgroundColor: '#e0e0e0', p: 1, fontWeight: 'bold' }} gutterBottom>
                        Personal
                        </Typography>
                        <div className="my-2 flex flex-grow justify-between items-center bg-gray-100 p-2">
                            <Typography variant="body1">Full Name: </Typography>
                            <Typography variant="body1">{partyMember.name}</Typography>
                        </div>
                        <div className="my-2 flex flex-grow justify-between items-center bg-gray-100 p-2">
                            <Typography variant="body1">Current Position: </Typography>
                            <Typography variant="body1">{partyMember.position}</Typography>
                        </div>
                        <div className="my-2 flex flex-grow justify-between items-center bg-gray-100 p-2">
                            <Typography variant="body1">Born: </Typography>
                            <Typography variant="body1">{partyMember.biography.born}, Sri Lanka</Typography>
                        </div>
                        <div className="my-2 flex flex-grow justify-between items-center bg-gray-100 p-2">
                            <Typography variant="body1">Date Of Birth: </Typography>
                            <Typography variant="body1">{partyMember.biography.dob}</Typography>
                        </div>
                        <div className="my-2 flex flex-grow justify-between items-center bg-gray-100 p-2">
                            <Typography variant="body1">Age: </Typography>
                            <Typography variant="body1">79</Typography>
                        </div>
                        <div className="my-2 flex flex-grow justify-between items-center bg-gray-100 p-2">
                            <Typography variant="body1">Gender: </Typography>
                            <Typography variant="body1">{partyMember.biography.gender}</Typography>
                        </div>
                    </Box>
                    <Box  className="w-1/2">
                        <Typography variant="subtitle1" sx={{ backgroundColor: '#e0e0e0', p: 1, fontWeight: 'bold' }} gutterBottom>
                        Education
                        </Typography>

                        {
                        partyMember.biography.schoolEducation.map((item, index) => 
                            <div key={index} className="my-2 flex flex-grow justify-between items-center bg-gray-100 p-2">
                                <Typography variant="body1">School {index + 1}: </Typography>
                                <Typography variant="body1">{item.school}</Typography>
                            </div>
                        )
                        }

                        {
                        partyMember.biography.undergraduateEducation.map((item, index) => 
                            <div key={index} className="my-2 flex flex-grow justify-between items-center bg-gray-100 p-2">
                                <Typography variant="body1">Undergraduate: </Typography>
                                <Typography variant="body1">{item.university}</Typography>
                            </div>
                        )
                        }

                        {
                        partyMember.biography.postgraduateEducation.map((item, index) => 
                            <div key={index} className="my-2 flex flex-grow justify-between items-center bg-gray-100 p-2">
                                <Typography variant="body1">Postgraduate: </Typography>
                                <Typography variant="body1">{item.university}</Typography>
                            </div>
                        )
                        }
                    </Box>
                </Box>
            </div>
        </div>
    )
}
