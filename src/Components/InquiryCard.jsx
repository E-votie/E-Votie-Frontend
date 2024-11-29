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