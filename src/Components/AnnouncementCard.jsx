// import React from 'react';

// export const AnnouncementCard = ({ title, author, date, content }) => {
//     return (
//         <div className="bg-white shadow-md rounded-lg p-6 mb-4">
//             <div className="flex items-center mb-4">
//                 <div className="bg-gray-300 rounded-full h-10 w-10 flex items-center justify-center text-xl font-bold text-gray-700">
//                     {author.charAt(0)}
//                 </div>
//                 <div className="ml-3">
//                     <p className="text-lg font-semibold">{title}</p>
//                     <p className="text-sm text-gray-500">by {author} - {date}</p>
//                 </div>
//             </div>
//             <div className="border-t border-gray-200 mt-2 mb-4"></div>
//             <div className="text-gray-800">
//                 {content}
//             </div>
//         </div>
//     );
// };

import React from 'react';
import { motion } from 'framer-motion';
import { FaBullhorn, FaCalendarAlt, FaUser } from 'react-icons/fa';

export const AnnouncementCard = ({ title, author, date, content }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-lg rounded-xl p-6 mb-6 hover:shadow-xl transition-shadow duration-300"
        >
            <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full h-12 w-12 flex items-center justify-center text-xl font-bold text-white shadow-md">
                    <FaBullhorn />
                </div>
                <div className="ml-4">
                    <motion.h2 
                        className="text-2xl font-bold text-gray-800"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {title}
                    </motion.h2>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                        <FaUser className="mr-2" />
                        <span className="mr-3">{author}</span>
                        <FaCalendarAlt className="mr-2" />
                        <span>{date}</span>
                    </div>
                </div>
            </div>
            <motion.div 
                className="border-t border-gray-200 my-4"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
            />
            <motion.div 
                className="text-gray-700 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                {content}
            </motion.div>
            <motion.div
                className="mt-4 flex justify-end"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 flex items-center">
                    <span className="mr-2">Read More</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </motion.div>
        </motion.div>
    );
};