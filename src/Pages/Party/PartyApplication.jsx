import React from 'react';
import { Box, Stepper, Step, StepLabel, Paper, Typography, List, ListItem, ListItemText, Divider, Avatar, TextField, Button, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

const steps = ['Submitted', 'Under Review', 'Verified'];

const applicationDetails = {
  partyName: 'Green Party',
  leader: 'John Doe',
  submittedDate: '2024-07-31',
  partySymbol: '/path/to/party-symbol.png', // replace with actual path
  attachments: [
    {
      name: 'Constitution.pdf',
      link: '/path/to/constitution.pdf' // replace with actual path
    },
    {
      name: 'Logo.png',
      link: '/path/to/logo.png' // replace with actual path
    }
  ]
};

const messages = [
  { author: 'Officer', content: 'Please provide additional documents for verification.', time: '10:30 AM' },
  { author: 'Applicant', content: 'Sure, I will upload them by today.', time: '10:35 AM' }
];

const CustomStepper = styled(Stepper)(({ theme }) => ({
  padding: theme.spacing(3, 0, 5),
}));

const ChatBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '400px',
  overflowY: 'scroll',
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
}));

const ChatMessage = styled(Box)(({ theme, isOfficer }) => ({
  display: 'flex',
  justifyContent: isOfficer ? 'flex-start' : 'flex-end',
  padding: theme.spacing(1),
}));

const ChatInputBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(2),
}));

export const PartyApplication = () => {
  const [activeStep, setActiveStep] = React.useState(1);
  const [chatInput, setChatInput] = React.useState('');

  const handleChatInputChange = (event) => {
    setChatInput(event.target.value);
  };

  const handleSendMessage = () => {
    // Add message send logic here
    setChatInput('');
  };

  return (
    <div className="min-h-[600px] flex flex-col bg-base-100 shadow-2xl px-4 pb-4 gap-6">
        {/* Header */}
        <div className='header my-8 flex justify-between items-center'>
          {/* Topic */}
          <div className="topic text-3xl">
              Application ID #
          </div>
          {/* Publish new announcement
          <div className=''>
            <Button
              variant="outlined"
              onClick={openPartyRegistration}
              startIcon={<GroupAddIcon />}
              sx={{ backgroundColor: '#1976d2', color: '#fff', '&:hover': { backgroundColor: '#115293' } }}
            >
              Register New Party
            </Button>
          </div> */}
        </div>
        <CustomStepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
            <Step key={label}>
                <StepLabel>{label}</StepLabel>
            </Step>
            ))}
        </CustomStepper>
        <Divider></Divider>
        <Box sx={{ display: 'flex', gap: 4 }}>
            {/* Left Side - Application Details */}
            <Paper elevation={1} sx={{ p: 1, flex: 1 }}>
                <List>
                    <ListItem>
                        <ListItemText primary="Party Name" secondary={applicationDetails.partyName} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Leader" secondary={applicationDetails.leader} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Submitted Date" secondary={applicationDetails.submittedDate} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Party Symbol" secondary={<img src={applicationDetails.partySymbol} alt="Party Symbol" style={{ width: '50px' }} />} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Attachments" />
                    </ListItem>
                    {applicationDetails.attachments.map((attachment, index) => (
                    <ListItem key={index}>
                        <ListItemText
                        primary={<Chip label={attachment.name} component="a" href={attachment.link} clickable />}
                        />
                    </ListItem>
                    ))}
                </List>
            </Paper>

            {/* Right Side - Chat Box */}
            <ChatBox className='flex flex-col justify-between h-full'>
                {messages.map((message, index) => (
                <ChatMessage key={index} isOfficer={message.author === 'Officer'}>
                    <Avatar sx={{ mr: 2 }}>{message.author.charAt(0)}</Avatar>
                    <Box>
                    <Typography variant="body2" color="textSecondary">
                        {message.author} - {message.time}
                    </Typography>
                    <Typography variant="body1">{message.content}</Typography>
                    </Box>
                </ChatMessage>
                ))}
                <Box>
                    <ChatInputBox>
                        <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Type your message..."
                        value={chatInput}
                        onChange={handleChatInputChange}
                        />
                        <Button variant="contained" sx={{ ml: 2 }} onClick={handleSendMessage}>
                        Send
                        </Button>
                    </ChatInputBox>
                </Box>
            </ChatBox>
      </Box>
    </div>
  );
};

