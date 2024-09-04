import { Divider, Paper } from "@mui/material";
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import {PartyRegistrationForm} from '../../Components/PartyRegistrationForm';
import { PartyRegistrationApplicationDrawer } from "../../Components/PartyRegistrationApplicationDrawer";
import {Box, Stack} from "@mui/material";

export const PartyRegistration = () => {
    return (
        <div className="min-h-[600px] flex bg-base-100 shadow-md rounded-xl px-4 pb-4 gap-6">
            <div className="registerPartyContainer w-full">
                {/* Header */}
                <div className='header my-8 flex justify-between items-center'>
                    {/* Topic */}
                    <div className="text-3xl font-semibold text-gray-900">
                        Party Registration
                        <PartyRegistrationApplicationDrawer />
                    </div>
                </div>   
                {/* Application form and instructions */}
                <div className="flex lg:flex-row sm:flex-col gap-12">      
                    <div className="instructions w-3/4 flex-col grow ">
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

                    </div>
                    {/* Party Registration Application */}
                    {/* <div className="applicationForm w-1/2 bg-base-100 rounded-md p-2"> 
                        <div className="topic text-xl mb-4 font-bold ">
                            Application
                        </div> 
                        <PartyRegistrationForm />
                    </div> */}
                </div>
            </div>
        </div>
    );
};
