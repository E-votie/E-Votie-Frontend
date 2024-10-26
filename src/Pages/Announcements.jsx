import React from 'react'
import {AnnouncementCard} from '../Components/AnnouncementCard';
import { PublishAnnouncementModal } from '../Components/PublishAnnouncementModal';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import keycloakService from "../services/KeycloakService.jsx";

const announcements = [
    {
        title: '[Election] Presidential Election 2024 - Voter Registration',
        author: 'Election Commission of Sri Lanka',
        date: 'Monday, 28 October 2024, 9:00 AM',
        content: (
            <div>
                <p>Dear Citizens,</p>
                <p>We are pleased to inform you that voter registration for the upcoming Presidential Election will begin on:</p>
                <ul className="list-disc list-inside">
                    <li>Monday, 4 November 2024, and will continue until Friday, 15 November 2024.</li>
                </ul>
                <p>Please ensure that you are registered to vote by visiting your local election office or registering online at the Election Commission website.</p>
                <p>For more information on the process, contact your local election officer or call the Election Commission's helpline.</p>
                <p>Thank you for your civic participation!</p>
                <p>Best regards,</p>
                <p>Election Commission of Sri Lanka</p>
            </div>
        ),
    },
    {
        title: '[Announcement] Parliamentary Elections - Polling Schedule',
        author: 'Election Commission of Sri Lanka',
        date: 'Wednesday, 1 November 2024, 11:00 AM',
        content: (
            <div>
                <p>Dear Citizens,</p>
                <p>The Election Commission is pleased to announce the official polling schedule for the upcoming Parliamentary Elections:</p>
                <ul className="list-disc list-inside">
                    <li>Thursday, 14 November 2024, from 7:00 AM to 5:00 PM across all districts.</li>
                </ul>
                <p>Please remember to bring a valid form of identification (NIC or Passport) to the polling station. Your vote is your voice, so make sure you participate in shaping the future of Sri Lanka.</p>
                <p>We look forward to a fair and transparent election process.</p>
                <p>Best regards,</p>
                <p>Election Commission of Sri Lanka</p>
            </div>
        ),
    },
    {
        title: '[Notice] Postal Vote Application Deadline - Provincial Council Elections',
        author: 'Election Commission of Sri Lanka',
        date: 'Friday, 8 November 2024, 10:00 AM',
        content: (
            <div>
                <p>Dear Government Employees,</p>
                <p>This is a reminder that the deadline to apply for postal votes for the upcoming Provincial Council Elections is:</p>
                <ul className="list-disc list-inside">
                    <li>Monday, 11 November 2024, by 4:00 PM.</li>
                </ul>
                <p>If you are eligible to apply for a postal vote and have not done so yet, please ensure your application is submitted before the deadline.</p>
                <p>For more details on eligibility and the application process, please visit the Election Commission website or contact your department's election coordinator.</p>
                <p>Thank you for your cooperation.</p>
                <p>Best regards,</p>
                <p>Election Commission of Sri Lanka</p>
            </div>
        ),
    },
    {
        title: '[Reminder] National ID Requirement for Voting - Local Government Elections',
        author: 'Election Commission of Sri Lanka',
        date: 'Tuesday, 12 November 2024, 9:30 AM',
        signature: "646sac498dc46s1d894c16sd1c6s8d41c6sd13c13sd51csd31c6sd8c1sd6c1s9dc6sc1s9d8c46sd1cs686d161sd1c1s61d8186s1dc16",
        content: (
            <div>
                <p>Dear Voters,</p>
                <p>The Election Commission would like to remind you that a valid National Identity Card (NIC) is mandatory to cast your vote in the upcoming Local Government Elections on:</p>
                <ul className="list-disc list-inside">
                    <li>Saturday, 23 November 2024, from 7:00 AM to 5:00 PM.</li>
                </ul>
                <p>If you do not have a valid NIC, please visit your nearest Grama Niladhari office to obtain one before the election date.</p>
                <p>We urge all eligible voters to make the necessary arrangements and exercise their right to vote.</p>
                <p>Best regards,</p>
                <p>Election Commission of Sri Lanka</p>
            </div>
        ),
    },
];

export const Announcements = () => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const [openPublishAnnouncementModal, setOpenPublishAnnouncementModal] = React.useState(false);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const handleChangeIndex = (index) => {
      setValue(index);
    };

    const handleOpenPublishAnnouncementModal = () => {
        setOpenPublishAnnouncementModal(true);
    };

    const handleClosePublishAnnouncementModal = () => {
        setOpenPublishAnnouncementModal(false);
    };


  return (
    <div className="min-h-[600px] flex flex-col bg-base-100 shadow-md rounded-xl px-4 pb-4 gap-6">
        <div className='announcementContainer'>
            {/* Header */}
            <div className='header my-8 flex justify-between items-center text-3xl font-semibold text-gray-900'>
                {/* Topic */}
                <div className="topic text-3xl">
                    Site Announcements
                </div>
                {/* Publish new announcement */}
                {keycloakService.hasRole("ElectionCommissioner") && (
                    <div className=''>
                        <Button
                            variant="contained"
                            onClick={handleOpenPublishAnnouncementModal}
                            startIcon={<CreateIcon />}
                            sx={{
                                backgroundColor: 'rgb(236 72 153)', // Original pink color
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: 'rgb(220 57 138)' // Slightly darker pink color for hover
                                }
                            }}
                        >
                            Craft New Announcement
                        </Button>
                    </div>
                )}

            </div>
            {/* Announcements */}
            <div className='announcements'>
                {
                    announcements.map(announcement => <AnnouncementCard title={announcement.title} author={announcement.author} date={announcement.date} content={announcement.content}/>)
                }
            </div>
            {/* Publish Announcement Modal */}
            {
                openPublishAnnouncementModal && <PublishAnnouncementModal open={openPublishAnnouncementModal} handleClose={handleClosePublishAnnouncementModal}/>
            }
        </div>
    </div>
  )
}
