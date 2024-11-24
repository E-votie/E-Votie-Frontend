import React, { useContext, useState } from 'react';
import MapWithMarkers from '../../Components/MapWithMarkers.jsx';
import { useForm } from 'react-hook-form';
import Accordion from './../../Components/Accordion.jsx';
import { PollingStationsContext } from './PollingStationsContext.jsx';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import {authGet, authPost} from '../../Auth/authFetch.jsx';
import Swal from "sweetalert2";
import KeycloakService from "../../services/KeycloakService.jsx";
import {useNavigate} from "react-router-dom";
const BaseURL = import.meta.env.VITE_API_BASE_URL;

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const Polling_Stations = () => {
    const {
        adminDistricts,
        selectedAdminDistrict,
        electoralDistricts,
        selectedElectoralDistrict,
        pollingDistricts,
        selectedPollingDistrict,
        pollingStations,
        handleAdminDistrictChange,
        handleElectoralDistrictChange,
        handlePollingDistrictChange,
        addPollingStation,
        updatePollingStationCoordinates,
        handleBulkUpload,
        getDistrictHierarchy
    } = useContext(PollingStationsContext);

    const [tempMarker, setTempMarker] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadSummary, setUploadSummary] = useState(null);
    const electionId = window.location.pathname.split("/").pop();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({

    });

    const handleLocationSelect = (lat, lng) => {
        if (selectedPollingDistrict) {
            setTempMarker({ lat, lng });
        }
    };

    const handleAddPollingStation = () => {
        if (tempMarker && selectedPollingDistrict) {
            const coordinates = `${tempMarker.lat}, ${tempMarker.lng}`;
            addPollingStation(selectedPollingDistrict, '', coordinates);
            setTempMarker(null);
        }
    };

    const generateUploadSummary = (jsonData) => {
        const summary = {};
        let totalStations = 0;

        Object.entries(jsonData).forEach(([adminDistrict, electoralDistricts]) => {
            summary[adminDistrict] = { total: 0, electoralDistricts: {} };

            Object.entries(electoralDistricts).forEach(([electoralDistrict, pollingDistricts]) => {
                summary[adminDistrict].electoralDistricts[electoralDistrict] = { total: 0, pollingDistricts: {} };

                Object.entries(pollingDistricts).forEach(([pollingDistrict, stations]) => {
                    const stationCount = stations.length;
                    summary[adminDistrict].electoralDistricts[electoralDistrict].pollingDistricts[pollingDistrict] = stationCount;
                    summary[adminDistrict].electoralDistricts[electoralDistrict].total += stationCount;
                    summary[adminDistrict].total += stationCount;
                    totalStations += stationCount;
                });
            });
        });

        return { summary, totalStations };
    };

    const handleViewSummary = () => {
        if (uploadSummary) {
            showDetailedSummary(uploadSummary.summary);
        } else {
            Toast.fire({
                icon: "info",
                title: "No summary available. Please upload data first."
            });
        }
    };

    const showDetailedSummary = (summary) => {
        let detailedHtml = `
        <style>
            .summary-container {
                font-family: Arial, sans-serif;
                max-width: 600px;
                margin: 0 auto;
            }
            .admin-district {
                background-color: #f0f0f0;
                border-radius: 8px;
                padding: 10px;
                margin-bottom: 15px;
            }
            .admin-district h3 {
                margin: 0;
                color: #333;
            }
            .electoral-district {
                background-color: #ffffff;
                border-left: 3px solid #007bff;
                padding: 8px;
                margin: 10px 0;
            }
            .polling-district {
                margin-left: 20px;
                color: #555;
            }
            .total {
                font-weight: bold;
                color: #007bff;
            }
        </style>
        <div class="summary-container">
    `;

        Object.entries(summary).forEach(([adminDistrict, data]) => {
            detailedHtml += `
            <div class="admin-district">
                <h3>${adminDistrict} <span class="total">(Total: ${data.total})</span></h3>
        `;
            Object.entries(data.electoralDistricts).forEach(([electoralDistrict, electoralData]) => {
                detailedHtml += `
                <div class="electoral-district">
                    <p>${electoralDistrict} <span class="total">(Total: ${electoralData.total})</span></p>
            `;
                Object.entries(electoralData.pollingDistricts).forEach(([pollingDistrict, count]) => {
                    detailedHtml += `
                    <p class="polling-district">${pollingDistrict}: ${count}</p>
                `;
                });
                detailedHtml += `</div>`;
            });
            detailedHtml += `</div>`;
        });

        detailedHtml += `</div>`;

        Swal.fire({
            title: "Detailed Upload Summary",
            html: detailedHtml,
            width: 800,
            confirmButtonText: 'Close',
        });
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const jsonData = JSON.parse(e.target.result);

                    if (!isValidJsonStructure(jsonData)) {
                        throw new Error("Invalid JSON structure");
                    }

                    handleBulkUpload(jsonData);
                    const { summary, totalStations } = generateUploadSummary(jsonData);
                    setUploadSummary({ summary, totalStations });

                    Swal.fire({
                        icon: "success",
                        title: "Upload Successful",
                        html: `
                            <p>Total polling stations uploaded: ${totalStations}</p>
                            <p>Click "Show Details" for a breakdown by district.</p>
                        `,
                        showConfirmButton: true,
                        confirmButtonText: 'Show Details',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            showDetailedSummary(summary);
                        }
                    });
                } catch (error) {
                    console.error("Error processing JSON:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Upload Failed",
                        text: `Failed to process JSON file: ${error.message}`
                    });
                }
            };
            reader.onerror = (error) => {
                console.error("Error reading file:", error);
                Swal.fire({
                    icon: "error",
                    title: "Upload Failed",
                    text: "Failed to read the file. Please try again."
                });
            };
            reader.readAsText(file);
        }
    };

    // Function to validate JSON structure
    const isValidJsonStructure = (json) => {
        if (typeof json !== 'object' || json === null) {
            console.error("JSON is not an object");
            return false;
        }

        for (const adminDistrict in json) {
            if (typeof json[adminDistrict] !== 'object') {
                console.error(`Invalid structure for admin district: ${adminDistrict}`);
                return false;
            }
            for (const electoralDistrict in json[adminDistrict]) {
                if (typeof json[adminDistrict][electoralDistrict] !== 'object') {
                    console.error(`Invalid structure for electoral district: ${electoralDistrict}`);
                    return false;
                }
                for (const pollingDistrict in json[adminDistrict][electoralDistrict]) {
                    if (!Array.isArray(json[adminDistrict][electoralDistrict][pollingDistrict])) {
                        console.error(`Invalid structure for polling district: ${pollingDistrict}`);
                        return false;
                    }
                }
            }
        }
        return true;
    };

    const handleDownload = () => {
        const downloadData = {};
        const districtHierarchy = getDistrictHierarchy();

        districtHierarchy.forEach(({ adminDistrict, electoralDistrict, pollingDistrict }) => {
            if (!downloadData[adminDistrict]) {
                downloadData[adminDistrict] = {};
            }
            if (!downloadData[adminDistrict][electoralDistrict]) {
                downloadData[adminDistrict][electoralDistrict] = {};
            }
            if (pollingStations[pollingDistrict]) {
                downloadData[adminDistrict][electoralDistrict][pollingDistrict] =
                    pollingStations[pollingDistrict].map(station => ({
                        name: station.name,
                        coordinates: station.coordinates
                    }));
            }
        });

        const jsonString = JSON.stringify(downloadData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'polling_stations.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        Toast.fire({
            icon: "success",
            title: "Polling stations data downloaded successfully!"
        });
    };

    const submitTheFile = async () => {
        setIsSubmitting(true);

        try {
            // Generate the polling_stations.json file
            const downloadData = {};
            const districtHierarchy = getDistrictHierarchy();

            // Make sure pollingStations is defined
            if (!pollingStations) {
                throw new Error("Polling stations data is not available.");
            }

            districtHierarchy.forEach(({ adminDistrict, electoralDistrict, pollingDistrict }) => {
                if (!downloadData[adminDistrict]) {
                    downloadData[adminDistrict] = {};
                }
                if (!downloadData[adminDistrict][electoralDistrict]) {
                    downloadData[adminDistrict][electoralDistrict] = {};
                }
                if (pollingStations[pollingDistrict]) {
                    downloadData[adminDistrict][electoralDistrict][pollingDistrict] =
                        pollingStations[pollingDistrict].map(station => ({
                            name: station.name,
                            coordinates: station.coordinates
                        }));
                }
            });

            // Create a Blob and File for the polling stations data
            const jsonString = JSON.stringify(downloadData, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const file = new File([blob], `${electionId}_polling_stations.json`, { type: 'application/json' });

            // Get the token for authorization
            const token = KeycloakService.getToken();
            const formDataToSend = new FormData();
            formDataToSend.append('file', file); // Attach the JSON file

            // Send the multipart request
            const response = await fetch(`${BaseURL}/api/files/upload`, {
                method: 'POST',
                body: formDataToSend,
                headers: {
                    Authorization: `Bearer ${token}` // Use your token for authentication
                }
            });

            // Check if the response is OK
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Upload failed: ${errorData.message || 'Unknown error'}`);
            }

            // Handle successful response
            const result = await response.json();
            console.log('File upload successful:', result);
            return true;
        } catch (error) {
            console.error('Error submitting file:', error);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };


    const onSubmit = async (formData) => {
        console.log("-------------->>>>>>>>>>>>>")
        setIsSubmitting(true);
        try {
            // Prepare the data to be sent to the backend
            const pollingStationsData = Object.entries(pollingStations).flatMap(([district, stations]) =>
                stations.map(station => ({
                    district,
                    name: station.name,
                    latitude: station.coordinates.split(',')[0],
                    longitude: station.coordinates.split(',')[1]
                }))
            );

            const dataToSend = {
                ...formData,
                pollingStations: pollingStationsData
            };
            console.log(dataToSend);

            // Send the data to the backend
            const result = await submitTheFile();
            const response = await authPost(`/election/set_polingstations/${electionId}`, dataToSend);
            console.log(response);

            if (response.status === "200") {
                await Toast.fire({
                    icon: "success",
                    title: "Polling stations saved successfully!"
                });
                // Optionally, you can redirect the user or clear the form here
                navigate(`/Election/Additional_Materials/${electionId}`)
            } else {
                await Toast.fire({
                    icon: "error",
                    title: "Failed to save polling stations. Please try again."
                });
            }
        } catch (error) {
            console.error("Error submitting polling stations:", error);
            await Toast.fire({
                icon: "error",
                title: "An error occurred. Please try again later."
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '20px',
    };

    const mapContainerStyle = {
        flex: 1,
    };

    const formContainerStyle = {
        flex: 1,
        height: '800px',
        overflowY: 'auto',
    };

    return (
        <div className="card bg-base-100 shadow-xl p-6 max-h-[750px]">
            <div style={containerStyle}>
                <div className="card bg-base-100 shadow-lg max-h-[680px]" style={mapContainerStyle}>
                    <div className="card-body">
                        <h3 className="font-sans text-2xl font-semibold mb-0">Polling Map</h3>
                        <MapWithMarkers
                            onLocationSelect={handleLocationSelect}
                            markers={pollingStations[selectedPollingDistrict] || []}
                            tempMarker={tempMarker}
                        />
                        {tempMarker && (
                            <button
                                className="btn btn-primary mt-2"
                                onClick={handleAddPollingStation}
                            >
                                Add Polling Station
                            </button>
                        )}
                    </div>
                </div>

                <div className="card bg-base-100 shadow-lg max-h-[680px]" style={formContainerStyle}>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <div className="space-y-4">
                                <div className="card bg-base-100 shadow-xl p-6 max-h-[700px]">
                                    <div className="card-body">
                                        <div className="mb-4">
                                            <label className="font-sans text-lg">Admin District</label>
                                            <select
                                                className="select select-primary w-full"
                                                value={selectedAdminDistrict}
                                                onChange={(e) => handleAdminDistrictChange(e.target.value)}
                                            >
                                                <option value="" disabled>Select Admin District</option>
                                                {adminDistricts.map((admin) => (
                                                    <option key={admin} value={admin}>
                                                        {admin}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="mb-4">
                                            <label className="font-sans text-lg">Electoral District</label>
                                            <select
                                                className="select select-primary w-full"
                                                value={selectedElectoralDistrict}
                                                onChange={(e) => handleElectoralDistrictChange(e.target.value)}
                                                disabled={!selectedAdminDistrict}
                                            >
                                                <option value="" disabled>Select Electoral District</option>
                                                {electoralDistricts.map((electoral) => (
                                                    <option key={electoral} value={electoral}>
                                                        {electoral}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="mb-4">
                                            <label className="font-sans text-lg">Polling District</label>
                                            <select
                                                className="select select-primary w-full"
                                                value={selectedPollingDistrict}
                                                onChange={(e) => handlePollingDistrictChange(e.target.value)}
                                                disabled={!selectedElectoralDistrict}
                                            >
                                                <option value="" disabled>Select Polling District</option>
                                                {pollingDistricts.map((polling) => (
                                                    <option key={polling} value={polling}>
                                                        {polling}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <Accordion />

                                <div className="flex justify-between">
                                    <Button
                                        variant="contained"
                                        startIcon={<CloudDownloadIcon />}
                                        onClick={handleDownload}
                                    >
                                        Download JSON
                                    </Button>
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        startIcon={<CloudUploadIcon/>}
                                    >
                                        Upload JSON
                                        <VisuallyHiddenInput
                                            type="file"
                                            onChange={handleFileUpload}
                                            accept=".json"
                                        />
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={handleViewSummary}
                                        disabled={!uploadSummary}
                                    >
                                        View Summary
                                    </Button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Next'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Polling_Stations;