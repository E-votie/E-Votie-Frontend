import React, { useState } from "react";
import {TextField, Button, IconButton, Chip, Divider} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {uploadFile} from "../../api/FileUpload.jsx";
import {useMutation} from "react-query";
import {authPost} from "../../Auth/authFetch.jsx";
import MySwal from "sweetalert2";
import {useNavigate} from "react-router-dom";

const ElectionTimeline = () => {
    const [timeline, setTimeline] = useState({
        id: "",
        electionNominationCallingStartDate: "",
        electionNominationCallingEndDate: "",
        electionVoterRegistrationStartDate: "",
        electionVoterRegistrationEndDate: "",
        electionCampaignStartDate: "",
        electionCampaignEndDate: "",
        electionDayStartDate: "",
        electionDayEndDate: "",
    });
    const navigate = useNavigate();

    const electionId = window.location.pathname.split("/").pop();

    const [uploadedFiles, setUploadedFiles] = useState({});

    const handleDateChange = (key, value) => {
        setTimeline((prev) => ({ ...prev, [key]: value }));
    };

    const handleFileUpload = async (sectionKey, files) => {
        const newFiles = [];
        for (const file of files) {
            const timestamp = Math.floor(Date.now() / 1000);
            const fileName = `${electionId}_${sectionKey}_${timestamp}`;
            try {
                await uploadFile(file, fileName); // Update `baseUrl` as required
                newFiles.push(file);
            } catch (error) {
                console.error("File upload failed:", error);
            }
        }
        setUploadedFiles((prev) => ({
            ...prev,
            [sectionKey]: [...(prev[sectionKey] || []), ...newFiles],
        }));
    };

    const timelineURL = useMutation((data) => {
        return authPost('/election/set_timeline', data);
    });

    const removeFile = (key, fileName) => {
        setUploadedFiles((prev) => ({
            ...prev,
            [key]: prev[key].filter((file) => file.name !== fileName),
        }));
    };

    const handleSubmit = () => {
        timeline.id = electionId;
        console.log("Timeline Data:", timeline);
        timelineURL.mutate(timeline, {
            onSuccess: (response) => {
                MySwal.fire({
                    title: response.message,
                    icon: 'success',
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                    didOpen: () => {
                        // `MySwal` is a subclass of `Swal` with all the same instance & static methods
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate(`/Election/Polling_Stations/${electionId}`);
                    }
                })
            }, onError: (error) => {
                MySwal.fire({
                    title: `<p>${error.response.data}</p>`,
                    icon: 'error',
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                    didOpen: () => {
                        // `MySwal` is a subclass of `Swal` with all the same instance & static methods
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/Home');
                    }
                })
            }
        });
    };

    const timelineSections = [
        {
            key: "VoterRegistration",
            title: "Voter Registration Period",
            startDateKey: "electionVoterRegistrationStartDate",
            endDateKey: "electionVoterRegistrationEndDate",
        },
        {
            key: "NominationCalling",
            title: "Nomination Period",
            startDateKey: "electionNominationCallingStartDate",
            endDateKey: "electionNominationCallingEndDate",
        },
        {
            key: "Campaign",
            title: "Campaign Period",
            startDateKey: "electionCampaignStartDate",
            endDateKey: "electionCampaignEndDate",
        },
        {
            key: "ElectionDay",
            title: "Election Day",
            startDateKey: "electionDayStartDate",
            endDateKey: "electionDayEndDate",
        },
    ];

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="w-full p-6 bg-white shadow-lg rounded-md">
                <h1 className="text-3xl font-bold text-center mb-10 text-blue-600">
                    Election Timeline Configuration
                </h1>
                <div className="flex flex-col items-center space-y-12">
                    {timelineSections.map((section, index) => (
                        <div
                            key={section.key}
                            className="relative w-full flex flex-col items-center"
                        >
                            <div className="w-full p-6 bg-blue-50 shadow-md rounded-lg">
                                <h2 className="text-lg font-semibold text-blue-800 text-center mb-4">
                                    {section.title}
                                </h2>
                                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 items-center">
                                    {/* Date Pickers */}
                                    <div className="flex items-center space-x-2 w-full">
                                        <TextField
                                            type="datetime-local"
                                            value={timeline[section.startDateKey]}
                                            onChange={(e) => handleDateChange(section.startDateKey, e.target.value)}
                                            style={{ width: '500px' }}
                                        />
                                        <Divider orientation="vertical" flexItem >to</Divider>
                                        <TextField
                                            type="datetime-local"
                                            value={timeline[section.endDateKey]}
                                            onChange={(e) =>
                                                handleDateChange(section.endDateKey, e.target.value)
                                            }
                                            style={{ width: '500px' }}
                                        />
                                    </div>
                                    {/* File Upload */}
                                    <div className="flex-shrink-0">
                                        <IconButton
                                            color="primary"
                                            component="label"
                                            size="large"
                                            className="flex items-center"
                                        >
                                            <UploadFileIcon />
                                            <input
                                                hidden
                                                type="file"
                                                accept=".pdf"
                                                multiple
                                                onChange={(e) =>
                                                    handleFileUpload(section.key, Array.from(e.target.files))
                                                }
                                            />
                                        </IconButton>
                                    </div>
                                </div>
                                {/* Uploaded Files */}
                                {uploadedFiles[section.key] && (
                                    <div className="mt-4 space-y-2 flex flex-wrap">
                                        {uploadedFiles[section.key].map((file) => (
                                            <Chip
                                                key={file.name}
                                                label={file.name}
                                                onDelete={() => removeFile(section.key, file.name)}
                                                variant="outlined"
                                                color="primary"
                                                className="mr-2 mb-2"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                            {index < timelineSections.length - 1 && (
                                <ArrowDownwardIcon
                                    className="mt-6 text-blue-500"
                                    fontSize="large"
                                />
                            )}
                        </div>
                    ))}
                </div>
                <div className="mt-10 text-center">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        className="bg-blue-500 hover:bg-blue-700"
                    >
                        Submit Timeline
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ElectionTimeline;
