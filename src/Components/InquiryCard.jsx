// import React, { useState } from 'react';
// import Button from '@mui/material/Button';
// import DeleteIcon from '@mui/icons-material/Delete';
// import SendIcon from '@mui/icons-material/Send';
// import Stack from '@mui/material/Stack';
// import { Paper } from '@mui/material';

// export const InquiryCard = ({ title, author, date, content, replyContent, onReply }) => {
//     const [reply, setReply] = useState('');

//     const handleReplyChange = (e) => {
//         setReply(e.target.value);
//     };

//     const handleReplySubmit = () => {
//         onReply(reply);
//         setReply('');
//     };

//     return (
//         <Paper elevation={3} className="p-4 mb-4">
//             <div className="flex items-center mb-4">
//                 <div className="bg-gray-300 rounded-full h-10 w-10 flex items-center justify-center text-xl font-bold text-gray-700">
//                     {author.charAt(0)}
//                 </div>
//                 <div className="ml-3">
//                     <p className="text-lg font-semibold">{title}</p>
//                     <p className="text-sm text-gray-500">by {author} - {date}</p>
//                 </div>
//             </div>
//             <div className="border-t border-gray-200 mt-2 mb-4"></div>
//             <div className="text-gray-800 mb-4">
//                 {content}
//             </div>
//             {replyContent && (
//                 <div className="bg-gray-100 p-4 rounded-lg mb-4">
//                     <p className="font-semibold">Reply:</p>
//                     <p>{replyContent}</p>
//                 </div>
//             )}
//             <div className="border-t border-gray-200 mt-2 mb-4"></div>
//             <div className="flex flex-col">
//                 <textarea
//                     className="border border-gray-300 rounded-md p-2 mb-4"
//                     value={reply}
//                     onChange={handleReplyChange}
//                     placeholder="Type your reply here..."
//                 />
//                 <div className='w-full'>
//                     <Stack direction="row" spacing={2} className='float-right'>
//                         <Button variant="outlined" startIcon={<DeleteIcon />}>
//                             Delete
//                         </Button>
//                         <Button variant="contained" endIcon={<SendIcon />}>
//                             Send
//                         </Button>
//                     </Stack>
//                 </div>
//             </div>
//         </Paper>
//     );
// };

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Button, Paper, Typography, Avatar, TextField, 
  Card, CardHeader, CardContent, CardActions, 
  Divider, Collapse
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import ReplyIcon from '@mui/icons-material/Reply';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const InquiryCard = ({ title, author, date, content, replyContent, onReply, onDelete }) => {
  const [reply, setReply] = useState('');
  const [expanded, setExpanded] = useState(false);

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const handleReplySubmit = () => {
    onReply(reply);
    setReply('');
    setExpanded(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card elevation={3} sx={{margin: 'auto', marginBottom: 2 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'primary.main' }} aria-label="recipe">
              {author.charAt(0)}
            </Avatar>
          }
          title={<Typography variant="h6">{title}</Typography>}
          subheader={`by ${author} - ${date}`}
        />
        <CardContent>
          <Typography variant="body1" color="text.secondary">
            {content}
          </Typography>
          {replyContent && (
            <Paper elevation={1} sx={{ padding: 2, marginTop: 2, bgcolor: 'grey.100' }}>
              <Typography variant="body2" color="text.secondary">
                <strong>Reply:</strong> {replyContent}
              </Typography>
            </Paper>
          )}
        </CardContent>
        <Divider />
        <CardActions disableSpacing>
          <Button 
            variant="outlined" 
            startIcon={<DeleteIcon />}
            onClick={onDelete}
            size="small"
          >
            Delete
          </Button>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <TextField
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              placeholder="Type your reply here..."
              value={reply}
              onChange={handleReplyChange}
              sx={{ marginBottom: 2 }}
            />
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleReplySubmit}
              disabled={!reply.trim()}
            >
              Send Reply
            </Button>
          </CardContent>
        </Collapse>
      </Card>
    </motion.div>
  );
};