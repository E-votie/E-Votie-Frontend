import React, { useEffect, useState } from 'react';
import './../assets/css/Scan.css'
import MySwal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import {TextField} from "@mui/material";
import {Box} from "@mui/system";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
const fingerprintUrl = import.meta.env.VITE_API_Fingerprint_URL;

function FingerprintScanner({ ApplicationID,action }) {

    const navigate = useNavigate();

    console.log(ApplicationID)
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [deviceId, setDeviceId] = useState('SENSOR_1'); // Default device ID
    const [scanningStatus, setScanningStatus] = useState({});
    const [scanningMassage, setScanningMassage] = useState(null);

    useEffect(() => {
        // Create WebSocket connection
        const newSocket = new WebSocket(`${fingerprintUrl}/fingerprint-websocket?id=${ApplicationID}`);

        // Connection opened
        newSocket.onopen = (event) => {
            console.log('WebSocket is connected.');
        };

        // Listen for messages
        newSocket.onmessage = (event) => {
            console.log('Message from server:', event.data);
            if (event.data instanceof Blob) {
                // Handle binary data (template)
                handleBinaryMessage(event.data);
            } else {
                // Handle text message
                handleTextMessage(event.data);
            }
        };

        // Save the socket in state
        setSocket(newSocket);

        // Clean up the socket on component unmount
        return () => {
            newSocket.close();
        };
    }, [ApplicationID]);

    const handleTextMessage = (message) => {
        try {
            const jsonMessage = JSON.parse(message);
            const { sourceDevice, targetDevice, message: content } = jsonMessage;
            setMessages(prevMessages => [...prevMessages, `${sourceDevice} to ${targetDevice}: ${content}`]);
            console.log(content);
            if (content === 'SCAN_COMPLETE') {
                setScanningStatus(prev => ({ ...prev, [sourceDevice]: false }));
                MySwal.fire({
                    title: "Fingerprint successfully registered",
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
            }else if(content === 'MATCH_FOUND'){
                setScanningStatus(prev => ({ ...prev, [sourceDevice]: false }));
                MySwal.fire({
                    title: "Fingerprint Matched",
                    icon: 'success',
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                    didOpen: () => {
                        // `MySwal` is a subclass of `Swal` with all the same instance & static methods
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/polling_station/voter_verify');
                    }
                })
            }else if(content === 'MATCH_NOT_FOUND'){
                setScanningStatus(prev => ({ ...prev, [sourceDevice]: false }));
                MySwal.fire({
                    title: "Fingerprint Matched Not Found",
                    icon: 'error',
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                    didOpen: () => {
                        // `MySwal` is a subclass of `Swal` with all the same instance & static methods
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/polling_station/voter_verify');
                    }
                })
            }
            else{
                setScanningMassage(content)
            }
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    };

    const handleBinaryMessage = async (blob) => {
        try {
            const arrayBuffer = await blob.arrayBuffer();
            const jsonMessage = JSON.parse(new TextDecoder().decode(arrayBuffer));
            const { sourceDevice, targetDevice, templateData } = jsonMessage;
            console.log(`Received binary data from ${sourceDevice} to ${targetDevice}, size:`, templateData.length);
        } catch (error) {
            console.error('Error parsing binary message:', error);
        }
    };

    const sendCommand = (command) => {
        console.log(ApplicationID ,"-------------->>>>>>>>>>>>>>>>>>>>>>>");
        if (socket && socket.readyState === WebSocket.OPEN) {
            const jsonMessage = {
                applicationId: ApplicationID,
                sourceDevice: ApplicationID,
                targetDevice: deviceId,
                message: command
            };
            socket.send(JSON.stringify(jsonMessage));
            if (command === 'SCAN') {
                setScanningStatus(prev => ({ ...prev, [deviceId]: true }));
            }
            if(command === 'MATCH'){
                setScanningStatus(prev => ({ ...prev, [deviceId]: true }));
            }
        } else {
            console.error('WebSocket is not open');
        }
    };

    return (
        <Box className="p-6 max-w-xl mx-auto bg-gray-50 shadow-md rounded-lg space-y-6">
            <Typography variant="h5" className="text-center font-bold text-gray-800">
                Fingerprint Scaner
            </Typography>

            <Box className="scan">
                <div className="fingerprint"></div>
                <h3>
                    {Object.entries(scanningStatus)
                        .map(([id, status]) => `${id}: ${status ? "Yes" : "No"}`)
                        .join(", ")}
                </h3>
                <Typography variant="body2" className="mt-2 text-gray-600">
                    {scanningMassage}
                </Typography>
            </Box>

            <Box>
                <TextField
                    label="Device ID"
                    variant="outlined"
                    fullWidth
                    value={deviceId}
                    onChange={(e) => setDeviceId(e.target.value)}
                    className="mb-4"
                />
            </Box>

            <Box className="flex space-x-4">
                {action === 'scan' && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => sendCommand("SCAN")}
                    >
                        Send Scan Command
                    </Button>
                )}

                {action === 'match' && (
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => sendCommand("MATCH")}
                    >
                        Send Match Command
                    </Button>
                )}
            </Box>
        </Box>
    );
}

export default FingerprintScanner;