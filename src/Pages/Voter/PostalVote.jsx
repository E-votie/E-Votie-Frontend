import React, { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button, Snackbar, Alert } from '@mui/material';
import keycloak from './../../services/KeycloakService.jsx'; // Assuming Keycloak setup is done

const PostalVoteForm = () => {
    const [agencyFilter, setAgencyFilter] = useState('');
    const [selectedAgency, setSelectedAgency] = useState('');
    const [employmentID, setEmploymentID] = useState('');
    const [electionDuties, setElectionDuties] = useState('');
    const [error, setError] = useState(null);

    const agencies = ["Ministry of Education", "Department of Elections", "Police Department", "Agricultural Department", "Customs Office"];

    // Filter agencies based on input
    const handleFilter = (e) => {
        const input = e.target.value;
        setAgencyFilter(input);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedAgency || !employmentID || !electionDuties) {
            setError("Please fill all required fields.");
            return;
        }
        // Submit form logic goes here
    };

    return (
        <div className="flex items-start justify-center bg-white gap-5 p-10 rounded-2xl">
            {/* Rules and Regulations */}
            <div className="bg-blue-100 p-6 rounded-lg shadow-md mb-6 w-1/2 h-full space-y-6 mt-12">
                <div>
                <h2 className="text-lg font-semibold text-blue-700">
                    Postal Voter Registration for Election
                </h2>
                <p className="text-gray-700">
                    The registration for postal votes is for <span
                    className="font-semibold">President Election</span> at <span
                    className="font-semibold">November 24, 2024</span>
                </p>
                </div>
                <div>
                <h2 className="text-lg font-semibold text-blue-700">
                    Postal Voter Registration Time Period
                </h2>
                <p className="text-gray-700">
                    The registration for postal votes is open from <span
                    className="font-semibold">October 1, 2024</span> to <span
                    className="font-semibold">October 31, 2024</span>.
                    Make sure to complete your application before the deadline to ensure your postal vote
                    eligibility.
                </p>
                </div>
                <h2 className="text-xl font-semibold text-red-700 mt-6 mb-4">Rules and Regulations for Postal Voting in
                    Sri Lanka</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Postal voting is only available for eligible government employees.</li>
                    <li>Applicants must provide accurate employment details to be considered.</li>
                    <li>Participation in election duties requires you to select 'Yes' during the application.</li>
                    <li>All applications must be submitted within the given deadline to be valid.</li>
                </ul>
            </div>

            {/* Postal Vote Form */}
            <div className="w-1/2 bg-white shadow-lg rounded-lg p-8 relative">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6">Postal Vote Application</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* NIC Auto-Fill */}
                    <TextField
                        fullWidth
                        label="NIC No"
                        variant="outlined"
                        value={keycloak.getUserName()} // Auto-filled from Keycloak
                        className="mb-4"
                        disabled
                    />

                    {/* Government Agency with Dropdown */}
                    <div className="relative mb-4">
                        <TextField
                            fullWidth
                            label="Government Agency"
                            variant="outlined"
                            value={agencyFilter || selectedAgency}
                            onChange={handleFilter}
                            placeholder="Start typing agency name..."
                            className="mb-4"
                        />
                        {/* Dropdown list */}
                        {agencyFilter && (
                            <ul
                                className="absolute w-full bg-white border border-gray-300 rounded-lg shadow-md mt-1 max-h-40 overflow-y-scroll z-10"
                            >
                                {agencies
                                    .filter((agency) => agency.toLowerCase().includes(agencyFilter.toLowerCase()))
                                    .map((agency, index) => (
                                        <li
                                            key={index}
                                            className="p-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => {
                                                setSelectedAgency(agency);
                                                setAgencyFilter(''); // Clear filter after selection
                                            }}
                                        >
                                            {agency}
                                        </li>
                                    ))}
                            </ul>
                        )}
                    </div>

                    {/* Employment ID */}
                    <TextField
                        fullWidth
                        label="Employment ID"
                        variant="outlined"
                        value={employmentID}
                        onChange={(e) => setEmploymentID(e.target.value)}
                        className="mb-4"
                    />

                    {/* Election Duties Dropdown */}
                    <FormControl fullWidth className="mb-4">
                        <InputLabel>Are you participating in election duties?</InputLabel>
                        <Select
                            value={electionDuties}
                            onChange={(e) => setElectionDuties(e.target.value)}
                            label="Are you participating in election duties?"
                        >
                            <MenuItem value="Yes">Yes</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <Button type="submit" variant="contained" color="primary" className="bg-blue-500 text-white hover:bg-blue-600">
                            Submit
                        </Button>
                    </div>
                </form>

                {/* Error Message */}
                <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
                    <Alert onClose={() => setError(null)} severity="error">
                        {error}
                    </Alert>
                </Snackbar>
            </div>
        </div>
    );
};

export default PostalVoteForm;
