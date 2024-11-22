import {Divider, Stack} from "@mui/material";
import React, {useEffect, useState} from "react";
import {object} from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useMutation} from "react-query";
import {authGet} from "../../Auth/authFetch.jsx";
import Swal from "sweetalert2";
import {PhotoProvider, PhotoView} from "react-photo-view";
import FingerprintScanner from "../../Components/FingerprintScanner.jsx";

export const FingerprintReg = (props) => {

    const [responseData, setResponseData] = useState(null);
    const [showFingerprintScanner, setShowFingerprintScanner] = useState(false);

    useEffect(() => {
        if (responseData) {
            console.log('Updated responseData:', responseData);
        }
    }, [responseData]);

    const schema = object({})

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })

    const OTP = useMutation((data) => {
        return authGet(`/verification_officer/fingerprint_otp/sent?NIC=${data.NIC}`);
    });

    const OTPVerify = useMutation((data) => {
        return authGet(`/verification_officer/verifyOTP?OTP=${data}`);
    })

    const SendOTP = async (data) => {
        console.log(data)
        OTP.mutate(data, {
            onSuccess: (response) => {
                console.log(response)
                Swal.fire({
                    title: "Enter the OTP",
                    input: "text",
                    inputLabel: "OTP",
                    showCancelButton: true,
                    inputValidator: (value) => {
                        if (!value) {
                            return "Enter the OTP";
                        }
                    }
                }).then((result) => {
                    OTPVerify.mutate(result.value,{
                        onSuccess: (response) => {
                            setResponseData(response)
                            setShowFingerprintScanner(true);
                            console.log(response);
                        },
                        onError: (error) => {
                            const errorMessage = error.message;
                            const statusMatch = errorMessage.match(/status: (\d+)/);
                            const status = statusMatch ? parseInt(statusMatch[1]) : null;
                            if (status === 401) { // Unauthorized error
                                window.location.href = "/";
                            } else {
                                Swal.fire({
                                    title: `${error.response.data}`,
                                    icon: 'error',
                                    showConfirmButton: true,
                                    confirmButtonText: 'OK',
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        // Additional actions if needed
                                    }
                                });
                            }
                        }
                    })
                });
            },
            onError: (error) => {
                const errorMessage = error.message;
                const statusMatch = errorMessage.match(/status: (\d+)/);
                const status = statusMatch ? parseInt(statusMatch[1]) : null;
                if(status === 400) {
                    console.log("------>>>>>>>>>>>>>")
                    Swal.fire({
                        title: "NIC is not registered",
                        icon: 'error',
                        showConfirmButton: true,
                        confirmButtonText: 'OK',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            // Additional actions if needed
                        }
                    });
                }
                if (status === 401) { // Unauthorized error
                    window.location.href = "/";
                } else {
                    Swal.fire({
                        title: `<p>${error.response.data}</p>`,
                        icon: 'error',
                        showConfirmButton: true,
                        confirmButtonText: 'OK',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            // Additional actions if needed
                        }
                    });
                }
            }
        });

    }

    return (
        <div className="card lg:card-side bg-base-100 shadow-xl h-full">
        <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem/>}
            spacing={2}
        >
            <div className="card-body w-[500px]">
                <form onSubmit={handleSubmit(SendOTP)}>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-xl self-center ml-20 text-primary font-semibold">Enter the NIC to get the voter</span>
                        </div>
                        <div className="label">
                            <span className="label-text">NIC</span>
                        </div>
                        <input type="text" placeholder="Enter the NIC hear"
                               className="input input-bordered w-full input-primary" {...register("NIC")}/>
                    </label>
                    <div className="card-actions justify-end mt-5">
                        <button className="btn btn-primary">Send OTP</button>
                    </div>
                </form>
                <div className="mt-5">
                    {showFingerprintScanner && (
                        <div>
                            <FingerprintScanner ApplicationID={responseData.applicationID} action={"scan"} />
                        </div>
                    )}
                </div>
            </div>
            <div className="card-body w-[800px]">
                <form className="space-y-3 h-full">
                    <div className="space-y-3">
                        <div className="label flex gap-3">
                            <span className="label-text">Application ID : </span>
                            <input type="text" value={responseData ? responseData.applicationID : ''} className="grow"
                                   placeholder="ApplicationID" readOnly/>
                        </div>
                        <p className="font-sans text-2xl">Details</p>
                        <label className="input input-bordered flex items-center gap-2 input-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                 className="h-5 w-5">
                                <path
                                    d="M19 2H5C3.34 2 2 3.34 2 5v14c0 1.66 1.34 3 3 3h14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3zM5 4h14c.55 0 1 .45 1 1v2H4V5c0-.55.45-1 1-1zm14 16H5c-.55 0-1-.45-1-1V9h16v10c0 .55-.45 1-1 1z"/>
                                <path
                                    d="M6 10h4c.55 0 1 .45 1 1s-.45 1-1 1H6c-.55 0-1-.45-1-1s.45-1 1-1zm0 4h4c.55 0 1 .45 1 1s-.45 1-1 1H6c-.55 0-1-.45-1-1s.45-1 1-1zm6-4h4c.55 0 1 .45 1 1s-.45 1-1 1h-4c-.55 0-1-.45-1-1s.45-1 1-1zm0 4h4c.55 0 1 .45 1 1s-.45 1-1 1h-4c-.55 0-1-.45-1-1s.45-1 1-1z"/>
                            </svg>
                            <input type="text" value={responseData ? responseData.nic : ''} className="grow"
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
                                   value={responseData ? responseData.name : ''} readOnly/>
                        </label>
                        {responseData && (
                            <div className="flex gap-5 h-[400px]">
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">NIC Front</span>
                                    </div>
                                    <PhotoProvider>
                                        <PhotoView src={responseData.nicback}>
                                            <img src={responseData.nicfront} alt=""/>
                                        </PhotoView>
                                    </PhotoProvider>
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">NIC Back</span>
                                    </div>
                                    <PhotoProvider>
                                        <PhotoView src={responseData.nicback}>
                                            <img src={responseData.nicback} alt=""/>
                                        </PhotoView>
                                    </PhotoProvider>
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Face</span>
                                    </div>
                                    <PhotoProvider>
                                        <PhotoView src={responseData.face}>
                                            <img src={responseData.face} alt=""/>
                                        </PhotoView>
                                    </PhotoProvider>
                                </label>
                            </div>
                        )}
                    </div>
                    <div className="flex gap-5 justify-end">
                        <div className="card-actions justify-end">
                            <button className="btn btn-outline btn-success">Scan</button>
                        </div>
                        <div className="card-actions justify-end">
                            <button className="btn btn-outline btn-error">Decline</button>
                        </div>
                    </div>
                </form>
            </div>
        </Stack>
    </div>)
}