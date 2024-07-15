import React, { useState } from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import Input from '@mui/material/Input';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

export const PopUpChat = ({ messages }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openForm = () => {
    setIsOpen(true);
  };

  const closeForm = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">

      {/* Button to Open the chat window */}
      <button
        className="bg-gray-800 text-white py-4 px-6 rounded-full shadow-lg opacity-80 hover:opacity-100"
        onClick={openForm}
      >
        Chat
      </button>

      {isOpen && (
        <div className="flex flex-col gap-2 fixed bottom-0 right-0 border-2 border-gray-300 bg-white rounded-md shadow-lg w-96 p-4" >
            {/* Chat header */}
            <div className='chatHeader bg-gray-100 rounded-md p-1'>
                {/* Button to Close the chat window */}
                <div className="flex justify-end">
                    <IconButton
                    onClick={closeForm}
                    sx={{
                        backgroundColor: 'red',
                        color: 'white',
                        '&:hover': { backgroundColor: 'darkred' },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '20px',
                        height: '20px',
                        padding: '2px',
                    }}
                    >
                    <CloseIcon fontSize="small" />
                    </IconButton>
                </div>
            </div>
            {/* Chat area */}
            <div className='dialog h-[400px] overflow-y-auto border-2 border-gray-100 rounded-md p-1' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <style>
                {`
                    .dialog::-webkit-scrollbar {
                    display: none;
                    }
                `}
                </style>
                {messages.map((message, index) => (
                <div key={index} className={`chat ${message.sentByUser ? 'chat-end' : 'chat-start'}`}>
                    <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img alt={message.alt} src={message.avatar} />
                    </div>
                    </div>
                    <div className="chat-header">
                    {message.name}
                    <time className="text-xs opacity-50">{message.time}</time>
                    </div>
                    <div className="chat-bubble">{message.text}</div>
                    <div className="chat-footer opacity-50">{message.status}</div>
                </div>
                ))}
            </div>

            {/* Input area for messages */}
            <form>
                <Stack direction='row' className='flex gap-1 h-10'>
                    <Input
                        type="text"
                        id="msg"
                        placeholder="Type message.."
                        name="msg"
                        className="w-5/6 border-2 border-gray-200 rounded-lg  focus:outline-none focus:border-gray-400"
                        required
                    />

                    <Button variant="contained" className='flex justify-center items-center w-1/6 rounded-md'>
                        <SendIcon fontSize="medium" />
                    </Button>
                </Stack>
            </form>
        </div>
      )}

    </div>
  );
};

// Prop types for the component
PopUpChat.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      sentByUser: PropTypes.bool.isRequired,
      avatar: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};


{/* <PopUpChat messages={messages}/> */}


// const messages = [
//     {
//       sentByUser: false,
//       avatar: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
//       alt: "User avatar",
//       name: "Obi-Wan Kenobi",
//       time: "12:45",
//       text: "You were the Chosen One!",
//       status: "Delivered"
//     },
//     {
//       sentByUser: true,
//       avatar: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
//       alt: "User avatar",
//       name: "Anakin",
//       time: "12:46",
//       text: "I hate you!",
//       status: "Seen at 12:46"
//     }
//   ];