import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button, Typography, Paper } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const localizer = momentLocalizer(moment);

// Sample events data
const events = [
    {
        title: 'Team Meeting',
        start: new Date(2024, 8, 5, 10, 0),
        end: new Date(2024, 8, 5, 11, 0),
    },
    {
        title: 'Project Deadline',
        start: new Date(2024, 8, 13, 9, 0),
        end: new Date(2024, 8, 13, 17, 0),
    },
    // Add more events as needed
];

const MiniCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [hoveredDate, setHoveredDate] = useState(null);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const [selectedDate, setSelectedDate] = useState(null);

    const handleNavigate = (action) => {
        const newDate = new Date(currentDate);
        if (action === 'TODAY') {
            setCurrentDate(new Date());
        } else if (action === 'PREV') {
            newDate.setMonth(newDate.getMonth() - 1);
            setCurrentDate(newDate);
        } else if (action === 'NEXT') {
            newDate.setMonth(newDate.getMonth() + 1);
            setCurrentDate(newDate);
        }
    };

    const getDayEvents = (date) => {
        return events.filter(event =>
            moment(event.start).isSame(date, 'day')
        );
    };

    const customDayPropGetter = (date) => {
        const dayEvents = getDayEvents(date);
        if (dayEvents.length > 0) {
            return {
                className: 'has-events',
                style: {
                    backgroundColor: '#FDF2F8', // Very light pink to indicate events
                    borderBottom: '2px solid #F472B6', // Medium pink underline for event indicator
                    cursor: 'pointer',
                },
                onMouseEnter: (e) => handleMouseEnter(date, e),
                onMouseLeave: handleMouseLeave,
                onClick: () => handleDateClick(date),
            };
        }
        return {};
    };

    const handleMouseEnter = (date, e) => {
        const rect = e.target.getBoundingClientRect();
        setHoveredDate(date);
        setPopupPosition({
            top: rect.top + rect.height + window.scrollY, // Adjusted to position below the date cell
            left: rect.left + window.scrollX,
        });
    };

    const handleMouseLeave = () => {
        setHoveredDate(null);
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const handleDateChange = (date) => {
        setCurrentDate(date);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md relative">
            <div className="flex justify-between mb-4">
                <Button onClick={() => handleNavigate('TODAY')} variant="outlined" className="text-black border-black hover:bg-pink-100">Today</Button>
                <Button onClick={() => handleNavigate('PREV')} variant="outlined" className="text-black border-black hover:bg-pink-100">Back</Button>
                <Button onClick={() => handleNavigate('NEXT')} variant="outlined" className="text-black border-black hover:bg-pink-100">Next</Button>
            </div>
            <Typography variant="h6" className="text-center mb-4 text-black">
                {moment(currentDate).format('MMMM YYYY')}
            </Typography>
            <Calendar
                localizer={localizer}
                events={[]} // Hide events in calendar cells by default
                startAccessor="start"
                endAccessor="end"
                view="month"
                views={['month']}
                date={currentDate}
                dayPropGetter={customDayPropGetter}
                onNavigate={handleDateChange} // Handle navigation changes
                className="min-h-[300px]"
            />
            <AnimatePresence>
                {(hoveredDate || selectedDate) && getDayEvents(hoveredDate || selectedDate).length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-10"
                        style={{ top: popupPosition.top, left: popupPosition.left }}
                    >
                        <Paper elevation={3} className="p-3 bg-white">
                            <Typography variant="subtitle1" className="font-bold mb-2 text-black">
                                {moment(hoveredDate || selectedDate).format('MMMM D, YYYY')} Events:
                            </Typography>
                            {getDayEvents(hoveredDate || selectedDate).map((event, index) => (
                                <div key={index} className="mb-2">
                                    <Typography variant="body2" className="text-black">
                                        {event.title}
                                    </Typography>
                                    <Typography variant="caption" className="text-gray-600">
                                        {moment(event.start).format('h:mm A')} - {moment(event.end).format('h:mm A')}
                                    </Typography>
                                </div>
                            ))}
                        </Paper>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MiniCalendar;
