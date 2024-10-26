import React, {useEffect, useState} from "react";
import {authGet} from "../../Auth/authFetch.jsx";
import {useNavigate} from "react-router-dom";
import { motion } from 'framer-motion';
import CircularProgress from '@mui/material/CircularProgress';

export const ElectionRegistrationForm = () => {

    const [loading, setLoading] = useState(true);
    const [responseData, setResponseData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                console.log("This is the plase")
                const data = await authGet(`/voter/my_details`);
                await new Promise(resolve => setTimeout(resolve, 1000));
                setResponseData(data.voter)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    return (<div>
        {loading ? (
        <div className="flex justify-center items-center h-screen">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="flex justify-center items-center"
            >
                <CircularProgress color="secondary" />
            </motion.div>
        </div>
        ) : (
                <div className="card lg:card-side bg-base-100 shadow-xl h-full p-5 gap-16">
                    <div>
                        <div className="space-y-3">
                            <p className="font-sans text-2xl">Personal Details</p>
                            <div className="flex gap-5">
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">NIC</span>
                                    </div>
                                    <input type="text" placeholder="Type here" value={responseData.NIC}
                                           className="input input-bordered w-full max-w-xs input-primary" readOnly/>
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Name</span>
                                    </div>
                                    <input type="text" placeholder="Type here"
                                           value={responseData.Name}
                                           onChange={(e) => handleInputChange(Name, e.target.value)}
                                           className="input input-bordered w-full max-w-xs input-primary"
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Birth Day</span>
                                    </div>
                                    <input type="text" placeholder="Type here" value={responseData.DOB}
                                           className="input input-bordered w-full max-w-xs input-primary" readOnly/>
                                </label>
                            </div>
                            <div className="flex gap-5">
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Gender</span>
                                    </div>
                                    <input type="text" placeholder="Type here"
                                           value={responseData.Gender}
                                           onChange={(e) => handleInputChange(Gender, e.target.value)}
                                           className="input input-bordered w-full max-w-xs input-primary"
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <p className="font-sans text-2xl">Location Details</p>
                            <label className="form-control">
                                <div className="label">
                                    <span className="label-text">Address</span>
                                </div>
                                <textarea className="textarea textarea-bordered h-24 textarea-primary"
                                          placeholder="Address"
                                          value={responseData.Address}
                                          onChange={(e) => handleInputChange("Address", e.target.value)}
                                ></textarea>
                            </label>
                            <div className="flex flex-col lg:flex-row w-full gap-5">
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Admin District</span>
                                    </div>
                                    <input type="text" placeholder="Type here"
                                           value={responseData.AdminDistrict}
                                           onChange={(e) => handleInputChange(AdminDistrict, e.target.value)}
                                           className="input input-bordered w-full max-w-xs input-primary"
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Election District</span>
                                    </div>
                                    <input type="text" placeholder="Type here"
                                           value={responseData.ElectionDistrict}
                                           onChange={(e) => handleInputChange(ElectionDistrict, e.target.value)}
                                           className="input input-bordered w-full max-w-xs input-primary"
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Polling Division</span>
                                    </div>
                                    <input type="text" placeholder="Type here"
                                           value={responseData.PollingDivision}
                                           onChange={(e) => handleInputChange(PollingDivision, e.target.value)}
                                           className="input input-bordered w-full max-w-xs input-primary"
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">GN Division</span>
                                    </div>
                                    <input type="text" placeholder="Type here"
                                           value={responseData.GNDivision}
                                           onChange={(e) => handleInputChange(GNDivision, e.target.value)}
                                           className="input input-bordered w-full max-w-xs input-primary"
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">HouseNo</span>
                                    </div>
                                    <input type="text" placeholder="Type here"
                                           value={responseData.HouseNo}
                                           onChange={(e) => handleInputChange(HouseNo, e.target.value)}
                                           className="input input-bordered w-full max-w-xs input-primary"
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="flex gap-5 justify-end">
                            <div className="card-actions justify-end">
                                <button
                                    className="btn btn-secondary mt-12"
                                    onClick={() => {navigate("/voter/Profile")}}
                                >
                                    Update Information
                                </button>
                                <button
                                    className="btn btn-primary mt-12 text-white"
                                    onClick={() => {}}
                                >
                                    Register for this Election
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
    </div>)
}