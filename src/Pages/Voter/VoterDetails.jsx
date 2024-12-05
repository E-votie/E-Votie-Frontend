import React, {useEffect, useState} from 'react';
import {authGet} from "../../Auth/authFetch.jsx";
import {ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import * as PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import {QRCode} from 'react-qrcode-logo';
import StickyHeadTable from "../../Components/HistoryTableVoter.jsx";
import Swal from "sweetalert2";
import {motion} from "framer-motion";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
const partyUrl = import.meta.env.VITE_API_PARTY_URL;


function StatsComponent() {
    return null;
}

StatsComponent.propTypes = {
    stats: PropTypes.string, statsLabel: PropTypes.string
};
export const VoterDetails = () => {

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

    const [loading, setLoading] = useState(true);
    const [responseData, setResponseData] = useState(null);
    const [profile_image, setProfileImage] = useState(null);
    const [qrCode, setQrCode] = useState("Hello");
    const [isEditing, setIsEditing] = useState(false);
    const [editableData, setEditableData] = useState({});
    const [editedFields, setEditedFields] = useState({});
    const [partyRequestData, setPartyRequestData] = useState([]);

    const [alignment, setAlignment] = React.useState('Info');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const handleInputChange = (field, value) => {
        setEditedFields(prev => ({...prev, [field]: true}));
        setEditableData(prev => ({...prev, [field]: value}));
    };

    const renderFileInputs = () => {
        return Object.keys(editedFields).map(field => (
            <div key={field} className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Upload document for {field}</span>
                </label>
                <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
            </div>
        ));
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
                console.log(data.voter.voterNIC)
                setQrCode(data.voter.voterID)
                axios.get(`${partyUrl}/api/request/receiver/${responseData.voterNIC}`)
                    .then(response => {
                        console.log(response);
                        console.log(Array.isArray(response.data))
                        const data = response.data;
                        const dataArray = Array.isArray(data) ? data : Object.values(data);
                        setPartyRequestData(dataArray);  // This will be your array
                        console.log(`++++++++++++++++++>>>>>>>>>>>>>>>>>${partyRequestData[0].requestId}`);
                    })
                    .catch(error => {
                        console.error(error);
                    });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleUpdateInfo = async () => {
        try {
            const response = await authGet('/voter/update_info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editableData),
            });
            if (response.ok) {
                setResponseData(editableData);
                setIsEditing(false);
                // You might want to show a success message here
            } else {
                // Handle error
                console.error('Failed to update info');
            }
        } catch (error) {
            console.error('Error updating info:', error);
        }
    };

    return (<div>
        {loading ? (
            <div className="card flex bg-base-100 shadow-xl h-full p-5 justify-center items-center h-screen">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="flex justify-center items-center"
                >
                    <CircularProgress color="secondary" />
                </motion.div>
            </div>
        ) : (
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
                                        <input type="text" placeholder="Type here" value={isEditing ? editableData.Name : responseData.Name}
                                               onChange={(e) => handleInputChange(Name, e.target.value)}
                                               className="input input-bordered w-full max-w-xs input-primary" readOnly={!isEditing}/>
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
                                        <input type="text" placeholder="Type here" value={isEditing ? editableData.Gender : responseData.Gender}
                                               onChange={(e) => handleInputChange(Gender, e.target.value)}
                                               className="input input-bordered w-full max-w-xs input-primary" readOnly={!isEditing}/>
                                    </label>
                                    <label className="form-control w-full max-w-xs">
                                        <div className="label">
                                            <span className="label-text">Civil Status</span>
                                        </div>
                                        <input type="text" placeholder="Type here" value={isEditing ? editableData.CivilStatus : responseData.CivilStatus}
                                               onChange={(e) => handleInputChange("CivilStatus", e.target.value)}
                                               className="input input-bordered w-full max-w-xs input-primary" readOnly={!isEditing}/>
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
                                              placeholder="Address" value={isEditing ? editableData.Address : responseData.Address}
                                              onChange={(e) => handleInputChange("Address", e.target.value)} readOnly={!isEditing}></textarea>
                                </label>
                                <div className="flex flex-col lg:flex-row w-full gap-5">
                                    <label className="form-control w-full max-w-xs">
                                        <div className="label">
                                            <span className="label-text">Admin District</span>
                                        </div>
                                        <input type="text" placeholder="Type here" value={isEditing ? editableData.AdminDistrict : responseData.AdminDistrict}
                                               onChange={(e) => handleInputChange(AdminDistrict, e.target.value)}
                                               className="input input-bordered w-full max-w-xs input-primary" readOnly={!isEditing}/>
                                    </label>
                                    <label className="form-control w-full max-w-xs">
                                        <div className="label">
                                            <span className="label-text">Election District</span>
                                        </div>
                                        <input type="text" placeholder="Type here" value={isEditing ? editableData.ElectionDistrict : responseData.ElectionDistrict}
                                               onChange={(e) => handleInputChange(ElectionDistrict, e.target.value)}
                                               className="input input-bordered w-full max-w-xs input-primary" readOnly={!isEditing}/>
                                    </label>
                                    <label className="form-control w-full max-w-xs">
                                        <div className="label">
                                            <span className="label-text">Polling Division</span>
                                        </div>
                                        <input type="text" placeholder="Type here" value={isEditing ? editableData.PollingDivision : responseData.PollingDivision}
                                               onChange={(e) => handleInputChange(PollingDivision, e.target.value)}
                                               className="input input-bordered w-full max-w-xs input-primary" readOnly={!isEditing}/>
                                    </label>
                                    <label className="form-control w-full max-w-xs">
                                        <div className="label">
                                            <span className="label-text">GN Division</span>
                                        </div>
                                        <input type="text" placeholder="Type here" value={isEditing ? editableData.GNDivision : responseData.GNDivision}
                                               onChange={(e) => handleInputChange(GNDivision, e.target.value)}
                                               className="input input-bordered w-full max-w-xs input-primary" readOnly={!isEditing}/>
                                    </label>
                                    <label className="form-control w-full max-w-xs">
                                        <div className="label">
                                            <span className="label-text">HouseNo</span>
                                        </div>
                                        <input type="text" placeholder="Type here" value={isEditing ? editableData.HouseNo : responseData.HouseNo}
                                               onChange={(e) => handleInputChange(HouseNo, e.target.value)}
                                               className="input input-bordered w-full max-w-xs input-primary" readOnly={!isEditing}/>
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
                                        <input type="text" placeholder="Type here" value={isEditing ? editableData.ChiefOccupantNIC : responseData.ChiefOccupantNIC}
                                               onChange={(e) => setEditableData({...editableData, ChiefOccupantNIC: e.target.value})}
                                               className="input input-bordered w-full max-w-xs input-primary" readOnly={!isEditing}/>
                                    </label>
                                    <label className="form-control w-full max-w-xs">
                                        <div className="label">
                                            <span className="label-text">Relationship</span>
                                        </div>
                                        <input type="text" placeholder="Type here"
                                               value={isEditing ? editableData.RelationshipToTheChiefOccupant : responseData.RelationshipToTheChiefOccupant}
                                               onChange={(e) => setEditableData({...editableData, RelationshipToTheChiefOccupant: e.target.value})}
                                               className="input input-bordered w-full max-w-xs input-primary" readOnly={!isEditing}/>
                                    </label>
                                    <div className="form-control justify-center mt-6">
                                        <label className="label cursor-pointer gap-5">
                                            <span className="label-text">Verified by Chief Occupant</span>
                                            <input type="checkbox" defaultChecked className="checkbox checkbox-primary"
                                                   readOnly={!isEditing}/>
                                        </label>
                                    </div>
                                </div>
                                <div className="flex gap-5 justify-end">
                                    <div className="card-actions justify-end">
                                        <button
                                            className={`btn ${isEditing ? 'btn-primary' : 'btn-outline btn-success'}`}
                                            onClick={() => {
                                                if (isEditing) {
                                                    handleUpdateInfo();
                                                } else {
                                                    Toast.fire({
                                                        icon: "success",
                                                        title: "Entered edit mode"
                                                    });
                                                    setEditableData(responseData);
                                                    setIsEditing(true);
                                                }
                                            }}
                                        >
                                            {isEditing ? 'Apply for update info' : 'Edit Info'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>) : (
                        <div>
                            <StickyHeadTable data={partyRequestData}></StickyHeadTable>
                        </div>)}
                </div>)}
    </div>)
};
