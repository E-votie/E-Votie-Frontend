import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FormControl, InputLabel, Select, MenuItem, TextField, Stack, Box, Button, Paper } from "@mui/material";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom';

const MySwal = withReactContent(Swal)

const politicians = [
    'Mahinda Rajapaksa',
    'Ranil Wickremesinghe',
    'Sajith Premadasa',
    'Anura Kumara Dissanayake',
    'Maithripala Sirisena',
];

export const PartyRegistrationForm = () => {
    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
    const [uploadedFileNames, setUploadedFileNames] = useState({});
    const [selectedLeader, setSelectedLeader] = useState('');
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key]);
        }

        const testData = {
            "partyName": "Example Party",
            "abbreviation": "EP",
            "foundedDate": "2020-01-01",
            "leader": "John Doe",
            "addressLine1": "123 Main St",
            "addressLine2": "Suite 400",
            "city": "Colombo",
            "postalCode": "00100",
            "contactNumber": "0123456789",
            "symbol": "example-symbol.png",
            "partyColors": "red, blue",
            "constitution": "example-constitution.pdf",
            "financialStatements": "example-financial-statements.pdf",
            "declaration": "We declare that...",
            "status": "pending verification"
          }
          

        try {
            console.log(data);
            const response = await axios.post('http://localhost:5003/api/party', data)
            console.log(response.data);
            if (response.status === 200 || response.status === 201) {
                MySwal.fire({
                    title: <p>Application Submitted Successfully!</p>,
                    icon: 'success',
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                    didOpen: () => {
                        // `MySwal` is a subclass of `Swal` with all the same instance & static methods
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/party/list');
                    }
                });
            } else {
                MySwal.fire({
                    title: `<p>${response.data}</p>`,
                    icon: 'error',
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                    didOpen: () => {
                        // `MySwal` is a subclass of `Swal` with all the same instance & static methods
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/party/list');
                    }
                });
            }
        } catch (error) {
            console.error('Error submitting the application', error);
            MySwal.fire({
                title: `<p>${error.response ? error.response.data : 'An error occurred'}</p>`,
                icon: 'error',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                didOpen: () => {
                    // `MySwal` is a subclass of `Swal` with all the same instance & static methods
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/');
                }
            });
        }
    }

    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedFileNames(prevState => ({
                ...prevState,
                [fieldName]: file.name
            }));
            setValue(fieldName, file); // Set the file object to the form value
        }
    };

    const handleLeaderChange = (e) => {
        setSelectedLeader(e.target.value);
        setValue('leader', e.target.value);
    };

    return (
        <div >
            <Paper elevation={3} className="p-4">
                <form onSubmit={handleSubmit(onSubmit)} className="flex-initial space-y-3 mb-4 w-full">
                    {/* Party name and abbreviation */}
                    <Stack direction="row" spacing={2} className="w-full">
                        <Box className="w-2/3">
                            <TextField
                                id="partyName"
                                label="Party Name"
                                className="w-full"
                                required
                                {...register("partyName")}
                            />
                        </Box>
                        <Box className="w-1/3">
                            <TextField
                                id="abbreviation"
                                label="Abbreviation"
                                required
                                {...register("abbreviation")}
                            />
                        </Box>
                    </Stack>

                    {/* Leader and Secretary */}
                    <Stack direction="row" className="flex w-full" spacing={2}>
                        {/* Founded Date */}
                        <Box className="w-1/2">
                            <TextField
                                id="foundedDate"
                                label="Founded Date"
                                type="date"
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                {...register("foundedDate")}
                            />
                        </Box>

                        {/* Party Leader */}
                        <Box className="w-full" >
                            <FormControl required error={!!errors.leader} className="w-full">
                                <InputLabel id="leader-label">Leader</InputLabel>
                                <Select
                                    labelId="leader-label"
                                    id="leader"
                                    value={selectedLeader}
                                    label="Leader"
                                    onChange={handleLeaderChange}
                                >
                                    {politicians.map((politician) => (
                                        <MenuItem key={politician} value={politician}>
                                            {politician}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Stack>

                    {/* Headquarters Address */}
                    <Stack spacing={2}>
                        <TextField
                            id="addressLine1"
                            label="Address Line 1"
                            required
                            {...register("addressLine1")}
                        />
                        <TextField
                            id="addressLine2"
                            label="Address Line 2"
                            required
                            {...register("addressLine2")}
                        />
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <TextField
                            id="city"
                            label="City"
                            required
                            {...register("city")}
                        />
                        <TextField
                            id="postalCode"
                            label="Postal Code"
                            required
                            {...register("postalCode")}
                        />
                        <TextField
                            id="contactNumber"
                            label="Contact Number"
                            required
                            {...register("contactNumber")}
                        />
                    </Stack>

                    <Stack spacing={2}>
                        {/* Party Symbol */}
                        <input
                            accept="image/*"
                            id="partySymbolInput"
                            type="file"
                            style={{ display: "none" }}
                            onChange={(e) => handleFileChange(e, "partySymbol")}
                        />
                        <label htmlFor="partySymbolInput">
                            <Button
                                component="span"
                                role={undefined}
                                variant="outlined"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload Party Symbol
                            </Button>
                        </label>
                        {uploadedFileNames.partySymbol && (
                            <div>
                                <p>Uploaded File: {uploadedFileNames.partySymbol}</p>
                            </div>
                        )}

                        {/* Constitution of the Party */}
                        <input
                            accept="application/pdf"
                            id="partyConstitutionInput"
                            type="file"
                            style={{ display: "none" }}
                            onChange={(e) => handleFileChange(e, "partyConstitution")}
                        />
                        <label htmlFor="partyConstitutionInput">
                            <Button
                                component="span"
                                role={undefined}
                                variant="outlined"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Constitution of the Party
                            </Button>
                        </label>
                        {uploadedFileNames.partyConstitution && (
                            <div>
                                <p>Uploaded File: {uploadedFileNames.partyConstitution}</p>
                            </div>
                        )}

                        {/* List of Office-Bearers of the Party */}
                        <input
                            accept="application/pdf"
                            id="officeBearersInput"
                            type="file"
                            style={{ display: "none" }}
                            onChange={(e) => handleFileChange(e, "officeBearers")}
                        />
                        <label htmlFor="officeBearersInput">
                            <Button
                                component="span"
                                role={undefined}
                                variant="outlined"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                List of Office-Bearers 
                            </Button>
                        </label>
                        {uploadedFileNames.officeBearers && (
                            <div>
                                <p>Uploaded File: {uploadedFileNames.officeBearers}</p>
                            </div>
                        )}

                        {/* Statements of Audited Accounts */}
                        <input
                            accept="application/pdf"
                            id="auditedAccountsInput"
                            type="file"
                            style={{ display: "none" }}
                            onChange={(e) => handleFileChange(e, "auditedAccounts")}
                        />
                        <label htmlFor="auditedAccountsInput">
                            <Button
                                component="span"
                                role={undefined}
                                variant="outlined"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Statements of Audited Accounts
                            </Button>
                        </label>
                        {uploadedFileNames.auditedAccounts && (
                            <div>
                                <p>Uploaded File: {uploadedFileNames.auditedAccounts}</p>
                            </div>
                        )}

                        {/* Current Policy Declaration */}
                        <input
                            accept="application/pdf"
                            id="policyDeclarationInput"
                            type="file"
                            style={{ display: "none" }}
                            onChange={(e) => handleFileChange(e, "policyDeclaration")}
                        />
                        <label htmlFor="policyDeclarationInput">
                            <Button
                                component="span"
                                role={undefined}
                                variant="outlined"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Current Policy Declaration of the Party
                            </Button>
                        </label>
                        {uploadedFileNames.policyDeclaration && (
                            <div>
                                <p>Uploaded File: {uploadedFileNames.policyDeclaration}</p>
                            </div>
                        )}

                        {/* Any Other Documents */}
                        <input
                            accept="application/pdf"
                            id="otherDocumentsInput"
                            type="file"
                            style={{ display: "none" }}
                            onChange={(e) => handleFileChange(e, "otherDocuments")}
                        />
                        <label htmlFor="otherDocumentsInput">
                            <Button
                                component="span"
                                role={undefined}
                                variant="outlined"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Any Other Documents
                            </Button>
                        </label>
                        {uploadedFileNames.otherDocuments && (
                            <div>
                                <p>Uploaded File: {uploadedFileNames.otherDocuments}</p>
                            </div>
                        )}
                    </Stack>

                    {/* Submit button */}
                    <div className="card-actions justify-end">
                        <Button                                     
                        sx={{
                            marginTop: 4,
                            backgroundColor: '#1976d2',
                            color: '#fff',
                            '&:hover': { backgroundColor: '#115293' }
                        }}
                        type="submit" 
                        variant="contained" 
                        color="primary"
                        >
                            Submit Application
                        </Button>
                    </div>

                </form>
            </Paper>

        </div>
    );
}
