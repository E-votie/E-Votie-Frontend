// import React, { useState } from 'react';
// import { 
//   Box, Typography, Paper, Grid, Button, Chip, Dialog, DialogTitle,
//   DialogContent, DialogActions, TextField, Select, MenuItem, IconButton,
//   Slider, Tooltip
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import { motion } from 'framer-motion';
// import { styled } from '@mui/system';

// const PromiseSlider = styled(Slider)(({ theme }) => ({
//   color: theme.palette.secondary.main,
//   height: 8,
//   '& .MuiSlider-track': {
//     border: 'none',
//   },
//   '& .MuiSlider-thumb': {
//     height: 24,
//     width: 24,
//     backgroundColor: '#fff',
//     border: '2px solid currentColor',
//     '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
//       boxShadow: 'inherit',
//     },
//     '&:before': {
//       display: 'none',
//     },
//   },
// }));

// const StatusChip = styled(Chip)(({ theme, status }) => ({
//   backgroundColor: theme.palette[status].main,
//   color: theme.palette[status].contrastText,
//   fontWeight: 'bold',
//   '&:hover': {
//     backgroundColor: theme.palette[status].dark,
//   },
// }));

// export const PromiseCard = ({ date, title, description, progress, score, initialStatus = 'Pending' }) => {
//   const [status, setStatus] = useState(initialStatus);
//   const [attachments, setAttachments] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [editedTitle, setEditedTitle] = useState(title);
//   const [editedDescription, setEditedDescription] = useState(description);
//   const [controversyLevel, setControversyLevel] = useState(50);

//   const handleStatusChange = (event) => {
//     setStatus(event.target.value);
//   };

//   const handleAttachmentUpload = (event) => {
//     const newAttachments = Array.from(event.target.files);
//     setAttachments([...attachments, ...newAttachments]);
//   };

//   const handleRemoveAttachment = (index) => {
//     const newAttachments = attachments.filter((_, i) => i !== index);
//     setAttachments(newAttachments);
//   };

//   const handleEdit = () => {
//     setEditMode(true);
//   };

//   const handleSaveEdit = () => {
//     // Save changes to backend if needed
//     setEditMode(false);
//   };

//   const handleDelete = () => {
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };

//   const handleConfirmDelete = () => {
//     // Delete promise from backend if needed
//     handleCloseDialog();
//   };


//   const handleControversyChange = (event, newValue) => {
//     setControversyLevel(newValue);
//   };

