import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, CircularProgress, TextField } from "@mui/material";
import {useNavigate} from "react-router-dom";
import {uploadFile} from "../../api/FileUpload.jsx";

const PartyRequestDetails = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [description, setDescription] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:5003/api/request/party/1653/receiver/200130003278");
            setData(response.data);
            setLoading(false);
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
        if (!description || !imageFile) {
            alert("Please provide both a description and an image.");
            return;
        }

        // Upload image first
        const imageName = `${data.receiverNIC}_politicians.jpg`;
        try {
            const uploadResponse = await uploadFile(imageFile, imageName, base_url);
            if (!uploadResponse.success) {
                alert("Failed to upload the image.");
                return;
            }
        } catch (err) {
            console.error("Error uploading image:", err);
            alert("Error uploading the image.");
            return;
        }

        // Prepare the request payload
        const payload = {
            requestID: data.requestId, // Assuming this is part of the `data` object
            NIC: data.receiverNIC,
            description,
            imageName,
        };

        // Submit the form data
        try {
            const response = await axios.post("http://localhost:5003/api/request/accept", payload);
            alert("Request accepted successfully!");
            console.log("Response:", response.data);
        } catch (err) {
            console.error("Error accepting request:", err);
            alert("Failed to accept the request.");
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
            <div className="mb-6">
                <h2 className="text-lg font-semibold">Additional Details</h2>
                <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mb-4"
                />
                <input type="file" onChange={handleImageChange} className="mb-4" />
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
