import React, {useEffect, useState} from 'react';
import {authGet} from "../../Auth/authFetch.jsx";
import {ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import * as PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import {QRCode} from 'react-qrcode-logo';
import StickyHeadTable from "../../Components/HistoryTableVoter.jsx";


function StatsComponent() {
    return null;
}

StatsComponent.propTypes = {
    stats: PropTypes.string, statsLabel: PropTypes.string
};
export const VoterDetails = () => {

    const [loading, setLoading] = useState(true);
    const [responseData, setResponseData] = useState(null);
    const [profile_image, setProfileImage] = useState(null);
    const [qrCode, setQrCode] = useState("Hello");

    const [alignment, setAlignment] = React.useState('Info');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await authGet(`/voter/my_details`);
                await new Promise(resolve => setTimeout(resolve, 1000));
                console.log(data.voter)
                setResponseData(data.voter);
                setProfileImage(data.profileImageUrl);
                setQrCode(data.voter.NIC)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (<div>
            {loading ? (<div>Loading...</div>) : (
                <div className="card bg-base-100 shadow-xl h-full p-5 flex flex-col">
                    <div className="self-end mb-4">
                        <ToggleButtonGroup
                            color="secondary"
                            value={alignment}
                            exclusive
                            onChange={handleChange}
                            aria-label="Platform"
                            sx={{
                                '& .MuiToggleButton-root': {
                                    color: '#EC4899',
                                    borderColor: '#EC4899',
                                    '&.Mui-selected': {
                                        color: 'white',
                                        backgroundColor: '#EC4899',
                                    },
                                },
                            }}
                        >
                            <ToggleButton value="Info">My Info</ToggleButton>
                            <ToggleButton value="History">Past Elections</ToggleButton>
                            <ToggleButton value="Notification">Notification</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    {alignment==="Info" ? (<div className="card lg:card-side bg-base-100 shadow-xl h-full p-5 gap-16">
                        <div>
                            <Card sx={{maxWidth: 445, width: 350}}>
                                <CardMedia
                                    sx={{height: 400}}
                                    image={profile_image}
                                    title="green iguana"
                                />
                                <CardContent sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%', // Adjust this if you want to specify a height
                                    gap: 2 // Adds space between elements
                                }}>
                                    <Typography variant="body1" color="text.secondary">
                                        Active voter dedicated to making informed decisions and contributing to
                                        transparent
                                        and fair elections
                                    </Typography>
                                    <QRCode
                                        value={qrCode}
                                        logoImage="/e-votie-favicon-color.png"
                                        fgColor="#EC4899"
                                        logoWidth="10px"
                                        removeQrCodeBehindLogo="true"
                                    />
                                    <Typography variant="body1" sx={{
                                        color: 'red',
                                        fontSize: '1.2rem',
                                        textAlign: 'center',
                                        width: '100%'
                                    }}>
                                        Please don't share this QR with anyone
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
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
                        </div>
                    </div>) : (
                        <div>
                            <StickyHeadTable></StickyHeadTable>
                        </div>)}
                </div>)}
    </div>)
};
