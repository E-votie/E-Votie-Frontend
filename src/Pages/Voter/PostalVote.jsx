import React, { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button, FormControlLabel, Checkbox, Snackbar, Alert } from '@mui/material';
import keycloak from './../../services/KeycloakService.jsx'; // Assuming Keycloak setup is done

const PostalVoteForm = () => {
    const [agencyFilter, setAgencyFilter] = useState('');
    const [filteredAgencies, setFilteredAgencies] = useState([]);
    const [selectedAgency, setSelectedAgency] = useState('');
    const [employmentID, setEmploymentID] = useState('');
    const [electionDuties, setElectionDuties] = useState('');
    const [error, setError] = useState(null);

    const agencies = ["Ministry of Education", "Department of Elections", "Police Department", "Agricultural Department", "Customs Office"];

    // Filter agencies based on input
    const handleFilter = (e) => {
        const input = e.target.value;
        setAgencyFilter(input);
        setFilteredAgencies(agencies.filter(agency => agency.toLowerCase().includes(input.toLowerCase())));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedAgency || !employmentID || !electionDuties) {
            setError("Please fill all required fields.");
            return;
        }
        // Submit the form (logic for submission goes here)
    };

    return (
        <div className="flex items-start justify-center bg-white gap-5 p-10">
            {/* Rules and Regulations */}
            <div className="bg-red-50 p-6 rounded-lg shadow-md mb-6 w-1/2">
                <h2 className="text-xl font-semibold text-red-700 mt-6 mb-4">Rules and Regulations for Postal Voting in Sri Lanka</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Postal voting is only available for eligible government employees.</li>
                    <li>Applicants must provide accurate employment details to be considered.</li>
                    <li>False information or bogus nominations will result in penalties under the election law.</li>
                    <li>Participation in election duties requires you to select 'Yes' during the application.</li>
                    <li>All applications must be submitted within the given deadline to be valid.</li>
                </ul>
            </div>

            {/* Postal Vote Form */}
            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6">Postal Vote Application</h2>
                <form onSubmit={handleSubmit}>
                    {/* NIC Auto-Fill */}
                    <TextField
                        fullWidth
                        label="NIC No"
                        variant="outlined"
                        value={keycloak.getUserName()} // Auto-filled from Keycloak
                        className="mb-4"
                        disabled
                    />

                    {/* Government Agency with Filter */}
                    <TextField
                        fullWidth
                        label="Government Agency"
                        variant="outlined"
                        value={agencyFilter}
                        onChange={handleFilter}
                        placeholder="Start typing agency name..."
                        className="mb-4"
                    />
                    {filteredAgencies.length > 0 && (
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            {filteredAgencies.map((agency, index) => (
                                <li key={index} className="cursor-pointer" onClick={() => setSelectedAgency(agency)}>
                                    {agency}
                                </li>
                            ))}
                        </ul>
                    )}

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
