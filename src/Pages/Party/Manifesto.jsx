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

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 32,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

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
        date: 'Jan 09',
        title: 'Parliament to meet for the first time',
        description: 'Parliament to meet for the first time after common opposition candidate Maithripala Sirisena is elected president on 8th January 2015',
        progress: 100,
        score: '0.0 / 0.0'
    },
    {
        date: 'Jan 10',
        title: 'Other initiative',
        description: 'Description of other initiative',
        progress: 0,
        score: '0.0 / 0.0'
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

  
    return (
        <div className="min-h-[600px] flex flex-col bg-base-100 shadow-2xl px-4 pb-4 gap-6">
            <div maxWidth="md" className="mt-4">
                {/* header */}
                <Paper elevation={2} className="p-6 mb-4">
                    <div className='flex justify-between items-center'>
                        <div className='flex gap-12'>
                            {/* Avatar */}
                            <img src="../../src/assets/mr.jpg" alt="Profile" className='w-48 h-48 object-cover' />
                            <div className='flex flex-col gap-4'>
                                {/* Tracking Progress */}
                                <div className='flex flex-col gap-1'>
                                    <Typography variant="h5" gutterBottom>Manifesto: 100 days and beyond</Typography>
                                    <Typography variant="body1" color="textSecondary" gutterBottom>{`Overall Progress: ${overallProgress}%`}</Typography>
                                    <BorderLinearProgress variant="determinate" value={50} />
                                </div>
                                {/* Status */}
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                                    <Box display="flex" alignItems="center">
                                        <Box display="flex" alignItems="center" mr={2}>
                                            <Box bgcolor="green" width={16} height={16} borderRadius="50%" />
                                            <Typography variant="body2" color="textSecondary" ml={1}>Pledge Completed</Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center" mr={2}>
                                            <Box bgcolor="yellow" width={16} height={16} borderRadius="50%" />
                                            <Typography variant="body2" color="textSecondary" ml={1}>Partially Completed</Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center" mr={2}>
                                            <Box bgcolor="red" width={16} height={16} borderRadius="50%" />
                                            <Typography variant="body2" color="textSecondary" ml={1}>Not Done</Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center">
                                            <Box bgcolor="gray" width={16} height={16} borderRadius="50%" />
                                            <Typography variant="body2" color="textSecondary" ml={1}>Pending</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </div>
                        </div>
                        {/* functions */}
                        <Stack direction="column" spacing={2} >
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                sx={{ backgroundColor: '#1976d2', color: '#fff', '&:hover': { backgroundColor: '#115293' } }}
                            >
                                Add New Promise
                            </Button>
                            <Button
                                onClick={handleOpenSubmitInquiryModal}
                                variant="contained"
                                startIcon={<SendIcon />}
                                sx={{ backgroundColor: '#4caf50', color: '#fff', '&:hover': { backgroundColor: '#388e3c' } }}
                            >
                                Submit Inquiry
                            </Button>
                            {/* submit inquiry modal */}
                            {
                                openSubmitInquiryModal && <SubmitInquiry open={openSubmitInquiryModal} handleClose={handleCloseSubmitInquiryModal}/>
                            }
                            <Button
                                variant="contained"
                                startIcon={<UpdateIcon />}
                                sx={{ backgroundColor: '#ff9800', color: '#fff', '&:hover': { backgroundColor: '#f57c00' } }}
                            >
                                Update
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<DeleteIcon />}
                                sx={{ backgroundColor: '#f44336', color: '#fff', '&:hover': { backgroundColor: '#d32f2f' } }}
                            >
                                Delete
                            </Button>
                        </Stack>
                    </div>
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
