import React from 'react'
import Divider from '@mui/material/Divider';
import { Box, Typography, LinearProgress, Avatar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { DeleteModal } from './DeleteModal';
import { MoreOverMenu } from './MoreOverMenu';
import { EditPartyMemberTerm } from './EditPartyMemberTerm';
import Tooltip from '@mui/material/Tooltip';
import { AddNewPartyMemberTerm } from './AddNewPartyMemberTerm';

const options = [
  'Edit',
  'Delete'
];

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

function ChildModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button onClick={handleOpen}>Open Child Modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 200 }}>
                    <h2 id="child-modal-title">Text in a child modal</h2>
                    <p id="child-modal-description">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    </p>
                    <Button onClick={handleClose}>Close Child Modal</Button>
                </Box>
            </Modal>
        </React.Fragment>
    );
}
  

export const PartyMemberTermsInParliment = ({terms}) => {
    const [openCreateModal, setOpenCreateModal] = React.useState(false);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [openEditModal, setOpenEditModal] = React.useState(false);
    const [selectedTermId, setSelectedTermId] = React.useState(null);
    const [selectedStartDate, setSelectedStartDate] = React.useState(null);
    const [selectedEndDate, setSelectedEndDate] = React.useState(null);
    const [selectedParty, setSelectedParty] = React.useState(null);

    const handleOpenCreateNewTerm = () => {
        setOpenCreateModal(true);
    };
    const handleCloseCloseCreateNewTerm = () => {
        setOpenCreateModal(false);
    };

    const handleOpenEditTermModal = (term) => {
        setSelectedTermId(term.termId);
        setSelectedStartDate(term.startDate);
        setSelectedEndDate(term.endDate);
        setSelectedParty(term.party);
        setOpenEditModal(true);
    };

    const handleCloseEditTermModal = () => {
        setSelectedTermId(null);
        setSelectedStartDate(null);
        setSelectedEndDate(null);
        setSelectedParty(null);
        setOpenEditModal(false);
    };

    const handleOpenDeleteTerm = (termId) => {
        setSelectedTermId(termId);
        setOpenDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setSelectedTermId(null);
        setOpenDeleteModal(false);
    };


    return (
        <div className="pb-2 mb-8">
            <div className="flex justify-between items-center">
                <Typography variant="h6" color="textSecondary" gutterBottom>
                    Terms in parliament
                </Typography>  
                <Tooltip title="Add New Term" arrow>
                    <IconButton aria-label="create" size='large' color='primary' onClick={handleOpenCreateNewTerm}>
                        <AddCircleIcon fontSize="200px"/>
                    </IconButton>
                </Tooltip>
            </div>
            <Divider />

            {/* Set of Terms */}
            <div className='p-4'>
                <Box spacing={2}>
                    {/* Set of Past Terms */}
                    {terms.map((term, index) => (
                        <div key={index} className="my-2 flex flex-grow justify-between items-center bg-gray-100 p-2 ">
                            {/* Time Period */}
                            <div className="w-1/5" >
                                <Typography variant="body1">{term.dateRange}</Typography>
                            </div>
                            {/* Bar */}
                            <div className="w-1/5">
                                <LinearProgress
                                    variant="determinate"
                                    value={term.progress}
                                    sx={{ height: 10, borderRadius: 5 }}
                                />
                            </div>
                            {/* Party Logo and Party Name*/}
                            <div className="w-2/5" >
                                <Stack direction="row" className='flex gap-1 items-center'>
                                    <Avatar src={term.logo} alt="Party Logo" />
                                    <Typography variant="body1">{term.party}</Typography>
                                </Stack>
                            </div>
                            {/* Delete and Edit Buttons */}
                            <div className="w-fit" >
                                <MoreOverMenu options={options} onEdit={() => handleOpenEditTermModal(term)} onDelete={() => handleOpenDeleteTerm(term.termId)}/>
                            </div>
                        </div>                        
                    ))}
                    
                    {/* Add New Term Modal */}
                    {
                        openCreateModal && <AddNewPartyMemberTerm open={openCreateModal} handleClose={handleCloseCloseCreateNewTerm} />
                    }
                    {/* Edit Modal */}
                    {
                        openEditModal && <EditPartyMemberTerm open={openEditModal} handleClose={handleCloseEditTermModal} startDate={selectedStartDate} endDate={selectedEndDate} party={selectedParty}/>
                    }

                    {/* Delete Modal */}
                    {
                        openDeleteModal && <DeleteModal open={openDeleteModal} handleClose={handleCloseDeleteModal} message="Are You Sure Want To Delete This Term?" action="delete term" termId={selectedTermId}/>
                    }
                </Box>
            </div>
        </div>
    )
}

