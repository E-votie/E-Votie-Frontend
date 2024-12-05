import { Typography } from '@mui/material';
import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { DeleteModal } from './DeleteModal';

const getIcon = (topic) => {
    switch(topic){
        case "Agriculture, Plantations, Livestock & Fisheries":
            return "../assets/topics/t1.avif";
        case "Natural Resources & Environment":
            return "../assets/topics/t2.avif";
        case "Reconciliation & Resettlement":
            return "../assets/topics/t3.avif";
        case "Trade & Industry":
            return "../assets/topics/t4.avif";
        case "Welfare & Social Services":
            return "../assets/topics/t5.avif";
        case "Justice, Defence & Public Order":
            return "../assets/topics/t6.avif";
        case "National Heritage, Media & Sports":
            return "../assets/topics/t7.jpg";
        case "Economy and Finance":
            return "../assets/topics/t8.avif";
        case "Education":
            return "../assets/topics/t9.avif";
        case "Labour & Employment":
            return "../assets/topics/t10.avif";
        case "Technology, Communications & Energy":
            return "../assets/topics/t11.avif";
        case "Governance, Administration and Parliamentary Affairs":
            return "../assets/topics/t12.avif";
        case "Health":
            return "../assets/topics/t13.avif";
        case "Urban Planning, Infrastructure and Transportation":
            return "../assets/topics/t14.avif";
        case "Rights & Representation":
            return "../assets/topics/t15.avif";
    }
}

export const TopicCard = ({ topic }) => {
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

    const handleOpenDeleteModal = () => {
        setOpenDeleteModal(true);
    }

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
    }


    return (
        <div className="flex flex-col p-5 w-1/4">
            <div className='flex justify-end'>
                <IconButton aria-label="delete" size="small" onClick={handleOpenDeleteModal}>
                    <HighlightOffIcon fontSize="inherit" color='error'/>
                </IconButton>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <div className="w-32 h-32 flex items-center justify-center mb-3 bg-gray-100 rounded-full">
                    <img src= {getIcon(topic.topicName)} alt={topic.topicName} className='w-32 h-32 border rounded-full object-cover'/>
                </div>
                <div className="text-center mt-3">
                    <Typography variant='body1'>{topic.topicName}</Typography>
                </div>
            </div>

            {/* Delete Modal */}
            {
                openDeleteModal && <DeleteModal open={openDeleteModal} handleClose={handleCloseDeleteModal} message="Are You Sure Want To Remove This Topic ?" action="delete topic" topicId={topic.topicId} userId={topic.userId}/>
            }        
        </div>
    );
};
