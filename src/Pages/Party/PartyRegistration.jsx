import { useState } from 'react';
import { Divider, Paper } from "@mui/material";
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import {PartyRegistrationForm} from '../../Components/PartyRegistrationForm';
import { PartyRegistrationApplicationDrawer } from "../../Components/PartyRegistrationApplicationDrawer";
import { PartyRegistrationApplication } from "../../Components/PartyRegistrationApplication";
import {Box, Stack} from "@mui/material";
import {Button} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ArrowRight } from 'lucide-react';


export const PartyRegistration = () => {
    const[openPartyRegistrationApplication, setOpenPartyRegistrationApplication] = useState(false);

    const handleOpenPartyApplication = () => {
        setOpenPartyRegistrationApplication(true);
    };

    const handleClosePartyRegistrationApplication  = () => {
        setOpenPartyRegistrationApplication(false);
    };

    return (
        <div className="min-h-[600px] flex bg-base-100 shadow-md rounded-xl px-4 pb-4 gap-6">
            <div className="registerPartyContainer w-full ">
                {/* Header */}
                <div className='header my-8 flex justify-between items-center'>
                    {/* Topic */}
                    <div className="text-3xl font-semibold text-gray-900 flex justify-between">
                        Party Registration
                    </div>
                    <div>
                        <PartyRegistrationApplication open={openPartyRegistrationApplication} handleClose={handleClosePartyRegistrationApplication} />
                    </div>
                </div>   
                {/* Application form and instructions */}
                <div className="flex flex-col gap-12 w-full">      
                    <div className="instructions flex-col grow ">
                        <Stack  className="bg-base-100 rounded-md p-2">
                            <div className="topic text-xl mb-4 font-bold ">
                                Calling for applications
                            </div> 
                            <Box spacing={2} gutterBottom>
                                <Typography variant="body1" className="text-justify" gutterBottom>
                                    A political party is treated as a recognized political party for the purpose of election under 
                                    the section 7 of the Parliamentary Elections Act No 1 of 1981 as amended by Parliamentary Elections (Amendments) Act No 58 of 2009.
                                </Typography>
                                <Typography variant="body1" className="text-justify" gutterBottom>
                                    The Elections Commission publishes a newspaper notice before January 31 every year 
                                    (if the law has not directed otherwise) calling for applications. 
                                    However, if an election is announced during the month of January, 
                                    the notice is published after the lapse of 30 days from the date of poll of such election.
                                </Typography>
                                <Typography variant="body1" className="text-justify" gutterBottom>
                                    The application to get a political party recognized should be submitted to the Election commission 
                                    by the secretary of the party.
                                </Typography>
                            </Box>
                        </Stack>
                        <Box my={4} />
                        <Stack  className="bg-base-100 rounded-md p-2">
                            <div className="topic text-xl mb-4 font-bold" >
                                What are the documents to be submitted with the applications?
                            </div> 

                            <List>
                                <ListItem>
                                    <ListItemText variant="body1" primary="Copy of the constitution of the party." />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="The list of office-bearers of the party (at least one female office-bearer should be included)." />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Statements of audited accounts of the party." />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="The current policy declaration of the party." />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="All documents and reports to prove that the party has been politically active continuously." />
                                </ListItem>
                            </List>
                        </Stack>
                        {/* <button className="flex items-center px-6 py-3 bg-pink-500 text-white font-bold text-lg rounded-full shadow-lg hover:bg-pink-600 hover:shadow-xl">
                            <div className="flex justify-center items-center w-8 h-8 bg-white text-black rounded-full mr-3">
                                ➔
                            </div>
                            CLICK HERE
                        </button> */}
                        <Box my={4} />
                    </div>
                </div>
                <div  className="flex items-center justify-center pb-4">
                    <button 
                        className="group flex items-center justify-between px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-lg rounded-full transition-all duration-300 hover:from-pink-600 hover:to-purple-600 hover:scale-105 hover:shadow-[0_8px_25px_-5px_rgba(255,100,255,0.3)] overflow-hidden transform" 
                        onClick={handleOpenPartyApplication}
                    >
                        <div className="relative z-10 flex items-center">
                            <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full mr-4 transform transition-transform duration-500 group-hover:rotate-[360deg]">
                                <ArrowRight className="w-4 h-4 text-pink-500" />
                            </div>
                            <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                                Register Now
                            </span>
                        </div>
                        <div className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left" />
                    </button>
                </div>
            </div>
        </div>
    );
};