//   const statusColors = {
//     'Pledge Completed': 'success',
//     'Partially Completed': 'warning',
//     'Not Done': 'error',
//     'Pending': 'info'
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <Paper elevation={6} sx={{ borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
//         <Box sx={{ 
//           position: 'absolute', 
//           top: 0, 
//           left: 0, 
//           right: 0, 
//           height: '8px', 
//           background: `linear-gradient(90deg, #FF6B6B ${controversyLevel}%, #4ECDC4 ${controversyLevel}%)` 
//         }} />
//         <Grid container spacing={2} sx={{ p: 3, pt: 4 }}>
//           <Grid item xs={12} sm={3} md={2}>
//             <Box sx={{ 
//               backgroundColor: 'primary.main', 
//               color: 'primary.contrastText', 
//               p: 2, 
//               borderRadius: 2,
//               textAlign: 'center',
//             }}>
//               <Typography variant="h6">{date}</Typography>
//             </Box>
//           </Grid>
//           <Grid item xs={12} sm={9} md={10}>
//             {editMode ? (
//               <TextField
//                 fullWidth
//                 value={editedTitle}
//                 onChange={(e) => setEditedTitle(e.target.value)}
//                 variant="standard"
//                 sx={{ mb: 2 }}
//               />
//             ) : (
//               <Typography variant="h5" gutterBottom fontWeight="bold">{title}</Typography>
//             )}
//             {editMode ? (
//               <TextField
//                 fullWidth
//                 multiline
//                 rows={3}
//                 value={editedDescription}
//                 onChange={(e) => setEditedDescription(e.target.value)}
//                 variant="outlined"
//                 sx={{ mb: 2 }}
//               />
//             ) : (
//               <Typography variant="body1" color="text.secondary" gutterBottom>{description}</Typography>
//             )}
//             <Box sx={{ mt: 2, mb: 1 }}>
//               <Typography variant="body2" color="text.secondary" gutterBottom>Progress</Typography>
//               <PromiseSlider
//                 value={progress}
//                 aria-label="Progress"
//                 valueLabelDisplay="auto"
//               />
//             </Box>
//             <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
//               <Typography variant="body2" color="text.secondary">Score: {score}</Typography>
//               <StatusChip
//                 label={status}
//                 status={statusColors[status]}
//                 onClick={() => setOpenDialog(true)}
//               />
//             </Box>
//             <Box mt={3}>
//               <Typography variant="body2" color="text.secondary" gutterBottom>Controversy Level</Typography>
//               <Tooltip title={`${controversyLevel}% Controversial`} placement="top">
//                 <PromiseSlider
//                   value={controversyLevel}
//                   onChange={handleControversyChange}
//                   aria-label="Controversy Level"
//                 />
//               </Tooltip>
//             </Box>
//             <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
//               {attachments.map((file, index) => (
//                 <Chip
//                   key={index}
//                   label={file.name}
//                   onDelete={() => handleRemoveAttachment(index)}
//                   color="secondary"
//                   variant="outlined"
//                 />
//               ))}
//             </Box>
//             <Box mt={2} display="flex" justifyContent="space-between">
//               <Button 
//                 variant="contained" 
//                 component="label" 
//                 startIcon={<AttachFileIcon />}
//                 sx={{ textTransform: 'none' }}
//               >
//                 Upload
//                 <input
//                   type="file"
//                   hidden
//                   onChange={handleAttachmentUpload}
//                   multiple
//                 />
//               </Button>
//               <Box>
//                 {editMode ? (
//                   <Button onClick={handleSaveEdit} color="primary" variant="contained">Save</Button>
//                 ) : (
//                   <IconButton onClick={handleEdit} color="primary">
//                     <EditIcon />
//                   </IconButton>
//                 )}
//                 <IconButton onClick={handleDelete} color="error">
//                   <DeleteIcon />
//                 </IconButton>
//               </Box>
//             </Box>
//           </Grid>
//         </Grid>
//       </Paper>
//       <Dialog open={openDialog} onClose={handleCloseDialog}>
//         <DialogTitle>Update Status</DialogTitle>
//         <DialogContent>
//           <Select
//             value={status}
//             onChange={handleStatusChange}
//             fullWidth
//             variant="outlined"
//             sx={{ mt: 2 }}
//           >
//             <MenuItem value="Pledge Completed">Pledge Completed</MenuItem>
//             <MenuItem value="Partially Completed">Partially Completed</MenuItem>
//             <MenuItem value="Not Done">Not Done</MenuItem>
//             <MenuItem value="Pending">Pending</MenuItem>
//           </Select>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog}>Cancel</Button>
//           <Button onClick={handleCloseDialog} color="primary">Update</Button>
//         </DialogActions>
//       </Dialog>
//     </motion.div>
//   );
// };
import React, { useState } from 'react';
import { 
  LinearProgress, Box, Typography, Paper, Grid, Button, Chip, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, Select, MenuItem, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { motion } from 'framer-motion';

export const PromiseCard = ({ date, title, description, progress, score, initialStatus = 'Pending' }) => {
  const [status, setStatus] = useState(initialStatus);
  const [attachments, setAttachments] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleAttachmentUpload = (event) => {
    const newAttachments = Array.from(event.target.files);
    setAttachments([...attachments, ...newAttachments]);
  };

  const handleRemoveAttachment = (index) => {
    const newAttachments = attachments.filter((_, i) => i !== index);
    setAttachments(newAttachments);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSaveEdit = () => {
    // Save changes to backend if needed
    setEditMode(false);
  };

  const handleDelete = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = () => {
    // Delete promise from backend if needed
    handleCloseDialog();
  };

  const statusColors = {
    'Pledge Completed': 'success',
    'Partially Completed': 'warning',
    'Not Done': 'error',
    'Pending': 'info'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper elevation={3} className="p-4 mb-4 rounded-lg shadow-md">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3} md={2} lg={2}>
            <Box 
              sx={{ 
                backgroundColor: 'gray', 
                color: 'white', 
                padding: '10px', 
                borderRadius: '12px', 
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Typography variant="subtitle1" component="div">
                {date}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={9} md={10} lg={10}>
            {editMode ? (
              <TextField
                fullWidth
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                margin="normal"
                variant="outlined"
              />
            ) : (
              <Typography variant="h6" gutterBottom>{title}</Typography>
            )}
            {editMode ? (
              <TextField
                fullWidth
                multiline
                rows={3}
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                margin="normal"
                variant="outlined"
              />
            ) : (
              <Typography variant="body2" color="textSecondary" gutterBottom>{description}</Typography>
            )}
            <Box display="flex" alignItems="center" mt={2}>
              <LinearProgress 
                variant="determinate" 
                value={progress} 
                style={{ flex: 1, marginRight: 10 }} 
                color={statusColors[status] || 'info'}
              />
              <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
              <Typography variant="body2" color="textSecondary">Score: {score}</Typography>
              <Select
                value={status}
                onChange={handleStatusChange}
                size="small"
                variant="outlined"
                sx={{ minWidth: 120 }}
              >
                <MenuItem value="Pledge Completed">Pledge Completed</MenuItem>
                <MenuItem value="Partially Completed">Partially Completed</MenuItem>
                <MenuItem value="Not Done">Not Done</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </Select>
            </Box>
            <Box mt={2}>
              <input
                accept="image/*,application/pdf"
                style={{ display: 'none' }}
                id={`attachment-button-${title}`}
                type="file"
                onChange={handleAttachmentUpload}
                multiple
              />
              <label htmlFor={`attachment-button-${title}`}>
                <Button 
                  variant="outlined" 
                  component="span" 
                  startIcon={<AttachFileIcon />}
                  sx={{ textTransform: 'none' }}
                >
                  Upload Attachment
                </Button>
              </label>
            </Box>
            <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
              {attachments.map((file, index) => (
                <Chip
                  key={index}
                  label={file.name}
                  onDelete={() => handleRemoveAttachment(index)}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
            <Box mt={2} display="flex" justifyContent="flex-end">
              {editMode ? (
                <Button onClick={handleSaveEdit} color="primary" variant="contained">Save</Button>
              ) : (
                <IconButton onClick={handleEdit} size="small" color="primary">
                  <EditIcon />
                </IconButton>
              )}
              <IconButton onClick={handleDelete} size="small" color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this promise?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleConfirmDelete} color="error">Delete</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </motion.div>
  );
};


// import React, { useState } from 'react';
// import { 
//   LinearProgress, Box, Typography, Paper, Grid, Avatar,
//   Select, MenuItem, IconButton, Button, Chip, Dialog, DialogTitle,
//   DialogContent, DialogActions, TextField
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import CloseIcon from '@mui/icons-material/Close';
// import BookmarkIcon from '@mui/icons-material/Bookmark';

// export const PromiseCard = ({ date, title, description, progress, score, initialStatus = 'Pending' }) => {
//   const [status, setStatus] = useState(initialStatus);
//   const [attachments, setAttachments] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [editedTitle, setEditedTitle] = useState(title);
//   const [editedDescription, setEditedDescription] = useState(description);

//   const handleStatusChange = (event) => {
//     setStatus(event.target.value);
//   };

//   const handleAttachmentUpload = (event) => {
//     const newAttachments = Array.from(event.target.files);
//     setAttachments([...attachments, ...newAttachments]);
//   };

//   const handleRemoveAttachment = (index) => {
//     const newAttachments = attachments.filter((_, i) => i !== index);
//     setAttachments(newAttachments);
//   };

//   const handleEdit = () => {
//     setEditMode(true);
//   };

//   const handleSaveEdit = () => {
//     // Here you would typically save the changes to your backend
//     setEditMode(false);
//   };

//   const handleDelete = () => {
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };

//   const handleConfirmDelete = () => {
//     // Here you would typically delete the promise from your backend
//     handleCloseDialog();
//   };

//   const statusColors = {
//     'Pledge Completed': 'success',
//     'Partially Completed': 'warning',
//     'Not Done': 'error',
//     'Pending': 'info'
//   };

//   return (
//     <Paper elevation={3} className="p-2 mb-4">
//         <Grid container spacing={2}>
//             <Grid item xs={12} sm={2}>
//                 <Box 
//                     sx={{ 
//                     backgroundColor: 'gray', 
//                     color: 'white', 
//                     padding: '8px', 
//                     borderRadius: '8px', 
//                     textAlign: 'center'
//                     }}
//                     className="flex items-center justify-center w-fit"
//                 >
//                     <Typography variant="h6">
//                         {/* <BookmarkIcon /> */}
//                         {date}
//                     </Typography>
//                 </Box>
//             </Grid>
//             <Grid item xs={12} sm={10}>
//                 {editMode ? (
//                     <TextField
//                     fullWidth
//                     value={editedTitle}
//                     onChange={(e) => setEditedTitle(e.target.value)}
//                     margin="normal"
//                     />
//                 ) : (
//                     <Typography variant="h6" gutterBottom>{title}</Typography>
//                 )}
//                 {editMode ? (
//                     <TextField
//                     fullWidth
//                     multiline
//                     rows={2}
//                     value={editedDescription}
//                     onChange={(e) => setEditedDescription(e.target.value)}
//                     margin="normal"
//                     />
//                 ) : (
//                     <Typography variant="body1" color="textSecondary" gutterBottom>{description}</Typography>
//                 )}
//                 <Box display="flex" alignItems="center" mt={2}>
//                     <LinearProgress variant="determinate" value={progress} style={{ flex: 1, marginRight: 10 }} color='success'/>
//                     <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
//                 </Box>
//                 <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
//                     <Typography variant="body2" color="textSecondary">Score: {score}</Typography>
//                     <Select
//                     value={status}
//                     onChange={handleStatusChange}
//                     size="small"
//                     >
//                     <MenuItem value="Pledge Completed">Pledge Completed</MenuItem>
//                     <MenuItem value="Partially Completed">Partially Completed</MenuItem>
//                     <MenuItem value="Not Done">Not Done</MenuItem>
//                     <MenuItem value="Pending">Pending</MenuItem>
//                     </Select>
//                 </Box>
//                 <Box mt={2}>
//                     <input
//                     accept="image/*,application/pdf"
//                     style={{ display: 'none' }}
//                     id={`attachment-button-${title}`}
//                     type="file"
//                     onChange={handleAttachmentUpload}
//                     multiple
//                     />
//                     <label htmlFor={`attachment-button-${title}`}>
//                     <Button variant="outlined" component="span" startIcon={<AttachFileIcon />}>
//                         Upload Attachment
//                     </Button>
//                     </label>
//                 </Box>
//                 <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
//                     {attachments.map((file, index) => (
//                     <Chip
//                         key={index}
//                         label={file.name}
//                         onDelete={() => handleRemoveAttachment(index)}
//                         color="primary"
//                         variant="outlined"
//                     />
//                     ))}
//                 </Box>
//                 <Box mt={2} display="flex" justifyContent="flex-end">
//                     {editMode ? (
//                     <Button onClick={handleSaveEdit} color="primary">Save</Button>
//                     ) : (
//                     <IconButton onClick={handleEdit} size="small">
//                         <EditIcon />
//                     </IconButton>
//                     )}
//                     <IconButton onClick={handleDelete} size="small">
//                     <DeleteIcon />
//                     </IconButton>
//                 </Box>
//             </Grid>
//       </Grid>
//       <Dialog open={openDialog} onClose={handleCloseDialog}>
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           Are you sure you want to delete this promise?
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog}>Cancel</Button>
//           <Button onClick={handleConfirmDelete} color="error">Delete</Button>
//         </DialogActions>
//       </Dialog>
//     </Paper>
//   );
// };
