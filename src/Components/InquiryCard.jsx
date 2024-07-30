import React, { useState } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { Paper } from '@mui/material';

export const InquiryCard = ({ title, author, date, content, replyContent, onReply }) => {
    const [reply, setReply] = useState('');

    const handleReplyChange = (e) => {
        setReply(e.target.value);
    };

    const handleReplySubmit = () => {
        onReply(reply);
        setReply('');
    };

    return (
        <Paper elevation={3} className="p-4 mb-4">
            <div className="flex items-center mb-4">
                <div className="bg-gray-300 rounded-full h-10 w-10 flex items-center justify-center text-xl font-bold text-gray-700">
                    {author.charAt(0)}
                </div>
                <div className="ml-3">
                    <p className="text-lg font-semibold">{title}</p>
                    <p className="text-sm text-gray-500">by {author} - {date}</p>
                </div>
            </div>
            <div className="border-t border-gray-200 mt-2 mb-4"></div>
            <div className="text-gray-800 mb-4">
                {content}
            </div>
            {replyContent && (
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <p className="font-semibold">Reply:</p>
                    <p>{replyContent}</p>
                </div>
            )}
            <div className="border-t border-gray-200 mt-2 mb-4"></div>
            <div className="flex flex-col">
                <textarea
                    className="border border-gray-300 rounded-md p-2 mb-4"
                    value={reply}
                    onChange={handleReplyChange}
                    placeholder="Type your reply here..."
                />
                <div className='w-full'>
                    <Stack direction="row" spacing={2} className='float-right'>
                        <Button variant="outlined" startIcon={<DeleteIcon />}>
                            Delete
                        </Button>
                        <Button variant="contained" endIcon={<SendIcon />}>
                            Send
                        </Button>
                    </Stack>
                </div>
            </div>
        </Paper>
    );
};

