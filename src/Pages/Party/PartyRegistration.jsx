import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useMutation } from 'react-query';
import axios from 'axios';
import { Divider } from "@mui/material";
import { List, ListItem, ListItemText, Typography, Container } from '@mui/material';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { useState } from "react";
import {PartyRegistrationForm} from '../../Components/PartyRegistrationForm';

export const PartyRegistration = () => {
    const schema = yup.object().shape({
        name: yup.string().required("Party name is required"),
        abbreviation: yup.string().required("Abbreviation is required"),
        symbol: yup.mixed().required("Symbol is required"),
        constitution: yup.string().required("Constitution is required"),
        partyColors: yup.string().required("Party colors are required"),
        officeBearers: yup.string().required("Office bearers are required"),
        membership: yup.number().required("Membership number is required").positive().integer(),
        address: yup.string().required("Address is required"),
        financialStatements: yup.string().required("Financial statements are required"),
        declaration: yup.string().required("Declaration is required")
    });

    const { register, handleSubmit, formState: { errors } , setValues, getValues  } = useForm({
        resolver: yupResolver(schema)
    });

    const [value, setValue] = useState('[]');

    const mutation = useMutation(data => {
        const formData = new FormData();
        for (const key in data) {
            if (key === "symbol") {
                formData.append(key, data[key][0]);
            } else {
                formData.append(key, data[key]);
            }
        }
        return axios.post('http://localhost:8081/party-registration', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    });

    const onSubmit = data => {
        mutation.mutate(data, {
            onSuccess: (response) => {
                console.log('Data submitted successfully:', response.data);
            },
            onError: (error) => {
                console.error('Error submitting data:', error);
            }
        });
    };

    return (
        <div className="min-h-[600px] flex bg-base-100 shadow-2xl px-4 pb-4 gap-6">
            <div className="registerPartyContainer w-full">
                {/* Topic */}
                <div className="topic text-3xl mt-8 mb-6">
                    Party Registration
                </div>     
                {/* Application form and instructions */}
                <div className="flex gap-8">      
                    <div className="instructions w-1/2 flex-col grow">
                        <div className="topic text-xl mb-4 font-bold ">
                            Calling for applications
                        </div> 
                        <p className="text-justify mb-2">
                            A political party is treated as a recognized political party for the purpose of election under 
                            the section 7 of the Parliamentary Elections Act No 1 of 1981 as amended by Parliamentary Elections (Amendments) Act No 58 of 2009.
                        </p>
                        <p className="text-justify mb-2">
                            The Elections Commission publishes a newspaper notice before January 31 every year 
                            (if the law has not directed otherwise) calling for applications. 
                            However, if an election is announced during the month of January, 
                            the notice is published after the lapse of 30 days from the date of poll of such election.
                        </p>
                        <p className="text-justify mb-4">
                            The application to get a political party recognized should be submitted to the Election commission 
                            by the secretary of the party.
                        </p>
                        <div className="topic text-xl mb-4 font-bold">
                            What are the documents to be submitted with the applications?
                        </div> 
                        <List>
                            <ListItem>
                                <ListItemText primary="Copy of the constitution of the party." />
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
                    </div>
                    <Divider orientation="vertical" flexItem/>
                    <div className="applicationForm w-1/2">
                        <PartyRegistrationForm />
                    </div>
                </div>
            </div>
        </div>
    );
};
