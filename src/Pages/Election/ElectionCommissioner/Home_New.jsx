import React, {useEffect, useState} from 'react';
import {Box} from "@mui/system";
import {Divider, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import BallotIcon from '@mui/icons-material/Ballot';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import { motion } from 'framer-motion';
import Card from "@mui/material/Card";
import { Link } from 'react-router-dom';


export const ElectionCommissionerHome = () => {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const element = document.getElementById('animatedDiv');
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;

            if (rect.top <= windowHeight) {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="flex grow w-full flex-col">
            <div className="w-full">
                <div className="relative">
                    <div className="absolute inset-0 -mx-24 -mt-8 w-screen h-[200px]">
                        <img
                            src="./background.png"
                            alt="Full Width"
                            className="w-full h-[300px] object-cover"
                        />
                    </div>
                    <div className="absolute flex flex-row gap-4 p-4 pl-52 mt-10">
                        <span className="text-pink-500 font-semibold" style={{fontSize: '32px'}}>eServices - </span>
                        <span className="text-black font-semibold" style={{fontSize: '32px'}}>Election Commission</span>
                    </div>
                </div>


                <div className="flex flex-row gap-10 justify-center relative z-10 mt-44 w-full px-10">
                    <Link to={"/VoterRegistration"}>
                        <motion.div
                            className="flex flex-col items-center justify-between p-6 bg-white rounded-lg shadow-md w-40 h-40"
                            whileHover={{scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)"}}
                            whileTap={{scale: 0.95}}
                        >
                            <PersonOutlineOutlinedIcon className="text-pink-500 mb-4" style={{fontSize: 30}}/>
                            <Typography className="text-gray-800 font-bold text-center mb-2"
                                        sx={{fontSize: '15px', fontWeight: '700'}}
                                        style={{
                                            flex: '1',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: '40px'
                                        }}
                            >
                                On-line Registration
                            </Typography>
                            <Button
                                className="text-gray-500 hover:text-pink-500 transition-colors duration-300"
                                sx={{fontSize: '12px', marginTop: '15px'}}
                            >
                                Get Started
                            </Button>
                        </motion.div>
                    </Link>
                    <Link to={"/VoterRegistration"}>
                        <motion.div
                            className="flex flex-col items-center justify-between p-6 bg-white rounded-lg shadow-md w-40 h-40"
                            whileHover={{scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)"}}
                            whileTap={{scale: 0.95}}
                        >
                            <FeedOutlinedIcon className="text-pink-500 mb-4" style={{fontSize: 30}}/>
                            <Typography className="text-gray-800 font-bold text-center mb-2"
                                        sx={{fontSize: '15px', fontWeight: '700'}}
                                        style={{
                                            flex: '1',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: '40px'
                                        }}
                            >
                                Statement of Electoral Registration
                            </Typography>
                            <Button
                                className="text-gray-500 hover:text-pink-500 transition-colors duration-300"
                                sx={{fontSize: '12px', marginTop: '15px'}}
                            >
                                Get Started
                            </Button>
                        </motion.div>
                    </Link>
                    <motion.div
                        className="flex flex-col items-center justify-between p-6 bg-white rounded-lg shadow-md w-40 h-40"
                        whileHover={{scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)"}}
                        whileTap={{scale: 0.95}}
                    >
                        <AccountBoxIcon className="text-pink-500 mb-4" style={{fontSize: 30}}/>
                        <Typography className="text-gray-800 font-bold text-center mb-2"
                                    sx={{fontSize: '15px', fontWeight: '700'}}
                                    style={{
                                        flex: '1',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '40px'
                                    }}
                        >
                            Voter Registration Details Search
                        </Typography>
                        <Button
                            className="text-gray-500 hover:text-pink-500 transition-colors duration-300"
                            sx={{fontSize: '12px', marginTop: '15px'}}
                        >
                            Get Started
                        </Button>
                    </motion.div>
                    <motion.div
                        className="flex flex-col items-center justify-between p-6 bg-white rounded-lg shadow-md w-40 h-40"
                        whileHover={{scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)"}}
                        whileTap={{scale: 0.95}}
                    >
                        <BallotIcon className="text-pink-500 mb-4" style={{fontSize: 30}}/>
                        <Typography className="text-gray-800 font-bold text-center mb-2"
                                    sx={{fontSize: '15px', fontWeight: '700'}}
                                    style={{
                                        flex: '1',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '40px'
                                    }}
                        >
                            Election Details
                        </Typography>
                        <Button
                            className="text-gray-500 hover:text-pink-500 transition-colors duration-300"
                            sx={{fontSize: '12px', marginTop: '15px'}}
                        >
                            Get Started
                        </Button>
                    </motion.div>
                    <motion.div
                        className="flex flex-col items-center justify-between p-6 bg-white rounded-lg shadow-md w-40 h-40"
                        whileHover={{scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)"}}
                        whileTap={{scale: 0.95}}
                    >
                        <HowToVoteIcon className="text-pink-500 mb-4" style={{fontSize: 30}}/>
                        <Typography className="text-gray-800 font-bold text-center mb-2"
                                    sx={{fontSize: '15px', fontWeight: '700'}}
                                    style={{
                                        flex: '1',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '40px'
                                    }}
                        >
                            Postal Vote
                        </Typography>
                        <Button
                            className="text-gray-500 hover:text-pink-500 transition-colors duration-300"
                            sx={{fontSize: '12px', marginTop: '30px'}}
                        >
                            Get Started
                        </Button>
                    </motion.div>
                    <motion.div
                        className="flex flex-col items-center justify-between p-6 bg-white rounded-lg shadow-md w-40 h-40"
                        whileHover={{scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)"}}
                        whileTap={{scale: 0.95}}
                    >
                        <GroupOutlinedIcon className="text-pink-500 mb-4" style={{fontSize: 30}}/>
                        <Typography className="text-gray-800 font-bold text-center mb-2"
                                    sx={{fontSize: '15px', fontWeight: '700'}}
                                    style={{
                                        flex: '1',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '40px'
                                    }}
                        >
                            Party Details
                        </Typography>
                        <Button
                            className="text-gray-500 hover:text-pink-500 transition-colors duration-300"
                            sx={{fontSize: '12px', marginTop: '30px'}}
                        >
                            Get Started
                        </Button>
                    </motion.div>
                </div>
            </div>
            <div className="flex items-center justify-between p-36 pl-52 pb-10 bg-white -mx-24 -mt-20">
                {/* Image Section */}
                <div className="w-1/2">
                    <motion.img
                        src="./Images/HomePeople.png"
                        alt="Youth Enrollment"
                        className="w-full h-auto object-contain"
                        animate={{y: [0, -20, 0]}} // Moves up and down
                        transition={{
                            duration: 2,           // Duration of 3 seconds for a slower animation
                            ease: "easeInOut",     // Smooth easing function
                            repeat: Infinity,     // Repeat indefinitely
                            repeatType: "loop"    // Loop the animation
                        }}
                    />
                </div>

                <div className="w-1/2 flex flex-col items-start space-y-4">
                    <Typography
                        variant="h5"
                        className="flex items-center text-gray-800 font-semibold"
                    >
                        <GroupAddOutlinedIcon className="mr-2"/>
                        ENROLLMENT OF YOUNG CITIZENS
                    </Typography>

                    <Typography
                        variant="body1"
                        className="text-gray-600"
                    >
                        Inclusion of youth citizens (born after 2006.02.01) in the Electoral Register
                    </Typography>

                    <Button
                        variant="outlined"
                        className="text-gray-700 border-gray-300 hover:bg-gray-100"
                    >
                        Get Started
                    </Button>
                </div>
            </div>
            <motion.div
                initial={{opacity: 0, y: 50}}
                animate={isVisible ? {opacity: 1, y: 0} : {}}
                transition={{delay: 0.2, duration: 2}}
                id="animatedDiv"
                className="bg-[#f6f9fe] p-32 px-64 flex flex-wrap flex-col gap-16 -mx-24"
            >
                <div className="flex flex-wrap flex-row">
                    <div className="relative max-w-sm mx-auto">
                        <Card className="p-6 text-center relative z-10">
                            <div className="my-14"> {/* Add margin to create space for the icon */}
                                <Typography variant="h6" component="div" className="font-bold">
                                    FOR CITIZENS
                                </Typography>
                                <div className="my-4">
                                    <Button
                                        className="block w-full text-black hover:font-bold"
                                        variant="text"
                                        sx={{
                                            color: 'black',
                                            '&:hover': {
                                                fontWeight: 700,
                                            },
                                        }}>
                                        Voter Registration Details
                                    </Button>
                                    <Divider/>
                                    <Button
                                        className="block w-full text-black hover:font-bold"
                                        variant="text"
                                        sx={{
                                            color: 'black',
                                            '&:hover': {
                                                fontWeight: 700,
                                            },
                                        }}>
                                        Electoral Registration Details - Draft
                                    </Button>
                                    <Divider/>
                                    <Button
                                        className="block w-full text-black hover:font-bold"
                                        variant="text"
                                        sx={{
                                            color: 'black',
                                            '&:hover': {
                                                fontWeight: 700,
                                            },
                                        }}>
                                        Statement of Electoral Registration
                                    </Button>
                                    <Divider/>
                                    <Button
                                        className="block w-full text-black hover:font-bold"
                                        variant="text"
                                        sx={{
                                            color: 'black',
                                            '&:hover': {
                                                fontWeight: 700,
                                            },
                                        }}>
                                        On-line Registration
                                    </Button>
                                    <Divider/>
                                    <Button
                                        className="block w-full text-black hover:font-bold"
                                        variant="text"
                                        sx={{
                                            color: 'black',
                                            '&:hover': {
                                                fontWeight: 700,
                                            },
                                        }}>
                                        More
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        <div
                            className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-pink-500 rounded-full p-4 z-20">
                            <PersonOutlineOutlinedIcon className="text-white" style={{fontSize: 40}}/>
                        </div>
                    </div>
                    <div className="relative max-w-sm mx-auto">
                        <Card className="p-6 text-center relative z-10">
                            <div className="my-14"> {/* Add margin to create space for the icon */}
                                <Typography variant="h6" component="div" className="font-bold">
                                    FOR CITIZENS
                                </Typography>
                                <div className="my-4">
                                    <Button
                                        className="block w-full text-black hover:font-bold"
                                        variant="text"
                                        sx={{
                                            color: 'black',
                                            '&:hover': {
                                                fontWeight: 700,
                                            },
                                        }}>
                                        Voter Registration Details
                                    </Button>
                                    <Divider/>
                                    <Button
                                        className="block w-full text-black hover:font-bold"
                                        variant="text"
                                        sx={{
                                            color: 'black',
                                            '&:hover': {
                                                fontWeight: 700,
                                            },
                                        }}>
                                        Electoral Registration Details - Draft
                                    </Button>
                                    <Divider/>
                                    <Button
                                        className="block w-full text-black hover:font-bold"
                                        variant="text"
                                        sx={{
                                            color: 'black',
                                            '&:hover': {
                                                fontWeight: 700,
                                            },
                                        }}>
                                        Statement of Electoral Registration
                                    </Button>
                                    <Divider/>
                                    <Button
                                        className="block w-full text-black hover:font-bold"
                                        variant="text"
                                        sx={{
                                            color: 'black',
                                            '&:hover': {
                                                fontWeight: 700,
                                            },
                                        }}>
                                        On-line Registration
                                    </Button>
                                    <Divider/>
                                    <Button
                                        className="block w-full text-black hover:font-bold"
                                        variant="text"
                                        sx={{
                                            color: 'black',
                                            '&:hover': {
                                                fontWeight: 700,
                                            },
                                        }}>
                                        More
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        <div
                            className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-pink-500 rounded-full p-4 z-20">
                            <PersonOutlineOutlinedIcon className="text-white" style={{fontSize: 40}}/>
                        </div>
                    </div>
                    <div className="relative max-w-sm mx-auto">
                        <Card className="p-6 text-center relative z-10">
                            <div className="my-14"> {/* Add margin to create space for the icon */}
                                <Typography variant="h6" component="div" className="font-bold">
                                    FOR CITIZENS
                                </Typography>
                                <div className="my-4">
                                    <Button
                                        className="block w-full text-black hover:font-bold"
                                        variant="text"
                                        sx={{
                                            color: 'black',
                                            '&:hover': {
                                                fontWeight: 700,
                                            },
                                        }}>
                                        Voter Registration Details
                                    </Button>
                                    <Divider/>
                                    <Button
                                        className="block w-full text-black hover:font-bold"
                                        variant="text"
                                        sx={{
                                            color: 'black',
                                            '&:hover': {
                                                fontWeight: 700,
                                            },
                                        }}>
                                        Electoral Registration Details - Draft
                                    </Button>
                                    <Divider/>
                                    <Button
                                        className="block w-full text-black hover:font-bold"
                                        variant="text"
                                        sx={{
                                            color: 'black',
                                            '&:hover': {
                                                fontWeight: 700,
                                            },
                                        }}>
                                        Statement of Electoral Registration
                                    </Button>
                                    <Divider/>
                                    <Button
                                        className="block w-full text-black hover:font-bold"
                                        variant="text"
                                        sx={{
                                            color: 'black',
                                            '&:hover': {
                                                fontWeight: 700,
                                            },
                                        }}>
                                        On-line Registration
                                    </Button>
                                    <Divider/>
                                    <Button
                                        className="block w-full text-black hover:font-bold"
                                        variant="text"
                                        sx={{
                                            color: 'black',
                                            '&:hover': {
                                                fontWeight: 700,
                                            },
                                        }}>
                                        More
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        <div
                            className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-pink-500 rounded-full p-4 z-20">
                            <PersonOutlineOutlinedIcon className="text-white" style={{fontSize: 40}}/>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap flex-row">
                    <div className="relative max-w-sm mx-auto">
                        <Card className="p-6 text-center relative z-10">
                            <div className="my-14"> {/* Add margin to create space for the icon */}
                                <Typography variant="h6" component="div" className="font-bold">
                                    FOR CITIZENS
                                </Typography>
                                <div className="my-4">
                                    <Button
                                        className="block w-full text-black hover:font-bold"
                                        variant="text"
                                        sx={{
                                            color: 'black',
                                            '&:hover': {
                                                fontWeight: 700,
                                            },
                                        }}>
                                        Voter Registration Details
                                    </Button>
                                    <Divider/>
                                    <Button
                                        className="block w-full text-black hover:font-bold"
                                        variant="text"
                                        sx={{
                                            color: 'black',
                                            '&:hover': {
                                                fontWeight: 700,
                                            },
                                        }}>
                                        Electoral Registration Details - Draft
                                    </Button>
                                    <Divider/>
                                    <Button
                                        className="block w-full text-black hover:font-bold"
                                        variant="text"
                                        sx={{
                                            color: 'black',
                                            '&:hover': {
                                                fontWeight: 700,
                                            },
                                        }}>
                                        Statement of Electoral Registration
                                    </Button>
                                    <Divider/>
                                    <Button
                                        className="block w-full text-black hover:font-bold"
                                        variant="text"
                                        sx={{
                                            color: 'black',
                                            '&:hover': {
                                                fontWeight: 700,
                                            },
                                        }}>
                                        On-line Registration
                                    </Button>
                                    <Divider/>
                                    <Button
                                        className="block w-full text-black hover:font-bold"
                                        variant="text"
                                        sx={{
                                            color: 'black',
                                            '&:hover': {
                                                fontWeight: 700,
                                            },
                                        }}>
                                        More
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        <div
                            className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-pink-500 rounded-full p-4 z-20">
                            <PersonOutlineOutlinedIcon className="text-white" style={{fontSize: 40}}/>
                        </div>
                    </div>
                    <div className="relative max-w-sm mx-auto">
                        <Card className="p-6 text-center relative z-10">
                            <div className="my-14"> {/* Add margin to create space for the icon */}
                                <Typography variant="h6" component="div" className="font-bold">
                                    FOR CITIZENS
                                </Typography>
                                <div className="my-4">
                                    <Button
                                        className="block w-full text-black hover:font-bold"
                                        variant="text"
                                        sx={{
                                            color: 'black',
                                            '&:hover': {
                                                fontWeight: 700,
                                            },
                                        }}>
                                        Voter Registration Details
                                    </Button>
                                    <Divider/>
                                    <Button
                                        className="block w-full text-black hover:font-bold"
                                        variant="text"
                                        sx={{
                                            color: 'black',
                                            '&:hover': {
                                                fontWeight: 700,
                                            },
                                        }}>
                                        Electoral Registration Details - Draft
                                    </Button>
                                    <Divider/>
                                    <Button
                                        className="block w-full text-black hover:font-bold"
                                        variant="text"
                                        sx={{
                                            color: 'black',
                                            '&:hover': {
                                                fontWeight: 700,
                                            },
                                        }}>
                                        Statement of Electoral Registration
                                    </Button>
                                    <Divider/>
                                    <Button
                                        className="block w-full text-black hover:font-bold"
                                        variant="text"
                                        sx={{
                                            color: 'black',
                                            '&:hover': {
                                                fontWeight: 700,
                                            },
                                        }}>
                                        On-line Registration
                                    </Button>
                                    <Divider/>
                                    <Button
                                        className="block w-full text-black hover:font-bold"
                                        variant="text"
                                        sx={{
                                            color: 'black',
                                            '&:hover': {
                                                fontWeight: 700,
                                            },
                                        }}>
                                        More
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        <div
                            className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-pink-500 rounded-full p-4 z-20">
                            <PersonOutlineOutlinedIcon className="text-white" style={{fontSize: 40}}/>
                        </div>
                    </div>
                    <div className="relative max-w-sm mx-auto">
                        <Card className="p-6 text-center relative z-10">
                            <div className="my-14"> {/* Add margin to create space for the icon */}
                                <Typography variant="h6" component="div" className="font-bold">
                                    FOR CITIZENS
                                </Typography>
                                <div className="my-4">
                                    <Button
                                        className="block w-full text-black hover:font-bold"
                                        variant="text"
                                        sx={{
                                            color: 'black',
                                            '&:hover': {
                                                fontWeight: 700,
                                            },
                                        }}>
                                        Voter Registration Details
                                    </Button>
                                    <Divider/>
                                    <Button
                                        className="block w-full text-black hover:font-bold"
                                        variant="text"
                                        sx={{
                                            color: 'black',
                                            '&:hover': {
                                                fontWeight: 700,
                                            },
                                        }}>
                                        Electoral Registration Details - Draft
                                    </Button>
                                    <Divider/>
                                    <Button
                                        className="block w-full text-black hover:font-bold"
                                        variant="text"
                                        sx={{
                                            color: 'black',
                                            '&:hover': {
                                                fontWeight: 700,
                                            },
                                        }}>
                                        Statement of Electoral Registration
                                    </Button>
                                    <Divider/>
                                    <Button
                                        className="block w-full text-black hover:font-bold"
                                        variant="text"
                                        sx={{
                                            color: 'black',
                                            '&:hover': {
                                                fontWeight: 700,
                                            },
                                        }}>
                                        On-line Registration
                                    </Button>
                                    <Divider/>
                                    <Button
                                        className="block w-full text-black hover:font-bold"
                                        variant="text"
                                        sx={{
                                            color: 'black',
                                            '&:hover': {
                                                fontWeight: 700,
                                            },
                                        }}>
                                        More
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        <div
                            className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-pink-500 rounded-full p-4 z-20">
                            <PersonOutlineOutlinedIcon className="text-white" style={{fontSize: 40}}/>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};


export default ElectionCommissionerHome;