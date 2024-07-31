import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Divider from '@mui/material/Divider';
import { PartyMemberRequestCard } from './PartyMemberRequestCard';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { AddNewPartyMemberWithNic } from './AddNewPartyMemberWithNic';

export const PartyMemberSideBar = ({ requestList }) => {
  const [state, setState] = React.useState({
    right: false,
  });
  const [openAddPolitician, setOpenAddPolitician] = React.useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const handleOpenAddPolitician = () => {
    setOpenAddPolitician(true);
  };

  const handleCloseAddPolitician = () => {
    setOpenAddPolitician(false);
  };

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Tooltip title="New Party Members" arrow>
            <IconButton size="large" onClick={toggleDrawer(anchor, true)} aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <PeopleAltIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            PaperProps={{ style: { width: 350 } }}
          >
            <Box sx={{height: '100%', overflowY: 'auto' }}>
              {/* Add New Politician Button */}
              <Box sx={{ p: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  fullWidth
                  onClick={handleOpenAddPolitician}
                >
                  Add New Politician
                </Button>
              </Box>
              <Divider />

              {/* Received Requests */}
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="received-requests-content"
                  id="received-requests-header"
                >
                  <Typography variant="body1">Received Requests</Typography>
                </AccordionSummary>
                <div className='flex flex-col gap-2 py-2 px-6'>
                  {requestList.map((politician, index) => (
                      <PartyMemberRequestCard key={index} politician={politician} requestState="received request" />
                  ))}
                </div>
              </Accordion>
              <Divider />

              {/* Sent Requests */}
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="sent-requests-content"
                  id="sent-requests-header"
                >
                  <Typography variant="body1">Sent Requests</Typography>
                </AccordionSummary>
                <div className='flex flex-col gap-2 py-2 px-6'>
                    {requestList.map((politician, index) => (
                        <PartyMemberRequestCard key={index} politician={politician} requestState="sent request" />
                    ))}
                </div>
              </Accordion>
              <Divider />

              {/* All Politicians */}
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="sent-requests-content"
                  id="sent-requests-header"
                >
                  <Typography variant="body1">All Politicians</Typography>
                </AccordionSummary>
                <div className='flex flex-col gap-2 py-2 px-6'>
                    {requestList.map((politician, index) => (
                        <PartyMemberRequestCard key={index} politician={politician} requestState="new politician" />
                    ))}
                </div>
              </Accordion>
              <Divider />
            </Box>
          </Drawer>

          {/* Add New Politician Modal */}
          <AddNewPartyMemberWithNic open={openAddPolitician} handleClose={handleCloseAddPolitician} />
        </React.Fragment>
      ))}
    </div>
  );
};