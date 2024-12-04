import React from 'react'
import { PromiseCard } from '../../Components/PromiseCard'
import { Box, Typography, Container, Paper, Grid, Avatar } from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Stack, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import { InquiryCard } from '../../Components/InquiryCard';
import { SubmitInquiry } from '../../Components/SubmitInquiry';
import { LinearWithValueLabel } from '../../Components/LinearValueWithLabel';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { MoreOverMenu } from '../../Components/MoreOverMenu';
import { AddNewPromise } from '../../Components/AddNewPromise';
import {  Chip, IconButton, Tooltip } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const options = ["Add New Promise", "Submit Inquiry", "Update Manifesto", "Delete Manifesto"];

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 20,
    borderRadius: 5,
    [`&.${LinearProgress.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[300],
    },
    [`& .${LinearProgress.bar}`]: {
      borderRadius: 5,
      backgroundColor: '#4caf50', // A nice green color
    },
  }));

  const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.MuiLinearProgress-colorPrimary`]: {
      backgroundColor: theme.palette.grey[200],
    },
    [`& .MuiLinearProgress-bar`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.success.main,
    },
  }));
  
  const StatusChip = ({ color, label }) => (
    <Chip
      size="small"
      label={label}
      sx={{
        backgroundColor: color,
        color: 'white',
        '& .MuiChip-label': { fontWeight: 'bold' },
      }}
    />
  );

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
            </Box>
        )}
        </div>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
  
function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const promises = [
    {
        date: 'Jan 09, 2024',
        title: 'Increase Healthcare Funding',
        description: 'The government will increase funding for healthcare by 20% to improve public health services, enhance the quality of care, and reduce waiting times for treatments.',
        progress: 40,
        score: '2.0 / 5.0'
    },
    {
        date: 'Feb 15, 2024',
        title: 'Implement Green Energy Initiatives',
        description: 'Introduction of new policies to support renewable energy projects, including solar and wind, with the goal of generating 50% of the country’s energy from green sources by 2030.',
        progress: 15,
        score: '1.0 / 5.0'
    },
    {
        date: 'Mar 22, 2024',
        title: 'Education System Overhaul',
        description: 'A comprehensive reform of the education system aimed at improving curriculum standards, increasing teacher salaries, and providing more resources to underfunded schools.',
        progress: 25,
        score: '1.5 / 5.0'
    },
    {
        date: 'Apr 10, 2024',
        title: 'Affordable Housing Development',
        description: 'Launch of a new initiative to build 10,000 affordable housing units in urban and rural areas to address the housing shortage and provide more affordable living options.',
        progress: 10,
        score: '0.5 / 5.0'
    },
    {
        date: 'May 05, 2024',
        title: 'Public Transportation Expansion',
        description: 'Expansion of public transportation networks to include more routes and services, with the aim of reducing traffic congestion and providing better mobility options for residents.',
        progress: 30,
        score: '1.5 / 5.0'
    },
    {
        date: 'Jun 20, 2024',
        title: 'Digital Infrastructure Enhancement',
        description: 'Upgrading digital infrastructure to enhance internet connectivity across the country, with a focus on rural areas and underserved communities, to support economic growth and education.',
        progress: 20,
        score: '1.0 / 5.0'
    }
];


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

