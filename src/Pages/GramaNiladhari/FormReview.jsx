import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import {object} from "yup";
import {useMutation} from 'react-query';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {useNavigate, useParams} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {authGet, authPost} from '../../Auth/authFetch.jsx';
import {signing} from "../../services/Signing.jsx";

const MySwal = withReactContent(Swal)

export const FormReview = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [responseData, setResponseData] = useState(null);
    const {ApplicationID} = useParams();

    const {
        signMessage, connectWallet, setMessage, message, account
    } = signing();

    useEffect(() => {
        connectWallet();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Set loading to true to show the loading screen
                setLoading(true);

                // Replace 'your_api_endpoint' with your actual API endpoint
                const data = await authGet(`/gramaniladhari/voter_application?applicationID=${ApplicationID}`);
                console.log(data);
                // Simulate delay for demonstration
                await new Promise(resolve => setTimeout(resolve, 1000));
                delete data.GramaNiladhariSignature;
                delete data.VerificationOfficerSignature;
                // Set response data and loading to false after data is fetched
                setResponseData(data);
                setMessage(JSON.stringify(data));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const schema = object({})

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })

    const mutation = useMutation((data) => {
        return authPost('/gramaniladhari/voter_application/sign', data);
    });

    const onSubmit = async (data) => {
        const signature = await signMessage();
        console.log(signature)
        data.sign = signature;
        console.log(data);
        mutation.mutate(data, {
            onSuccess: (response) => {
                MySwal.fire({
                    title: <p>Verified</p>,
                    icon: 'success',
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                    didOpen: () => {
                        // `MySwal` is a subclass of `Swal` with all the same instance & static methods
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/Home');
                    }
                })
            }, onError: (error) => {
                MySwal.fire({
                    title: `<p>${error.response.data}</p>`,
                    icon: 'error',
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                    didOpen: () => {
                        // `MySwal` is a subclass of `Swal` with all the same instance & static methods
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/Home');
                    }
                })
            }
        });
    }

    return (<div>
        {loading ? (<div>Loading...</div>) : (<form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="space-y-3">
                <div className="label flex gap-3">
                    <span className="label-text">Application ID : </span>
                    <input type="text" value={responseData.applicationID} className="grow"
                           placeholder="ApplicationID" {...register("applicationID")} readOnly/>
                </div>
                <p className="font-sans text-2xl">Personal Details</p>
                <label className="input input-bordered flex items-center gap-2 input-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                         className="h-5 w-5">
                        <path
                            d="M19 2H5C3.34 2 2 3.34 2 5v14c0 1.66 1.34 3 3 3h14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3zM5 4h14c.55 0 1 .45 1 1v2H4V5c0-.55.45-1 1-1zm14 16H5c-.55 0-1-.45-1-1V9h16v10c0 .55-.45 1-1 1z"/>
                        <path
                            d="M6 10h4c.55 0 1 .45 1 1s-.45 1-1 1H6c-.55 0-1-.45-1-1s.45-1 1-1zm0 4h4c.55 0 1 .45 1 1s-.45 1-1 1H6c-.55 0-1-.45-1-1s.45-1 1-1zm6-4h4c.55 0 1 .45 1 1s-.45 1-1 1h-4c-.55 0-1-.45-1-1s.45-1 1-1zm0 4h4c.55 0 1 .45 1 1s-.45 1-1 1h-4c-.55 0-1-.45-1-1s.45-1 1-1z"/>
                    </svg>
                    <input type="text" value={responseData.NIC} className="grow"
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
                           value={responseData.Name} readOnly/>
                </label>
                <label className="input input-bordered flex items-center gap-2 input-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                         className="h-4 w-4 opacity-70">
                        <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
                        <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"/>
                    </svg>
                    <input type="text" className="grow" value={responseData.DOB}
                           placeholder="Date_of_Birth" readOnly/>
                </label>
                <div className="flex">
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Gender</span>
                        </div>
                        <select value={responseData.Gender} className="select select-primary w-full max-w-xs">
                            <option disabled selected>Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </label>
                    <label className="form-control w-full max-w-xs ml-5">
                        <div className="label">
                            <span className="label-text">Civil Status</span>
                        </div>
                        <select
                            className="select select-primary w-full max-w-xs"
                            value={responseData.CivilStatus}>
                            <option disabled selected>CivilStatus</option>
                            <option>Married</option>
                            <option>UnMarried</option>
                            <option>Devose</option>
                        </select>
                    </label>
                </div>
                <div className="flex gap-5">
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">NIC Front</span>
                        </div>
                        <input type="file"
                               className="file-input file-input-bordered w-full max-w-xs"/>
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">NIC Back</span>
                        </div>
                        <input type="file"
                               className="file-input file-input-bordered w-full max-w-xs"/>
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Current facial photo for verification</span>
                        </div>
                        <input type="file"
                               className="file-input file-input-bordered w-full max-w-xs"/>
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
                    {/*<MapComponent></MapComponent>*/}
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
                        <input type="text" placeholder="Type here" value={responseData.RelationshipToTheChiefOccupant}
                               className="input input-bordered w-full max-w-xs input-primary" readOnly/>
                    </label>
                    <div className="form-control justify-center mt-6">
                        <label className="label cursor-pointer gap-5">
                            <span className="label-text">Verified by Chief Occupant</span>
                            <input type="checkbox" defaultChecked className="checkbox checkbox-primary" readOnly/>
                        </label>
                    </div>
                </div>
                <div className="flex gap-5 justify-end">
                    <div className="card-actions justify-end">
                        <button className="btn btn-outline btn-success">Sign</button>
                    </div>
                    <div className="card-actions justify-end">
                        <button className="btn btn-outline btn-error">Decline</button>
                    </div>
                </div>
            </div>
        </form>)}
    </div>);
}