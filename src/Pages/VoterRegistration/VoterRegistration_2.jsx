import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import {object} from "yup";
import {useMutation} from 'react-query';
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {useLocation, useNavigate} from 'react-router-dom';
import React, {useState} from 'react';
import MapComponent from './../../Components/MapComponent.jsx';

const MySwal = withReactContent(Swal)

export const VoterRegistration_2 = () => {

    const location = useLocation();
    const {responseData} = location.state || {};
    if (!responseData) {
        return <div>Something went wrong: Data is missing.</div>;
    }

    const [uploadStatus, setUploadStatus] = useState('');

    const navigate = useNavigate();

    const FILE_SIZE = 1024 * 1024; // 1MB in bytes
    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

    const schema = object({
        Name: yup.string("Invalid Name").required("Can not be empty").matches(/^\D*$/, "Invalid name"),
        Address: yup.string().required("Can not be empty"),
        ChiefOccupantNIC: yup.string("Invalid NIC").required("Can not be empty").length(12, "NIC must be 12 characters long"),
        NICFront: yup.mixed().required("A file is required").test("fileSize", "File size is too large", value => value && value[0].size <= FILE_SIZE).test("fileFormat", "Unsupported file format", value => value && SUPPORTED_FORMATS.includes(value[0].type)),
        NICBack: yup.mixed().required("A file is required").test("fileSize", "File size is too large", value => value && value[0].size <= FILE_SIZE).test("fileFormat", "Unsupported file format", value => value && SUPPORTED_FORMATS.includes(value[0].type)),
        Face: yup.mixed().required("A file is required").test("fileSize", "File size is too large", value => value && value[0].size <= FILE_SIZE).test("fileFormat", "Unsupported file format", value => value && SUPPORTED_FORMATS.includes(value[0].type)),
        RelationshipToTheChiefOccupant: yup.string().required("Can not be empty").matches(/^\D*$/, "Invalid Relationship"),
    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })

    const mutation = useMutation((data) => {
        return axios.post('http://localhost:8081/voter-registration/new-application', data);
    });

    const onSubmit = async (data) => {
        const NICFront = new FormData();
        const NICFrontFileName = responseData.applicationID+"_NICFront.jpg";
        console.log(data.NICFront[0])
        const NICFrontFile = new File([data.NICFront[0]], NICFrontFileName, { type: data.NICFront.type });
        NICFront.append('file', NICFrontFile);
        try {
            const response = await axios.post('http://localhost:8081/api/files/upload', NICFront, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setUploadStatus(`File uploaded successfully: ${response.data}`);
        } catch (error) {
            console.error('Error uploading file:', error);
            setUploadStatus('Error uploading file');
        }
        const NICBack = new FormData();
        const NICBackFileName = responseData.applicationID+"_NICBack.jpg";
        const NICBackFile = new File([data.NICBack[0]], NICBackFileName, { type: data.NICBack.type });
        NICBack.append('file', NICBackFile);
        try {
            const response = await axios.post('http://localhost:8081/api/files/upload', NICBack, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setUploadStatus(`File uploaded successfully: ${response.data}`);
        } catch (error) {
            console.error('Error uploading file:', error);
            setUploadStatus('Error uploading file');
        }
        const Face = new FormData();
        const FaceFileName = responseData.applicationID+"_Face.jpg";
        const FaceFile = new File([data.Face[0]], FaceFileName, { type: data.Face.type });
        Face.append('file', FaceFile);
        try {
            const response = await axios.post('http://localhost:8081/api/files/upload', Face, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setUploadStatus(`File uploaded successfully: ${response.data}`);
        } catch (error) {
            console.error('Error uploading file:', error);
            setUploadStatus('Error uploading file');
        }
        delete data.NICFront;
        delete data.NICBack;
        delete data.Face;
        mutation.mutate(data, {
            onSuccess: (response) => {
                MySwal.fire({
                    title: <p>Application Successfully Submitted. Check the your email for reference number</p>,
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
            },
            onError: (error) => {
                console.error('Error submitting data:', error);
                // Handle error (e.g., show error message)
            }
        });
    }

    const handleUpload = () => {
    }

    const Map = () => {

    }

    return (<div className="card card-side bg-base-100 shadow-xl gap-10 px-4">
            <figure>
                <ul className="steps steps-vertical ml-28 md:block">
                    <li className="step step-primary">Registration of Email and Mobile</li>
                    <li className="step step-primary">Personal Details</li>
                    <li className="step">Location Details</li>
                    <li className="step">Chief Occupant Details</li>
                    <li className="step">Conformation</li>
                </ul>
            </figure>
            <div className="divider lg:divider-horizontal"></div>
            <div className="card-body md:px-2">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <div className="space-y-3">
                        <div className="label flex gap-3">
                            <span className="label-text">Application ID : </span>
                            <input type="text" value={responseData.applicationID} className="grow"
                                   placeholder="ApplicationID" {...register("ApplicationID")} readOnly/>
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
                                   placeholder="NIC" {...register("NIC")} readOnly/>
                        </label>
                        <label className="input input-bordered flex items-center gap-2 input-primary">
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM4 20V17.2C4 16.6333 4.146 16.1127 4.438 15.638C4.73 15.1633 5.11733 14.8007 5.6 14.55C6.63333 14.0333 7.68333 13.646 8.75 13.388C9.81667 13.13 10.9 13.0007 12 13C13.1 12.9993 14.1833 13.1287 15.25 13.388C16.3167 13.6473 17.3667 14.0347 18.4 14.55C18.8833 14.8 19.271 15.1627 19.563 15.638C19.855 16.1133 20.0007 16.634 20 17.2V20H4Z"
                                    fill="black"/>
                            </svg>

                            <input type="text" className="grow" placeholder="Name" {...register("Name")}/>
                        </label>
                        {errors.Name && <p className="text-red-500 text-xs italic ml-5">{errors.Name.message}</p>}
                        <label className="input input-bordered flex items-center gap-2 input-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                 className="h-4 w-4 opacity-70">
                                <path
                                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
                                <path
                                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"/>
                            </svg>
                            <input type="text" className="grow" value={responseData.DOB}
                                   placeholder="Date_of_Birth" {...register("DOB")} readOnly/>
                        </label>
                        {errors.Date_of_Birth &&
                            <p className="text-red-500 text-xs italic ml-5">{errors.Date_of_Birth.message}</p>}
                        <select value={responseData.Gender} className="select select-primary w-full max-w-xs">
                            <option disabled selected>Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                        <select className="select select-primary w-full max-w-xs ml-5" {...register("CivilStatus")}>
                            <option disabled selected>CivilStatus</option>
                            <option>Married</option>
                            <option>UnMarried</option>
                            <option>Devose</option>
                        </select>
                        <div className="flex gap-5">
                            <div className="flex flex-col">
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">NIC Front</span>
                                </div>
                                <input type="file"
                                       className="file-input file-input-bordered w-full max-w-xs" {...register("NICFront")}/>
                            </label>
                            {errors.NICFront &&
                                <p className="text-red-500 text-xs italic ml-5">{errors.NICFront.message}</p>}
                            </div>
                            <div className="flex flex-col">
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">NIC Back</span>
                                    </div>
                                    <input type="file"
                                           className="file-input file-input-bordered w-full max-w-xs" {...register("NICBack")}/>
                                </label>
                                {errors.NICBack &&
                                    <p className="text-red-500 text-xs italic ml-5">{errors.NICBack.message}</p>}
                            </div>
                            <div className="flex flex-col">
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Current facial photo for verification</span>
                                </div>
                                <input type="file"
                                       className="file-input file-input-bordered w-full max-w-xs" {...register("Face")}/>
                            </label>
                            {errors.Face && <p className="text-red-500 text-xs italic ml-5">{errors.Face.message}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <p className="font-sans text-2xl">Location Details</p>
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">Address</span>
                            </div>
                            <textarea className="textarea textarea-bordered h-24 textarea-primary"
                                      placeholder="Address" {...register("Address")}></textarea>
                        </label>
                        {errors.Address && <p className="text-red-500 text-xs italic ml-5">{errors.Address.message}</p>}
                        <div className="flex flex-col lg:flex-row w-full">
                            <select {...register("AdminDistrict")}
                                    className="select select-primary w-full max-w-xs lg:w-fit">
                                <option disabled selected>Admin District</option>
                                <option>Colombo</option>
                            </select>
                            <select {...register("ElectionDistrict")}
                                    className="select select-primary w-full max-w-xs lg:w-fit lg:ml-3">
                                <option disabled selected>Election District</option>
                                <option>Colombo</option>
                            </select>
                            <select {...register("PollingDivision")}
                                    className="select select-primary w-full max-w-xs lg:w-fit lg:ml-3">
                                <option disabled selected>Polling Division</option>
                                <option>Kesbewa</option>
                            </select>
                            <select {...register("GramaNiladhariDivision")}
                                    className="select select-primary w-full max-w-xs lg:w-fit lg:ml-3">
                                <option disabled selected>GN Division</option>
                                <option>584/A</option>
                            </select>
                            <label
                                className="input input-bordered flex items-center gap-2 input-primary ml-2 max-w-24">
                                <input type="text" className="grow"
                                       placeholder="HouseNo" {...register("HouseNo")}/>
                            </label>
                            {errors.HouseNo &&
                                <p className="text-red-500 text-xs italic ml-5">{errors.HouseNo.message}</p>}
                            <div className="divider lg:divider-horizontal">OR</div>
                            <MapComponent></MapComponent>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <p className="font-sans text-2xl">Chief Occupant Details</p>
                        <label className="input input-bordered flex items-center gap-2 input-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                 className="h-5 w-5">
                                <path
                                    d="M19 2H5C3.34 2 2 3.34 2 5v14c0 1.66 1.34 3 3 3h14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3zM5 4h14c.55 0 1 .45 1 1v2H4V5c0-.55.45-1 1-1zm14 16H5c-.55 0-1-.45-1-1V9h16v10c0 .55-.45 1-1 1z"/>
                                <path
                                    d="M6 10h4c.55 0 1 .45 1 1s-.45 1-1 1H6c-.55 0-1-.45-1-1s.45-1 1-1zm0 4h4c.55 0 1 .45 1 1s-.45 1-1 1H6c-.55 0-1-.45-1-1s.45-1 1-1zm6-4h4c.55 0 1 .45 1 1s-.45 1-1 1h-4c-.55 0-1-.45-1-1s.45-1 1-1zm0 4h4c.55 0 1 .45 1 1s-.45 1-1 1h-4c-.55 0-1-.45-1-1s.45-1 1-1z"/>
                            </svg>
                            <input type="text" className="grow"
                                   placeholder="NIC" {...register("ChiefOccupantNIC")}/>
                        </label>
                        {errors.ChiefOccupantNIC &&
                            <p className="text-red-500 text-xs italic ml-5">{errors.ChiefOccupantNIC.message}</p>}
                        <label className="input input-bordered flex items-center gap-2 input-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                 className="h-5 w-5">
                                <path
                                    d="M19 2H5C3.34 2 2 3.34 2 5v14c0 1.66 1.34 3 3 3h14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3zM5 4h14c.55 0 1 .45 1 1v2H4V5c0-.55.45-1 1-1zm14 16H5c-.55 0-1-.45-1-1V9h16v10c0 .55-.45 1-1 1z"/>
                                <path
                                    d="M6 10h4c.55 0 1 .45 1 1s-.45 1-1 1H6c-.55 0-1-.45-1-1s.45-1 1-1zm0 4h4c.55 0 1 .45 1 1s-.45 1-1 1H6c-.55 0-1-.45-1-1s.45-1 1-1zm6-4h4c.55 0 1 .45 1 1s-.45 1-1 1h-4c-.55 0-1-.45-1-1s.45-1 1-1zm0 4h4c.55 0 1 .45 1 1s-.45 1-1 1h-4c-.55 0-1-.45-1-1s.45-1 1-1z"/>
                            </svg>
                            <input type="text" className="grow"
                                   placeholder="Relationship with chife ocupent" {...register("RelationshipToTheChiefOccupant")}/>
                        </label>
                        {errors.RelationshipToTheChiefOccupant &&
                            <p className="text-red-500 text-xs italic ml-5">{errors.RelationshipToTheChiefOccupant.message}</p>}
                        <div className="card-actions justify-end">
                            <button className="btn btn-outline btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>);
}