export const Manifesto = ({ overallProgress, items }) => {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [openSubmitInquiryModal, setOpenSubmitInquiryModal] = React.useState(false);
    const [openAddNewPromiseModal, setOpenAddNewPromiseModal] = React.useState(false);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const handleChangeIndex = (index) => {
      setValue(index);
    };

    const handleOpenSubmitInquiryModal = () => {
        setOpenSubmitInquiryModal(true);
    };

    const handleCloseSubmitInquiryModal = () => {
        setOpenSubmitInquiryModal(false);
    };

    const handleOpenAddNewPromiseModal = () => {
        setOpenAddNewPromiseModal(true);
    };

    const handleCloseAddNewPromiseModal = () => {
        setOpenAddNewPromiseModal(false);
    };

    const onMoreClick = () => {};
    
    return (
        <div className="min-h-[600px] flex flex-col bg-base-100 shadow-2xl px-4 pb-4 gap-6">
            <div maxWidth="md" className="mt-4">
                {/* header */}
                <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                        <Box display="flex" gap={4}>
                            <Avatar
                                src="../../assets/mr.jpg"
                                alt="Profile"
                                sx={{ width: 120, height: 120, borderRadius: 2 }}
                            />
                            <Box>
                                <Typography variant="h4" gutterBottom fontWeight="bold">
                                Manifesto: 100 days and beyond
                                </Typography>
                                <Box display="flex" alignItems="center" mb={2}>
                                <Typography variant="body1" color="text.secondary" mr={2}>
                                    Overall Progress:
                                </Typography>
                                <Typography variant="h6" fontWeight="bold" color="success.main">
                                    {`${overallProgress}%`}
                                </Typography>
                                </Box>
                                <StyledLinearProgress variant="determinate" value={overallProgress} sx={{ mb: 3, width: '100%' }} />
                                <Box display="flex" gap={1} flexWrap="wrap">
                                <StatusChip color="#4caf50" label="Completed" />
                                <StatusChip color="#ffc107" label="Partial" />
                                <StatusChip color="#f44336" label="Not Done" />
                                <StatusChip color="#9e9e9e" label="Pending" />
                                </Box>
                            </Box>
                        </Box>
                        <Box>
                            <Tooltip title="Bookmark">
                                <IconButton>
                                <BookmarkIcon />
                                </IconButton>
                            </Tooltip>
                            {/* functions */}
                            <Stack direction="column">
                                <MoreOverMenu options={options} onSubmitNewInquiry={handleOpenSubmitInquiryModal} onAddNewPromise={handleOpenAddNewPromiseModal} sx={{fontSize:"40px"}} className="text-black"/>
                                {/* add new promise modal */}
                                {
                                    openAddNewPromiseModal && <AddNewPromise open={openAddNewPromiseModal} handleClose={handleCloseAddNewPromiseModal}/>
                                }
                                {/* submit inquiry modal */}
                                {
                                    openSubmitInquiryModal && <SubmitInquiry open={openSubmitInquiryModal} handleClose={handleCloseSubmitInquiryModal}/>
                                }
                            </Stack>
                        </Box>
                    </Box>
                </Paper>
                {/* tabs */}
                <Box sx={{ bgcolor: 'background.paper' }}>
                        <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                        >
                        <Tab label="Promises" {...a11yProps(0)} />
                        <Tab label="Inquiries" {...a11yProps(1)} />
                        </Tabs>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >
                        {/* promise tab */}
                        <TabPanel value={value} index={0} dir={theme.direction}>
                            {/* promises list */}
                            <div className="mt-8 flex justify-center">
                                <div className="bg-white rounded-lg py-8 px-4 w-[90%]">
                                    {promises.map((promise, index) => (
                                        <PromiseCard key={index} {...promise} />
                                    ))}
                                </div>
                            </div>
                        </TabPanel>
                        {/* inquiry tab */}
                        <TabPanel value={value} index={1} dir={theme.direction}>
                            {/* Inquiry List */}
                            <div className="mt-8 flex justify-center">
                                <div className="bg-white rounded-lg py-8 px-4 w-[90%]">
                                    {inquiries.map((inquiry, index) => (
                                        <InquiryCard key={index} inquiry={inquiry} title={inquiry.title} author={inquiry.author} date={inquiry.date} content={inquiry.content} replyContent={inquiry.replyContent} onReply/>
                                    ))}
                                </div>
                            </div>
                        </TabPanel>
                    </SwipeableViews>
                </Box>
            </div>
        </div>
    )
}
