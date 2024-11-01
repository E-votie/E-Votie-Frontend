import React, { useEffect, useState } from 'react';
import './../assets/css/Scan.css'
import MySwal from "sweetalert2";
import {useNavigate} from "react-router-dom";
const fingerprintUrl = import.meta.env.VITE_API_Fingerprint_URL;

function FingerprintScanner({ ApplicationID }) {

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
            }else{
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
                ApplicationID: ApplicationID,
                sourceDevice: ApplicationID,
                targetDevice: deviceId,
                message: command
            };
            socket.send(JSON.stringify(jsonMessage));
            if (command === 'SCAN') {
                setScanningStatus(prev => ({ ...prev, [deviceId]: true }));
            }
        } else {
            console.error('WebSocket is not open');
        }
    };

    return (
        <div>
            <div className="scan">
                <div className="fingerprint"></div>
                <h3>Scanning: {Object.entries(scanningStatus).map(([id, status]) =>
                    `${id}: ${status ? 'Yes' : 'No'}`).join(', ')}</h3>
                <h5>{scanningMassage}</h5>
            </div>
            <h1>Fingerprint WebSocket Test</h1>
            <div>
                <label>
                    Device ID:
                    <input
                        type="text"
                        value={deviceId}
                        onChange={(e) => setDeviceId(e.target.value)}
                    />
                </label>
            </div>
            <button onClick={() => sendCommand('SCAN')}>Send Scan Command</button>
            <button onClick={() => sendCommand('MATCH')}>Send Match Command</button>
            {/*<h2>Incoming Messages:</h2>*/}
            {/*<ul>*/}
            {/*    {messages.map((message, index) => (*/}
            {/*        <li key={index}>{message}</li>*/}
            {/*    ))}*/}
            {/*</ul>*/}
        </div>
    );
}

export default FingerprintScanner;