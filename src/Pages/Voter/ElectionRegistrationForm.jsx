import React, {useEffect, useState} from "react";
import {authGet} from "../../Auth/authFetch.jsx";

export const ElectionRegistrationForm = () => {

    const [loading, setLoading] = useState(true);
    const [responseData, setResponseData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await authGet(`/voter/my_details/election_registration`);
                await new Promise(resolve => setTimeout(resolve, 1000));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (<div className="card bg-base-100 shadow-xl h-full p-5 flex flex-row gap-10">
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
                            <input type="text" placeholder="Type here" value={responseData.Name}
                                   className="input input-bordered w-full max-w-xs input-primary" readOnly/>
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
                            <input type="text" placeholder="Type here" value={responseData.Gender}
                                   className="input input-bordered w-full max-w-xs input-primary" readOnly/>
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Civil Status</span>
                            </div>
                            <input type="text" placeholder="Type here" value={responseData.CivilStatus}
                                   className="input input-bordered w-full max-w-xs input-primary" readOnly/>
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
                                  placeholder="Address" value={responseData.Address} readOnly></textarea>
                    </label>
                    <div className="flex flex-col lg:flex-row w-full gap-5">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Admin District</span>
                            </div>
                            <input type="text" placeholder="Type here" value={responseData.AdminDistrict}
                                   className="input input-bordered w-full max-w-xs input-primary" readOnly/>
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Election District</span>
                            </div>
                            <input type="text" placeholder="Type here" value={responseData.ElectionDistrict}
                                   className="input input-bordered w-full max-w-xs input-primary" readOnly/>
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Polling Division</span>
                            </div>
                            <input type="text" placeholder="Type here" value={responseData.PollingDivision}
                                   className="input input-bordered w-full max-w-xs input-primary" readOnly/>
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">GN Division</span>
                            </div>
                            <input type="text" placeholder="Type here" value={responseData.GNDivision}
                                   className="input input-bordered w-full max-w-xs input-primary" readOnly/>
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">HouseNo</span>
                            </div>
                            <input type="text" placeholder="Type here" value={responseData.HouseNo}
                                   className="input input-bordered w-full max-w-xs input-primary" readOnly/>
                        </label>
                    </div>
                </div>
                <div className="space-y-3">
                    <p className="font-sans text-2xl">Chief Occupant Details</p>
                    <div className="flex gap-5">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">NIC</span>
                            </div>
                            <input type="text" placeholder="Type here" value={responseData.ChiefOccupantNIC}
                                   className="input input-bordered w-full max-w-xs input-primary" readOnly/>
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Relationship</span>
                            </div>
                            <input type="text" placeholder="Type here"
                                   value={responseData.RelationshipToTheChiefOccupant}
                                   className="input input-bordered w-full max-w-xs input-primary" readOnly/>
                        </label>
                        <div className="form-control justify-center mt-6">
                            <label className="label cursor-pointer gap-5">
                                <span className="label-text">Verified by Chief Occupant</span>
                                <input type="checkbox" defaultChecked className="checkbox checkbox-primary"
                                       readOnly/>
                            </label>
                        </div>
                    </div>
                    <div className="flex gap-5 justify-end">
                        <div className="card-actions justify-end">
                            <button className="btn btn-outline btn-success">Apply for update info</button>
                        </div>
                    </div>
                </div>
        </div>)
}