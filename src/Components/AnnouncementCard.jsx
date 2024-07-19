import React from 'react';

export const AnnouncementCard = ({ title, author, date, content }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
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
            <div className="text-gray-800">
                {content}
            </div>
        </div>
    );
};

