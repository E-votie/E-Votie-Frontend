import {object} from "yup";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useMutation} from "react-query";
import axios from "axios";
import Swal from 'sweetalert2'
import {useNavigate, useParams} from 'react-router-dom';
import {OTP} from "../../Components/OTP";
import {Box} from "@mui/system";
import React from "react";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal)

export const EmailVerification = () => {
    const [otp, setOtp] = React.useState("");
    const {Hash} = useParams();

    const navigate = useNavigate();

    const schema = object({
        OTP: yup.string("Invalid OTP").required("Can not be empty").length(4, "OTP must be 4 numbers long"),
        Hash: yup.string().required("Link has broken please reload the link").length(16, "Link has broken please reload the link"),
    });

    const {register, handleSubmit, formState: {errors}, setValue} = useForm({
        resolver: yupResolver(schema)
    });

    const mutation = useMutation((data) => {
        return axios.post('http://localhost:8081/voter-registration/voter/verify', data);
    });

    // Update OTP value in form state when otp changes
    React.useEffect(() => {
        setValue("OTP", otp); // Update the form state with the current value of otp
    }, [otp, setValue]);

    const onSubmit = (data) => {
        console.log("Submitting data:", data);
        mutation.mutate(data, {
            onSuccess: (response) => {
                navigate(`/VoterRegistration/${response.data.applicationID}`,{ state: { responseData: response.data } });
                // Handle success (e.g., show success message)
            },
            onError: (error) => {
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
                // Handle error (e.g., show error message)
            }
        });
    };

    return (
        <div className="card card-side bg-base-100 shadow-xl gap-10 px-4 py-10">
            <figure>
                <ul className="steps steps-vertical ml-28 hidden md:block">
                    <li className="step step-primary">Registration of Email and Mobile</li>
                    <li className="step">Personal Details</li>
                    <li className="step">Location Details</li>
                    <li className="step">Chief Occupant Details</li>
                    <li className="step">Conformation</li>
                </ul>
            </figure>
            <div className="divider lg:divider-horizontal"></div>
            <div className="card-body flex justify-center items-center">
                <div className="flex-initial space-y-16 text-center">
                    <p className="font-sans text-2xl">Enter the OTP</p>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 4, // Increased gap
                            alignItems: 'center',
                        }}
                    >
                        <OTP separator={<span>-</span>} value={otp} onChange={setOtp} length={4}/>
                        {errors.OTP && <p className="text-red-500 text-xs italic ml-5">{errors.OTP.message}</p>}
                    </Box>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex-initial space-y-6"> {/* Increased gap */}
                        {/* Hidden inputs */}
                        <input className="sr-only" value={otp} name="OTP" {...register("OTP")} />
                        <input className="sr-only" value={Hash} name="Hash" {...register("Hash")} />
                        <div className="card-actions justify-center">
                            <button type="submit" className="btn btn-outline btn-primary">Verify</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
