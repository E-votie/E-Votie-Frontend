import React, { useState, useEffect } from 'react';
import MapWithMarkers from "../../Components/MapWithMarkers.jsx";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { object } from "yup";
import { useMutation } from 'react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const schema = object({
    Address: yup.string().required("Cannot be empty"),
    ChiefOccupantNIC: yup.string().required("Cannot be empty").length(12, "NIC must be 12 characters long"),
});

const Polling_Stations = () => {
    const [coordinates, setCoordinates] = useState('No coordinates selected');
    const [pollingStations, setPollingStations] = useState([{ name: "", coordinates: "" }]);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        console.log("Coordinates updated:", coordinates);
    }, [coordinates]);

    const mutation = useMutation((data) => {
        return axios.post('http://localhost:8081/Election/Create', data);
    });

    const onSubmit = async (data) => {
        mutation.mutate(data, {
            onSuccess: (response) => {
                MySwal.fire({
                    title: <p>Please check Date_of_Birth and phone</p>,
                    icon: 'success',
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                    didOpen: () => { },
                }).then((result) => {
                    if (result.isConfirmed) {
                        // navigate('/Home');
                    }
                })
            },
            onError: (error) => {
                console.error('Error submitting data:', error);
                // Handle error (e.g., show error message)
            }
        });
    }

    const handleLocationSelect = (lat, lng, index) => {
        const coords = `${lat}, ${lng}`;
        console.log("New coordinates:", coords);
        setCoordinates(coords);
        setPollingStations(prevStations => {
            const updatedStations = [...prevStations];
            updatedStations[index].coordinates = coords;
            return updatedStations;
        });
    };

    const addPollingStation = () => {
        const lastStation = pollingStations[pollingStations.length - 1];
        if (!lastStation.name.trim()) {
            MySwal.fire({
                title: 'Please enter a polling station name before adding another.',
                icon: 'warning',
                showConfirmButton: true,
                confirmButtonText: 'OK',
            });
        } else {
            setPollingStations([...pollingStations, { name: "", coordinates: "" }]);
        }
    };

    const deletePollingStation = (index) => {
        if (pollingStations.length > 1) {
            setPollingStations(prevStations => prevStations.filter((_, i) => i !== index));
        } else {
            MySwal.fire({
                title: 'Cannot delete the last polling station',
                icon: 'warning',
                showConfirmButton: true,
                confirmButtonText: 'OK',
            });
        }
    };

    const handlePollingStationNameChange = (index, value) => {
        setPollingStations(prevStations => {
            const updatedStations = [...prevStations];
            updatedStations[index].name = value;
            return updatedStations;
        });
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '20px',
    };

    const mapContainerStyle = {
        flex: 1,
        marginRight: '20px',
    };

    const formContainerStyle = {
        flex: 1,
        minWidth: '500px',
    };

    return (
        <div style={containerStyle}>
            <div style={mapContainerStyle}>
                <MapWithMarkers onLocationSelect={(lat, lng) => handleLocationSelect(lat, lng, pollingStations.length - 1)} />
            </div>
            <div style={formContainerStyle}>
                <div className="card card-side bg-base-100 shadow-xl gap-10 px-4">
                    <div className="card-body md:px-2">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                            <div className="space-y-3">
                                <p className="font-sans text-2xl">New Election</p>
                                <div className="space-y-3">
                                    <div className="flex gap-6">
                                        <div className="flex flex-col">
                                            <label className="mb-1 font-sans text-l">Starting Date and Time</label>
                                            <input
                                                type="datetime-local"
                                                placeholder="Type here"
                                                className="input input-bordered input-primary w-full max-w-xs" />
                                            {errors.StartingDateTime && <p>{errors.StartingDateTime.message}</p>}
                                        </div>
                                        <span className="text-lg font-bold self-end mb-2">-</span>
                                        <div className="flex flex-col">
                                            <label className="mb-1 font-sans text-l">Ending Date and Time</label>
                                            <input
                                                type="datetime-local"
                                                placeholder="Type here"
                                                className="input input-bordered input-primary w-full max-w-xs" />
                                            {errors.ElectionType && <p>{errors.ElectionType.message}</p>}
                                        </div>
                                    </div>
                                </div>
                                <p className="font-sans text-2l">Election Type</p>
                                <select className="select select-primary w-full max-w-xs">
                                    <option disabled selected>Election Type</option>
                                    <option>Presidential Election</option>
                                    <option>Parliamentary Election</option>
                                    <option>Provincial Council Election</option>
                                    <option>Local Government Election</option>
                                </select>
                                {errors.EndingDateTime && <p>{errors.EndingDateTime.message}</p>}
                                <div className="flex gap-5">
                                    <label className="form-control w-full max-w-xs">
                                    </label>
                                    <label className="form-control w-full max-w-xs">
                                    </label>
                                    <label className="form-control w-full max-w-xs">
                                    </label>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <p className="font-sans text-2l">Polling Station Names and Coordinates</p>
                                {pollingStations.map((station, index) => (
                                    <div key={index} className="flex items-center gap-2 mb-2">
                                        <label className="form-control flex-grow">
                                            <input
                                                className="input input-bordered input-primary w-full"
                                                placeholder="Enter Polling Station Name"
                                                value={station.name}
                                                onChange={(e) => handlePollingStationNameChange(index, e.target.value)}
                                            />
                                        </label>
                                        <span className="text-sm text-gray-600 font-semibold">{station.coordinates}</span>
                                        <button type="button" className="btn btn-outline btn-primary" onClick={addPollingStation}>+</button>
                                        <button type="button" className="btn btn-outline btn-danger" onClick={() => deletePollingStation(index)}>-</button>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-3">
                                <div className="card-actions justify-end">
                                    <button className="btn btn-outline btn-primary">Next</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Polling_Stations;
