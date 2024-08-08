import React, { useState, useEffect } from 'react';
import MapWithMarkers from '../../Components/MapWithMarkers.jsx';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { object } from 'yup';
import { useMutation } from 'react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Accordion from './../../Components/Accordion.jsx';
import { PollingStationsContext } from './PollingStationsContext.jsx';
import { useContext } from 'react';

const MySwal = withReactContent(Swal);

const schema = object({
    StartingDateTime: yup.string().required('Cannot be empty'),
    EndingDateTime: yup.string().required('Cannot be empty'),
    ElectionType: yup.string().required('Cannot be empty'),
});

const electionDistrict = ['Colombo', 'Kandy', 'Galle'];

const Polling_Stations = () => {
    const [coordinates, setCoordinates] = useState('No coordinates selected');
    const { pollingStations, setPollingStations, addElectionDistrict, newDistrict, setNewDistrict } = useContext(PollingStationsContext);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto'; // Restore scrolling when the component unmounts
        };
    }, []);

    useEffect(() => {
        console.log('Coordinates updated:', coordinates);
    }, [coordinates]);

    const handleAddDistrict = () => {
        if (newDistrict.trim() !== '') {
            addElectionDistrict(newDistrict);
            setNewDistrict('');
        }
    };

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
                });
            },
            onError: (error) => {
                console.error('Error submitting data:', error);
            },
        });
    };

    const handleLocationSelect = (lat, lng, index) => {
        const coords = `${lat}, ${lng}`;
        setCoordinates(coords);
        setPollingStations((prevStations) => {
            const updatedStations = [...prevStations];
            updatedStations[index].coordinates = coords;
            return updatedStations;
        });
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '20px',
    };

    const mapContainerStyle = {
        flex: 1,
    };

    const formContainerStyle = {
        flex: 1,
        height: '800px',
        overflowY: 'auto',
    };

    return (
        <div className="card bg-base-100 shadow-xl p-6 max-h-[700px]">
            <div style={containerStyle}>
                {/* Map Card */}
                <div className="card bg-base-100 shadow-lg max-h-[600px]" style={mapContainerStyle}>
                    <div className="card-body">
                        <h3 className="font-sans text-2xl font-semibold mb-0">Polling Map</h3>
                        <MapWithMarkers onLocationSelect={(lat, lng) => handleLocationSelect(lat, lng, pollingStations.length - 1)} />
                    </div>
                </div>

                {/* Form Card */}
                <div className="card bg-base-100 shadow-lg max-h-[600px]" style={formContainerStyle}>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <div className="space-y-4">
                                <h2 className="font-sans text-3xl font-semibold">Create New Election</h2>

                                {/* Electoral District Dropdown with + Button */}
                                <div className="space-y-4">
                                    <label className="font-sans text-lg">Electoral District</label>
                                    <div className="flex items-center gap-3 mb-3">
                                        <select
                                            className="select select-primary flex-grow" {...register('ElectionType')}>
                                            <option disabled selected>
                                                Select Electoral District
                                            </option>
                                            {electionDistrict.map((name) => (
                                                <option key={name} value={name}>
                                                    {name}
                                                </option>
                                            ))}
                                        </select>
                                        <button
                                            type="button"
                                            className="btn btn-outline btn-primary"
                                            onClick={handleAddDistrict}
                                        >
                                            +
                                        </button>
                                    </div>
                                    {errors.ElectionType && (
                                        <p className="text-red-600 text-sm mt-1">{errors.ElectionType.message}</p>
                                    )}
                                </div>

                                <Accordion />

                                {/* Form Actions */}
                                <div className="card-actions justify-end mt-6">
                                    <button type="submit" className="btn btn-primary">
                                        Next
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Polling_Stations;
