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
import { Divider, Paper, Typography } from "@mui/material";
import Stack from '@mui/material/Stack';
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import steps from "./../../assets/Other/VoterRegistrationSteps.json"
import VerticalLinearStepper from "../../Components/VerticalLinearStepper.jsx";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import EmailIcon from '@mui/icons-material/Email';
import jsonData from "./../../../public/Resource/Srilankan_Dropdown.json";
import {uploadFile} from "../../api/FileUpload.jsx";

const base_url = import.meta.env.VITE_API_BASE_URL;
const MySwal = withReactContent(Swal)

export const VoterRegistration_2 = () => {

    const location = useLocation();
    const {responseData} = location.state || {};
    if (!responseData) {
        return <div>Something went wrong: Data is missing.</div>;
    }

    const [uploadStatus, setUploadStatus] = useState('');
    const [selectedAdminDistrict, setSelectedAdminDistrict] = useState("");
    const [selectedElectionDistrict, setSelectedElectionDistrict] = useState("");
    const [electionDistricts, setElectionDistricts] = useState([]);
    const [pollingDivisions, setPollingDivisions] = useState([]);

    // Handle Admin District selection and populate election districts
    const handleAdminDistrictChange = (event) => {
        const adminDistrict = event.target.value;
        setSelectedAdminDistrict(adminDistrict);
        setSelectedElectionDistrict(""); // Reset the election district
        setPollingDivisions([]); // Reset polling divisions

        // Get election districts based on selected admin district
        const districts = Object.keys(jsonData[adminDistrict]);
        setElectionDistricts(districts);
    };

    // Handle Election District selection and populate polling divisions
    const handleElectionDistrictChange = (event) => {
        const electionDistrict = event.target.value;
        setSelectedElectionDistrict(electionDistrict);

        // Get polling divisions based on selected election district
        const divisions = jsonData[selectedAdminDistrict][electionDistrict];
        setPollingDivisions(divisions);
    };

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
    const [step, setStep] = useState(1); // Initialize the step with 0 (first step)

    const handleNext = () => setStep((prevStep) => prevStep + 1);
    const handlePrevious = () => setStep((prevStep) => prevStep - 1);

    const mutation = useMutation((data) => {
        return axios.post(`${base_url}/voter-registration/new-application`, data);
    });

    const onSubmit = async (data) => {
        console.log(data);
        console.log("ApplicationID: ", responseData.applicationID);
        // Show loading state
        MySwal.fire({
            title: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => MySwal.showLoading(),
        });

        try {
            // Assuming responseData is already available in your code
            const { applicationID } = responseData;

            // Upload the NIC Front, NIC Back, and Face images
            const nicFrontResponse = await uploadFile(data.NICFront, `${applicationID}_NICFront.jpg`, base_url);
            const nicBackResponse = await uploadFile(data.NICBack, `${applicationID}_NICBack.jpg`, base_url);
            const faceResponse = await uploadFile(data.Face, `${applicationID}_Face.jpg`, base_url);

            setUploadStatus(`Files uploaded successfully: ${nicFrontResponse}, ${nicBackResponse}, ${faceResponse}`);

            // Remove the uploaded files from the data
            delete data.NICFront;
            delete data.NICBack;
            delete data.Face;

            // Proceed with the form submission after uploading files
            mutation.mutate(data, {
                onSuccess: (response) => {
                    MySwal.close();
                    MySwal.fire({
                        title: <p>Application Successfully Submitted. Check your email for the reference number.</p>,
                        icon: 'success',
                        showConfirmButton: true,
                        confirmButtonText: 'OK',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate('/');
                        }
                    });
                },
                onError: (error) => {
                    console.error('Error submitting data:', error);
                }
            });
        } catch (error) {
            // Handle file upload failure
            setUploadStatus('Error uploading files');
            MySwal.close();
            console.error('Error uploading files:', error);
        }
    };


    const handleUpload = () => {
    }

    const Map = () => {

    }

    return (
        <div className="h-fit flex flex-col bg-base-100 shadow-md rounded-xl p-6 gap-8">
            {/* Topic */}
            <div className="text-3xl font-semibold text-gray-900">
                Personal Details
            </div>
            <div className="flex flex-row">
                <div className="p-10 w-1/4">
                    <VerticalLinearStepper steps={steps} ActiveStep={step} key={step} />
                </div>
                <div className="divider lg:divider-horizontal"></div>
                <div className="card-body w-3/4">
                    <Paper elevation={3} className="p-4">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="topic text-xl font-semibold">
                                Application ID :
                                <input type="text" value={responseData.applicationID} className="grow"
                                       placeholder="ApplicationID" {...register("ApplicationID")} readOnly/>
                            </div>

                            {step === 1 && (
                                <div>
                                    {/* Personal Details */}
                                    <div className="space-y-3">
                                        <div className="topic text-xl mb-4">
                                            Personal Details
                                        </div>
                                        <Divider/>

                                        <Stack direction={{xs: 'column', md: 'col', lg: 'col', xl: 'row'}}
                                               className="flex lg:flex-row md:flex-col sm:flex-col gap-4">
                                            {/* nic */}
                                            <label
                                                className="input input-bordered flex items-center gap-2 input-primary xl:w-1/3 lg:w-full md:w-full sm:w-full">
                                                <CreditCardIcon className="text-black" style={{fontSize: 20}}/>
                                                <input type="text" value={responseData.NIC} className="grow"
                                                       placeholder="NIC" {...register("NIC")} readOnly/>
                                            </label>
                                            {/* name */}
                                            <label
                                                className="input input-bordered flex items-center gap-2 input-primary xl:w-2/3 lg:w-full md:w-full sm:w-full">
                                                <PermIdentityIcon className="text-black" style={{fontSize: 20}}/>
                                                <input type="text" className="grow"
                                                       placeholder="Name" {...register("Name")}/>
                                            </label>
                                            {errors.Name &&
                                                <p className="text-red-500 text-xs italic">{errors.Name.message}</p>}
                                        </Stack>
                                        <Stack direction={{xs: 'column', md: 'col', lg: 'col', xl: 'row'}}
                                               className="flex gap-4">
                                            {/* birth date */}
                                            <Box className="xl:w-1/3 lg:w-full md:w-full sm:w-full">
                                                <label
                                                    className="input input-bordered flex items-center gap-2 input-primary border-box">
                                                    <EmailIcon className="text-black" style={{fontSize: 20}}/>
                                                    <input type="text" className="grow" value={responseData.DOB}
                                                           placeholder="Date_of_Birth" {...register("DOB")} readOnly/>
                                                </label>
                                                {errors.Date_of_Birth &&
                                                    <p className="text-red-500 text-xs italic ">{errors.Date_of_Birth.message}</p>}
                                            </Box>

                                            {/* gender */}
                                            <Box className="xl:w-1/3 lg:w-full md:w-full sm:w-full">
                                                <select value={responseData.Gender}
                                                        className="select select-primary w-full">
                                                    <option disabled selected><Typography
                                                        variant="body1">Gender</Typography></option>
                                                    <option><Typography variant="body1">Male</Typography></option>
                                                    <option><Typography variant="body1">Female</Typography></option>
                                                </select>
                                            </Box>

                                            {/* marital status */}
                                            <Box className="xl:w-1/3 lg:w-full md:w-full sm:w-full">
                                                <select
                                                    className="select select-primary w-full" {...register("CivilStatus")}>
                                                    <option disabled selected>CivilStatus</option>
                                                    <option>Married</option>
                                                    <option>UnMarried</option>
                                                    <option>Devose</option>
                                                </select>
                                            </Box>
                                        </Stack>
                                        <Stack direction={{xs: 'column', md: 'col', lg: 'col', xl: 'row'}}
                                               className="flex gap-4">
                                            {/* nic front */}
                                            <Box className="flex flex-col gap-4 xl:w-1/3 lg:w-full md:w-full sm:w-full">
                                                <label className="form-control w-full">
                                                    <Typography variant="body1" className="label-text" gutterBottom>NIC
                                                        Front</Typography>
                                                    <input type="file"
                                                           className="file-input file-input-bordered w-full" {...register("NICFront")}/>
                                                </label>
                                                {errors.NICFront &&
                                                    <p className="text-red-500 text-xs italic ml-5">{errors.NICFront.message}</p>}
                                            </Box>

                                            {/* nic back */}
                                            <Box className="flex flex-col gap-4 xl:w-1/3 lg:w-full md:w-full sm:w-full">
                                                <label className="form-control w-full">
                                                    <Typography variant="body1" className="label-text" gutterBottom>NIC
                                                        Back</Typography>
                                                    <input type="file"
                                                           className="file-input file-input-bordered w-full" {...register("NICBack")}/>
                                                </label>
                                                {errors.NICBack &&
                                                    <p className="text-red-500 text-xs italic ml-5">{errors.NICBack.message}</p>}
                                            </Box>

                                            {/* current photo */}
                                            <Box className="flex flex-col gap-4 xl:w-1/3 lg:w-full md:w-full sm:w-full">
                                                <label className="form-control w-full">
                                                    <Typography variant="body1" gutterBottom>Current facial photo for
                                                        verification</Typography>
                                                    <input type="file"
                                                           className="file-input file-input-bordered w-full" {...register("Face")}/>
                                                </label>
                                                {errors.Face &&
                                                    <p className="text-red-500 text-xs italic ml-5">{errors.Face.message}</p>}
                                            </Box>
                                        </Stack>
                                        {/* Add more fields as needed */}
                                        <Button
                                            variant="contained"
                                            onClick={handleNext}
                                            sx={{
                                                backgroundColor: 'rgb(236 72 153)', // Pink color
                                                color: '#fff',
                                                '&:hover': {backgroundColor: 'rgb(220 57 138)'}, // Slightly darker pink for hover
                                                marginLeft: 'auto', // Align to the right
                                                display: 'block'
                                            }}
                                        >
                                            Next
                                        </Button>

                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div>
                                    {/* Permanent Residence */}
                                    <div className="space-y-3">
                                        <div className="topic text-xl mb-4">Permanent Residence</div>
                                        <Divider/>
                                        <Box>
                                            <label className="form-control">
                                                <Typography variant="body1" className="label-text"
                                                            gutterBottom>Address</Typography>
                                                <textarea className="textarea textarea-bordered h-24 textarea-primary"
                                                          placeholder="Address" {...register("Address")}></textarea>
                                            </label>
                                            {errors.Address &&
                                                <p className="text-red-500 text-xs italic ml-5">{errors.Address.message}</p>}
                                        </Box>

                                        <Stack direction={{xs: 'column', md: 'col', lg: 'col', xl: 'row'}}
                                               className="flex gap-4 md:flex-col lg:flex-row w-full">
                                            {/* admin district */}
                                            <Box className="xl:w-1/5 lg:w-full md:w-full sm:w-full">
                                                <select
                                                    {...register("AdminDistrict")}
                                                    className="select select-primary w-full"
                                                    value={selectedAdminDistrict}
                                                    onChange={handleAdminDistrictChange}
                                                >
                                                    <option disabled value="">
                                                        Admin District
                                                    </option>
                                                    {Object.keys(jsonData).map((adminDistrict) => (
                                                        <option key={adminDistrict} value={adminDistrict}>
                                                            {adminDistrict}
                                                        </option>
                                                    ))}
                                                </select>
                                            </Box>

                                            {/* Election District */}
                                            <Box className="xl:w-1/5 lg:w-full md:w-full sm:w-full">
                                                <select
                                                    {...register("ElectionDistrict")}
                                                    className="select select-primary w-full"
                                                    value={selectedElectionDistrict}
                                                    onChange={handleElectionDistrictChange}
                                                    disabled={!selectedAdminDistrict}
                                                >
                                                    <option disabled value="">
                                                        Election District
                                                    </option>
                                                    {electionDistricts.map((electionDistrict) => (
                                                        <option key={electionDistrict} value={electionDistrict}>
                                                            {electionDistrict}
                                                        </option>
                                                    ))}
                                                </select>
                                            </Box>

                                            {/* Polling Division */}
                                            <Box className="xl:w-1/5 lg:w-full md:w-full sm:w-full">
                                                <select
                                                    {...register("PollingDivision")}
                                                    className="select select-primary w-full"
                                                    disabled={!selectedElectionDistrict}
                                                >
                                                    <option disabled value="">
                                                        Polling Division
                                                    </option>
                                                    {pollingDivisions.map((pollingDivision) => (
                                                        <option key={pollingDivision} value={pollingDivision}>
                                                            {pollingDivision}
                                                        </option>
                                                    ))}
                                                </select>
                                            </Box>
                                            {/* grama niladhari division */}
                                            <Box className="xl:w-1/5 lg:w-full md:w-full sm:w-full">
                                                <select {...register("GramaNiladhariDivision")}
                                                        className="select select-primary w-full">
                                                    <option disabled selected>GN Division</option>
                                                    <option>584/A</option>
                                                </select>
                                            </Box>
                                            {/* home */}
                                            <Box className="xl:w-1/5 lg:w-full md:w-full sm:w-full flex items-center">
                                                <Box className="w-full">
                                                    <label
                                                        className="input input-bordered flex items-center gap-2 input-primary">
                                                        <input type="text" className="grow"
                                                               placeholder="HouseNo" {...register("HouseNo")}/>
                                                    </label>
                                                    {errors.HouseNo &&
                                                        <p className="text-red-500 text-xs italic">{errors.HouseNo.message}</p>}
                                                </Box>
                                            </Box>
                                        </Stack>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Button variant="contained" onClick={handlePrevious} sx={{
                                                backgroundColor: 'rgb(236 72 153)', // Pink color
                                                color: '#fff',
                                                '&:hover': {backgroundColor: 'rgb(220 57 138)'},
                                                display: 'block'
                                            }}>Previous</Button>
                                            <Button variant="contained" onClick={handleNext} sx={{
                                                backgroundColor: 'rgb(236 72 153)', // Pink color
                                                color: '#fff',
                                                '&:hover': {backgroundColor: 'rgb(220 57 138)'}, // Slightly darker pink for hover // Align to the right
                                                display: 'block'
                                            }}>Next</Button>
                                        </Stack>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div>
                                    {/* Chief Occupant Details */}
                                    <div className="space-y-3">
                                        <div className="topic text-xl mb-4">Chief Occupant Details</div>
                                        <Divider/>
                                        <Stack direction={{xs: 'column', md: 'col', lg: 'col', xl: 'row'}}
                                               className="gap-4">
                                            {/* chief occupant nic */}
                                            <Box className="xl:w-1/3 lg:w-full md:w-full sm:w-full">
                                                <label
                                                    className="input input-bordered flex items-center gap-2 input-primary">
                                                    <CreditCardIcon className="text-black" style={{fontSize: 20}}/>
                                                    <input type="text" className="grow"
                                                           placeholder="NIC" {...register("ChiefOccupantNIC")}/>
                                                </label>
                                                {errors.ChiefOccupantNIC &&
                                                    <p className="text-red-500 text-xs italic ml-5">{errors.ChiefOccupantNIC.message}</p>}
                                            </Box>
                                            {/* chief occupant relationship */}
                                            <Box className="xl:w-2/3 lg:w-full md:w-full sm:w-full">
                                                <label
                                                    className="input input-bordered flex items-center gap-2 input-primary">
                                                    <PermIdentityIcon className="text-black" style={{fontSize: 20}}/>
                                                    <input type="text" className="grow"
                                                           placeholder="Relationship with chife ocupent" {...register("RelationshipToTheChiefOccupant")}/>
                                                </label>
                                                {errors.RelationshipToTheChiefOccupant &&
                                                    <p className="text-red-500 text-xs italic ml-5">{errors.RelationshipToTheChiefOccupant.message}</p>}
                                            </Box>
                                        </Stack>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Button variant="contained" onClick={handlePrevious} sx={{
                                                backgroundColor: 'rgb(236 72 153)', // Pink color
                                                color: '#fff',
                                                '&:hover': {backgroundColor: 'rgb(220 57 138)'}, // Slightly darker pink for hover
                                                display: 'block'
                                            }}>Previous</Button>
                                            <Button type="submit" variant="contained" sx={{
                                                backgroundColor: 'rgb(236 72 153)', // Pink color
                                                color: '#fff',
                                                '&:hover': {backgroundColor: 'rgb(220 57 138)'}, // Slightly darker pink for hover
                                                display: 'block'
                                            }}>Submit</Button>
                                        </Stack>
                                    </div>
                                </div>
                            )}
                        </form>
                    </Paper>
                </div>
            </div>
        </div>
    );
}