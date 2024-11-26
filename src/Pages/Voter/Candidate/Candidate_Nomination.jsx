import React, { useState } from 'react';
import { TextField, Button, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, Select, MenuItem, Snackbar, Alert } from '@mui/material';
import {authGet} from "../../../Auth/authFetch.jsx";

const CandidateNominationForm = () => {
    const [formData, setFormData] = useState({
        nominationNumber: '',
        candidateNIC: '',
        fullName: '',
        address: '',
        dob: '',
        year: '2024',
        district: 'Colombo',
    });


    const [openPopup, setOpenPopup] = useState(false);
    const [isSearchSuccessful, setIsSearchSuccessful] = useState(false);
    const [error, setError] = useState(null); // Error state for handling errors
    const merchantId = '1226569';
    const depositAmount = 2500; // Nomination deposit amount in LKR

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSearch = async () => {
        const response = await authGet(`/voter/nominate/${formData.nominationNumber}/${formData.candidateNIC}`);

        // Check if the response is successful
        if (response.fullName) {
            setFormData({
                ...formData,
                fullName: response.fullName,
                address: response.address,
                dob: response.dob,
            });
            setIsSearchSuccessful(true);
        } else {
            setIsSearchSuccessful(false);
            setError("Candidate not found."); // Set error message
        }
    };

    const handleNominationClick = () => {

        setOpenPopup(true);
    };

    const handleClosePopup = () => {
        setOpenPopup(false);
    };

    const handleProceed = async () => {
        // Load PayHere script
        const script = document.createElement('script');
        script.src = 'https://www.payhere.lk/lib/payhere.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = async () => {
            // Payment configuration object
            const paymentObj = {
                sandbox: true,
                merchant_id: merchantId,
                return_url: 'http://your-domain.com/nomination/success',
                cancel_url: 'http://your-domain.com/nomination/cancel',
                notify_url: 'http://your-domain.com/api/nomination/notify',
                order_id: `NOM-${formData.nominationNumber}`,
                items: `Nomination Deposit - ${formData.fullName}`,
                amount: depositAmount,
                currency: 'LKR',
                first_name: formData.fullName.split(' ')[0],
                last_name: formData.fullName.split(' ').slice(1).join(' '),
                email: 'voter@example.com', // You might want to add email to formData
                phone: '0771234567', // You might want to add phone to formData
                address: formData.address,
                city: formData.district,
                country: 'Sri Lanka'
            };

            try {
                // Get hash from backend
                const response = await fetch('http://your-domain.com/api/nomination/hash', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(paymentObj)
                });

                const hash = await response.text();
                paymentObj.hash = hash;

                // Initialize PayHere payment
                window.payhere.startPayment(paymentObj);

                // Setup payment completion handler
                window.payhere.onCompleted = function onCompleted(orderId) {
                    console.log("Payment completed. OrderID:" + orderId);
                    // Handle successful payment
                    // You might want to submit the nomination details to your backend here
                };

                // Setup payment error handler
                window.payhere.onError = function onError(error) {
                    console.log("Error:" + error);
                    setError("Payment error: " + error);
                };

                // Setup payment closed handler
                window.payhere.onDismissed = function onDismissed() {
                    console.log("Payment dismissed");
                };

            } catch (err) {
                setError("Error initiating payment: " + err.message);
            }
        };
    };

    return (
        <div className="flex items-center justify-center bg-white gap-5 p-10 rounded-xl">
            <div className="flex flex-row w-full gap-5">
                <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-6 w-1/2">
                    <h2 className="text-xl font-semibold text-blue-700 mt-6 mb-4">Rules and Regulations</h2>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>Candidate must be a citizen of Sri Lanka.</li>
                        <li>Must be at least 18 years old at the time of nomination.</li>
                        <li>For person to start nomination process. The person must be nominated by at-least 3
                            persons
                        </li>
                        <li>No criminal convictions or pending legal cases against the candidate.</li>
                        <li>Candidate must submit a valid NIC with the nomination form.</li>
                        <li>Nomination must be submitted before the deadline set by the election commission.</li>
                        <li>The nomination fee is Rs. 2500, which is non-refundable.</li>
                    </ul>
                    <h2 className="text-xl font-semibold text-red-700 mt-6 mb-4">Rules Against Bogus
                        Nominations</h2>
                    <ul className="list-disc pl-5 space-y-2 text-red-700">
                        <li>Any candidate providing false information will be disqualified.</li>
                        <li>Submission of forged documents will result in legal action.</li>
                        <li>Nomination forms must be filled out accurately and completely.</li>
                        <li>Voters should verify the candidate’s eligibility before endorsing.</li>
                        <li>Engaging in fraudulent practices is punishable by law.</li>
                    </ul>
                </div>
                {/* Right side: Candidate Info and Election Details */}
                <div className="w-1/2 bg-white shadow-lg rounded-lg p-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-6">Candidate Nomination</h2>
                    <form className="space-y-4">
                    <TextField
                            label="Nomination Number"
                            name="nominationNumber"
                            value={formData.nominationNumber}
                            onChange={handleChange}
                            fullWidth
                            required
                            className="mb-4"
                        />
                        <TextField
                            label="Candidate NIC"
                            name="candidateNIC"
                            value={formData.candidateNIC}
                            onChange={handleChange}
                            fullWidth
                            required
                            className="mb-4"
                        />
                        <Button
                            type="button"
                            variant="contained"
                            color="primary"
                            onClick={handleSearch}
                            className="w-full"
                        >
                            Search
                        </Button>

                        {formData.fullName && (
                            <div className="grid grid-cols-2 gap-4 mt-6">
                                <div className="space-y-4">
                                    <h2 className="text-lg font-semibold mb-4">Candidate Info</h2>
                                    <TextField
                                        label="Full Name"
                                        value={formData.fullName}
                                        fullWidth
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        className="mb-4"
                                    />
                                    <TextField
                                        label="Address"
                                        value={formData.address}
                                        fullWidth
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        className="mb-4"
                                    />
                                    <TextField
                                        label="Date of Birth"
                                        value={formData.dob}
                                        fullWidth
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        className="mb-4"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <h2 className="text-lg font-semibold mb-4">Election Details</h2>
                                    <TextField
                                        label="Election Year"
                                        value={formData.year}
                                        fullWidth
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        className="mb-4"
                                    />
                                    <TextField
                                        label="Election Name"
                                        value="Presidential Election"
                                        fullWidth
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        className="mb-4"
                                    />
                                </div>
                            </div>
                        )}

                        <p className="text-gray-600 mt-6">
                            Nomination will cost Rs.2500 and is non-refundable.
                        </p>

                        <Button
                            type="button"
                            variant="contained"
                            color="secondary"
                            onClick={handleNominationClick}
                            className="w-full mt-4"
                            disabled={!isSearchSuccessful}
                        >
                            Nominate
                        </Button>
                    </form>

                    {/* Popup for confirmation */}
                    <Dialog open={openPopup} onClose={handleClosePopup}>
                        <DialogTitle>Confirm Nomination</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Do you want to nominate {formData.fullName} as a candidate for
                                the {formData.year} Presidential Election?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClosePopup} color="primary">Cancel</Button>
                            <Button onClick={handleProceed} color="primary">Proceed</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>

            {/* Snackbar for error messages */}
            <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
                <Alert onClose={() => setError(null)} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default CandidateNominationForm;
