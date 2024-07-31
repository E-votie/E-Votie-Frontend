import React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Divider } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import UpdateIcon from '@mui/icons-material/Update';

const options = [
  'Edit',
  'Delete'
];

const getIcon = (option) => {
  switch (option) {
      case "Edit":
          return <EditIcon sx={{fontSize: 20}}/>;
      case "Delete":
          return <DeleteIcon sx={{fontSize: 20}}/>;
      case "View Join Requests":
        return <PeopleAltIcon sx={{fontSize: 20}}/>;
      case "Add New Party Member":
        return <PersonAddIcon sx={{fontSize: 20}}/>;
        case "Add New Promise":
          return <AddIcon sx={{fontSize: 20}}/>;
      case "Submit Inquiry":
          return <SendIcon sx={{fontSize: 20}}/>;
      case "Update Manifesto":
        return <UpdateIcon sx={{fontSize: 20}}/>;
      case "Delete Manifesto":
        return <DeleteIcon sx={{fontSize: 20}}/>;      
      default:
          return <AnnouncementIcon sx={{fontSize: 40}}/>; // Default icon
  }
};

const ITEM_HEIGHT = 48;

export const MoreOverMenu = ({ options, onEdit, onDelete, onAddNewPromise, onSubmitNewInquiry }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option) => {
    setAnchorEl(null);
    if (option === 'Edit') {
      onEdit();
    } else if (option === 'Delete') {
      onDelete();
    } else if (option === 'Add New Promise') {
      onAddNewPromise();
    } else if (option === 'Submit Inquiry') {
      onSubmitNewInquiry();
    }
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(null)}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            maxWidth: '30ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} onClick={() => handleClose(option)} className='flex gap-2'>
            {getIcon(option)}
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

