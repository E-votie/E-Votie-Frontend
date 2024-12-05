import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, CircularProgress, TextField } from "@mui/material";
import {useNavigate} from "react-router-dom";
import {uploadFile} from "../../api/FileUpload.jsx";
import MySwal from "sweetalert2";
import { CloudUpload } from '@mui/icons-material';
const partyUrl = import.meta.env.VITE_API_PARTY_URL;

const PartyRequestDetails = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [description, setDescription] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const navigate = useNavigate();
    const partyId = window.location.pathname.split("/").slice(-2, -1)[0];
    const receiverNIC = window.location.pathname.split("/").slice(-1)[0];

    const fetchData = async () => {
        try {
            const response = await axios.get(`${partyUrl}/api/request/party/${partyId}/receiver/${receiverNIC}`);
            setData(response.data);
            setLoading(false);
            console.error(response.data);
        } catch (err) {
            setError("Failed to load data.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleAcceptRequest = async () => {
        if (!description || !imageFile) {  // Validate that all necessary data is provided
            alert("Please provide both a description, an image, and party information.");
            return;
        }

        // Create a FormData object to handle both the file and the JSON data
        const formData = new FormData();

        // Append the image file to FormData
        formData.append('image', imageFile, `${data.receiverNIC}_politicians.jpg`);

        // Append the other data (description, NIC, party information)
        formData.append('party', JSON.stringify({
            "role": "MP",
            "partyMemberDescription": description
        }));
        console.log(formData);
        // Submit the form data
        try {
            const response = await axios.post(`${partyUrl}/api/request/accept/${data.requestId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            MySwal.fire({
                title: <p>You are now a member of the ${data.party.partyName} party</p>,
                icon: 'success',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                didOpen: () => {
                    // `MySwal` is a subclass of `Swal` with all the same instance & static methods
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/');
                }
            })
            console.log("Response:", response.data);
        } catch (err) {
            console.error("Error accepting request:", err);
            MySwal.fire({
                title: <p>There was an error</p>,
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
            })
        }

    };



    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <CircularProgress color="secondary" />
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center mt-10">{error}</div>;
    }

    return (
        <div className="relative max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
            {/* Logo in the top-right corner */}
            <div className="absolute top-4 right-4">
                <img
                    src={data.party.logoUrl}
                    alt={`${data.party.partyName} Logo`}
                    className="w-20 h-20 object-contain rounded-full shadow-md"
                />
            </div>

            {/* Header */}
            <h1 className="text-2xl font-bold text-pink-500 mb-6">Request Details</h1>

            {/* Receiver Info */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold">Receiver Information</h2>
                <p><strong>Name:</strong> {data.receiverName}</p>
                <p><strong>NIC:</strong> {data.receiverNIC}</p>
                <p><strong>State:</strong> {data.requestState}</p>
                <p><strong>Created At:</strong> {new Date(data.createdAt).toLocaleString()}</p>
            </div>

            {/* Party Info */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold">Party Information</h2>
                <p><strong>Party Name:</strong> {data.party.partyName}</p>
                <p><strong>Abbreviation:</strong> {data.party.abbreviation}</p>
                <p><strong>Total Seats:</strong> {data.party.totalSeats}</p>
                <p><strong>Address:</strong> {data.party.address.city}, {data.party.address.postalCode}</p>
                <p><strong>Contact:</strong> {data.party.contactNumber}</p>
                <a
                    href={data.party.partyWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                >
                    Visit Party Website
                </a>
            </div>

            {/* Party Members */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold">Party Members</h2>
                {data.party.partyMembers.map((member) => (
                    <div key={member.partyMemberId} className="mb-2">
                        <p><strong>Role:</strong> {member.role}</p>
                        <p><strong>NIC:</strong> {member.nic}</p>
                    </div>
                ))}
            </div>

            {/* Documents */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold">Documents</h2>
                {data.party.documents.map((doc) => (
                    <div key={doc.documentId} className="mb-2">
                        <p><strong>Document Name:</strong> {doc.documentName}</p>
                        <a
                            href={doc.documentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                        >
                            View Document
                        </a>
                    </div>
                ))}
            </div>

            {/* Description and Image Upload */}
            <div className="space-y-6">
                {/* Section Header */}
                <h2 className="text-xl font-semibold text-gray-900">Additional Details</h2>

                {/* Description Field */}
                <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />

                {/* File Upload */}
                <div className="flex items-center space-x-3">
                    <Button
                        variant="contained"
                        component="label"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        startIcon={<CloudUpload/>}
                    >
                        Upload Image
                        <input
                            type="file"
                            hidden
                            onChange={handleImageChange}
                        />
                    </Button>
                    <span className="text-sm text-gray-500">Max file size: 5MB</span>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-6">
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate(`/party/${data.party.registrationId}`)}
                >
                    Go to Party Page
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleAcceptRequest}
                >
                    Accept Request
                </Button>
            </div>
        </div>
    );
};

export default PartyRequestDetails;
