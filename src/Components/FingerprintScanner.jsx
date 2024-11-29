import React, { useEffect, useState } from 'react';
import './../assets/css/Scan.css';
import MySwal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const fingerprintUrl = import.meta.env.VITE_API_Fingerprint_URL;

function FingerprintScanner({ ApplicationID, action }) {
    const navigate = useNavigate();
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [deviceId, setDeviceId] = useState('SENSOR_1'); // Default device ID
    const [scanningStatus, setScanningStatus] = useState({});
    const [scanningMessage, setScanningMessage] = useState(null);
    const [reconnectAttempts, setReconnectAttempts] = useState(0);

    useEffect(() => {
        let isMounted = true; // To track if the component is mounted

        const connectSocket = () => {
            console.log('Attempting to connect WebSocket...');
            const newSocket = new WebSocket(`${fingerprintUrl}/fingerprint-websocket?id=${ApplicationID}`);

            newSocket.onopen = () => {
                console.log('WebSocket is connected.');
                setReconnectAttempts(0); // Reset reconnection attempts on successful connection
            };

            newSocket.onmessage = (event) => {
                if (event.data instanceof Blob) {
                    handleBinaryMessage(event.data);
                } else {
                    handleTextMessage(event.data);
                }
            };

            newSocket.onerror = (error) => {
                console.error('WebSocket error:', error);
            };

            newSocket.onclose = () => {
                if (isMounted) {
                    console.log('WebSocket is closed. Reconnecting...');
                    setReconnectAttempts((prev) => prev + 1);

                    // Retry connection after a delay (exponential backoff)
                    const retryDelay = Math.min(1000 * 2 ** reconnectAttempts, 30000); // Cap delay at 30s
                    setTimeout(connectSocket, retryDelay);
                }
            };

            setSocket(newSocket);
        };

        connectSocket();

        return () => {
            isMounted = false; // Cleanup on unmount
            if (socket) socket.close();
        };
    }, [ApplicationID, reconnectAttempts]);

    const handleTextMessage = (message) => {
        try {
            const jsonMessage = JSON.parse(message);
            const { sourceDevice, targetDevice, message: content } = jsonMessage;
            setMessages((prevMessages) => [...prevMessages, `${sourceDevice} to ${targetDevice}: ${content}`]);

            switch (content) {
                case 'SCAN_COMPLETE':
                    setScanningStatus((prev) => ({ ...prev, [sourceDevice]: false }));
                    MySwal.fire({
                        title: "Fingerprint successfully registered",
                        icon: 'success',
                        confirmButtonText: 'OK',
                    }).then((result) => {
                        if (result.isConfirmed) navigate('/');
                    });
                    break;

                case 'MATCH_FOUND':
                    setScanningStatus((prev) => ({ ...prev, [sourceDevice]: false }));
                    MySwal.fire({
                        title: "Fingerprint Matched",
                        icon: 'success',
                        confirmButtonText: 'OK',
                    }).then((result) => {
                        if (result.isConfirmed) navigate('/polling_station/voter_verify');
                    });
                    break;

                case 'MATCH_NOT_FOUND':
                    setScanningStatus((prev) => ({ ...prev, [sourceDevice]: false }));
                    MySwal.fire({
                        title: "Fingerprint Match Not Found",
                        icon: 'error',
                        confirmButtonText: 'OK',
                    }).then((result) => {
                        if (result.isConfirmed) navigate('/');
                    });
                    break;

                default:
                    setScanningMessage(content);
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
        if (socket && socket.readyState === WebSocket.OPEN) {
            const jsonMessage = {
                applicationId: ApplicationID,
                sourceDevice: ApplicationID,
                targetDevice: deviceId,
                message: command,
            };
            socket.send(JSON.stringify(jsonMessage));

            if (command === 'SCAN' || command === 'MATCH') {
                setScanningStatus((prev) => ({ ...prev, [deviceId]: true }));
            }
        } else {
            console.error('WebSocket is not open');
        }
    };

    return (
        <Box className="p-6 max-w-xl mx-auto bg-gray-50 shadow-md rounded-lg space-y-6">
            <Typography variant="h5" className="text-center font-bold text-gray-800">
                Fingerprint Scanner
            </Typography>

            <Box className="scan">
                <div className="fingerprint"></div>
                <h3>
                    {Object.entries(scanningStatus)
                        .map(([id, status]) => `${id}: ${status ? "Yes" : "No"}`)
                        .join(", ")}
                </h3>
                <Typography variant="body2" className="mt-2 text-gray-600">
                    {scanningMessage}
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
                    <Button variant="contained" color="primary" onClick={() => sendCommand("SCAN")}>
                        Send Scan Command
                    </Button>
                )}

                {action === 'match' && (
                    <Button variant="contained" color="secondary" onClick={() => sendCommand("MATCH")}>
                        Send Match Command
                    </Button>
                )}
            </Box>
        </Box>
    );
}

export default FingerprintScanner;
