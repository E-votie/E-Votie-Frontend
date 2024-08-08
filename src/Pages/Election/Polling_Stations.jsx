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
import Accordion from '../../Components/Accordion';


const MySwal = withReactContent(Swal);

const schema = object({
    StartingDateTime: yup.string().required("Cannot be empty"),
    EndingDateTime: yup.string().required("Cannot be empty"),
    ElectionType: yup.string().required("Cannot be empty"),
});

const electionDistrict = [
    'Colombo',
    'Kandy',
    'Galle',

];

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
                    title: <p>Election created successfully!</p>,
                    icon: 'success',
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                }).then((result) => {
                    if (result.isConfirmed) {
                        // navigate('/Home');
                    }
                })
            },
            onError: (error) => {
                console.error('Error submitting data:', error);
            }
        });
    }

    const handleLocationSelect = (lat, lng, index) => {
        const coords = `${lat}, ${lng}`;
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

    const handleCSVUpload = (event) => {
        const file = event.target.files[0];
        console.log("CSV file uploaded:", file);
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

    const inputGroupStyle = {
        marginBottom: '20px',
    };

    return (
        <div style={containerStyle}>
            <div style={mapContainerStyle}>
                <MapWithMarkers onLocationSelect={(lat, lng) => handleLocationSelect(lat, lng, pollingStations.length - 1)} />
            </div>
            <div style={formContainerStyle}>
                <div className="card card-side bg-base-100 shadow-xl gap-10 px-4">
                    <div className="card-body md:px-2">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <div className="space-y-4">
                                <h2 className="font-sans text-3xl font-semibold">Create New Election</h2>

                                {/* Electoral District Dropdown with + Button */}
                                <div className="space-y-4">
                                    <label className="font-sans text-lg">Electoral District</label>
                                    <div className="flex items-center gap-3 mb-3">
                                        <select className="select select-primary flex-grow" {...register("ElectionType")}>
                                            <option disabled selected>Select Electoral District</option>
                                            {electionDistrict.map((name) => (
                                                <option key={name} value={name}>{name}</option>
                                            ))}
                                        </select>
                                        <button type="button" className="btn btn-outline btn-primary" onClick={() => alert("Add District functionality here")}>
                                            +
                                        </button>
                                    </div>
                                    {errors.ElectionType &&
                                        <p className="text-red-600 text-sm mt-1">{errors.ElectionType.message}</p>}
                                </div>
                                <Accordion></Accordion>
                                {/* Polling Stations */}
                                <div className="space-y-4">
                                    <h3 className="font-sans text-2xl font-semibold">Polling Stations</h3>

                                    {/* Polling Station List */}
                                    {pollingStations.map((station, index) => (
                                        <div key={index} className="flex items-center gap-3 mb-3">
                                            <input
                                                className="input input-bordered input-primary flex-grow"
                                                placeholder="Polling Station Name"
                                                value={station.name}
                                                onChange={(e) => handlePollingStationNameChange(index, e.target.value)}
                                            />
                                            <span className="text-sm text-gray-600 font-semibold">{station.coordinates}</span>
                                            <button type="button" className="btn btn-outline btn-primary" onClick={addPollingStation}>+</button>
                                            <button type="button" className="btn btn-outline btn-danger" onClick={() => deletePollingStation(index)}>-</button>
                                        </div>
                                    ))}

                                    {/* CSV Upload Button */}
                                    <div className="flex flex-col">
                                        <label className="font-sans text-lg mb-2">Upload Polling Stations CSV</label>
                                        <input
                                            type="file"
                                            accept=".csv"
                                            className="input input-bordered input-primary"
                                            onChange={handleCSVUpload}
                                        />
                                    </div>
                                </div>

                                {/* Form Actions */}
                                <div className="card-actions justify-end mt-6">
                                    <button type="submit" className="btn btn-primary">Next</button>
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