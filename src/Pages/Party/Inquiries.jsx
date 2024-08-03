import React from 'react'
import { InquiryCard } from '../../Components/InquiryCard';

const inquiries = [
    {
        title: 'Inquiry about Course Registration',
        author: 'John Doe',
        date: 'Saturday, 6 July 2024, 10:15 AM',
        content: 'I have missed the course registration deadline. Can I still register for the courses?',
        replyContent: 'Yes, you can register within the extended period until 10 July 2024.'
    },
    {
        title: 'Inquiry about Course Materials',
        author: 'Jane Smith',
        date: 'Sunday, 7 July 2024, 2:00 PM',
        content: 'Where can I find the course materials for the new semester?',
        replyContent: null
    },
    {
        title: 'Inquiry about Examination Dates',
        author: 'Mike Johnson',
        date: 'Monday, 8 July 2024, 9:45 AM',
        content: 'Could you please provide the examination dates for the upcoming finals?',
        replyContent: 'The examination dates will be announced on 15 July 2024.'
    },
    {
        title: 'Inquiry about Fee Payment',
        author: 'Emily Davis',
        date: 'Tuesday, 9 July 2024, 11:30 AM',
        content: 'Is there an option to pay the semester fees in installments?',
        replyContent: null
    },
    {
        title: 'Inquiry about Campus Facilities',
        author: 'David Brown',
        date: 'Wednesday, 10 July 2024, 4:15 PM',
        content: 'Are the library and gym facilities open during the summer break?',
        replyContent: 'Yes, both the library and gym facilities are open during the summer break from 9 AM to 5 PM.'
    }
];

export const Inquiries = () => {

    const openPublishAnnouncementModal = () => {

    }


  return (
    <div className="min-h-[600px] flex flex-col bg-base-100 shadow-md rounded-xl px-4 pb-4 gap-6">
        <div className='announcementContainer'>
            {/* Header */}
            <div className='header my-8 flex justify-between items-center text-3xl font-semibold text-gray-900'>
                {/* Topic */}
                <div className="topic text-3xl">
                    Inquiries
                </div>
            </div>
            {/* Announcements */}
            <div className='inquiries'>
                {
                    inquiries.map(inquiry => <InquiryCard title={inquiry.title} author={inquiry.author} date={inquiry.date} content={inquiry.content}/>)
                }
            </div>
        </div>
    </div>
  )
}
