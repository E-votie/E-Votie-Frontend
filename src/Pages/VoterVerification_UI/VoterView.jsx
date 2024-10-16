import React, {useEffect, useState} from "react";
import {Divider, Stack, Typography} from "@mui/material";
import {object} from "yup";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useMutation} from "react-query";
import axios from "axios";
import MySwal from "sweetalert2";
import {PhotoProvider, PhotoView} from "react-photo-view";
import keycloakService from "../../services/KeycloakService.jsx";
import {QrReader} from "react-qr-reader";
const electionApiBaseUrl = import.meta.env.VITE_API_Election_BASE_URL;

export const VotingView = () => {

    const [voterID, setVoterID] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const [showFingerprintScanner, setShowFingerprintScanner] = useState(false);
    const [sourceDevice, setSourceDevice] = useState(null);
    const [socket, setSocket] = useState(null);

    const schema = object({
        voterID: yup.string("Invalid NIC").required("Can not be empty"),
    })

    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(schema)
    })

    const mutation = useMutation((data) => {
        return axios.post(`${electionApiBaseUrl}/voting/voter_verify`, data);
    });

    useEffect(() => {
        let id = keycloakService.getUserName()
        setSourceDevice(id)
        // Create WebSocket connection
        const newSocket = new WebSocket(`ws://localhost:8090/fingerprint-websocket?id=${id}`);

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
    }, []);

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

    const sendCommand = (VoterID, command) => {
        console.log("-------------->>>>>>>>>>>>>>>>>>>>>>>");
        if (socket && socket.readyState === WebSocket.OPEN) {
            const jsonMessage = {
                VoterID: VoterID,
                sourceDevice: sourceDevice,
                targetDevice: "SENSOR_1",
                message: command
            };
            socket.send(JSON.stringify(jsonMessage));
        } else {
            console.error('WebSocket is not open');
        }
    };

    const Verify = (data) => {
        MySwal.fire({
            title: 'Please wait.....',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                MySwal.showLoading();
            },
        });
        console.log(data.voterID);
        sendCommand(data.voterID, "MATCH")
    }

    return (
        <div className="card lg:card-side bg-base-100 shadow-xl h-full">
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem/>}
                spacing={2}
            >
                <div className="card-body w-[500px]">
                    <form onSubmit={handleSubmit(Verify)}>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-xl self-center ml-20 text-primary font-semibold">Enter the NIC to get the voter</span>
                            </div>
                            <div className="label">
                                <span className="label-text">Voter ID</span>
                            </div>
                            <input type="text" placeholder="Enter the NIC hear"
                                   className="input input-bordered w-full input-primary" {...register("voterID")}/>
                        </label>
                        <div className="card-actions justify-end mt-5">
                            <button type={"submit"} className="btn btn-primary">Verify</button>
                        </div>
                    </form>
                    <QrReader
                        onResult={(result, error) => {
                            if (!!result) {
                                setVoterID(result?.text);
                            }

                            if (!!error) {
                                console.info(error);
                            }
                        }}
                        style={{ width: '100%' }}
                     constraints={{ facingMode: 'user' }}
                    />
                </div>

                <div className="card-body w-[800px]">
                    <form className="space-y-3 h-full">
                        <div className="space-y-3">
                            <div className="label flex gap-3">
                                <span className="label-text">VoterID : </span>
                                <input type="text" value={responseData ? responseData.applicationID : ''}
                                       className="grow"
                                       placeholder="VoterID" readOnly/>
                            </div>
                            <p className="font-sans text-2xl">Details</p>
                            <label className="input input-bordered flex items-center gap-2 input-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                     className="h-5 w-5">
                                    <path
                                        d="M19 2H5C3.34 2 2 3.34 2 5v14c0 1.66 1.34 3 3 3h14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3zM5 4h14c.55 0 1 .45 1 1v2H4V5c0-.55.45-1 1-1zm14 16H5c-.55 0-1-.45-1-1V9h16v10c0 .55-.45 1-1 1z"/>
                                    <path
                                        d="M6 10h4c.55 0 1 .45 1 1s-.45 1-1 1H6c-.55 0-1-.45-1-1s.45-1 1-1zm0 4h4c.55 0 1 .45 1 1s-.45 1-1 1H6c-.55 0-1-.45-1-1s.45-1 1-1zm6-4h4c.55 0 1 .45 1 1s-.45 1-1 1h-4c-.55 0-1-.45-1-1s.45-1 1-1zm0 4h4c.55 0 1 .45 1 1s-.45 1-1 1h-4c-.55 0-1-.45-1-1s.45-1 1-1z"/>
                                </svg>
                                <input type="text" value={responseData ? responseData.nic : ''} className="grow"
                                       placeholder="NIC" readOnly/>
                            </label>
                            <label className="input input-bordered flex items-center gap-2 input-primary">
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM4 20V17.2C4 16.6333 4.146 16.1127 4.438 15.638C4.73 15.1633 5.11733 14.8007 5.6 14.55C6.63333 14.0333 7.68333 13.646 8.75 13.388C9.81667 13.13 10.9 13.0007 12 13C13.1 12.9993 14.1833 13.1287 15.25 13.388C16.3167 13.6473 17.3667 14.0347 18.4 14.55C18.8833 14.8 19.271 15.1627 19.563 15.638C19.855 16.1133 20.0007 16.634 20 17.2V20H4Z"
                                        fill="black"/>
                                </svg>
                                <input type="text" className="grow" placeholder="Name"
                                       value={responseData ? responseData.name : ''} readOnly/>
                            </label>
                            {responseData && (
                                <div className="flex gap-5 h-[600px]">
                                    <label className="form-control w-full max-w-xs">
                                        <div className="label">
                                            <span className="label-text">NIC Front</span>
                                        </div>
                                        <PhotoProvider>
                                            <PhotoView src={responseData.nicback}>
                                                <img src={responseData.nicfront} alt=""/>
                                            </PhotoView>
                                        </PhotoProvider>
                                    </label>
                                    <label className="form-control w-full max-w-xs">
                                        <div className="label">
                                            <span className="label-text">NIC Back</span>
                                        </div>
                                        <PhotoProvider>
                                            <PhotoView src={responseData.nicback}>
                                                <img src={responseData.nicback} alt=""/>
                                            </PhotoView>
                                        </PhotoProvider>
                                    </label>
                                    <label className="form-control w-full max-w-xs">
                                        <div className="label">
                                            <span className="label-text">Face</span>
                                        </div>
                                        <PhotoProvider>
                                            <PhotoView src={responseData.face}>
                                                <img src={responseData.face} alt=""/>
                                            </PhotoView>
                                        </PhotoProvider>
                                    </label>
                                </div>
                            )}
                        </div>
                        <div className="flex gap-5 justify-end">
                            <div className="card-actions justify-end">
                                <button className="btn btn-outline btn-success">Scan</button>
                            </div>
                            <div className="card-actions justify-end">
                                <button className="btn btn-outline btn-error">Decline</button>
                            </div>
                        </div>
                    </form>
                </div>
            </Stack>
        </div>
    )
}