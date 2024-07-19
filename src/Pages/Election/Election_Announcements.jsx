import React from 'react'
import {AnnouncementCard} from '../../Components/AnnouncementCard';
import Button from '@mui/material/Button';

const announcements = [
    {
        title: 'Instructions for Use - Voting Registration Statement',
        author: 'Lasanthi De Silva',
        date: 'Friday, 5 July 2024, 2:39 PM',
        content: (
            <div>
              <p>01) A registered person in the ballot list as a voter is available online by this service, including registered information in the ballot list to verify their registration.</p>

                <p>02) Sri.L.Ha.a. / Ja.Ha.a. : Enter your national ID number.</p>

                <p>03) Year : Select the year you want to get details under.</p>

                <p>04) District : Keep the same as the “ all ”> selected by default. If that is difficult to find, choose the registered administrative district and try again.</p>

               <p>05) “Im Not A Robot” Mark the Oba ☑ on the box signs in front of> and verify it.</p>

               <p> 06) “ Print ” Button Oba Get your registration statement.</p>

             <p>   07) Then the registration statement opens on a new screen and download the ring or its “Download” button.</p>
            </div>
        ),
    },
    {
        title: 'Instructions for Use - Janda Registration Information Search',
        author: 'John Doe',
        date: 'Monday, 1 July 2024, 10:00 AM',
        content: (
            <div>
                <p>01) Sri.L.Ha.a. / Ja.Ha.a. : Enter your identification number correctly under and select the
                    Administrative District : The Administrative District in which it resides.</p>
                <p>02) “Im Not A Robot” Verify it on box signs in front of ⁇ Box “ Show ” Go to get you information.</p>
                <p>03) Click on the service to obtain information and obtain the necessary information.</p>
                <p>04) If the name of the ballot list is not named (at the stipulated time), you can apply for a
                    reservation.</p>
            </div>
        ),
    },
    {
        title: 'Instructions for Use - Online Registration',
        author: 'Jane Smith',
        date: 'Wednesday, 3 July 2024, 9:00 AM',
        content: (
            <div>
                <p>01) To enter the new ballot list when the ballot nomination for a particular year begins, This eService allows you to transfer the residence or apply for errors in the information contained in the ballot list.</p>
                <p>02) There must be a user account for obtaining this service. If such an account is not made Create an account You can enter and create a user account.</p>
                <p>03) Access your username (this is 12 numbers) and login to the account using the password you set up.</p>
                <p>04) If you access the account for the first time, you have to verify your name. Verify your account with the verification button before your name.</p>
                <p>05) If you were registered in the ballot list the previous year, its information would appear here.</p>
                <p>06) Read all the instructions. The manner in which each reference is applied is given under the instructions.</p>
            </div>
        ),
    },
    // {
    //     title: '[Alert] Maintenance Downtime',
    //     author: 'Maintenance Team',
    //     date: 'Thursday, 4 July 2024, 5:00 PM',
    //     content: (
    //         <div>
    //             <p>Dear All,</p>
    //             <p>Please be advised that there will be scheduled maintenance on the university's network infrastructure this weekend. The maintenance will occur on:</p>
    //             <ul className="list-disc list-inside">
    //                 <li>Saturday, 6 July 2024, from 12:00 AM to 4:00 AM</li>
    //             </ul>
    //             <p>During this time, access to the internet and internal university systems may be intermittent or unavailable. We apologize for any inconvenience this may cause and appreciate your understanding.</p>
    //             <p>Thank you,</p>
    //             <p>Maintenance Team</p>
    //         </div>
    //     ),
    // },
    // {
    //     title: '[Event] Annual Sports Day',
    //     author: 'Sports Committee',
    //     date: 'Friday, 5 July 2024, 1:00 PM',
    //     content: (
    //         <div>
    //             <p>Dear Students and Staff,</p>
    //             <p>We are excited to announce that the Annual Sports Day will be held on:</p>
    //             <ul className="list-disc list-inside">
    //                 <li>Friday, 12 July 2024, from 8:00 AM to 5:00 PM</li>
    //             </ul>
    //             <p>Join us for a day of fun and competition! Please register for the events at the sports office by Wednesday, 10 July 2024.</p>
    //             <p>We look forward to your participation!</p>
    //             <p>Best regards,</p>
    //             <p>Sports Committee</p>
    //         </div>
    //     ),
    // },
];

export const Election_Announcements = () => {

    const openPublishAnnouncementModal = () => {

    }


    return (
        <div className="min-h-[600px] flex flex-col bg-base-100 shadow-2xl px-4 pb-4 gap-6">
            <div className='announcementContainer'>
                {/* Header */}
                <div className='header mt-8 mb-4 flex justify-between items-center'>
                    {/* Topic */}
                    <div className="topic text-3xl">
                        Site Announcements
                    </div>
                    {/* Publish new announcement */}
                    <div className=''>
                        <Button variant="contained" onClick={openPublishAnnouncementModal} className='bg-pink-500'>Create New Announcement</Button>
                    </div>
                </div>
                {/* Announcements */}
                <div className='announcements'>
                    {
                        announcements.map(announcement => <AnnouncementCard title={announcement.title} author={announcement.author} date={announcement.date} content={announcement.content}/>)
                    }
                </div>
            </div>
        </div>
    )
}
