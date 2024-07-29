import React from 'react';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import { TopicCard } from './TopicCard';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Tooltip from '@mui/material/Tooltip';

export const PartyMemberParticipatedTopics = ({topicsAddressed}) => {
    return (
        <div className='pb-2 mb-8'>
            <div className='flex justify-between items-center'>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                    Topics Participated
                </Typography>
                <Tooltip title="Add New Topic" arrow>
                    <IconButton aria-label="create" size='large' color='primary'>
                        <AddCircleIcon fontSize="200px"/>
                    </IconButton>
                </Tooltip>
            </div>

            <Divider />

            <div className='p-4'>
                <div className='flex flex-wrap'>
                    {
                        topicsAddressed.map((topicAddressed, index) => <TopicCard key={index} topic={topicAddressed}/>)
                    }
                </div>
            </div>
        </div>  
    )
}
