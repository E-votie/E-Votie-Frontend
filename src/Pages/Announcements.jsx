import React from 'react'
import {AnnouncementCard} from '../Components/AnnouncementCard';
import { PublishAnnouncementModal } from '../Components/PublishAnnouncementModal';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';

const announcements = [
    {
        title: '[Notice] Course Registration - REPEAT',
        author: 'Lasanthi De Silva',
        date: 'Friday, 5 July 2024, 2:39 PM',
        content: (
            <div>
                <p>Dear Students,</p>
                <p>Please be informed that based on the decision made during the coordinator meeting, it has been agreed to offer temporary access to the UGVLE for repeat courses for students who missed the repeat course registration deadline. These students will have temporary access to the UGVLE platform until course registration is available.</p>
                <p>Such students are required to email their degree coordinator with a list of the <strong>courses they intend to repeat</strong>, including the <strong>Course Code, Course Name, Student Registration No, Student Index No,</strong> and <strong>Student Name.</strong></p>
                <p><strong>[IMPORTANT]</strong> Please note that this temporary access is meant to prevent delays. Once course registrations are open, students must pay the relevant fees and complete their registration accordingly.</p>
                <p>Coordinator/IS</p>
            </div>
        ),
    },
    {
        title: '[Reminder] Semester Fee Payment Deadline',
        author: 'John Doe',
        date: 'Monday, 1 July 2024, 10:00 AM',
        content: (
            <div>
                <p>Dear Students,</p>
                <p>This is a reminder that the deadline for semester fee payments is approaching. Please ensure that you have completed your payment by the end of this week to avoid any late fees.</p>
                <p>If you have any questions or concerns, please contact the finance office.</p>
                <p>Thank you.</p>
                <p>Finance Office</p>
            </div>
        ),
    },
    {
        title: '[Update] New Library Hours',
        author: 'Jane Smith',
        date: 'Wednesday, 3 July 2024, 9:00 AM',
        content: (
            <div>
                <p>Dear Students and Staff,</p>
                <p>We are pleased to announce that the library will now be open for extended hours. The new hours are as follows:</p>
                <ul className="list-disc list-inside">
                    <li>Monday to Friday: 8:00 AM - 10:00 PM</li>
                    <li>Saturday: 9:00 AM - 6:00 PM</li>
                    <li>Sunday: Closed</li>
                </ul>
                <p>We hope these extended hours will provide more flexibility for your study and research needs.</p>
                <p>Best regards,</p>
                <p>Library Staff</p>
            </div>
        ),
    },
    {
        title: '[Alert] Maintenance Downtime',
        author: 'Maintenance Team',
        date: 'Thursday, 4 July 2024, 5:00 PM',
        content: (
            <div>
                <p>Dear All,</p>
                <p>Please be advised that there will be scheduled maintenance on the university's network infrastructure this weekend. The maintenance will occur on:</p>
                <ul className="list-disc list-inside">
                    <li>Saturday, 6 July 2024, from 12:00 AM to 4:00 AM</li>
                </ul>
                <p>During this time, access to the internet and internal university systems may be intermittent or unavailable. We apologize for any inconvenience this may cause and appreciate your understanding.</p>
                <p>Thank you,</p>
                <p>Maintenance Team</p>
            </div>
        ),
    },
    {
        title: '[Event] Annual Sports Day',
        author: 'Sports Committee',
        date: 'Friday, 5 July 2024, 1:00 PM',
        content: (
            <div>
                <p>Dear Students and Staff,</p>
                <p>We are excited to announce that the Annual Sports Day will be held on:</p>
                <ul className="list-disc list-inside">
                    <li>Friday, 12 July 2024, from 8:00 AM to 5:00 PM</li>
                </ul>
                <p>Join us for a day of fun and competition! Please register for the events at the sports office by Wednesday, 10 July 2024.</p>
                <p>We look forward to your participation!</p>
                <p>Best regards,</p>
                <p>Sports Committee</p>
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
    <div className="min-h-[600px] flex flex-col bg-base-100 shadow-2xl px-4 pb-4 gap-6">
        <div className='announcementContainer'>
            {/* Header */}
            <div className='header my-8 flex justify-between items-center'>
                {/* Topic */}
                <div className="topic text-3xl">
                    Site Announcements
                </div>
                {/* Publish new announcement */}
                <div className=''>
                    <Button
                        variant="contained"
                        onClick={handleOpenPublishAnnouncementModal}
                        startIcon={<CreateIcon />}
                        sx={{ backgroundColor: '#1976d2', color: '#fff', '&:hover': { backgroundColor: '#115293' } }}
                        >
                        Craft New Announcement
                    </Button>                
                </div>
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
