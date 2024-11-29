// import React, { useState, useRef, useEffect } from 'react';
// import { Box, TextField, IconButton, Paper, Typography, Avatar } from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
// import {addDoc, collection, serverTimestamp} from 'firebase/firestore';
// import { db } from '../Config/firebase-config';
//
// const initialMessages = [
//   { author: 'Officer', content: 'Please provide additional documents for verification.', time: '10:30 AM' },
//   { author: 'Applicant', content: 'Sure, I will upload them by today.', time: '10:35 AM' }
// ];
//
// export const ApplicationChat = () => {
//   const [chatInput, setChatInput] = useState('');
//   const [messages, setMessages] = useState(initialMessages);
//   const messagesEndRef = useRef(null);
//
//   const messageRef = collection(db, "messages");
//
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };
//
//   useEffect(scrollToBottom, [messages]);
//
//   const handleChatInputChange = (event) => {
//     setChatInput(event.target.value);
//   };
//
//   const handleSendMessage = async () => {
//     if (chatInput.trim()) {
//         setMessages([...messages, { author: 'Applicant', content: chatInput, time: new Date().toLocaleTimeString() }]);
//         setChatInput('');
//
//         await addDoc(messageRef, {
//             text: chatInput.trim(),
//             createdAt: serverTimestamp(),
//             user: "sahan",
//             applicationId: "1111"
//         });
//      }
//   };
//
//   return (
//     <Paper elevation={3} sx={{ height: '600px', display: 'flex', flexDirection: 'column', borderRadius: 3, overflow: 'hidden' }}>
//       {/* Chat header */}
//       <Box sx={{ p: 2, bgcolor: '#0084ff', color: 'white', display: 'flex', alignItems: 'center', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
//         <Avatar sx={{ bgcolor: '#1565c0', mr: 2 }}>O</Avatar>
//         <Typography variant="h6">Officer</Typography>
//       </Box>
//
//       {/* Messages area */}
//       <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 3, bgcolor: '#eaeff1' }}>
//         {messages.map((message, index) => (
//           <Box
//             key={index}
//             sx={{
//               display: 'flex',
//               justifyContent: message.author === 'Officer' ? 'flex-start' : 'flex-end',
//               mb: 2,
//             }}
//           >
//             {message.author === 'Officer' && (
//               <Avatar sx={{ bgcolor: '#1565c0', width: 32, height: 32, mr: 1 }}>O</Avatar>
//             )}
//             <Box
//               sx={{
//                 maxWidth: '70%',
//                 p: 1.5,
//                 borderRadius: '18px',
//                 bgcolor: message.author === 'Officer' ? 'white' : '#0084ff',
//                 color: message.author === 'Officer' ? 'text.primary' : 'white',
//                 boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
//                 transition: 'background-color 0.2s ease-in-out',
//               }}
//             >
//               <Typography variant="body2" sx={{ fontSize: '0.9rem', lineHeight: 1.4 }}>
//                 {message.content}
//               </Typography>
//               <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'rgba(0, 0, 0, 0.6)', fontSize: '0.7rem' }}>
//                 {message.time}
//               </Typography>
//             </Box>
//           </Box>
//         ))}
//         <div ref={messagesEndRef} />
//       </Box>
//
//       {/* Input area */}
//       <Box sx={{ p: 2, bgcolor: 'white', display: 'flex', alignItems: 'center', boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)' }}>
//         <TextField
//           fullWidth
//           variant="outlined"
//           placeholder="Type a message..."
//           value={chatInput}
//           onChange={handleChatInputChange}
//           onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//           sx={{
//             '& .MuiOutlinedInput-root': {
//               borderRadius: '30px',
//               bgcolor: '#f0f0f0',
//               '& fieldset': { border: 'none' },
//             },
//             '& .MuiOutlinedInput-input': {
//               padding: '10px 15px',
//               fontSize: '0.9rem',
//             },
//           }}
//         />
//         <IconButton
//           color="primary"
//           onClick={handleSendMessage}
//           sx={{
//             ml: 1,
//             bgcolor: chatInput.trim() ? '#0084ff' : 'transparent',
//             color: chatInput.trim() ? 'white' : '#0084ff',
//             '&:hover': { bgcolor: chatInput.trim() ? '#0077e6' : 'rgba(0, 132, 255, 0.04)' },
//             transition: 'background-color 0.3s ease-in-out',
//             borderRadius: '50%',
//           }}
//         >
//           <SendIcon />
//         </IconButton>
//       </Box>
//     </Paper>
//   );
// };
