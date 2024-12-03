import React, { useState } from 'react';
import { Drawer, IconButton, Badge, Tooltip, Divider, Box, Typography, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { styled } from '@mui/system';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { PartyMemberRequestCard } from './PartyMemberRequestCard';
import { AddNewPartyMemberWithNic } from './AddNewPartyMemberWithNic';
import { SendNomineesModal } from './SendNominiees';
import SendIcon from '@mui/icons-material/Send';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 350,
    backgroundColor: theme.palette.background.default,
  },
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: 'transparent',
  boxShadow: 'none',
  '&:before': {
    display: 'none',
  },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(1),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1.5),
  fontWeight: 'bold',
}));

export const PartyMemberSideBar = ({ party, partyRequests }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openAddPolitician, setOpenAddPolitician] = useState(false);
  const [openSendNomineesModal, setOpenSendNomineesModal] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const handleOpenAddPolitician = () => setOpenAddPolitician(true);
  const handleCloseAddPolitician = () => setOpenAddPolitician(false);

  const handleOpenSendNominations = () => setOpenSendNomineesModal(true);
  const handleCloseNomineesModal = () => setOpenSendNomineesModal(false);

  return (
    <Box style={{ zIndex: 500 }}>
      <Tooltip title="New Party Members" arrow>
        <IconButton size="large" onClick={toggleDrawer(true)} color="primary">
          <Badge badgeContent={4} color="error">
            <PeopleAltIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      
      <StyledDrawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 2 }}>
          
          <StyledButton
            variant="contained"
            startIcon={<SendIcon />}
            onClick={handleOpenSendNominations}
            sx={{ mb: 2 }}
          >
            Send Nominations
          </StyledButton>

          <StyledButton
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenAddPolitician}
            sx={{ mb: 2 }}
          >
            Add New Politician
          </StyledButton>

          <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
            {['Sent Requests'].map((section, index) => (
              <StyledAccordion key={index}>
                <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1">{section}</Typography>
                </StyledAccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {partyRequests.map((request, idx) => (
                      <PartyMemberRequestCard
                        key={idx}
                        partyId={partyRequests.registrationId}
                        request={request}
                        ownership={"party"}
                      />
                    ))}
                  </Box>
                </AccordionDetails>
              </StyledAccordion>
            ))}
          </Box>

        </Box>
      </StyledDrawer>

      <AddNewPartyMemberWithNic open={openAddPolitician} handleClose={handleCloseAddPolitician} handleCloseSideBar={setIsDrawerOpen} partyInfo={party} />
      <SendNomineesModal open={openSendNomineesModal} handleClose={handleCloseNomineesModal} partyId={party.registrationId} />
    </Box>
  );
};